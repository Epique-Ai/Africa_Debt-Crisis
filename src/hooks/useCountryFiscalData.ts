import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface CountryFiscalData {
  id: string;
  country_id: string;
  year: number;
  debt_to_gdp: number | null;
  fiscal_deficit: number | null;
  gdp_growth: number | null;
  inflation_rate: number | null;
  unemployment_rate: number | null;
  external_debt_billion: number | null;
  debt_service_ratio: number | null;
  revenue_to_gdp: number | null;
  expenditure_to_gdp: number | null;
  risk_score: number | null;
  risk_level: string | null;
}

export interface CountryWithFiscalData {
  id: string;
  name: string;
  code: string;
  region: string;
  flag_url: string | null;
  fiscalData: CountryFiscalData[];
}

export const useCountryFiscalData = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['country-fiscal-data'],
    queryFn: async () => {
      // Fetch countries
      const { data: countries, error: countriesError } = await supabase
        .from('countries')
        .select('*')
        .order('name');
      
      if (countriesError) throw countriesError;

      // Fetch fiscal data
      const { data: fiscalData, error: fiscalError } = await supabase
        .from('country_fiscal_data')
        .select('*')
        .order('year', { ascending: false });
      
      if (fiscalError) throw fiscalError;

      // Combine data
      const combinedData: CountryWithFiscalData[] = countries.map(country => ({
        ...country,
        fiscalData: fiscalData.filter(fd => fd.country_id === country.id),
      }));

      return combinedData;
    },
  });

  // Enable realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('fiscal-data-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'country_fiscal_data' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['country-fiscal-data'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};

// Get latest fiscal data for each country (for dashboard metrics)
export const useLatestFiscalMetrics = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['latest-fiscal-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('country_fiscal_data')
        .select(`
          *,
          countries (
            id,
            name,
            code,
            region,
            flag_url
          )
        `)
        .order('year', { ascending: false });
      
      if (error) throw error;

      // Group by country and get latest year
      const latestByCountry = new Map();
      data.forEach(item => {
        if (!latestByCountry.has(item.country_id)) {
          latestByCountry.set(item.country_id, item);
        }
      });

      return Array.from(latestByCountry.values());
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('latest-fiscal-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'country_fiscal_data' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['latest-fiscal-metrics'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};
