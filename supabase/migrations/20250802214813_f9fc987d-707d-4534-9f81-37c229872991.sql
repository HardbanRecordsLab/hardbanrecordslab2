-- Fix infinite recursion in profiles RLS policies
-- Drop the problematic policy first
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT CASE 
    WHEN auth.uid() IS NULL THEN false
    ELSE (
      SELECT role = 'admin'::app_role 
      FROM public.profiles 
      WHERE id = auth.uid()
    )
  END;
$$;

-- Create new admin policy using the security definer function
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (public.is_admin());

-- Also update other policies that might have recursion issues
DROP POLICY IF EXISTS "Only admins can manage admin settings" ON public.admin_settings;
CREATE POLICY "Only admins can manage admin settings"
ON public.admin_settings
FOR ALL
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can view all courses" ON public.courses;
CREATE POLICY "Admins can view all courses"
ON public.courses
FOR SELECT
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can view all enrollments" ON public.enrollments;
CREATE POLICY "Admins can view all enrollments"
ON public.enrollments
FOR SELECT
USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can view all projects" ON public.projects;
CREATE POLICY "Admins can view all projects"
ON public.projects
FOR SELECT
USING (public.is_admin());