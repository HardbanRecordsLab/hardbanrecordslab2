import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, Activity, Eye, Clock } from "lucide-react"
import { StatsCard } from "@/components/StatsCard"

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="w-8 h-8" />
            Analityka Platformy
          </h1>
          <p className="text-muted-foreground">
            Szczegółowe statystyki i analityka użytkowania platformy
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Odwiedziny dzisiaj"
          value="0"
          description="Dzisiejsze sesje użytkowników"
          icon={<Eye className="w-4 h-4" />}
        />
        <StatsCard
          title="Aktywni użytkownicy"
          value="0"
          description="Aktywni w ostatnich 24h"
          icon={<Users className="w-4 h-4" />}
        />
        <StatsCard
          title="Średni czas sesji"
          value="0 min"
          description="Średnia długość sesji"
          icon={<Clock className="w-4 h-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Ruch na stronie
            </CardTitle>
            <CardDescription>
              Statystyki odwiedzin w ostatnich 30 dniach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              Wykres ruchu będzie dostępny wkrótce
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Aktywność użytkowników
            </CardTitle>
            <CardDescription>
              Analiza zachowań użytkowników
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Rejestracje</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Logowania</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Przesłane projekty</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Utworzone kursy</span>
                <span className="text-sm font-medium">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Najpopularniejsze strony</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4 text-muted-foreground text-sm">
              Brak danych
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Źródła ruchu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4 text-muted-foreground text-sm">
              Brak danych
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urządzenia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4 text-muted-foreground text-sm">
              Brak danych
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informacja</CardTitle>
          <CardDescription>
            O module analityki
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Moduł analityki jest obecnie w fazie rozwoju. W przyszłości będzie zawierał:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Szczegółowe wykresy ruchu na stronie</li>
            <li>Analitykę zachowań użytkowników</li>
            <li>Raporty konwersji</li>
            <li>Śledzenie celów biznesowych</li>
            <li>Segmentację użytkowników</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}