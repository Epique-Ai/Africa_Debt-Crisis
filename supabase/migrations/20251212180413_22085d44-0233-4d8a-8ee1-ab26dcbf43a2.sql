-- Create debt repayments table
CREATE TABLE public.debt_repayments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  country_id UUID REFERENCES public.countries(id),
  year INTEGER NOT NULL,
  quarter TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  type TEXT NOT NULL,
  risk_level TEXT NOT NULL DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.debt_repayments ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Debt repayments are publicly readable"
ON public.debt_repayments
FOR SELECT
USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.debt_repayments;