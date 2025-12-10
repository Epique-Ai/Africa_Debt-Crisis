-- Create tables for the African Sovereign Debt Crisis platform

-- 1. Countries table - core reference data
CREATE TABLE public.countries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT NOT NULL UNIQUE, -- ISO country code
  region TEXT NOT NULL, -- e.g., East Africa, West Africa
  flag_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Country fiscal data - historical and current fiscal indicators
CREATE TABLE public.country_fiscal_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  debt_to_gdp DECIMAL(5,2), -- percentage
  fiscal_deficit DECIMAL(5,2), -- percentage of GDP
  gdp_growth DECIMAL(5,2), -- percentage
  inflation_rate DECIMAL(5,2), -- percentage
  unemployment_rate DECIMAL(5,2), -- percentage
  external_debt_billion DECIMAL(10,2), -- in billions USD
  debt_service_ratio DECIMAL(5,2), -- percentage of exports
  revenue_to_gdp DECIMAL(5,2), -- percentage
  expenditure_to_gdp DECIMAL(5,2), -- percentage
  risk_score DECIMAL(3,2), -- 0-1 scale
  risk_level TEXT CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(country_id, year)
);

-- 3. Articles/News table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL, -- e.g., Policy Update, Risk Alert, Reform, Markets
  image_url TEXT,
  read_time TEXT DEFAULT '5 min read',
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Article-Country junction table (many-to-many)
CREATE TABLE public.article_countries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  UNIQUE(article_id, country_id)
);

-- 5. Alerts/Live Feed table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- Debt Ratio, Revenue, Growth, Expenditure, etc.
  impact TEXT CHECK (impact IN ('positive', 'negative', 'neutral')),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  country_id UUID REFERENCES public.countries(id) ON DELETE SET NULL,
  value TEXT, -- e.g., "45.2%", "+2.3%"
  threshold TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Scenarios table - stress test scenarios
CREATE TABLE public.scenarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- Baseline, Optimistic, Adverse, High-Risk, Reform
  color TEXT, -- for visualization
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 7. Scenario projections - 5-year forecasts per scenario
CREATE TABLE public.scenario_projections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scenario_id UUID NOT NULL REFERENCES public.scenarios(id) ON DELETE CASCADE,
  country_id UUID REFERENCES public.countries(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  gdp_growth DECIMAL(5,2),
  inflation DECIMAL(5,2),
  unemployment DECIMAL(5,2),
  debt_to_gdp DECIMAL(5,2),
  fiscal_risk_index DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 8. Policy recommendations table
CREATE TABLE public.policy_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- Revenue, Expenditure, Debt Management, Structural Reform
  priority TEXT CHECK (priority IN ('Low', 'Medium', 'High')),
  timeframe TEXT, -- Short-term, Medium-term, Long-term
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 9. Recommendation-Country junction table
CREATE TABLE public.recommendation_countries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recommendation_id UUID NOT NULL REFERENCES public.policy_recommendations(id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES public.countries(id) ON DELETE CASCADE,
  UNIQUE(recommendation_id, country_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.country_fiscal_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenario_projections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_countries ENABLE ROW LEVEL SECURITY;

-- Create public read policies (this is public data for the platform)
CREATE POLICY "Countries are publicly readable" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Fiscal data is publicly readable" ON public.country_fiscal_data FOR SELECT USING (true);
CREATE POLICY "Articles are publicly readable" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Article countries are publicly readable" ON public.article_countries FOR SELECT USING (true);
CREATE POLICY "Alerts are publicly readable" ON public.alerts FOR SELECT USING (true);
CREATE POLICY "Scenarios are publicly readable" ON public.scenarios FOR SELECT USING (true);
CREATE POLICY "Scenario projections are publicly readable" ON public.scenario_projections FOR SELECT USING (true);
CREATE POLICY "Policy recommendations are publicly readable" ON public.policy_recommendations FOR SELECT USING (true);
CREATE POLICY "Recommendation countries are publicly readable" ON public.recommendation_countries FOR SELECT USING (true);

-- Enable realtime for alerts table
ALTER PUBLICATION supabase_realtime ADD TABLE public.alerts;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at triggers
CREATE TRIGGER update_countries_updated_at
  BEFORE UPDATE ON public.countries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_country_fiscal_data_updated_at
  BEFORE UPDATE ON public.country_fiscal_data
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();