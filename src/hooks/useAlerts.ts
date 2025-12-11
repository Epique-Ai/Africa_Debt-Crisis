import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface Alert {
  id: string;
  title: string;
  description: string | null;
  category: string;
  priority: string | null;
  impact: string | null;
  threshold: string | null;
  value: string | null;
  country_id: string | null;
  is_read: boolean | null;
  created_at: string;
  country?: {
    id: string;
    name: string;
    code: string;
    region: string;
  };
}

export const useAlerts = (limit?: number) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['alerts', limit],
    queryFn: async () => {
      let queryBuilder = supabase
        .from('alerts')
        .select(`
          *,
          country:countries (
            id,
            name,
            code,
            region
          )
        `)
        .order('created_at', { ascending: false });
      
      if (limit) {
        queryBuilder = queryBuilder.limit(limit);
      }

      const { data, error } = await queryBuilder;
      
      if (error) throw error;
      return data as Alert[];
    },
  });

  // Enable realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('alerts-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'alerts' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['alerts'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};

export const useUnreadAlertsCount = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['unread-alerts-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('alerts')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      
      if (error) throw error;
      return count || 0;
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('unread-alerts-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'alerts' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['unread-alerts-count'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};
