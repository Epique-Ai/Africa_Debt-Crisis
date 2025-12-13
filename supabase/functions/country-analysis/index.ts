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
    const { countryId, countryName } = await req.json();
    
    if (!countryId || !countryName) {
      return new Response(
        JSON.stringify({ error: "Country ID and name are required", success: false }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Starting analysis for ${countryName} (${countryId})...`);
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch all historical fiscal data for this country
    const { data: fiscalData, error: fiscalError } = await supabase
      .from("country_fiscal_data")
      .select("*")
      .eq("country_id", countryId)
      .order("year", { ascending: true });

    if (fiscalError) {
      console.error("Error fetching fiscal data:", fiscalError);
      throw new Error("Failed to fetch fiscal data");
    }

    if (!fiscalData || fiscalData.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false,
          error: "No fiscal data available for this country" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${fiscalData.length} years of data for ${countryName}`);

    // Prepare historical data for analysis
    const historicalData = fiscalData.map((d) => ({
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
      unemploymentRate: d.unemployment_rate,
    }));

    const latestData = historicalData[historicalData.length - 1];

    // Call AI for country-specific analysis
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
            content: `You are an expert fiscal policy analyst specializing in African sovereign debt analysis. 
You use reinforcement learning principles to analyze historical trends and project future fiscal trajectories.
Provide precise, data-driven predictions and actionable policy recommendations specific to individual countries.`,
          },
          {
            role: "user",
            content: `Perform a detailed fiscal analysis for ${countryName} and generate 5-year predictions.

HISTORICAL FISCAL DATA:
${JSON.stringify(historicalData, null, 2)}

LATEST DATA (${latestData.year}):
- Debt/GDP: ${latestData.debtToGDP}%
- GDP Growth: ${latestData.gdpGrowth}%
- Risk Score: ${latestData.riskScore}/100
- Inflation: ${latestData.inflationRate}%
- Fiscal Deficit: ${latestData.fiscalDeficit}%

Based on this data, provide your analysis in the following JSON format:
{
  "currentStatus": "Brief assessment of current fiscal health (1-2 sentences)",
  "riskAssessment": "Detailed risk assessment (2-3 sentences)",
  "predictions": [
    { "year": 2024, "debtToGDP": 65.5, "gdpGrowth": 3.2, "riskScore": 72, "inflationRate": 8.5 },
    { "year": 2025, "debtToGDP": 67.2, "gdpGrowth": 3.5, "riskScore": 70, "inflationRate": 7.8 },
    { "year": 2026, "debtToGDP": 68.8, "gdpGrowth": 3.8, "riskScore": 68, "inflationRate": 7.0 },
    { "year": 2027, "debtToGDP": 69.5, "gdpGrowth": 4.0, "riskScore": 65, "inflationRate": 6.5 },
    { "year": 2028, "debtToGDP": 70.0, "gdpGrowth": 4.2, "riskScore": 62, "inflationRate": 6.0 }
  ],
  "keyInsights": [
    "Key insight about debt trajectory",
    "Key insight about growth potential",
    "Key insight about risk factors"
  ],
  "recommendations": [
    "Specific policy recommendation 1",
    "Specific policy recommendation 2",
    "Specific policy recommendation 3"
  ]
}

Make predictions realistic based on historical trends. Consider:
1. Historical debt trajectory and growth patterns
2. Current risk level and potential for improvement
3. Regional economic factors
4. Global commodity prices impact (if relevant)
5. Structural reform potential`,
          },
        ],
        temperature: 0.6,
        max_tokens: 1500,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later.", success: false }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue.", success: false }),
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

    // Parse AI response
    let analysis;
    try {
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

    console.log(`Analysis complete for ${countryName}`);

    return new Response(
      JSON.stringify({
        success: true,
        countryName,
        currentStatus: analysis.currentStatus,
        riskAssessment: analysis.riskAssessment,
        predictions: analysis.predictions,
        keyInsights: analysis.keyInsights,
        recommendations: analysis.recommendations,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Country analysis error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
