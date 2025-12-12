import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting RL Pipeline analysis...");
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch latest fiscal data with country information
    const { data: fiscalData, error: fiscalError } = await supabase
      .from("country_fiscal_data")
      .select(`
        *,
        countries (
          id,
          name,
          code,
          region
        )
      `)
      .order("year", { ascending: false });

    if (fiscalError) {
      console.error("Error fetching fiscal data:", fiscalError);
      throw new Error("Failed to fetch fiscal data");
    }

    if (!fiscalData || fiscalData.length === 0) {
      console.log("No fiscal data found");
      return new Response(
        JSON.stringify({ message: "No fiscal data available for analysis" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get latest data per country
    const latestByCountry = new Map();
    fiscalData.forEach((item: any) => {
      if (!latestByCountry.has(item.country_id)) {
        latestByCountry.set(item.country_id, item);
      }
    });
    const latestData = Array.from(latestByCountry.values());

    console.log(`Analyzing ${latestData.length} countries...`);

    // Prepare data summary for AI analysis
    const dataSummary = latestData.map((d: any) => ({
      country: d.countries?.name || "Unknown",
      region: d.countries?.region || "Unknown",
      year: d.year,
      debtToGDP: d.debt_to_gdp,
      fiscalDeficit: d.fiscal_deficit,
      gdpGrowth: d.gdp_growth,
      inflationRate: d.inflation_rate,
      riskScore: d.risk_score,
      riskLevel: d.risk_level,
      debtServiceRatio: d.debt_service_ratio,
      revenueToGDP: d.revenue_to_gdp,
      expenditureToGDP: d.expenditure_to_gdp,
    }));

    // Call AI to analyze and generate recommendations/alerts
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert fiscal policy analyst specializing in African sovereign debt. 
Analyze fiscal data and provide actionable insights using reinforcement learning principles:
- Identify patterns and anomalies in fiscal indicators
- Assess risk trajectories and early warning signals
- Generate evidence-based policy recommendations
- Create urgent alerts for critical situations
Be precise, data-driven, and focus on actionable intelligence.`,
          },
          {
            role: "user",
            content: `Analyze the following African fiscal data and provide recommendations and alerts.

FISCAL DATA:
${JSON.stringify(dataSummary, null, 2)}

Based on this data, please provide your analysis in the following JSON format:
{
  "alerts": [
    {
      "title": "Alert title",
      "description": "Detailed alert description",
      "category": "debt|risk|forecast|policy|market",
      "priority": "High|Medium|Low",
      "impact": "Description of potential impact",
      "country_name": "Country name or null for regional alerts"
    }
  ],
  "recommendations": [
    {
      "title": "Recommendation title",
      "description": "Detailed recommendation",
      "category": "Revenue|Expenditure|Debt Management|Structural Reform",
      "priority": "High|Medium|Low",
      "timeframe": "Short-term|Medium-term|Long-term",
      "applicable_countries": ["Country1", "Country2"]
    }
  ],
  "summary": "Brief overall assessment"
}

Generate 3-5 alerts based on concerning patterns and 3-5 policy recommendations. Focus on:
1. Countries with high risk scores (>70)
2. Deteriorating debt-to-GDP ratios
3. High inflation combined with fiscal deficits
4. Low revenue collection relative to expenditure
5. Opportunities for fiscal consolidation`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiResult = await aiResponse.json();
    const content = aiResult.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    console.log("AI Response received, parsing...");

    // Parse AI response - extract JSON from the response
    let analysis;
    try {
      // Try to find JSON in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI analysis");
    }

    console.log(`Generated ${analysis.alerts?.length || 0} alerts and ${analysis.recommendations?.length || 0} recommendations`);

    // Get country ID mapping
    const { data: countries } = await supabase
      .from("countries")
      .select("id, name");
    
    const countryMap = new Map(countries?.map((c: any) => [c.name.toLowerCase(), c.id]) || []);

    // Insert new alerts
    if (analysis.alerts && analysis.alerts.length > 0) {
      const alertsToInsert = analysis.alerts.map((alert: any) => ({
        title: alert.title,
        description: alert.description,
        category: alert.category || "risk",
        priority: alert.priority || "Medium",
        impact: alert.impact,
        country_id: alert.country_name ? countryMap.get(alert.country_name.toLowerCase()) : null,
        is_read: false,
      }));

      const { error: alertsError } = await supabase
        .from("alerts")
        .insert(alertsToInsert);

      if (alertsError) {
        console.error("Error inserting alerts:", alertsError);
      } else {
        console.log(`Inserted ${alertsToInsert.length} alerts`);
      }
    }

    // Insert new policy recommendations
    if (analysis.recommendations && analysis.recommendations.length > 0) {
      for (const rec of analysis.recommendations) {
        // Insert recommendation
        const { data: insertedRec, error: recError } = await supabase
          .from("policy_recommendations")
          .insert({
            title: rec.title,
            description: rec.description,
            category: rec.category || "Structural Reform",
            priority: rec.priority || "Medium",
            timeframe: rec.timeframe || "Medium-term",
          })
          .select()
          .single();

        if (recError) {
          console.error("Error inserting recommendation:", recError);
          continue;
        }

        // Link to applicable countries
        if (rec.applicable_countries && rec.applicable_countries.length > 0 && insertedRec) {
          const countryLinks = rec.applicable_countries
            .map((countryName: string) => {
              const countryId = countryMap.get(countryName.toLowerCase());
              if (countryId) {
                return {
                  recommendation_id: insertedRec.id,
                  country_id: countryId,
                };
              }
              return null;
            })
            .filter(Boolean);

          if (countryLinks.length > 0) {
            const { error: linkError } = await supabase
              .from("recommendation_countries")
              .insert(countryLinks);

            if (linkError) {
              console.error("Error linking countries:", linkError);
            }
          }
        }
      }
      console.log(`Inserted ${analysis.recommendations.length} recommendations`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "RL Pipeline analysis complete",
        summary: analysis.summary,
        alertsGenerated: analysis.alerts?.length || 0,
        recommendationsGenerated: analysis.recommendations?.length || 0,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("RL Pipeline error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
