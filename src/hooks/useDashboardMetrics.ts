import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface DashboardMetrics {
  avgDebtToGDP: number;
  avgDeficitToGDP: number;
  countriesAtRisk: number;
  avgGDPGrowth: number;
  totalCountries: number;
  criticalCountries: number;
  highRiskCountries: number;
}

export const useDashboardMetrics = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      // Fetch all countries
      const { data: countries, error: countriesError } = await supabase
        .from('countries')
        .select('id');
      
      if (countriesError) throw countriesError;

      // Fetch latest fiscal data for each country
      const { data: fiscalData, error: fiscalError } = await supabase
        .from('country_fiscal_data')
        .select('*')
        .order('year', { ascending: false });
      
      if (fiscalError) throw fiscalError;

      // Get latest data per country
      const latestByCountry = new Map();
      fiscalData.forEach(item => {
        if (!latestByCountry.has(item.country_id)) {
          latestByCountry.set(item.country_id, item);
        }
      });

      const latestData = Array.from(latestByCountry.values());

      // Calculate metrics
      const validDebtData = latestData.filter(d => d.debt_to_gdp !== null);
      const validDeficitData = latestData.filter(d => d.fiscal_deficit !== null);
      const validGrowthData = latestData.filter(d => d.gdp_growth !== null);

      const avgDebtToGDP = validDebtData.length > 0
        ? validDebtData.reduce((acc, d) => acc + (d.debt_to_gdp || 0), 0) / validDebtData.length
        : 0;

      const avgDeficitToGDP = validDeficitData.length > 0
        ? validDeficitData.reduce((acc, d) => acc + (d.fiscal_deficit || 0), 0) / validDeficitData.length
        : 0;

      const avgGDPGrowth = validGrowthData.length > 0
        ? validGrowthData.reduce((acc, d) => acc + (d.gdp_growth || 0), 0) / validGrowthData.length
        : 0;

      const criticalCountries = latestData.filter(d => d.risk_level === 'Critical').length;
      const highRiskCountries = latestData.filter(d => d.risk_level === 'High').length;
      const countriesAtRisk = criticalCountries + highRiskCountries;

      return {
        avgDebtToGDP: Math.round(avgDebtToGDP * 10) / 10,
        avgDeficitToGDP: Math.round(avgDeficitToGDP * 10) / 10,
        countriesAtRisk,
        avgGDPGrowth: Math.round(avgGDPGrowth * 10) / 10,
        totalCountries: countries.length,
        criticalCountries,
        highRiskCountries,
      } as DashboardMetrics;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('dashboard-metrics-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'country_fiscal_data' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['dashboard-metrics'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};

// Risk classifications for the risk table
export const useRiskClassifications = (limit?: number) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['risk-classifications', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('country_fiscal_data')
        .select(`
          *,
          country:countries (
            id,
            name,
            code,
            region
          )
        `)
        .order('year', { ascending: false });
      
      if (error) throw error;

      // Get latest data per country
      const latestByCountry = new Map();
      data.forEach(item => {
        if (!latestByCountry.has(item.country_id)) {
          latestByCountry.set(item.country_id, item);
        }
      });

      let latestData = Array.from(latestByCountry.values());
      
      // Sort by risk score descending
      latestData.sort((a, b) => (b.risk_score || 0) - (a.risk_score || 0));

      if (limit) {
        latestData = latestData.slice(0, limit);
      }

      return latestData.map((item, index) => ({
        rank: index + 1,
        country: item.country?.name || 'Unknown',
        code: item.country?.code || '',
        region: item.country?.region || '',
        riskScore: item.risk_score || 0,
        riskLevel: item.risk_level || 'Unknown',
        debtToGDP: item.debt_to_gdp || 0,
        deficitToGDP: item.fiscal_deficit || 0,
        gdpGrowth: item.gdp_growth || 0,
        inflationRate: item.inflation_rate || 0,
      }));
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('risk-classifications-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'country_fiscal_data' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['risk-classifications'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};
