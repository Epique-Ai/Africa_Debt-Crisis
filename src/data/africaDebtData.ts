// Simulated dataset for Africa's Sovereign Debt Analysis
// Structure mirrors typical IMF/World Bank fiscal indicators

export interface CountryData {
  country: string;
  region: string;
  code: string;
  years: YearData[];
}

export interface YearData {
  year: number;
  debtToGDP: number;
  deficitToGDP: number;
  revenueToGDP: number;
  expenditureToGDP: number;
  revenueGrowth: number;
  gdpGrowth: number;
  inflationRate: number;
  externalDebtShare: number;
}

export interface RiskClassification {
  country: string;
  code: string;
  region: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  debtToGDP: number;
  deficitToGDP: number;
  revenueVolatility: number;
  drivers: string[];
}

export const regions = ['East Africa', 'West Africa', 'Central Africa', 'Southern Africa', 'North Africa'];

export const africaCountries: CountryData[] = [
  {
    country: 'Nigeria',
    region: 'West Africa',
    code: 'NGA',
    years: [
      { year: 2019, debtToGDP: 29.1, deficitToGDP: -4.3, revenueToGDP: 7.2, expenditureToGDP: 11.5, revenueGrowth: 2.1, gdpGrowth: 2.2, inflationRate: 11.4, externalDebtShare: 32.5 },
      { year: 2020, debtToGDP: 34.5, deficitToGDP: -5.8, revenueToGDP: 6.3, expenditureToGDP: 12.1, revenueGrowth: -12.5, gdpGrowth: -1.8, inflationRate: 13.2, externalDebtShare: 35.2 },
      { year: 2021, debtToGDP: 36.9, deficitToGDP: -6.1, revenueToGDP: 7.5, expenditureToGDP: 13.6, revenueGrowth: 19.0, gdpGrowth: 3.6, inflationRate: 17.0, externalDebtShare: 38.1 },
      { year: 2022, debtToGDP: 38.2, deficitToGDP: -5.2, revenueToGDP: 8.1, expenditureToGDP: 13.3, revenueGrowth: 8.0, gdpGrowth: 3.3, inflationRate: 18.8, externalDebtShare: 39.5 },
      { year: 2023, debtToGDP: 42.1, deficitToGDP: -6.4, revenueToGDP: 7.8, expenditureToGDP: 14.2, revenueGrowth: -3.7, gdpGrowth: 2.9, inflationRate: 24.7, externalDebtShare: 41.2 },
    ]
  },
  {
    country: 'South Africa',
    region: 'Southern Africa',
    code: 'ZAF',
    years: [
      { year: 2019, debtToGDP: 62.2, deficitToGDP: -5.3, revenueToGDP: 26.1, expenditureToGDP: 31.4, revenueGrowth: 4.2, gdpGrowth: 0.3, inflationRate: 4.1, externalDebtShare: 45.3 },
      { year: 2020, debtToGDP: 77.1, deficitToGDP: -9.7, revenueToGDP: 23.8, expenditureToGDP: 33.5, revenueGrowth: -8.8, gdpGrowth: -6.3, inflationRate: 3.3, externalDebtShare: 48.7 },
      { year: 2021, debtToGDP: 69.9, deficitToGDP: -5.7, revenueToGDP: 26.5, expenditureToGDP: 32.2, revenueGrowth: 11.3, gdpGrowth: 4.9, inflationRate: 4.5, externalDebtShare: 46.2 },
      { year: 2022, debtToGDP: 71.1, deficitToGDP: -4.9, revenueToGDP: 27.2, expenditureToGDP: 32.1, revenueGrowth: 2.6, gdpGrowth: 1.9, inflationRate: 6.9, externalDebtShare: 44.8 },
      { year: 2023, debtToGDP: 73.4, deficitToGDP: -5.8, revenueToGDP: 26.8, expenditureToGDP: 32.6, revenueGrowth: -1.5, gdpGrowth: 0.6, inflationRate: 5.9, externalDebtShare: 45.5 },
    ]
  },
  {
    country: 'Kenya',
    region: 'East Africa',
    code: 'KEN',
    years: [
      { year: 2019, debtToGDP: 59.1, deficitToGDP: -7.4, revenueToGDP: 17.8, expenditureToGDP: 25.2, revenueGrowth: 8.5, gdpGrowth: 5.4, inflationRate: 5.2, externalDebtShare: 52.3 },
      { year: 2020, debtToGDP: 65.6, deficitToGDP: -8.0, revenueToGDP: 16.2, expenditureToGDP: 24.2, revenueGrowth: -9.0, gdpGrowth: -0.3, inflationRate: 5.3, externalDebtShare: 54.8 },
      { year: 2021, debtToGDP: 67.7, deficitToGDP: -8.1, revenueToGDP: 17.1, expenditureToGDP: 25.2, revenueGrowth: 5.6, gdpGrowth: 7.5, inflationRate: 6.1, externalDebtShare: 53.2 },
      { year: 2022, debtToGDP: 68.2, deficitToGDP: -6.2, revenueToGDP: 17.9, expenditureToGDP: 24.1, revenueGrowth: 4.7, gdpGrowth: 4.8, inflationRate: 7.6, externalDebtShare: 51.9 },
      { year: 2023, debtToGDP: 70.5, deficitToGDP: -5.5, revenueToGDP: 18.2, expenditureToGDP: 23.7, revenueGrowth: 1.7, gdpGrowth: 5.0, inflationRate: 6.6, externalDebtShare: 52.5 },
    ]
  },
  {
    country: 'Egypt',
    region: 'North Africa',
    code: 'EGY',
    years: [
      { year: 2019, debtToGDP: 84.2, deficitToGDP: -8.0, revenueToGDP: 17.8, expenditureToGDP: 25.8, revenueGrowth: 15.2, gdpGrowth: 5.6, inflationRate: 9.2, externalDebtShare: 35.8 },
      { year: 2020, debtToGDP: 87.3, deficitToGDP: -7.9, revenueToGDP: 16.9, expenditureToGDP: 24.8, revenueGrowth: -5.1, gdpGrowth: 3.6, inflationRate: 5.1, externalDebtShare: 38.2 },
      { year: 2021, debtToGDP: 89.2, deficitToGDP: -6.7, revenueToGDP: 17.2, expenditureToGDP: 23.9, revenueGrowth: 1.8, gdpGrowth: 3.3, inflationRate: 5.2, externalDebtShare: 36.5 },
      { year: 2022, debtToGDP: 92.8, deficitToGDP: -6.1, revenueToGDP: 17.5, expenditureToGDP: 23.6, revenueGrowth: 1.7, gdpGrowth: 6.7, inflationRate: 13.8, externalDebtShare: 41.2 },
      { year: 2023, debtToGDP: 95.8, deficitToGDP: -6.0, revenueToGDP: 16.8, expenditureToGDP: 22.8, revenueGrowth: -4.0, gdpGrowth: 3.8, inflationRate: 33.9, externalDebtShare: 44.5 },
    ]
  },
  {
    country: 'Ghana',
    region: 'West Africa',
    code: 'GHA',
    years: [
      { year: 2019, debtToGDP: 62.4, deficitToGDP: -7.3, revenueToGDP: 13.5, expenditureToGDP: 20.8, revenueGrowth: 7.8, gdpGrowth: 6.5, inflationRate: 7.9, externalDebtShare: 48.2 },
      { year: 2020, debtToGDP: 76.1, deficitToGDP: -15.2, revenueToGDP: 11.8, expenditureToGDP: 27.0, revenueGrowth: -12.6, gdpGrowth: 0.5, inflationRate: 9.9, externalDebtShare: 52.3 },
      { year: 2021, debtToGDP: 78.9, deficitToGDP: -12.0, revenueToGDP: 13.2, expenditureToGDP: 25.2, revenueGrowth: 11.9, gdpGrowth: 5.1, inflationRate: 10.0, externalDebtShare: 54.8 },
      { year: 2022, debtToGDP: 88.1, deficitToGDP: -9.2, revenueToGDP: 12.8, expenditureToGDP: 22.0, revenueGrowth: -3.0, gdpGrowth: 3.1, inflationRate: 31.3, externalDebtShare: 58.2 },
      { year: 2023, debtToGDP: 83.5, deficitToGDP: -5.0, revenueToGDP: 14.2, expenditureToGDP: 19.2, revenueGrowth: 10.9, gdpGrowth: 2.8, inflationRate: 40.0, externalDebtShare: 55.5 },
    ]
  },
  {
    country: 'Ethiopia',
    region: 'East Africa',
    code: 'ETH',
    years: [
      { year: 2019, debtToGDP: 54.1, deficitToGDP: -2.5, revenueToGDP: 11.2, expenditureToGDP: 13.7, revenueGrowth: 12.3, gdpGrowth: 9.0, inflationRate: 15.8, externalDebtShare: 58.2 },
      { year: 2020, debtToGDP: 55.4, deficitToGDP: -2.8, revenueToGDP: 10.1, expenditureToGDP: 12.9, revenueGrowth: -9.8, gdpGrowth: 6.1, inflationRate: 20.4, externalDebtShare: 59.8 },
      { year: 2021, debtToGDP: 52.2, deficitToGDP: -3.1, revenueToGDP: 10.5, expenditureToGDP: 13.6, revenueGrowth: 4.0, gdpGrowth: 6.3, inflationRate: 26.8, externalDebtShare: 57.5 },
      { year: 2022, debtToGDP: 49.8, deficitToGDP: -3.5, revenueToGDP: 9.8, expenditureToGDP: 13.3, revenueGrowth: -6.7, gdpGrowth: 6.4, inflationRate: 33.9, externalDebtShare: 55.2 },
      { year: 2023, debtToGDP: 45.2, deficitToGDP: -3.2, revenueToGDP: 10.2, expenditureToGDP: 13.4, revenueGrowth: 4.1, gdpGrowth: 7.2, inflationRate: 28.7, externalDebtShare: 52.8 },
    ]
  },
  {
    country: 'Morocco',
    region: 'North Africa',
    code: 'MAR',
    years: [
      { year: 2019, debtToGDP: 65.2, deficitToGDP: -3.6, revenueToGDP: 23.1, expenditureToGDP: 26.7, revenueGrowth: 3.2, gdpGrowth: 2.5, inflationRate: 0.2, externalDebtShare: 32.5 },
      { year: 2020, debtToGDP: 76.4, deficitToGDP: -7.6, revenueToGDP: 21.8, expenditureToGDP: 29.4, revenueGrowth: -5.6, gdpGrowth: -7.2, inflationRate: 0.7, externalDebtShare: 35.8 },
      { year: 2021, debtToGDP: 68.9, deficitToGDP: -5.9, revenueToGDP: 22.5, expenditureToGDP: 28.4, revenueGrowth: 3.2, gdpGrowth: 8.0, inflationRate: 1.4, externalDebtShare: 34.2 },
      { year: 2022, debtToGDP: 71.5, deficitToGDP: -5.1, revenueToGDP: 24.2, expenditureToGDP: 29.3, revenueGrowth: 7.6, gdpGrowth: 1.3, inflationRate: 6.6, externalDebtShare: 33.5 },
      { year: 2023, debtToGDP: 69.5, deficitToGDP: -4.5, revenueToGDP: 24.8, expenditureToGDP: 29.3, revenueGrowth: 2.5, gdpGrowth: 3.0, inflationRate: 6.1, externalDebtShare: 32.8 },
    ]
  },
  {
    country: 'Tanzania',
    region: 'East Africa',
    code: 'TZA',
    years: [
      { year: 2019, debtToGDP: 38.2, deficitToGDP: -2.1, revenueToGDP: 14.8, expenditureToGDP: 16.9, revenueGrowth: 9.5, gdpGrowth: 7.0, inflationRate: 3.4, externalDebtShare: 68.5 },
      { year: 2020, debtToGDP: 40.8, deficitToGDP: -2.6, revenueToGDP: 13.5, expenditureToGDP: 16.1, revenueGrowth: -8.8, gdpGrowth: 4.8, inflationRate: 3.3, externalDebtShare: 70.2 },
      { year: 2021, debtToGDP: 41.5, deficitToGDP: -3.1, revenueToGDP: 14.2, expenditureToGDP: 17.3, revenueGrowth: 5.2, gdpGrowth: 4.3, inflationRate: 3.7, externalDebtShare: 69.8 },
      { year: 2022, debtToGDP: 42.3, deficitToGDP: -3.5, revenueToGDP: 14.8, expenditureToGDP: 18.3, revenueGrowth: 4.2, gdpGrowth: 4.7, inflationRate: 4.3, externalDebtShare: 68.5 },
      { year: 2023, debtToGDP: 43.1, deficitToGDP: -3.8, revenueToGDP: 15.2, expenditureToGDP: 19.0, revenueGrowth: 2.7, gdpGrowth: 5.1, inflationRate: 4.0, externalDebtShare: 67.2 },
    ]
  },
  {
    country: 'Zambia',
    region: 'Southern Africa',
    code: 'ZMB',
    years: [
      { year: 2019, debtToGDP: 91.2, deficitToGDP: -8.5, revenueToGDP: 18.2, expenditureToGDP: 26.7, revenueGrowth: 5.2, gdpGrowth: 1.4, inflationRate: 9.8, externalDebtShare: 62.5 },
      { year: 2020, debtToGDP: 140.8, deficitToGDP: -13.2, revenueToGDP: 16.5, expenditureToGDP: 29.7, revenueGrowth: -9.3, gdpGrowth: -2.8, inflationRate: 15.7, externalDebtShare: 68.2 },
      { year: 2021, debtToGDP: 127.5, deficitToGDP: -7.8, revenueToGDP: 18.2, expenditureToGDP: 26.0, revenueGrowth: 10.3, gdpGrowth: 4.6, inflationRate: 22.0, externalDebtShare: 65.8 },
      { year: 2022, debtToGDP: 108.2, deficitToGDP: -6.5, revenueToGDP: 19.5, expenditureToGDP: 26.0, revenueGrowth: 7.1, gdpGrowth: 4.7, inflationRate: 11.0, externalDebtShare: 62.5 },
      { year: 2023, debtToGDP: 95.5, deficitToGDP: -5.8, revenueToGDP: 20.2, expenditureToGDP: 26.0, revenueGrowth: 3.6, gdpGrowth: 4.3, inflationRate: 10.8, externalDebtShare: 60.2 },
    ]
  },
  {
    country: 'Angola',
    region: 'Southern Africa',
    code: 'AGO',
    years: [
      { year: 2019, debtToGDP: 107.5, deficitToGDP: 0.8, revenueToGDP: 22.5, expenditureToGDP: 21.7, revenueGrowth: -8.2, gdpGrowth: -0.7, inflationRate: 17.1, externalDebtShare: 72.5 },
      { year: 2020, debtToGDP: 134.2, deficitToGDP: -4.0, revenueToGDP: 18.2, expenditureToGDP: 22.2, revenueGrowth: -19.1, gdpGrowth: -5.6, inflationRate: 22.3, externalDebtShare: 78.2 },
      { year: 2021, debtToGDP: 86.8, deficitToGDP: 3.2, revenueToGDP: 23.8, expenditureToGDP: 20.6, revenueGrowth: 30.8, gdpGrowth: 1.1, inflationRate: 25.7, externalDebtShare: 75.5 },
      { year: 2022, debtToGDP: 66.5, deficitToGDP: 3.8, revenueToGDP: 26.2, expenditureToGDP: 22.4, revenueGrowth: 10.1, gdpGrowth: 3.0, inflationRate: 21.4, externalDebtShare: 70.2 },
      { year: 2023, debtToGDP: 68.2, deficitToGDP: -0.5, revenueToGDP: 21.5, expenditureToGDP: 22.0, revenueGrowth: -17.9, gdpGrowth: 0.5, inflationRate: 13.6, externalDebtShare: 68.5 },
    ]
  },
  {
    country: 'Mozambique',
    region: 'Southern Africa',
    code: 'MOZ',
    years: [
      { year: 2019, debtToGDP: 108.2, deficitToGDP: -1.8, revenueToGDP: 27.5, expenditureToGDP: 29.3, revenueGrowth: 5.2, gdpGrowth: 2.3, inflationRate: 2.8, externalDebtShare: 85.2 },
      { year: 2020, debtToGDP: 128.5, deficitToGDP: -5.5, revenueToGDP: 24.2, expenditureToGDP: 29.7, revenueGrowth: -12.0, gdpGrowth: -1.2, inflationRate: 3.1, externalDebtShare: 88.5 },
      { year: 2021, debtToGDP: 101.2, deficitToGDP: -4.2, revenueToGDP: 25.8, expenditureToGDP: 30.0, revenueGrowth: 6.6, gdpGrowth: 2.4, inflationRate: 6.4, externalDebtShare: 86.2 },
      { year: 2022, debtToGDP: 96.5, deficitToGDP: -3.5, revenueToGDP: 26.5, expenditureToGDP: 30.0, revenueGrowth: 2.7, gdpGrowth: 4.2, inflationRate: 10.3, externalDebtShare: 84.5 },
      { year: 2023, debtToGDP: 92.8, deficitToGDP: -4.8, revenueToGDP: 25.8, expenditureToGDP: 30.6, revenueGrowth: -2.6, gdpGrowth: 5.0, inflationRate: 7.1, externalDebtShare: 82.8 },
    ]
  },
  {
    country: 'Senegal',
    region: 'West Africa',
    code: 'SEN',
    years: [
      { year: 2019, debtToGDP: 64.2, deficitToGDP: -3.9, revenueToGDP: 20.5, expenditureToGDP: 24.4, revenueGrowth: 8.5, gdpGrowth: 4.4, inflationRate: 1.0, externalDebtShare: 72.5 },
      { year: 2020, debtToGDP: 73.2, deficitToGDP: -6.4, revenueToGDP: 18.8, expenditureToGDP: 25.2, revenueGrowth: -8.3, gdpGrowth: 1.3, inflationRate: 2.5, externalDebtShare: 75.8 },
      { year: 2021, debtToGDP: 75.5, deficitToGDP: -6.3, revenueToGDP: 19.5, expenditureToGDP: 25.8, revenueGrowth: 3.7, gdpGrowth: 6.5, inflationRate: 2.2, externalDebtShare: 74.2 },
      { year: 2022, debtToGDP: 76.8, deficitToGDP: -6.2, revenueToGDP: 20.2, expenditureToGDP: 26.4, revenueGrowth: 3.6, gdpGrowth: 4.2, inflationRate: 9.7, externalDebtShare: 73.5 },
      { year: 2023, debtToGDP: 78.2, deficitToGDP: -5.5, revenueToGDP: 21.5, expenditureToGDP: 27.0, revenueGrowth: 6.4, gdpGrowth: 4.6, inflationRate: 5.9, externalDebtShare: 72.8 },
    ]
  },
  {
    country: 'Cameroon',
    region: 'Central Africa',
    code: 'CMR',
    years: [
      { year: 2019, debtToGDP: 42.5, deficitToGDP: -3.2, revenueToGDP: 15.2, expenditureToGDP: 18.4, revenueGrowth: 6.2, gdpGrowth: 3.7, inflationRate: 2.5, externalDebtShare: 58.5 },
      { year: 2020, debtToGDP: 45.8, deficitToGDP: -3.5, revenueToGDP: 13.8, expenditureToGDP: 17.3, revenueGrowth: -9.2, gdpGrowth: 0.5, inflationRate: 2.4, externalDebtShare: 62.2 },
      { year: 2021, debtToGDP: 46.2, deficitToGDP: -3.0, revenueToGDP: 14.5, expenditureToGDP: 17.5, revenueGrowth: 5.1, gdpGrowth: 3.6, inflationRate: 2.3, externalDebtShare: 60.5 },
      { year: 2022, debtToGDP: 45.5, deficitToGDP: -2.5, revenueToGDP: 15.2, expenditureToGDP: 17.7, revenueGrowth: 4.8, gdpGrowth: 3.8, inflationRate: 6.3, externalDebtShare: 58.8 },
      { year: 2023, debtToGDP: 44.8, deficitToGDP: -2.8, revenueToGDP: 15.8, expenditureToGDP: 18.6, revenueGrowth: 3.9, gdpGrowth: 4.2, inflationRate: 7.2, externalDebtShare: 57.5 },
    ]
  },
  {
    country: 'Ivory Coast',
    region: 'West Africa',
    code: 'CIV',
    years: [
      { year: 2019, debtToGDP: 38.5, deficitToGDP: -2.3, revenueToGDP: 15.2, expenditureToGDP: 17.5, revenueGrowth: 9.5, gdpGrowth: 6.2, inflationRate: 0.8, externalDebtShare: 62.5 },
      { year: 2020, debtToGDP: 47.8, deficitToGDP: -5.6, revenueToGDP: 14.5, expenditureToGDP: 20.1, revenueGrowth: -4.6, gdpGrowth: 1.8, inflationRate: 2.4, externalDebtShare: 65.8 },
      { year: 2021, debtToGDP: 51.2, deficitToGDP: -5.0, revenueToGDP: 15.2, expenditureToGDP: 20.2, revenueGrowth: 4.8, gdpGrowth: 7.0, inflationRate: 4.2, externalDebtShare: 64.2 },
      { year: 2022, debtToGDP: 56.8, deficitToGDP: -6.5, revenueToGDP: 15.5, expenditureToGDP: 22.0, revenueGrowth: 2.0, gdpGrowth: 6.7, inflationRate: 5.2, externalDebtShare: 63.5 },
      { year: 2023, debtToGDP: 58.2, deficitToGDP: -5.2, revenueToGDP: 16.2, expenditureToGDP: 21.4, revenueGrowth: 4.5, gdpGrowth: 6.5, inflationRate: 4.5, externalDebtShare: 62.8 },
    ]
  },
  {
    country: 'Rwanda',
    region: 'East Africa',
    code: 'RWA',
    years: [
      { year: 2019, debtToGDP: 56.8, deficitToGDP: -6.5, revenueToGDP: 23.5, expenditureToGDP: 30.0, revenueGrowth: 12.5, gdpGrowth: 9.4, inflationRate: 2.4, externalDebtShare: 75.5 },
      { year: 2020, debtToGDP: 71.2, deficitToGDP: -9.5, revenueToGDP: 21.8, expenditureToGDP: 31.3, revenueGrowth: -7.2, gdpGrowth: -3.4, inflationRate: 7.7, externalDebtShare: 78.2 },
      { year: 2021, debtToGDP: 73.5, deficitToGDP: -7.8, revenueToGDP: 23.5, expenditureToGDP: 31.3, revenueGrowth: 7.8, gdpGrowth: 10.9, inflationRate: 0.8, externalDebtShare: 76.5 },
      { year: 2022, debtToGDP: 71.8, deficitToGDP: -7.2, revenueToGDP: 24.2, expenditureToGDP: 31.4, revenueGrowth: 3.0, gdpGrowth: 8.2, inflationRate: 13.9, externalDebtShare: 74.8 },
      { year: 2023, debtToGDP: 69.5, deficitToGDP: -6.8, revenueToGDP: 24.8, expenditureToGDP: 31.6, revenueGrowth: 2.5, gdpGrowth: 7.0, inflationRate: 12.2, externalDebtShare: 73.2 },
    ]
  },
];

// Risk classification data
export const riskClassifications: RiskClassification[] = [
  { country: 'Zambia', code: 'ZMB', region: 'Southern Africa', riskScore: 92, riskLevel: 'Critical', debtToGDP: 95.5, deficitToGDP: -5.8, revenueVolatility: 18.5, drivers: ['Debt restructuring', 'Copper price dependency', 'High external debt'] },
  { country: 'Egypt', code: 'EGY', region: 'North Africa', riskScore: 88, riskLevel: 'Critical', debtToGDP: 95.8, deficitToGDP: -6.0, revenueVolatility: 12.2, drivers: ['Currency devaluation', 'High inflation', 'External financing needs'] },
  { country: 'Ghana', code: 'GHA', region: 'West Africa', riskScore: 85, riskLevel: 'Critical', debtToGDP: 83.5, deficitToGDP: -5.0, revenueVolatility: 22.5, drivers: ['Debt default', 'IMF program', 'Fiscal slippage'] },
  { country: 'Mozambique', code: 'MOZ', region: 'Southern Africa', riskScore: 78, riskLevel: 'High', debtToGDP: 92.8, deficitToGDP: -4.8, revenueVolatility: 14.2, drivers: ['Hidden debt scandal', 'LNG dependency', 'Conflict'] },
  { country: 'Angola', code: 'AGO', region: 'Southern Africa', riskScore: 75, riskLevel: 'High', debtToGDP: 68.2, deficitToGDP: -0.5, revenueVolatility: 28.5, drivers: ['Oil dependency', 'Revenue volatility', 'Currency pressure'] },
  { country: 'Senegal', code: 'SEN', region: 'West Africa', riskScore: 68, riskLevel: 'High', debtToGDP: 78.2, deficitToGDP: -5.5, revenueVolatility: 11.5, drivers: ['Rising debt', 'Infrastructure spending', 'External debt share'] },
  { country: 'South Africa', code: 'ZAF', region: 'Southern Africa', riskScore: 65, riskLevel: 'High', debtToGDP: 73.4, deficitToGDP: -5.8, revenueVolatility: 8.5, drivers: ['SOE bailouts', 'Low growth', 'Energy crisis'] },
  { country: 'Kenya', code: 'KEN', region: 'East Africa', riskScore: 62, riskLevel: 'Medium', debtToGDP: 70.5, deficitToGDP: -5.5, revenueVolatility: 9.8, drivers: ['External debt', 'Currency depreciation', 'Interest burden'] },
  { country: 'Rwanda', code: 'RWA', region: 'East Africa', riskScore: 58, riskLevel: 'Medium', debtToGDP: 69.5, deficitToGDP: -6.8, revenueVolatility: 8.2, drivers: ['Investment-driven debt', 'External financing', 'Aid dependency'] },
  { country: 'Nigeria', code: 'NGA', region: 'West Africa', riskScore: 55, riskLevel: 'Medium', debtToGDP: 42.1, deficitToGDP: -6.4, revenueVolatility: 18.2, drivers: ['Revenue crisis', 'Subsidy reform', 'Currency pressure'] },
  { country: 'Morocco', code: 'MAR', region: 'North Africa', riskScore: 48, riskLevel: 'Medium', debtToGDP: 69.5, deficitToGDP: -4.5, revenueVolatility: 6.5, drivers: ['Fiscal consolidation', 'Social spending', 'External shocks'] },
  { country: 'Ivory Coast', code: 'CIV', region: 'West Africa', riskScore: 45, riskLevel: 'Medium', debtToGDP: 58.2, deficitToGDP: -5.2, revenueVolatility: 7.2, drivers: ['Infrastructure investment', 'Eurobond issuance', 'Cocoa dependency'] },
  { country: 'Ethiopia', code: 'ETH', region: 'East Africa', riskScore: 42, riskLevel: 'Low', debtToGDP: 45.2, deficitToGDP: -3.2, revenueVolatility: 10.5, drivers: ['Debt restructuring progress', 'FX constraints', 'Conflict resolution'] },
  { country: 'Cameroon', code: 'CMR', region: 'Central Africa', riskScore: 38, riskLevel: 'Low', debtToGDP: 44.8, deficitToGDP: -2.8, revenueVolatility: 8.8, drivers: ['Moderate debt', 'Fiscal discipline', 'Oil revenues'] },
  { country: 'Tanzania', code: 'TZA', region: 'East Africa', riskScore: 32, riskLevel: 'Low', debtToGDP: 43.1, deficitToGDP: -3.8, revenueVolatility: 7.5, drivers: ['Strong growth', 'Fiscal prudence', 'Diversified economy'] },
];

// Forecast data
export interface ForecastData {
  country: string;
  indicator: string;
  historical: { year: number; value: number }[];
  forecast: { year: number; value: number; lower: number; upper: number }[];
  trend: 'improving' | 'stable' | 'worsening';
  alert?: string;
}

export const forecastData: ForecastData[] = [
  {
    country: 'Nigeria',
    indicator: 'Debt/GDP',
    historical: [
      { year: 2019, value: 29.1 }, { year: 2020, value: 34.5 }, { year: 2021, value: 36.9 },
      { year: 2022, value: 38.2 }, { year: 2023, value: 42.1 }
    ],
    forecast: [
      { year: 2024, value: 45.8, lower: 43.2, upper: 48.5 },
      { year: 2025, value: 49.2, lower: 45.5, upper: 53.0 },
      { year: 2026, value: 52.5, lower: 47.8, upper: 57.2 },
      { year: 2027, value: 55.8, lower: 50.0, upper: 61.5 },
      { year: 2028, value: 58.5, lower: 52.0, upper: 65.0 }
    ],
    trend: 'worsening',
    alert: 'Approaching 60% threshold by 2028'
  },
  {
    country: 'Ghana',
    indicator: 'Debt/GDP',
    historical: [
      { year: 2019, value: 62.4 }, { year: 2020, value: 76.1 }, { year: 2021, value: 78.9 },
      { year: 2022, value: 88.1 }, { year: 2023, value: 83.5 }
    ],
    forecast: [
      { year: 2024, value: 78.5, lower: 74.0, upper: 83.0 },
      { year: 2025, value: 74.2, lower: 68.5, upper: 80.0 },
      { year: 2026, value: 70.5, lower: 64.0, upper: 77.0 },
      { year: 2027, value: 67.8, lower: 60.5, upper: 75.0 },
      { year: 2028, value: 65.2, lower: 57.5, upper: 73.0 }
    ],
    trend: 'improving',
    alert: 'IMF program showing positive results'
  },
  {
    country: 'Kenya',
    indicator: 'Debt/GDP',
    historical: [
      { year: 2019, value: 59.1 }, { year: 2020, value: 65.6 }, { year: 2021, value: 67.7 },
      { year: 2022, value: 68.2 }, { year: 2023, value: 70.5 }
    ],
    forecast: [
      { year: 2024, value: 72.5, lower: 69.8, upper: 75.2 },
      { year: 2025, value: 74.2, lower: 70.5, upper: 78.0 },
      { year: 2026, value: 75.8, lower: 71.2, upper: 80.5 },
      { year: 2027, value: 77.2, lower: 72.0, upper: 82.5 },
      { year: 2028, value: 78.5, lower: 72.5, upper: 84.5 }
    ],
    trend: 'worsening',
    alert: 'External debt servicing pressure increasing'
  },
  {
    country: 'Egypt',
    indicator: 'Debt/GDP',
    historical: [
      { year: 2019, value: 84.2 }, { year: 2020, value: 87.3 }, { year: 2021, value: 89.2 },
      { year: 2022, value: 92.8 }, { year: 2023, value: 95.8 }
    ],
    forecast: [
      { year: 2024, value: 92.5, lower: 88.0, upper: 97.0 },
      { year: 2025, value: 89.8, lower: 84.5, upper: 95.0 },
      { year: 2026, value: 87.2, lower: 81.0, upper: 93.5 },
      { year: 2027, value: 85.0, lower: 78.0, upper: 92.0 },
      { year: 2028, value: 83.5, lower: 76.0, upper: 91.0 }
    ],
    trend: 'improving',
    alert: 'Privatization and FDI helping stabilize'
  },
];

// Regional aggregates
export const regionalAggregates = [
  { region: 'East Africa', avgDebtGDP: 57.2, avgDeficitGDP: -4.8, avgGrowth: 5.5, riskScore: 52 },
  { region: 'West Africa', avgDebtGDP: 55.8, avgDeficitGDP: -5.5, avgGrowth: 4.2, riskScore: 58 },
  { region: 'Central Africa', avgDebtGDP: 44.8, avgDeficitGDP: -2.8, avgGrowth: 4.2, riskScore: 38 },
  { region: 'Southern Africa', avgDebtGDP: 85.2, avgDeficitGDP: -4.5, avgGrowth: 2.8, riskScore: 72 },
  { region: 'North Africa', avgDebtGDP: 82.7, avgDeficitGDP: -5.3, avgGrowth: 3.4, riskScore: 68 },
];

// Policy recommendations
export interface PolicyRecommendation {
  category: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  applicableCountries: string[];
  timeframe: string;
}

export const policyRecommendations: PolicyRecommendation[] = [
  {
    category: 'Revenue Diversification',
    title: 'Expand Tax Base Beyond Commodities',
    description: 'Implement progressive taxation, reduce informal economy, and develop non-oil/mineral revenue streams through VAT optimization and property taxes.',
    priority: 'High',
    applicableCountries: ['Nigeria', 'Angola', 'Ghana', 'Zambia'],
    timeframe: '2-5 years'
  },
  {
    category: 'Expenditure Controls',
    title: 'Implement Fiscal Rules Framework',
    description: 'Establish debt ceilings, deficit limits, and expenditure growth caps with independent fiscal councils for monitoring.',
    priority: 'High',
    applicableCountries: ['Kenya', 'Senegal', 'Ghana', 'Rwanda'],
    timeframe: '1-3 years'
  },
  {
    category: 'Debt Management',
    title: 'Develop Local Currency Bond Markets',
    description: 'Reduce reliance on external debt by deepening domestic capital markets and extending maturity profiles.',
    priority: 'Medium',
    applicableCountries: ['Nigeria', 'South Africa', 'Kenya', 'Egypt'],
    timeframe: '3-7 years'
  },
  {
    category: 'Stabilization Mechanisms',
    title: 'Establish Sovereign Wealth Funds',
    description: 'Create commodity stabilization funds to buffer against price volatility and build fiscal reserves.',
    priority: 'High',
    applicableCountries: ['Nigeria', 'Angola', 'Ghana', 'Zambia'],
    timeframe: '2-5 years'
  },
  {
    category: 'Governance',
    title: 'Enhance Debt Transparency',
    description: 'Publish comprehensive debt statistics, eliminate hidden debt, and implement parliamentary oversight of borrowing.',
    priority: 'High',
    applicableCountries: ['Mozambique', 'Ghana', 'Kenya', 'Ethiopia'],
    timeframe: '1-2 years'
  },
  {
    category: 'External Support',
    title: 'Engage G20 Common Framework',
    description: 'For countries in distress, pursue coordinated debt restructuring with bilateral and private creditors.',
    priority: 'High',
    applicableCountries: ['Zambia', 'Ghana', 'Ethiopia'],
    timeframe: 'Immediate'
  },
];
