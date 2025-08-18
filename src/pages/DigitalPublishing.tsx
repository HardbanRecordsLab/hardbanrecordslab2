import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Upload, TrendingUp, DollarSign } from "lucide-react"

export default function DigitalPublishing() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Digital Publishing
          </h1>
          <p className="text-muted-foreground">
            Publikuj e-booki, audiobooki i inne treści cyfrowe.
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Nowa Publikacja
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Moje Publikacje</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Opublikowane pozycje</p>
            </CardContent>
          </Card>
            <Card>
              <CardHeader>
            <CardTitle>Sprzedaż (30 dni)</CardTitle>
              </CardHeader>
              <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15% vs poprzedni miesiąc</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
            <CardTitle>Przychody (30 dni)</CardTitle>
              </CardHeader>
              <CardContent>
            <div className="text-2xl font-bold">5,678 PLN</div>
            <p className="text-xs text-muted-foreground">+20% vs poprzedni miesiąc</p>
              </CardContent>
            </Card>
          <Card>
            <CardHeader>
            <CardTitle>Średnia Ocena</CardTitle>
            </CardHeader>
                    <CardContent>
            <div className="text-2xl font-bold">4.8 ★</div>
            <p className="text-xs text-muted-foreground">Na podstawie 567 recenzji</p>
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
            <li>Kreator publikacji (e-book, audiobook)</li>
            <li>Zarządzanie dystrybucją do Amazon KDP, Apple Books, etc.</li>
            <li>Szczegółowa analityka sprzedaży</li>
            <li>Zarządzanie prawami autorskimi i ISBN</li>
            <li>Narzędzia promocyjne i marketingowe</li>
          </ul>
                  </CardContent>
                </Card>
              </div>
  )
}
