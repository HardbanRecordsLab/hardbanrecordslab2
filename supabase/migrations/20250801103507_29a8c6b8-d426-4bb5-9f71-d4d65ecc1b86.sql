-- Drop the admin_analytics view as it has security issues
DROP VIEW IF EXISTS public.admin_analytics;

-- Create RLS policies for analytics access instead of a view
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.id = auth.uid() 
    AND p.role = 'admin'
  )
);

-- Allow admins to view all projects
CREATE POLICY "Admins can view all projects" ON public.projects
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Allow admins to view all courses
CREATE POLICY "Admins can view all courses" ON public.courses
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Allow admins to view all enrollments
CREATE POLICY "Admins can view all enrollments" ON public.enrollments
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);