import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, Users, TrendingUp } from "lucide-react"
import { StatsCard } from "@/components/StatsCard"

export default function AdminDigitalPublications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Publikacje Cyfrowe
          </h1>
          <p className="text-muted-foreground">
            Zarządzanie publikacjami cyfrowymi autorów
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Wszystkie publikacje"
          value="0"
          description="Łączna liczba publikacji"
          icon={<FileText className="w-4 h-4" />}
        />
        <StatsCard
          title="Aktywni autorzy"
          value="0"
          description="Autorzy z publikacjami"
          icon={<Users className="w-4 h-4" />}
        />
        <StatsCard
          title="Pobrania"
          value="0"
          description="Łączne pobrania"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatsCard
          title="Przychody"
          value="0 zł"
          description="Miesięczne przychody"
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Funkcjonalność w rozwoju</CardTitle>
          <CardDescription>
            Moduł publikacji cyfrowych będzie dostępny wkrótce
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Ta sekcja jest obecnie w fazie rozwoju. Będzie zawierać:
          </p>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Zarządzanie publikacjami autorów</li>
            <li>System dystrybucji e-książek</li>
            <li>Analityka sprzedaży</li>
            <li>Narzędzia promocyjne</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}