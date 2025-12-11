import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

export interface Article {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  image_url: string | null;
  read_time: string | null;
  is_featured: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useArticles = (limit?: number) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['articles', limit],
    queryFn: async () => {
      let queryBuilder = supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });
      
      if (limit) {
        queryBuilder = queryBuilder.limit(limit);
      }

      const { data, error } = await queryBuilder;
      
      if (error) throw error;
      return data as Article[];
    },
  });

  // Enable realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('articles-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'articles' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['articles'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};

export const useFeaturedArticles = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['featured-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data as Article[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('featured-articles-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'articles' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['featured-articles'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Article | null;
    },
    enabled: !!id,
  });
};
