import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface RLPipelineResult {
  success: boolean;
  message: string;
  summary?: string;
  alertsGenerated?: number;
  recommendationsGenerated?: number;
  error?: string;
}

export const useRLPipeline = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [lastResult, setLastResult] = useState<RLPipelineResult | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const runPipeline = async () => {
    setIsRunning(true);
    setLastResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('rl-pipeline');

      if (error) {
        throw new Error(error.message || 'Failed to run RL pipeline');
      }

      const result = data as RLPipelineResult;
      setLastResult(result);

      if (result.success) {
        toast({
          title: "RL Pipeline Complete",
          description: `Generated ${result.alertsGenerated} alerts and ${result.recommendationsGenerated} recommendations`,
        });

        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['alerts'] });
        queryClient.invalidateQueries({ queryKey: ['policy-recommendations'] });
        queryClient.invalidateQueries({ queryKey: ['unread-alerts-count'] });
      } else {
        toast({
          title: "Pipeline Error",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      // Handle rate limiting
      if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
        toast({
          title: "Rate Limited",
          description: "Too many requests. Please wait a moment and try again.",
          variant: "destructive",
        });
      } else if (errorMessage.includes('402') || errorMessage.includes('credits')) {
        toast({
          title: "Credits Exhausted",
          description: "Please add AI credits to your workspace to continue.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Pipeline Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }

      setLastResult({ success: false, message: errorMessage, error: errorMessage });
      return null;
    } finally {
      setIsRunning(false);
    }
  };

  return {
    runPipeline,
    isRunning,
    lastResult,
  };
};
