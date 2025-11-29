import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Presentation, Sparkles, Shield } from "lucide-react";
import { fiscalScenarios } from "@/data/scenarioData";

export const ReportSection = () => {
  return (
    <section id="report" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Final Report & Presentation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive policy document and presentation materials for stakeholder briefings.
          </p>
        </div>

        {/* Report Content */}
        <Card variant="gradient" className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Executive Report: Paths to Fiscal Sustainability
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="space-y-6 text-foreground/90">
              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Africa's sovereign debt landscape has undergone significant transformation over the past decade. 
                  The continent's total public debt has more than tripled, rising from approximately $236 billion 
                  in 2010 to over $700 billion by 2023. This report presents a comprehensive analysis of fiscal 
                  sustainability across 15 major African economies, identifying risk factors, forecasting trajectories, 
                  and proposing actionable policy interventions.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">2. Data Sources & Methodology</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our analysis draws from IMF World Economic Outlook, World Bank International Debt Statistics, 
                  and African Development Bank databases. We employ a multi-stage analytical framework:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                  <li>Data normalization converting all indicators to % of GDP for comparability</li>
                  <li>K-Means clustering for risk classification across 6 fiscal dimensions</li>
                  <li>ARIMA/Prophet ensemble forecasting with 5-year projection horizon</li>
                  <li>Sensitivity analysis for key assumptions</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">3. Key Insights</h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <h4 className="font-semibold text-destructive mb-2">Critical Findings</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 3 countries (Zambia, Ghana, Egypt) in debt distress or restructuring</li>
                      <li>• Average debt-to-GDP ratio increased 18 percentage points since 2019</li>
                      <li>• External debt servicing consumes 30%+ of revenue in 5 countries</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <h4 className="font-semibold text-success mb-2">Positive Indicators</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Tanzania, Cameroon maintain sustainable debt levels (&lt;50% GDP)</li>
                      <li>• Ghana's IMF program showing early consolidation results</li>
                      <li>• Revenue mobilization improving in 8 of 15 countries</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">4. Risk Classification Summary</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our clustering algorithm classified countries into four risk tiers based on composite scores 
                  integrating debt levels, deficit dynamics, revenue volatility, and external exposure:
                </p>
                <div className="grid grid-cols-4 gap-2 mt-4">
                  <div className="text-center p-3 rounded bg-destructive/20">
                    <div className="font-bold text-destructive">Critical</div>
                    <div className="text-xs text-muted-foreground">Zambia, Egypt, Ghana</div>
                  </div>
                  <div className="text-center p-3 rounded bg-orange-500/20">
                    <div className="font-bold text-orange-400">High</div>
                    <div className="text-xs text-muted-foreground">Mozambique, Angola, Senegal, South Africa</div>
                  </div>
                  <div className="text-center p-3 rounded bg-warning/20">
                    <div className="font-bold text-warning">Medium</div>
                    <div className="text-xs text-muted-foreground">Kenya, Rwanda, Nigeria, Morocco, Ivory Coast</div>
                  </div>
                  <div className="text-center p-3 rounded bg-success/20">
                    <div className="font-bold text-success">Low</div>
                    <div className="text-xs text-muted-foreground">Ethiopia, Cameroon, Tanzania</div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">5. Forecast Highlights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our 5-year projections indicate divergent trajectories. Ghana and Egypt show potential 
                  improvement under current IMF programs, while Nigeria faces deteriorating fundamentals 
                  with debt-to-GDP projected to breach 60% by 2028. Key early warning indicators include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
                  <li>Nigeria: Revenue crisis persists; debt service to revenue ratio critical</li>
                  <li>Kenya: Eurobond rollover risk in 2024-2025</li>
                  <li>Angola: Vulnerable to oil price volatility</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">6. Policy Recommendations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Based on our analysis, we propose a tiered policy framework:
                </p>
                <ol className="list-decimal pl-6 text-muted-foreground space-y-2 mt-2">
                  <li><strong>Immediate (0-12 months):</strong> Debt transparency enhancement, hidden debt disclosure, creditor engagement</li>
                  <li><strong>Short-term (1-3 years):</strong> Fiscal rules implementation, domestic revenue mobilization, expenditure controls</li>
                  <li><strong>Medium-term (3-7 years):</strong> Local currency bond market development, sovereign wealth fund establishment, revenue diversification</li>
                </ol>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">7. Premium Query Intelligence Insight</h3>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">AI-Selected High-Impact Query</span>
                  </div>
                  <p className="text-sm italic text-foreground mb-3">
                    "Based on current trajectories, which 3 countries are most likely to require IMF intervention by 2026, 
                    and what early warning indicators support this?"
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    <strong className="text-foreground">Finding:</strong> Nigeria, Angola, and Kenya emerge as the highest 
                    probability candidates for IMF intervention. Nigeria's critical revenue-to-debt servicing ratio 
                    (debt service consuming 90%+ of federal revenue) makes its situation arithmetically unsustainable by mid-2025. 
                    Angola faces commodity-driven vulnerability with 85% export dependence on oil, while Kenya exhibits 
                    classic Eurobond rollover risk with $2B maturing in 2024-2025 and reserves covering only 3.8 months of imports.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">8. Stress Test Scenario Analysis</h3>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold">5-Year Fiscal Scenario Projections</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                    {fiscalScenarios.map(scenario => (
                      <div key={scenario.id} className="text-center p-2 rounded" style={{ backgroundColor: `${scenario.color}15` }}>
                        <div className="text-xs font-semibold" style={{ color: scenario.color }}>
                          {scenario.name.replace(' Scenario', '')}
                        </div>
                        <div className="text-lg font-mono font-bold text-foreground">
                          {scenario.projections[4].debtToGDP}%
                        </div>
                        <div className="text-xs text-muted-foreground">Debt/GDP 2028</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Our stress testing reveals significant divergence in fiscal outcomes. Under the <strong className="text-success">Reform Scenario</strong>, 
                    aggressive policy implementation could reduce average debt-to-GDP to 47.5% by 2028. Conversely, the <strong className="text-destructive">High-Risk Scenario</strong> projects 
                    debt levels exceeding 100% GDP, comparable to Latin America's 1980s debt crisis. The spread between best and worst 
                    outcomes (55+ percentage points) underscores the critical importance of policy choices in the coming years.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-foreground mb-3">9. Limitations & Future Work</h3>
                <p className="text-muted-foreground leading-relaxed">
                  This analysis is constrained by data availability gaps in several countries, 
                  particularly regarding contingent liabilities and state-owned enterprise debt. 
                  Future iterations should incorporate governance indicators (e.g., CPIA scores), 
                  climate vulnerability metrics, and real-time commodity price sensitivity analysis. 
                  The G20 Common Framework effectiveness remains under observation.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Presentation Outline */}
        <Card variant="gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Presentation className="h-5 w-5 text-accent" />
              Presentation Deck Outline (12 Slides)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { slide: 1, title: 'Title Slide', content: 'Project title, team, hackathon branding' },
                { slide: 2, title: 'Executive Summary', content: 'Key findings including stress test outcomes' },
                { slide: 3, title: 'The Challenge', content: 'Africa debt landscape context, problem statement' },
                { slide: 4, title: 'Data & Methodology', content: 'Sources, pipeline diagram, model overview' },
                { slide: 5, title: 'Continental Overview', content: 'Heatmap of debt levels, regional comparison chart' },
                { slide: 6, title: 'Risk Classification', content: 'Clustering results, top 10 at-risk table' },
                { slide: 7, title: 'Premium Query Insight', content: 'AI-selected analysis: IMF intervention probability' },
                { slide: 8, title: 'Stress Test Scenarios', content: '5 fiscal scenarios with debt trajectory bands' },
                { slide: 9, title: 'Deep Dive: Critical Cases', content: 'Nigeria, Angola, Kenya intervention risk profiles' },
                { slide: 10, title: 'Forecast Results', content: '5-year projection charts, scenario comparisons' },
                { slide: 11, title: 'Policy Recommendations', content: 'Scenario-informed tiered intervention framework' },
                { slide: 12, title: 'Conclusion & Q&A', content: 'Summary, reform pathway, next steps' },
              ].map((item) => (
                <div key={item.slide} className="flex gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="flex-shrink-0 w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-mono text-sm">
                    {item.slide}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
