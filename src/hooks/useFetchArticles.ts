import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface FetchArticlesResult {
  success: boolean;
  message: string;
  totalFetched?: number;
  newArticles?: number;
  error?: string;
}

export const useFetchArticles = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [lastResult, setLastResult] = useState<FetchArticlesResult | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const fetchArticles = async () => {
    setIsFetching(true);
    setLastResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('fetch-articles');

      if (error) {
        throw new Error(error.message || 'Failed to fetch articles');
      }

      const result = data as FetchArticlesResult;
      setLastResult(result);

      if (result.success) {
        toast({
          title: "Articles Synced",
          description: `Added ${result.newArticles} new articles from IMF & World Bank`,
        });

        // Invalidate articles queries
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        queryClient.invalidateQueries({ queryKey: ['featured-articles'] });
      } else {
        toast({
          title: "Sync Error",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      toast({
        title: "Fetch Failed",
        description: errorMessage,
        variant: "destructive",
      });

      setLastResult({ success: false, message: errorMessage, error: errorMessage });
      return null;
    } finally {
      setIsFetching(false);
    }
  };

  return {
    fetchArticles,
    isFetching,
    lastResult,
  };
};
