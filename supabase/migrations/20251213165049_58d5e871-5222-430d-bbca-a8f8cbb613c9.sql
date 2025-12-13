-- Alter scenario_projections columns to allow larger numeric values
ALTER TABLE public.scenario_projections 
  ALTER COLUMN fiscal_risk_index TYPE numeric(5,2),
  ALTER COLUMN debt_to_gdp TYPE numeric(6,2),
  ALTER COLUMN inflation TYPE numeric(6,2);