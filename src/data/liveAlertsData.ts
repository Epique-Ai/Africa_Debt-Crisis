// Live alerts and updates data for real-time fiscal monitoring

export type AlertStatus = 'green' | 'yellow' | 'red';

export interface LiveAlert {
  id: string;
  date: string;
  country: string;
  metric: string;
  status: AlertStatus;
  insight: string;
  category: 'debt' | 'risk' | 'forecast' | 'policy' | 'market';
  isNew?: boolean;
}

export const liveAlerts: LiveAlert[] = [
  {
    id: 'alert-001',
    date: '2024-01-15',
    country: 'Ghana',
    metric: 'Debt Restructuring Progress',
    status: 'green',
    insight: 'IMF confirms $3B disbursement following successful completion of first review. Debt-to-GDP projected to decline 8pp by 2025.',
    category: 'policy',
    isNew: true,
  },
  {
    id: 'alert-002',
    date: '2024-01-14',
    country: 'Egypt',
    metric: 'Currency Pressure',
    status: 'red',
    insight: 'EGP depreciated 12% against USD in past 72 hours. Central bank intervention reserves depleted. IMF revision meeting scheduled.',
    category: 'market',
    isNew: true,
  },
  {
    id: 'alert-003',
    date: '2024-01-14',
    country: 'Kenya',
    metric: 'Eurobond Maturity',
    status: 'yellow',
    insight: '$2B Eurobond maturing in June 2024. Government exploring refinancing options amid elevated spreads (650bps over UST).',
    category: 'debt',
  },
  {
    id: 'alert-004',
    date: '2024-01-13',
    country: 'Zambia',
    metric: 'Debt Relief',
    status: 'green',
    insight: 'Common Framework restructuring finalized. Bilateral creditors agree to 40% NPV reduction. Copper revenues improving.',
    category: 'policy',
  },
  {
    id: 'alert-005',
    date: '2024-01-13',
    country: 'Nigeria',
    metric: 'Revenue Collection',
    status: 'yellow',
    insight: 'Q4 2023 tax revenue 15% below target. Subsidy removal savings partially offset by FX losses. FIRS reform implementation lagging.',
    category: 'risk',
  },
  {
    id: 'alert-006',
    date: '2024-01-12',
    country: 'Angola',
    metric: 'Oil Revenue Shock',
    status: 'red',
    insight: 'Brent crude dropped below $70/bbl threshold. Budget assumes $75/bbl. Fiscal gap estimated at 2.5% of GDP without adjustment.',
    category: 'forecast',
  },
  {
    id: 'alert-007',
    date: '2024-01-12',
    country: 'South Africa',
    metric: 'Credit Rating Watch',
    status: 'yellow',
    insight: 'Moody\'s maintains negative outlook. Eskom debt guarantees and low growth cited. February budget critical for rating trajectory.',
    category: 'risk',
  },
  {
    id: 'alert-008',
    date: '2024-01-11',
    country: 'Ethiopia',
    metric: 'G20 Common Framework',
    status: 'yellow',
    insight: 'Debt treatment negotiations ongoing. China Export-Import Bank signaling flexibility. IMF Extended Credit Facility on hold pending outcome.',
    category: 'policy',
  },
  {
    id: 'alert-009',
    date: '2024-01-11',
    country: 'Senegal',
    metric: 'Oil & Gas Revenue',
    status: 'green',
    insight: 'First oil from Sangomar field expected Q2 2024. Projected $1.2B annual revenue. Fiscal rules legislation pending parliamentary approval.',
    category: 'forecast',
  },
  {
    id: 'alert-010',
    date: '2024-01-10',
    country: 'Morocco',
    metric: 'Fiscal Consolidation',
    status: 'green',
    insight: 'Budget deficit narrowed to 4.5% of GDP in 2023, outperforming 5.1% target. Tourism revenues +28% YoY supporting recovery.',
    category: 'policy',
  },
  {
    id: 'alert-011',
    date: '2024-01-10',
    country: 'Mozambique',
    metric: 'LNG Project Risk',
    status: 'red',
    insight: 'TotalEnergies Mozambique LNG restart delayed to 2025. Hidden debt legacy constraining fiscal space. Security situation deteriorating.',
    category: 'risk',
  },
  {
    id: 'alert-012',
    date: '2024-01-09',
    country: 'Rwanda',
    metric: 'Growth Forecast',
    status: 'green',
    insight: 'IMF upgrades 2024 GDP growth forecast to 7.2% (from 6.5%). Services sector expansion and mining exports driving momentum.',
    category: 'forecast',
  },
];

export interface RLAgentForecast {
  country: string;
  metric: string;
  currentValue: number;
  forecast2024: number;
  forecast2025: number;
  confidence: number;
  trend: 'improving' | 'stable' | 'deteriorating';
  keyDrivers: string[];
}

export const rlForecasts: RLAgentForecast[] = [
  {
    country: 'Nigeria',
    metric: 'Debt/GDP',
    currentValue: 42.1,
    forecast2024: 45.8,
    forecast2025: 48.2,
    confidence: 78,
    trend: 'deteriorating',
    keyDrivers: ['Revenue shortfall', 'Currency depreciation', 'Increased borrowing'],
  },
  {
    country: 'Kenya',
    metric: 'Debt/GDP',
    currentValue: 70.5,
    forecast2024: 72.8,
    forecast2025: 71.5,
    confidence: 72,
    trend: 'stable',
    keyDrivers: ['Fiscal consolidation', 'IMF program targets', 'Shilling stabilization'],
  },
  {
    country: 'Ghana',
    metric: 'Debt/GDP',
    currentValue: 83.5,
    forecast2024: 78.2,
    forecast2025: 72.5,
    confidence: 85,
    trend: 'improving',
    keyDrivers: ['Debt restructuring', 'IMF conditionality', 'Primary surplus'],
  },
  {
    country: 'Egypt',
    metric: 'Debt/GDP',
    currentValue: 95.8,
    forecast2024: 98.5,
    forecast2025: 102.2,
    confidence: 65,
    trend: 'deteriorating',
    keyDrivers: ['High interest burden', 'Import compression', 'FX volatility'],
  },
  {
    country: 'South Africa',
    metric: 'Debt/GDP',
    currentValue: 73.4,
    forecast2024: 75.2,
    forecast2025: 76.8,
    confidence: 82,
    trend: 'deteriorating',
    keyDrivers: ['Low growth', 'SOE support', 'Wage bill pressure'],
  },
];

export interface DebtRepaymentSchedule {
  country: string;
  year: number;
  quarter: string;
  amount: number;
  currency: string;
  type: 'Eurobond' | 'Bilateral' | 'Multilateral' | 'Domestic';
  riskLevel: 'low' | 'medium' | 'high';
}

export const repaymentSchedule: DebtRepaymentSchedule[] = [
  { country: 'Kenya', year: 2024, quarter: 'Q2', amount: 2000, currency: 'USD', type: 'Eurobond', riskLevel: 'high' },
  { country: 'Nigeria', year: 2024, quarter: 'Q3', amount: 1500, currency: 'USD', type: 'Eurobond', riskLevel: 'medium' },
  { country: 'Egypt', year: 2024, quarter: 'Q1', amount: 3200, currency: 'USD', type: 'Bilateral', riskLevel: 'high' },
  { country: 'Ghana', year: 2024, quarter: 'Q4', amount: 800, currency: 'USD', type: 'Multilateral', riskLevel: 'low' },
  { country: 'South Africa', year: 2024, quarter: 'Q2', amount: 2500, currency: 'USD', type: 'Domestic', riskLevel: 'medium' },
  { country: 'Angola', year: 2024, quarter: 'Q3', amount: 1800, currency: 'USD', type: 'Bilateral', riskLevel: 'medium' },
  { country: 'Zambia', year: 2025, quarter: 'Q1', amount: 500, currency: 'USD', type: 'Multilateral', riskLevel: 'low' },
  { country: 'Senegal', year: 2024, quarter: 'Q4', amount: 650, currency: 'USD', type: 'Eurobond', riskLevel: 'medium' },
];
