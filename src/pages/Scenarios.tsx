import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ScenarioStressTest } from "@/components/dashboard/ScenarioStressTest";
import { PremiumInsight } from "@/components/dashboard/PremiumInsight";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fiscalScenarios } from "@/data/scenarioData";
import { Shield, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

const Scenarios = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Scenario Analysis
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Forward-looking stress tests and AI-powered query intelligence for comprehensive 
              fiscal risk assessment and policy planning.
            </p>
          </div>

          {/* Premium Insight - Top Feature */}
          <div className="mb-8">
            <PremiumInsight />
          </div>

          {/* Stress Test Module */}
          <div className="mb-8">
            <ScenarioStressTest />
          </div>

          {/* Scenario Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fiscalScenarios.slice(0, 4).map(scenario => (
              <Card key={scenario.id} variant="glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: scenario.color }}
                    />
                    {scenario.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{scenario.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Assumptions */}
                  <div>
                    <h5 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                      Key Assumptions
                    </h5>
                    <ul className="space-y-1">
                      {scenario.assumptions.slice(0, 3).map((assumption, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                          {assumption}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interpretations */}
                  <div>
                    <h5 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                      Key Interpretations
                    </h5>
                    <ul className="space-y-1">
                      {scenario.interpretations.slice(0, 2).map((interp, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          {scenario.id === 'optimistic' || scenario.id === 'reform' ? (
                            <CheckCircle2 className="h-3 w-3 mt-0.5 text-success flex-shrink-0" />
                          ) : scenario.id === 'highRisk' || scenario.id === 'adverse' ? (
                            <AlertTriangle className="h-3 w-3 mt-0.5 text-destructive flex-shrink-0" />
                          ) : (
                            <Shield className="h-3 w-3 mt-0.5 text-warning flex-shrink-0" />
                          )}
                          {interp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div className="pt-2 border-t border-border/50">
                    <h5 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">
                      Policy Response
                    </h5>
                    <ul className="space-y-1">
                      {scenario.recommendations.slice(0, 2).map((rec, idx) => (
                        <li key={idx} className="text-xs text-foreground font-medium flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Scenarios;
