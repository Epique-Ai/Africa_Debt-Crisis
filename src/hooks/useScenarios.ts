import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface Scenario {
  id: string;
  name: string;
  type: string;
  description: string | null;
  color: string | null;
  created_at: string;
}

export interface ScenarioProjection {
  id: string;
  scenario_id: string;
  country_id: string | null;
  year: number;
  gdp_growth: number | null;
  inflation: number | null;
  unemployment: number | null;
  debt_to_gdp: number | null;
  fiscal_risk_index: number | null;
  created_at: string;
}

export interface ScenarioWithProjections extends Scenario {
  projections: ScenarioProjection[];
}

export const useScenarios = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['scenarios'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scenarios')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Scenario[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('scenarios-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'scenarios' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['scenarios'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};

export const useScenariosWithProjections = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['scenarios-with-projections'],
    queryFn: async () => {
      // Fetch scenarios
      const { data: scenarios, error: scenariosError } = await supabase
        .from('scenarios')
        .select('*')
        .order('name');
      
      if (scenariosError) throw scenariosError;

      // Fetch projections
      const { data: projections, error: projectionsError } = await supabase
        .from('scenario_projections')
        .select('*')
        .order('year');
      
      if (projectionsError) throw projectionsError;

      // Combine data
      const combinedData: ScenarioWithProjections[] = scenarios.map(scenario => ({
        ...scenario,
        projections: projections.filter(p => p.scenario_id === scenario.id),
      }));

      return combinedData;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('scenario-projections-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'scenario_projections' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['scenarios-with-projections'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};

// Get comparison data for charts
export const useScenarioComparisonData = () => {
  return useQuery({
    queryKey: ['scenario-comparison-data'],
    queryFn: async () => {
      const { data: projections, error } = await supabase
        .from('scenario_projections')
        .select(`
          *,
          scenario:scenarios (
            id,
            name,
            type,
            color
          )
        `)
        .order('year');
      
      if (error) throw error;

      // Group by year
      const years = [...new Set(projections.map(p => p.year))].sort();
      
      return years.map(year => {
        const yearData: Record<string, number | string> = { year: year.toString() };
        const yearProjections = projections.filter(p => p.year === year);
        
        yearProjections.forEach(p => {
          if (p.scenario) {
            const scenarioType = p.scenario.type;
            yearData[`${scenarioType}_debtToGDP`] = p.debt_to_gdp || 0;
            yearData[`${scenarioType}_gdpGrowth`] = p.gdp_growth || 0;
            yearData[`${scenarioType}_fiscalRiskIndex`] = p.fiscal_risk_index || 0;
          }
        });
        
        return yearData;
      });
    },
  });
};
