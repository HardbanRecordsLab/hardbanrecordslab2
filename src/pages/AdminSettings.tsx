import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Settings, Save, Database, Shield, Mail, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettings() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Ustawienia zapisane",
      description: "Konfiguracja systemu została zaktualizowana"
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Ustawienia Systemu
          </h1>
          <p className="text-muted-foreground">
            Konfiguracja głównych parametrów platformy
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Zapisz zmiany
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Ustawienia ogólne
            </CardTitle>
            <CardDescription>
              Podstawowe parametry platformy
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Nazwa platformy</Label>
              <Input id="site-name" defaultValue="HardbanRecords Lab" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Opis platformy</Label>
              <Input id="site-description" defaultValue="Platforma dla twórców muzycznych i autorów" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email administratora</Label>
              <Input id="admin-email" type="email" defaultValue="admin@hardbanrecords.com" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Rejestracja otwarta</Label>
                <p className="text-sm text-muted-foreground">
                  Czy nowi użytkownicy mogą się rejestrować
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weryfikacja email</Label>
                <p className="text-sm text-muted-foreground">
                  Wymaga potwierdzenia adresu email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Bezpieczeństwo
            </CardTitle>
            <CardDescription>
              Ustawienia bezpieczeństwa i prywatności
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dwustopniowa autoryzacja</Label>
                <p className="text-sm text-muted-foreground">
                  Wymaga 2FA dla administratorów
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Logowanie aktywności</Label>
                <p className="text-sm text-muted-foreground">
                  Śledź działania użytkowników
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatyczne kopie zapasowe</Label>
                <p className="text-sm text-muted-foreground">
                  Codzienne backup bazy danych
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Timeout sesji (minuty)</Label>
              <Input id="session-timeout" type="number" defaultValue="120" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Konfiguracja email
            </CardTitle>
            <CardDescription>
              Ustawienia systemu mailowego
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-server">Serwer SMTP</Label>
              <Input id="smtp-server" defaultValue="smtp.hardbanrecords.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">Port SMTP</Label>
              <Input id="smtp-port" type="number" defaultValue="587" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-username">Nazwa użytkownika</Label>
              <Input id="smtp-username" defaultValue="noreply@hardbanrecords.com" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SSL/TLS</Label>
                <p className="text-sm text-muted-foreground">
                  Szyfrowanie połączenia
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Zarządzanie danymi
            </CardTitle>
            <CardDescription>
              Narzędzia administracyjne bazy danych
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Optymalizacja automatyczna</Label>
                <p className="text-sm text-muted-foreground">
                  Automatyczne optymalizacje bazy
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Czyszczenie logów</Label>
                <p className="text-sm text-muted-foreground">
                  Usuń stare logi co 30 dni
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Uruchom optymalizację bazy
              </Button>
              <Button variant="outline" className="w-full">
                Eksportuj dane użytkowników
              </Button>
              <Button variant="destructive" className="w-full">
                Wyczyść cache systemu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}