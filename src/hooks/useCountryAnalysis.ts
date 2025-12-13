import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export interface CountryPrediction {
  year: number;
  debtToGDP: number;
  gdpGrowth: number;
  riskScore: number;
  inflationRate: number;
}

export interface CountryAnalysisResult {
  success: boolean;
  countryName?: string;
  currentStatus?: string;
  riskAssessment?: string;
  predictions?: CountryPrediction[];
  keyInsights?: string[];
  recommendations?: string[];
  error?: string;
}

export const useCountryAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CountryAnalysisResult | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const analyzeCountry = async (countryId: string, countryName: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('country-analysis', {
        body: { countryId, countryName }
      });

      if (error) {
        throw new Error(error.message || 'Failed to analyze country');
      }

      const result = data as CountryAnalysisResult;
      setAnalysisResult(result);

      if (result.success) {
        toast({
          title: `Analysis Complete: ${countryName}`,
          description: "AI predictions and recommendations generated",
        });
        
        queryClient.invalidateQueries({ queryKey: ['alerts'] });
        queryClient.invalidateQueries({ queryKey: ['country-fiscal-data'] });
      } else {
        toast({
          title: "Analysis Error",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
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
          title: "Analysis Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }

      setAnalysisResult({ success: false, error: errorMessage });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysisResult(null);
  };

  return {
    analyzeCountry,
    clearAnalysis,
    isAnalyzing,
    analysisResult,
  };
};
