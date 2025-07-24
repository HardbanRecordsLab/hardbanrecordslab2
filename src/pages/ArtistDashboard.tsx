import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/StatsCard"
import { Music, Upload, TrendingUp, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const trackStatuses = [
  { id: 1, title: "Nocny Lot", status: "published", date: "2024-01-15", streams: "12,453" },
  { id: 2, title: "Miasto Świateł", status: "pending", date: "2024-01-20", streams: "0" },
  { id: 3, title: "Elektroniczny Sen", status: "approved", date: "2024-01-18", streams: "8,234" },
]

const statusConfig = {
  published: { label: "Opublikowany", color: "bg-green-500", icon: CheckCircle },
  pending: { label: "Oczekuje", color: "bg-yellow-500", icon: Clock },
  approved: { label: "Zatwierdzony", color: "bg-blue-500", icon: CheckCircle },
  rejected: { label: "Odrzucony", color: "bg-red-500", icon: AlertCircle },
}

export default function ArtistDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Witaj ponownie, <span className="text-primary">DJ Soundwave</span>! 👋
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
          value="23"
          change={15}
          icon={<Music className="w-4 h-4" />}
          description="W tym miesiącu: 3"
        />
        <StatsCard
          title="Łączne odsłuchania"
          value="124,567"
          change={8.2}
          icon={<TrendingUp className="w-4 h-4" />}
          description="Ostatnie 30 dni"
        />
        <StatsCard
          title="Tantiemy"
          value="$342.15"
          change={-2.1}
          icon={<DollarSign className="w-4 h-4" />}
          description="Do wypłaty"
        />
        <StatsCard
          title="Na weryfikacji"
          value="2"
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
            {trackStatuses.map((track) => {
              const status = statusConfig[track.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              
              return (
                <div key={track.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <Music className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{track.title}</h4>
                      <p className="text-sm text-muted-foreground">{track.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{track.streams} odtworzeń</span>
                    <Badge variant="secondary" className="gap-1">
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </Badge>
                  </div>
                </div>
              )
            })}
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