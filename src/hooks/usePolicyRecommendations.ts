import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface PolicyRecommendation {
  id: string;
  title: string;
  description: string | null;
  category: string;
  priority: string | null;
  timeframe: string | null;
  created_at: string;
  countries?: {
    id: string;
    name: string;
    code: string;
  }[];
}

export const usePolicyRecommendations = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['policy-recommendations'],
    queryFn: async () => {
      // Fetch recommendations
      const { data: recommendations, error: recError } = await supabase
        .from('policy_recommendations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (recError) throw recError;

      // Fetch recommendation-country relationships
      const { data: recCountries, error: rcError } = await supabase
        .from('recommendation_countries')
        .select(`
          recommendation_id,
          country:countries (
            id,
            name,
            code
          )
        `);
      
      if (rcError) throw rcError;

      // Combine data
      const combinedData: PolicyRecommendation[] = recommendations.map(rec => ({
        ...rec,
        countries: recCountries
          .filter(rc => rc.recommendation_id === rec.id)
          .map(rc => rc.country)
          .filter(Boolean) as { id: string; name: string; code: string }[],
      }));

      return combinedData;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('policy-recommendations-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'policy_recommendations' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['policy-recommendations'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};
