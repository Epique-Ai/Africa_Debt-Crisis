// Stress Testing Scenarios and Query Intelligence Data

export type ScenarioType = 'baseline' | 'optimistic' | 'adverse' | 'highRisk' | 'reform';

export interface ScenarioProjection {
  year: number;
  gdpGrowth: number;
  inflation: number;
  unemployment: number;
  debtToGDP: number;
  fiscalRiskIndex: number;
}

export interface FiscalScenario {
  id: ScenarioType;
  name: string;
  description: string;
  color: string;
  assumptions: string[];
  projections: ScenarioProjection[];
  interpretations: string[];
  recommendations: string[];
}

export interface QueryType {
  category: 'Trend Analysis' | 'Risk Detection' | 'Forecasting' | 'Cross-country Comparison' | 'Fiscal Interpretation' | 'Data Quality';
  query: string;
  impactScore: number;
}

export interface PremiumInsight {
  query: QueryType;
  chartDescription: string;
  narrative: string;
  policyInterpretation: string;
}

// Sample analytical queries that would be found in a query CSV
export const sampleQueries: QueryType[] = [
  {
    category: 'Trend Analysis',
    query: 'Which African countries experienced the steepest debt-to-GDP acceleration between 2019-2023, and what common fiscal patterns preceded this trajectory?',
    impactScore: 85
  },
  {
    category: 'Risk Detection',
    query: 'Identify countries where debt servicing costs exceed 25% of government revenue and assess the probability of debt distress within 24 months.',
    impactScore: 92
  },
  {
    category: 'Forecasting',
    query: 'Based on current trajectories, which 3 countries are most likely to require IMF intervention by 2026, and what early warning indicators support this?',
    impactScore: 94
  },
  {
    category: 'Cross-country Comparison',
    query: 'Compare fiscal resilience between oil-dependent vs. diversified economies during the 2020-2022 commodity cycle.',
    impactScore: 88
  },
  {
    category: 'Fiscal Interpretation',
    query: 'What distinguishes countries that recovered fiscal balance post-2020 from those that continue to deteriorate?',
    impactScore: 90
  },
  {
    category: 'Data Quality',
    query: 'Identify potential hidden debt exposure by analyzing discrepancies between reported public debt and estimated contingent liabilities.',
    impactScore: 78
  }
];

// The strongest, most impactful query for Premium Insight
export const premiumInsight: PremiumInsight = {
  query: {
    category: 'Forecasting',
    query: 'Based on current trajectories, which 3 countries are most likely to require IMF intervention by 2026, and what early warning indicators support this?',
    impactScore: 94
  },
  chartDescription: 'Multi-line trajectory chart showing debt-to-GDP paths for Nigeria, Kenya, and Angola with IMF intervention threshold (85% GDP) marked. Confidence intervals widen beyond 2025, with Nigeria crossing the threshold earliest (Q2 2025), followed by Angola (Q4 2025) and Kenya (Q2 2026).',
  narrative: `Our predictive analysis identifies **Nigeria**, **Angola**, and **Kenya** as the three countries most likely to require IMF intervention by 2026. 

**Nigeria** presents the most urgent case: despite relatively low headline debt (42% GDP), the critical issue is the revenue-to-debt servicing ratio. With government revenue at just 7.8% of GDP—among the lowest globally—and debt service consuming over 90% of federal revenue, Nigeria faces an arithmetic impossibility. Current trajectories show this becoming unsustainable by mid-2025.

**Angola** faces commodity-driven volatility. The country's 68% debt-to-GDP appears manageable, but 72% of this is external, and 85% of export revenues derive from oil. A sustained oil price decline below $65/barrel would trigger a balance of payments crisis within 18 months.

**Kenya** exhibits classic Eurobond rollover risk. With $2 billion in Eurobonds maturing in 2024-2025 and foreign reserves covering only 3.8 months of imports, refinancing at current spreads (550+ bps) would push debt service beyond sustainable thresholds.`,
  policyInterpretation: `These findings have immediate policy implications:

1. **Pre-emptive engagement**: Rather than waiting for crisis, these countries should initiate preliminary discussions with IMF staff under Article IV frameworks to establish contingent support mechanisms.

2. **Revenue mobilization urgency**: Nigeria's case demonstrates that low debt-to-GDP ratios can mask severe fiscal stress when revenue bases are critically narrow. Tax administration reform is non-negotiable.

3. **Currency management**: All three countries face currency depreciation pressure. Managed float adjustments now are preferable to disorderly corrections during crisis.

4. **Creditor coordination**: Early engagement with Paris Club and private creditors through the G20 Common Framework should be considered before liquidity constraints force unfavorable terms.`
};

// Fiscal stress test scenarios
export const fiscalScenarios: FiscalScenario[] = [
  {
    id: 'baseline',
    name: 'Baseline Scenario',
    description: 'Status quo continuation: current policies maintained, moderate global growth, stable commodity prices.',
    color: 'hsl(var(--chart-3))',
    assumptions: [
      'Global GDP growth: 2.8% annually',
      'Oil prices: $75-85/barrel range',
      'No major policy changes',
      'Moderate inflation persistence (5-8%)',
      'Current debt restructuring programs continue'
    ],
    projections: [
      { year: 2024, gdpGrowth: 3.2, inflation: 12.5, unemployment: 8.2, debtToGDP: 67.8, fiscalRiskIndex: 58 },
      { year: 2025, gdpGrowth: 3.5, inflation: 10.2, unemployment: 7.9, debtToGDP: 69.2, fiscalRiskIndex: 60 },
      { year: 2026, gdpGrowth: 3.6, inflation: 8.8, unemployment: 7.6, debtToGDP: 70.5, fiscalRiskIndex: 61 },
      { year: 2027, gdpGrowth: 3.8, inflation: 7.5, unemployment: 7.4, debtToGDP: 71.2, fiscalRiskIndex: 62 },
      { year: 2028, gdpGrowth: 4.0, inflation: 6.8, unemployment: 7.2, debtToGDP: 71.8, fiscalRiskIndex: 62 }
    ],
    interpretations: [
      'Debt levels remain elevated but stable across most countries',
      'Gradual inflation normalization supports fiscal space recovery',
      '3 countries (Zambia, Ghana, Egypt) continue restructuring processes',
      'Revenue mobilization shows marginal improvement'
    ],
    recommendations: [
      'Maintain current IMF program commitments',
      'Accelerate domestic revenue mobilization reforms',
      'Build foreign exchange reserve buffers during stable periods',
      'Continue gradual fiscal consolidation'
    ]
  },
  {
    id: 'optimistic',
    name: 'Optimistic Scenario',
    description: 'Fiscal tightening + growth recovery: successful reforms, favorable global conditions, investment inflows.',
    color: 'hsl(var(--success))',
    assumptions: [
      'Global GDP growth: 3.5% annually',
      'Commodity supercycle benefits Africa',
      'Tax reforms yield 2-3% GDP additional revenue',
      'FDI recovery to pre-pandemic levels',
      'Successful debt restructurings unlock market access'
    ],
    projections: [
      { year: 2024, gdpGrowth: 4.2, inflation: 11.0, unemployment: 7.8, debtToGDP: 65.5, fiscalRiskIndex: 52 },
      { year: 2025, gdpGrowth: 4.8, inflation: 8.5, unemployment: 7.2, debtToGDP: 62.8, fiscalRiskIndex: 46 },
      { year: 2026, gdpGrowth: 5.2, inflation: 6.5, unemployment: 6.8, debtToGDP: 59.5, fiscalRiskIndex: 42 },
      { year: 2027, gdpGrowth: 5.5, inflation: 5.5, unemployment: 6.4, debtToGDP: 56.2, fiscalRiskIndex: 38 },
      { year: 2028, gdpGrowth: 5.8, inflation: 5.0, unemployment: 6.0, debtToGDP: 53.0, fiscalRiskIndex: 35 }
    ],
    interpretations: [
      'Debt-to-GDP ratios decline materially across most economies',
      'Fiscal risk index drops to sustainable levels by 2027',
      'Market access restored for restructured sovereigns',
      'Virtuous cycle: growth → revenue → debt reduction'
    ],
    recommendations: [
      'Lock in favorable financing terms during market access windows',
      'Establish sovereign wealth/stabilization funds',
      'Invest productivity gains into human capital',
      'Maintain fiscal discipline despite improved conditions'
    ]
  },
  {
    id: 'adverse',
    name: 'Adverse Scenario',
    description: 'Commodity shock + inflation spike: oil/mineral price collapse, global stagflation, capital flight.',
    color: 'hsl(var(--warning))',
    assumptions: [
      'Global recession: GDP growth 0.5%',
      'Oil prices collapse to $50/barrel',
      'Inflation surge to 15-25% in vulnerable economies',
      'Portfolio outflows: $15B from African markets',
      'Currency depreciation 20-40% in frontier markets'
    ],
    projections: [
      { year: 2024, gdpGrowth: 1.8, inflation: 18.5, unemployment: 9.5, debtToGDP: 72.5, fiscalRiskIndex: 68 },
      { year: 2025, gdpGrowth: 1.2, inflation: 22.0, unemployment: 11.2, debtToGDP: 78.8, fiscalRiskIndex: 75 },
      { year: 2026, gdpGrowth: 0.8, inflation: 18.5, unemployment: 12.5, debtToGDP: 84.2, fiscalRiskIndex: 80 },
      { year: 2027, gdpGrowth: 2.0, inflation: 14.0, unemployment: 11.8, debtToGDP: 86.5, fiscalRiskIndex: 78 },
      { year: 2028, gdpGrowth: 2.8, inflation: 10.5, unemployment: 10.5, debtToGDP: 85.8, fiscalRiskIndex: 74 }
    ],
    interpretations: [
      '5-7 additional countries enter debt distress',
      'Oil exporters face twin fiscal and external shocks',
      'Social spending cuts trigger political instability',
      'Recovery delayed until 2028 at earliest'
    ],
    recommendations: [
      'Activate IMF emergency financing facilities',
      'Implement targeted social protection programs',
      'Negotiate creditor standstills under Common Framework',
      'Prioritize essential imports through forex rationing'
    ]
  },
  {
    id: 'highRisk',
    name: 'High-Risk Scenario',
    description: 'Debt-servicing pressure + GDP decline: compounding stress from multiple simultaneous shocks.',
    color: 'hsl(var(--destructive))',
    assumptions: [
      'Synchronized sovereign defaults in 3+ countries',
      'Contagion effects across African bond markets',
      'Complete loss of market access for frontier economies',
      'Humanitarian crisis in conflict-affected regions',
      'Climate shocks compound fiscal stress'
    ],
    projections: [
      { year: 2024, gdpGrowth: 0.5, inflation: 25.0, unemployment: 12.0, debtToGDP: 78.5, fiscalRiskIndex: 78 },
      { year: 2025, gdpGrowth: -1.5, inflation: 32.0, unemployment: 15.5, debtToGDP: 92.5, fiscalRiskIndex: 88 },
      { year: 2026, gdpGrowth: -2.2, inflation: 28.0, unemployment: 18.0, debtToGDP: 105.2, fiscalRiskIndex: 94 },
      { year: 2027, gdpGrowth: 0.5, inflation: 22.0, unemployment: 16.5, debtToGDP: 108.5, fiscalRiskIndex: 92 },
      { year: 2028, gdpGrowth: 1.8, inflation: 15.0, unemployment: 14.0, debtToGDP: 102.8, fiscalRiskIndex: 85 }
    ],
    interpretations: [
      'Regional debt crisis comparable to Latin America 1980s',
      'Decade of lost development progress',
      'Mass migration pressures on stable neighbors',
      'International intervention becomes unavoidable'
    ],
    recommendations: [
      'Emergency G20/Paris Club intervention required',
      'Debt cancellation for HIPC-eligible countries',
      'Establish African Monetary Fund proposals gain traction',
      'Massive humanitarian aid mobilization'
    ]
  },
  {
    id: 'reform',
    name: 'Reform Scenario',
    description: 'Policy improvements + investment inflows: comprehensive reform agenda, governance improvements, strategic investments.',
    color: 'hsl(var(--primary))',
    assumptions: [
      'Tax administration digitization yields 3% GDP',
      'SOE reforms reduce contingent liabilities',
      'AfCFTA implementation boosts intra-African trade',
      'Green transition investments attract $50B+',
      'Governance indicators improve by 15%'
    ],
    projections: [
      { year: 2024, gdpGrowth: 3.8, inflation: 10.5, unemployment: 8.0, debtToGDP: 66.0, fiscalRiskIndex: 54 },
      { year: 2025, gdpGrowth: 4.5, inflation: 8.0, unemployment: 7.4, debtToGDP: 63.2, fiscalRiskIndex: 48 },
      { year: 2026, gdpGrowth: 5.5, inflation: 6.2, unemployment: 6.8, debtToGDP: 58.5, fiscalRiskIndex: 42 },
      { year: 2027, gdpGrowth: 6.2, inflation: 5.0, unemployment: 6.2, debtToGDP: 52.8, fiscalRiskIndex: 36 },
      { year: 2028, gdpGrowth: 6.8, inflation: 4.5, unemployment: 5.5, debtToGDP: 47.5, fiscalRiskIndex: 30 }
    ],
    interpretations: [
      'Transformative fiscal consolidation achieved',
      'Africa becomes emerging market success story',
      'Debt sustainability restored across the continent',
      'Strong foundation for inclusive growth'
    ],
    recommendations: [
      'Institutionalize fiscal rules in national legislation',
      'Establish independent fiscal councils',
      'Develop local currency bond markets aggressively',
      'Create continental reserve-sharing mechanisms'
    ]
  }
];

// Helper function to get scenario by ID
export const getScenarioById = (id: ScenarioType): FiscalScenario | undefined => {
  return fiscalScenarios.find(s => s.id === id);
};

// Aggregate scenario comparison data for charts
export const getScenarioComparisonData = () => {
  const years = [2024, 2025, 2026, 2027, 2028];
  return years.map(year => {
    const result: Record<string, number | string> = { year: year.toString() };
    fiscalScenarios.forEach(scenario => {
      const projection = scenario.projections.find(p => p.year === year);
      if (projection) {
        result[`${scenario.id}_debtToGDP`] = projection.debtToGDP;
        result[`${scenario.id}_gdpGrowth`] = projection.gdpGrowth;
        result[`${scenario.id}_fiscalRiskIndex`] = projection.fiscalRiskIndex;
      }
    });
    return result;
  });
};
