import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/StatsCard"
import { Music, Upload, TrendingUp, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"

const statusConfig = {
  published: { label: "Opublikowany", color: "bg-green-500", icon: CheckCircle },
  pending: { label: "Oczekuje", color: "bg-yellow-500", icon: Clock },
  approved: { label: "Zatwierdzony", color: "bg-blue-500", icon: CheckCircle },
  rejected: { label: "Odrzucony", color: "bg-red-500", icon: AlertCircle },
}

interface ProjectStats {
  totalProjects: number
  publishedProjects: number
  pendingProjects: number
  approvedProjects: number
  totalStreams: number
  totalRevenue: number
}

export default function ArtistDashboard() {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const [projects, setProjects] = useState<any[]>([])
  const [stats, setStats] = useState<ProjectStats>({
    totalProjects: 0,
    publishedProjects: 0,
    pendingProjects: 0,
    approvedProjects: 0,
    totalStreams: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchArtistData()
    }
  }, [user])

  const fetchArtistData = async () => {
    try {
      setLoading(true)
      
      // Fetch artist projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id)
        .eq('type', 'music')
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (projectsError) throw projectsError

      // Fetch analytics for revenue and streams (placeholder for now)
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('analytics')
        .select('revenue, metadata')
        .eq('user_id', user?.id)
      
      if (analyticsError && analyticsError.code !== 'PGRST116') {
        console.error('Analytics error:', analyticsError)
      }

      // Calculate stats
      const totalRevenue = analyticsData?.reduce((sum, record) => sum + (record.revenue || 0), 0) || 0
      const totalStreams = analyticsData?.reduce((sum, record) => {
        const metadata = record.metadata as any
        const streams = metadata?.streams || 0
        return sum + streams
      }, 0) || 0

      const statusCounts = projectsData?.reduce((acc, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1
        return acc
      }, {} as Record<string, number>) || {}

      setStats({
        totalProjects: projectsData?.length || 0,
        publishedProjects: statusCounts.published || 0,
        pendingProjects: statusCounts.pending || 0,
        approvedProjects: statusCounts.approved || 0,
        totalStreams,
        totalRevenue
      })

      setProjects(projectsData || [])

    } catch (error: any) {
      console.error('Error fetching artist data:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać danych artysty",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pl-PL').format(num)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Witaj ponownie, <span className="text-primary">{profile?.full_name || 'Artysto'}</span>! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj swoją muzyką i śledź postępy w karierze
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Dodaj Nowy Utwór
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Opublikowane utwory"
          value={loading ? "..." : stats.publishedProjects.toString()}
          icon={<Music className="w-4 h-4" />}
          description={`Łącznie: ${stats.totalProjects}`}
        />
        <StatsCard
          title="Łączne odsłuchania"
          value={loading ? "..." : formatNumber(stats.totalStreams)}
          icon={<TrendingUp className="w-4 h-4" />}
          description="Wszystkie platformy"
        />
        <StatsCard
          title="Tantiemy"
          value={loading ? "..." : `${stats.totalRevenue.toFixed(2)} PLN`}
          icon={<DollarSign className="w-4 h-4" />}
          description="Do wypłaty"
        />
        <StatsCard
          title="Na weryfikacji"
          value={loading ? "..." : stats.pendingProjects.toString()}
          icon={<Clock className="w-4 h-4" />}
          description="Czas oczekiwania: 24-72h"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ostatnie utwory</CardTitle>
            <CardDescription>Twoja najnowsza aktywność muzyczna</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center text-muted-foreground">Ładowanie...</div>
            ) : projects.length === 0 ? (
              <div className="text-center text-muted-foreground">Brak projektów do wyświetlenia</div>
            ) : (
              projects.map((project) => {
                const status = statusConfig[project.status as keyof typeof statusConfig] || statusConfig.pending
                const StatusIcon = status.icon
                
                return (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                        <Music className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(project.created_at).toLocaleDateString('pl-PL')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                )
              })
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Szybkie akcje</CardTitle>
            <CardDescription>Najczęściej używane funkcje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Upload className="w-4 h-4" />
              Prześlij nowy utwór
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <TrendingUp className="w-4 h-4" />
              Zobacz statystyki
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <DollarSign className="w-4 h-4" />
              Zarządzaj wypłatami
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Music className="w-4 h-4" />
              Edytuj profil artysty
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Powiadomienia</CardTitle>
          <CardDescription>Ważne informacje od HardbanRecords Lab</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Utwór "Nocny Lot" został zatwierdzony!</h4>
                <p className="text-sm text-blue-700">Twój utwór przeszedł weryfikację i zostanie opublikowany w ciągu 24 godzin.</p>
                <span className="text-xs text-blue-600">2 godziny temu</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900">Nowe funkcje AI już dostępne!</h4>
                <p className="text-sm text-yellow-700">Sprawdź nowy generator tagów i opisów utworów w sekcji przesyłania.</p>
                <span className="text-xs text-yellow-600">1 dzień temu</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}