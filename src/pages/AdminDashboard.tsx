import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { StatsCard } from "@/components/StatsCard"
import { 
  Users, 
  FileText, 
  GraduationCap, 
  UserPlus,
  Activity,
  AlertTriangle,
  TrendingUp,
  Database
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminStats {
  totalUsers: number
  totalProjects: number
  totalCourses: number
  totalEnrollments: number
  totalCollaborations: number
  recentActivity: any[]
  pendingVerifications: number
}

export default function AdminDashboard() {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProjects: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalCollaborations: 0,
    recentActivity: [],
    pendingVerifications: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchAdminStats()
    }
  }, [profile])

  const fetchAdminStats = async () => {
    try {
      setLoading(true)

      // Fetch all counts in parallel
      const [
        { count: usersCount },
        { count: projectsCount },
        { count: coursesCount },
        { count: enrollmentsCount },
        { count: collaborationsCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('enrollments').select('*', { count: 'exact', head: true }),
        supabase.from('collaborations').select('*', { count: 'exact', head: true })
      ])

      // Fetch recent activity (last 10 projects)
      const { data: recentProjects } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          created_at,
          status,
          profiles!inner(full_name, role)
        `)
        .order('created_at', { ascending: false })
        .limit(10)

      // Count pending verifications (projects with draft status)
      const { count: pendingCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'draft')

      setStats({
        totalUsers: usersCount || 0,
        totalProjects: projectsCount || 0,
        totalCourses: coursesCount || 0,
        totalEnrollments: enrollmentsCount || 0,
        totalCollaborations: collaborationsCount || 0,
        recentActivity: recentProjects || [],
        pendingVerifications: pendingCount || 0
      })

    } catch (error) {
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

  if (profile?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Brak uprawnień</CardTitle>
            <CardDescription className="text-center">
              Nie masz uprawnień do przeglądania panelu administracyjnego
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Panel Administratora</h1>
          <p className="text-muted-foreground">
            Zarządzaj całą platformą HardbanRecords Lab
          </p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Activity className="h-3 w-3" />
          Status: Online
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Użytkownicy"
          value={loading ? "..." : stats.totalUsers.toString()}
          description="Łączna liczba użytkowników"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Projekty"
          value={loading ? "..." : stats.totalProjects.toString()}
          description="Łączna liczba projektów"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatsCard
          title="Kursy"
          value={loading ? "..." : stats.totalCourses.toString()}
          description="Dostępne kursy"
          icon={<GraduationCap className="h-4 w-4" />}
        />
        <StatsCard
          title="Oczekuje weryfikacji"
          value={loading ? "..." : stats.pendingVerifications.toString()}
          description="Projekty do sprawdzenia"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Zapisy na kursy"
          value={loading ? "..." : stats.totalEnrollments.toString()}
          description="Łączne zapisy"
          icon={<UserPlus className="h-4 w-4" />}
        />
        <StatsCard
          title="Współprace"
          value={loading ? "..." : stats.totalCollaborations.toString()}
          description="Aktywne współprace"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatsCard
          title="Działania systemu"
          value={loading ? "..." : "Aktywny"}
          description="Status platformy"
          icon={<Database className="h-4 w-4" />}
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Ostatnia aktywność</CardTitle>
          <CardDescription>
            Najnowsze projekty i działania użytkowników
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : stats.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {stats.recentActivity.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-muted-foreground">
                        przez {project.profiles?.full_name} ({project.profiles?.role})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Brak ostatniej aktywności
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Szybkie działania</CardTitle>
          <CardDescription>
            Najczęściej używane funkcje administracyjne
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-12" onClick={() => window.location.href = '/admin/users'}>
              <Users className="h-4 w-4 mr-2" />
              Zarządzaj użytkownikami
            </Button>
            <Button variant="outline" className="h-12" onClick={() => window.location.href = '/admin/verification'}>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Sprawdź weryfikacje
            </Button>
            <Button variant="outline" className="h-12" onClick={() => window.location.href = '/admin/analytics'}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Zobacz analityki
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}