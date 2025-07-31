-- Aktualizuj enum app_role aby zawierał rolę admin
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'admin';

-- Utwórz tabelę dla ustawień administracyjnych
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL DEFAULT '{}',
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Włącz RLS dla admin_settings
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Tylko administratorzy mogą zarządzać ustawieniami
CREATE POLICY "Only admins can manage settings" ON public.admin_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Utwórz widok analityczny dla administratorów
CREATE OR REPLACE VIEW public.admin_analytics AS
SELECT 
  (SELECT COUNT(*) FROM public.profiles) as total_users,
  (SELECT COUNT(*) FROM public.profiles WHERE role = 'artist') as total_artists,
  (SELECT COUNT(*) FROM public.profiles WHERE role = 'author') as total_authors,
  (SELECT COUNT(*) FROM public.profiles WHERE role = 'instructor') as total_instructors,
  (SELECT COUNT(*) FROM public.profiles WHERE role = 'student') as total_students,
  (SELECT COUNT(*) FROM public.projects) as total_projects,
  (SELECT COUNT(*) FROM public.courses) as total_courses,
  (SELECT COUNT(*) FROM public.enrollments) as total_enrollments,
  (SELECT COUNT(*) FROM public.collaborations) as total_collaborations;

-- Tylko administratorzy mogą przeglądać analityki
CREATE POLICY "Only admins can view analytics" ON public.admin_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Dodaj trigger do admin_settings dla updated_at
CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Wstaw podstawowe ustawienia administracyjne
INSERT INTO public.admin_settings (setting_key, setting_value, description) VALUES
  ('app_name', '"HardbanRecords Lab"', 'Nazwa aplikacji'),
  ('max_file_size', '104857600', 'Maksymalny rozmiar pliku w bajtach (100MB)'),
  ('allowed_file_types', '["audio/mpeg", "audio/wav", "audio/flac", "application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]', 'Dozwolone typy plików')
ON CONFLICT (setting_key) DO NOTHING;