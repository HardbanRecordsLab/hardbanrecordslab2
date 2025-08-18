import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Upload, TrendingUp, DollarSign } from "lucide-react"

export default function MusicPublishing() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Music className="w-8 h-8" />
            Music Publishing
          </h1>
          <p className="text-muted-foreground">
            Dystrybuuj swoją muzykę na całym świecie i zarządzaj prawami.
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Nowe Wydanie
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Moje Utwory</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Opublikowane utwory</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
            <CardTitle>Odsłuchania (30 dni)</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">+12% vs poprzedni miesiąc</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
            <CardTitle>Tantiemy (30 dni)</CardTitle>
            </CardHeader>
                    <CardContent>
            <div className="text-2xl font-bold">3,456 PLN</div>
            <p className="text-xs text-muted-foreground">+8% vs poprzedni miesiąc</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
            <CardTitle>Platformy</CardTitle>
                    </CardHeader>
                    <CardContent>
            <div className="text-2xl font-bold">150+</div>
            <p className="text-xs text-muted-foreground">Aktywne kanały dystrybucji</p>
                    </CardContent>
                  </Card>
                </div>
                  <Card>
                    <CardHeader>
          <CardTitle>Funkcje wkrótce</CardTitle>
          <CardDescription>
            Ten moduł jest w trakcie budowy. Dostępne będą następujące funkcje:
          </CardDescription>
                    </CardHeader>
                    <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Kreator wydań muzycznych (single, EP, albumy)</li>
            <li>Zarządzanie dystrybucją do Spotify, Apple Music, etc.</li>
            <li>Szczegółowa analityka odsłuchań i przychodów</li>
            <li>Zarządzanie prawami autorskimi i ISRC/UPC</li>
            <li>Narzędzia promocyjne i pitching do playlist</li>
          </ul>
                    </CardContent>
                  </Card>
                </div>
  )
}
