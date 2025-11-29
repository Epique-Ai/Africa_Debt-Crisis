import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Presentation } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                <h3 className="text-xl font-semibold text-foreground mb-3">7. Limitations & Future Work</h3>
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
                { slide: 2, title: 'Executive Summary', content: 'Key findings in 3 bullet points' },
                { slide: 3, title: 'The Challenge', content: 'Africa debt landscape context, problem statement' },
                { slide: 4, title: 'Data & Methodology', content: 'Sources, pipeline diagram, model overview' },
                { slide: 5, title: 'Continental Overview', content: 'Heatmap of debt levels, regional comparison chart' },
                { slide: 6, title: 'Risk Classification', content: 'Clustering results, top 10 at-risk table' },
                { slide: 7, title: 'Deep Dive: Critical Cases', content: 'Zambia, Ghana, Egypt profiles' },
                { slide: 8, title: 'Forecast Results', content: '5-year projection charts, early warnings' },
                { slide: 9, title: 'Key Drivers Analysis', content: 'Revenue volatility, expenditure growth, external exposure' },
                { slide: 10, title: 'Policy Recommendations', content: 'Tiered intervention framework' },
                { slide: 11, title: 'Dashboard Demo', content: 'Live walkthrough of interactive tool' },
                { slide: 12, title: 'Conclusion & Q&A', content: 'Summary, limitations, next steps' },
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
