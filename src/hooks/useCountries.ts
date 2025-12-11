import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface Country {
  id: string;
  name: string;
  code: string;
  region: string;
  flag_url: string | null;
}

export const useCountries = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Country[];
    },
  });

  // Enable realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('countries-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'countries' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['countries'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};
