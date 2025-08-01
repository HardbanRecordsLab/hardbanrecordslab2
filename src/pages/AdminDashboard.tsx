import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/StatsCard"
import { supabase } from "@/integrations/supabase/client"
import { Users, Music, BookOpen, GraduationCap, TrendingUp, Activity } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminStats {
  totalUsers: number
  totalProjects: number
  totalCourses: number
  totalEnrollments: number
  artistsCount: number
  authorsCount: number
  instructorsCount: number
  studentsCount: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProjects: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    artistsCount: 0,
    authorsCount: 0,
    instructorsCount: 0,
    studentsCount: 0
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAdminStats()
  }, [])

  const fetchAdminStats = async () => {
    try {
      setLoading(true)
      
      // Fetch user statistics
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('role')
      
      if (profilesError) throw profilesError

      // Fetch projects count
      const { count: projectsCount, error: projectsError } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
      
      if (projectsError) throw projectsError

      // Fetch courses count
      const { count: coursesCount, error: coursesError } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
      
      if (coursesError) throw coursesError

      // Fetch enrollments count
      const { count: enrollmentsCount, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
      
      if (enrollmentsError) throw enrollmentsError

      // Calculate role counts
      const roleCounts = {
        artist: 0,
        author: 0,
        instructor: 0,
        student: 0,
        admin: 0
      }

      profiles?.forEach(profile => {
        if (profile.role in roleCounts) {
          roleCounts[profile.role as keyof typeof roleCounts]++
        }
      })

      setStats({
        totalUsers: profiles?.length || 0,
        totalProjects: projectsCount || 0,
        totalCourses: coursesCount || 0,
        totalEnrollments: enrollmentsCount || 0,
        artistsCount: roleCounts.artist,
        authorsCount: roleCounts.author,
        instructorsCount: roleCounts.instructor,
        studentsCount: roleCounts.student
      })

    } catch (error: any) {
      console.error('Error fetching admin stats:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać statystyk administracyjnych",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Panel Administracyjny</h1>
          <p className="text-muted-foreground">
            Przegląd statystyk i zarządzanie platformą HardbanRecords Lab
          </p>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Activity className="w-4 h-4" />
          System Online
        </Badge>
      </div>

      {/* Ogólne statystyki */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Wszyscy Użytkownicy"
          value={loading ? "..." : stats.totalUsers.toString()}
          description="Łączna liczba zarejestrowanych użytkowników"
          icon={<Users className="w-4 h-4" />}
        />
        <StatsCard
          title="Projekty Muzyczne"
          value={loading ? "..." : stats.totalProjects.toString()}
          description="Aktywne projekty artystów"
          icon={<Music className="w-4 h-4" />}
        />
        <StatsCard
          title="Kursy eLearning"
          value={loading ? "..." : stats.totalCourses.toString()}
          description="Dostępne kursy na platformie"
          icon={<GraduationCap className="w-4 h-4" />}
        />
        <StatsCard
          title="Zapisani Studenci"
          value={loading ? "..." : stats.totalEnrollments.toString()}
          description="Łączne zapisy na kursy"
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      {/* Statystyki użytkowników według ról */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artyści</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.artistsCount}</div>
            <p className="text-xs text-muted-foreground">
              Twórcy muzyki
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Autorzy</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.authorsCount}</div>
            <p className="text-xs text-muted-foreground">
              Autorzy publikacji
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instruktorzy</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.instructorsCount}</div>
            <p className="text-xs text-muted-foreground">
              Twórcy kursów
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Studenci</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.studentsCount}</div>
            <p className="text-xs text-muted-foreground">
              Uczestnicy kursów
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Przegląd systemu */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status Systemu</CardTitle>
            <CardDescription>
              Najważniejsze informacje o stanie platformy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Baza danych</span>
              <Badge variant="default">Aktywna</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Przechowywanie plików</span>
              <Badge variant="default">Dostępne</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Uwierzytelnianie</span>
              <Badge variant="default">Funkcjonalne</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bezpieczeństwo</span>
              <Badge variant="secondary">Wymaga uwagi</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Szybkie Akcje</CardTitle>
            <CardDescription>
              Najczęściej wykonywane operacje administracyjne
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              • Zarządzanie użytkownikami
            </div>
            <div className="text-sm">
              • Moderacja treści
            </div>
            <div className="text-sm">
              • Konfiguracja systemu
            </div>
            <div className="text-sm">
              • Analiza wydajności
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}