import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/StatsCard"
import { BookOpen, Upload, TrendingUp, DollarSign, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react"
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

interface PublicationStats {
  totalPublications: number
  publishedPublications: number
  pendingPublications: number
  approvedPublications: number
  totalDownloads: number
  totalRevenue: number
}

export default function AuthorDashboard() {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const [publications, setPublications] = useState<any[]>([])
  const [stats, setStats] = useState<PublicationStats>({
    totalPublications: 0,
    publishedPublications: 0,
    pendingPublications: 0,
    approvedPublications: 0,
    totalDownloads: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchAuthorData()
    }
  }, [user])

  const fetchAuthorData = async () => {
    try {
      setLoading(true)
      
      // Fetch author publications
      const { data: publicationsData, error: publicationsError } = await supabase
        .from('digital_products')
        .select('*')
        .eq('user_id', user?.id)
        .in('product_type', ['ebook', 'audiobook'])
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (publicationsError) throw publicationsError

      // Fetch analytics for revenue and downloads
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('analytics')
        .select('revenue, metadata')
        .eq('user_id', user?.id)
      
      if (analyticsError && analyticsError.code !== 'PGRST116') {
        console.error('Analytics error:', analyticsError)
      }

      // Calculate stats
      const totalRevenue = analyticsData?.reduce((sum, record) => sum + (record.revenue || 0), 0) || 0
      const totalDownloads = analyticsData?.reduce((sum, record) => {
        const metadata = record.metadata as any
        const downloads = metadata?.downloads || 0
        return sum + downloads
      }, 0) || 0

      const statusCounts = publicationsData?.reduce((acc, publication) => {
        acc[publication.status] = (acc[publication.status] || 0) + 1
        return acc
      }, {} as Record<string, number>) || {}

      setStats({
        totalPublications: publicationsData?.length || 0,
        publishedPublications: statusCounts.published || 0,
        pendingPublications: statusCounts.pending || 0,
        approvedPublications: statusCounts.approved || 0,
        totalDownloads,
        totalRevenue
      })

      setPublications(publicationsData || [])

    } catch (error: any) {
      console.error('Error fetching author data:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać danych autora",
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
            Witaj ponownie, <span className="text-accent">{profile?.full_name || 'Autorze'}</span>! 📚
          </h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj swoimi publikacjami i śledź sukces sprzedażowy
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Dodaj Nową Publikację
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Opublikowane książki"
          value={loading ? "..." : stats.publishedPublications.toString()}
          icon={<BookOpen className="w-4 h-4" />}
          description={`Łącznie: ${stats.totalPublications}`}
        />
        <StatsCard
          title="Łączne pobrania"
          value={loading ? "..." : formatNumber(stats.totalDownloads)}
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
          value={loading ? "..." : stats.pendingPublications.toString()}
          icon={<Clock className="w-4 h-4" />}
          description="Czas oczekiwania: 24-72h"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ostatnie publikacje</CardTitle>
            <CardDescription>Twoja najnowsza aktywność wydawnicza</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center text-muted-foreground">Ładowanie...</div>
            ) : publications.length === 0 ? (
              <div className="text-center text-muted-foreground">Brak publikacji do wyświetlenia</div>
            ) : (
              publications.map((publication) => {
                const status = statusConfig[publication.status as keyof typeof statusConfig] || statusConfig.pending
                const StatusIcon = status.icon
                
                return (
                  <div key={publication.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium">{publication.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(publication.created_at).toLocaleDateString('pl-PL')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{publication.download_count || 0} pobrań</span>
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
              Prześlij nową publikację
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <TrendingUp className="w-4 h-4" />
              Zobacz statystyki sprzedaży
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <DollarSign className="w-4 h-4" />
              Zarządzaj tantiemami
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <BookOpen className="w-4 h-4" />
              Edytuj profil autora
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Powiadomienia</CardTitle>
          <CardDescription>Ważne informacje od HardbanRecords Digital Publishing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Publikacja "Marketing dla Autorów" została zatwierdzona!</h4>
                <p className="text-sm text-green-700">Twoja książka przeszła weryfikację i zostanie opublikowana w ciągu 24 godzin na wszystkich platformach.</p>
                <span className="text-xs text-green-600">1 godzina temu</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Nowy edytor AI dostępny!</h4>
                <p className="text-sm text-blue-700">Sprawdź nowe narzędzia do generowania okładek i opisów książek w sekcji tworzenia publikacji.</p>
                <span className="text-xs text-blue-600">2 dni temu</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}