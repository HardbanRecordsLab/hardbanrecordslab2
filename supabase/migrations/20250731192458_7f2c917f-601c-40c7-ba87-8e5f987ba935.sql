-- Add admin role to app_role enum
ALTER TYPE app_role ADD VALUE 'admin';

-- Create admin users table for better admin management
CREATE TABLE public.admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  permissions jsonb DEFAULT '{"can_manage_users": true, "can_manage_projects": true, "can_manage_courses": true, "can_view_analytics": true}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on admin_settings
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for admin settings (only admins can access)
CREATE POLICY "Only admins can manage admin settings" ON public.admin_settings
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create admin analytics view
CREATE VIEW public.admin_analytics AS
SELECT 
  'users' as metric,
  COUNT(*) as count,
  'total' as period
FROM public.profiles
UNION ALL
SELECT 
  'projects' as metric,
  COUNT(*) as count,
  'total' as period  
FROM public.projects
UNION ALL
SELECT 
  'courses' as metric,
  COUNT(*) as count,
  'total' as period
FROM public.courses
UNION ALL
SELECT 
  'enrollments' as metric,
  COUNT(*) as count,
  'total' as period
FROM public.enrollments;