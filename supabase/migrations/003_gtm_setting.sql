-- Add GTM container ID setting (for projects that ran 001 before gtm was added)
INSERT INTO public.settings (key, value) VALUES ('gtm_container_id', '')
ON CONFLICT (key) DO NOTHING;
