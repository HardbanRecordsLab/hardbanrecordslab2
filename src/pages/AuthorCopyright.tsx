import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, CheckCircle, Clock, AlertTriangle, Eye, FileText, Globe, Zap, Lock } from "lucide-react"

const copyrightRegistrations = [
  { 
    title: "Nocne Opowieści", 
    status: "registered", 
    registrationNumber: "TXu002-156-789", 
    date: "2024-01-15",
    country: "USA",
    type: "Literary Work"
  },
  { 
    title: "Miasto Marzeń", 
    status: "pending", 
    registrationNumber: "Pending", 
    date: "2024-01-20",
    country: "USA",
    type: "Literary Work"
  },
  { 
    title: "Krótkie Opowiadania", 
    status: "registered", 
    registrationNumber: "TXu002-156-790", 
    date: "2024-01-10",
    country: "USA",
    type: "Collection"
  },
]

const protectionSystems = [
  {
    name: "Digital Watermarking",
    status: "active",
    description: "Niewidoczne znaki wodne w plikach cyfrowych",
    coverage: "Wszystkie formaty",
    detections: 5
  },
  {
    name: "DRM Protection",
    status: "active", 
    description: "Ochrona przed nieautoryzowanym kopiowaniem",
    coverage: "EPUB, PDF",
    detections: 0
  },
  {
    name: "Content Fingerprinting",
    status: "active",
    description: "Automatyczne wykrywanie kopii w internecie",
    coverage: "Globalne",
    detections: 12
  },
  {
    name: "Plagiarism Detection",
    status: "active",
    description: "Skanowanie w poszukiwaniu plagiatów",
    coverage: "Wielojęzyczne",
    detections: 3
  },
]

const organizations = [
  { name: "Copyright Office (USA)", status: "registered", id: "TXu002-156" },
  { name: "ALCS (UK)", status: "pending", id: "Pending" },
  { name: "VG Wort (Germany)", status: "registered", id: "VG-7891234" },
  { name: "ZAIKS (Poland)", status: "registered", id: "ZAI-5678901" },
]

const recentAlerts = [
  {
    type: "unauthorized_copy",
    title: "Wykryto nieautoryzowaną kopię",
    book: "Nocne Opowieści",
    platform: "Nieznana strona",
    action: "Wysłano żądanie usunięcia",
    date: "2024-01-20"
  },
  {
    type: "plagiarism",
    title: "Potencjalny plagiat",
    book: "Miasto Marzeń",
    platform: "Blog literacki", 
    action: "Wymaga weryfikacji",
    date: "2024-01-19"
  },
  {
    type: "dmca_success",
    title: "Pomyślne usunięcie DMCA",
    book: "Krótkie Opowiadania",
    platform: "Forum literackie",
    action: "Treść usunięta",
    date: "2024-01-18"
  },
]

const statusConfig = {
  registered: { label: "Zarejestrowane", color: "bg-green-500", icon: CheckCircle },
  pending: { label: "Oczekuje", color: "bg-yellow-500", icon: Clock },
  active: { label: "Aktywny", color: "bg-green-500", icon: CheckCircle },
  unauthorized_copy: { label: "Nielegalna kopia", color: "bg-red-500", icon: AlertTriangle },
  plagiarism: { label: "Plagiat", color: "bg-orange-500", icon: Eye },
  dmca_success: { label: "DMCA - sukces", color: "bg-green-500", icon: CheckCircle },
}

export default function AuthorCopyright() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ochrona Praw Autorskich</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj rejestracją praw autorskich i monitoruj ochronę swoich publikacji
          </p>
        </div>
        <Button className="gap-2">
          <Shield className="w-4 h-4" />
          Nowa Rejestracja
        </Button>
      </div>

      {/* Protection Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Przegląd Ochrony
          </CardTitle>
          <CardDescription>Status ochrony praw autorskich i monitoringu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">12</div>
              <div className="text-sm text-muted-foreground">Chronione publikacje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-muted-foreground">Zarejestrowane prawa</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">20</div>
              <div className="text-sm text-muted-foreground">Wykryte naruszenia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-muted-foreground">Pomyślne usunięcia</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="registrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="registrations">Rejestracje</TabsTrigger>
          <TabsTrigger value="protection">Systemy Ochrony</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="organizations">Organizacje PRO</TabsTrigger>
        </TabsList>

        <TabsContent value="registrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejestracje Praw Autorskich</CardTitle>
              <CardDescription>Status rejestracji w Copyright Office i innych organizacjach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {copyrightRegistrations.map((registration, index) => {
                  const status = statusConfig[registration.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">{registration.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {registration.registrationNumber} | {registration.type}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {registration.country} | {registration.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <FileText className="w-3 h-3 mr-1" />
                          Certyfikat
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Systemy Ochrony</CardTitle>
              <CardDescription>Aktywne technologie ochrony przed naruszeniami</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {protectionSystems.map((system, index) => {
                  const status = statusConfig[system.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <Lock className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{system.name}</h4>
                            <p className="text-sm text-muted-foreground">{system.description}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Zasięg: </span>
                          <span className="text-muted-foreground">{system.coverage}</span>
                        </div>
                        <div>
                          <span className="font-medium">Wykrycia (30 dni): </span>
                          <span className="text-accent font-medium">{system.detections}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Naruszeń</CardTitle>
              <CardDescription>Ostatnie alerty i działania ochronne</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => {
                  const status = statusConfig[alert.type as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-50 rounded-lg flex items-center justify-center">
                          <StatusIcon className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{alert.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {alert.book} | {alert.platform}
                          </p>
                          <p className="text-xs text-muted-foreground">{alert.action}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-medium">{alert.date}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Szczegóły
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organizations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organizacje PRO</CardTitle>
              <CardDescription>Status rejestracji w organizacjach zarządzających prawami autorskimi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {organizations.map((org, index) => {
                  const status = statusConfig[org.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                          <Globe className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">{org.name}</h4>
                          <p className="text-sm text-muted-foreground">ID: {org.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Zap className="w-3 h-3 mr-1" />
                          Zarządzaj
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6 p-4 bg-accent/5 rounded-lg">
                <h4 className="font-medium mb-2">Automatyczna ochrona obejmuje:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div>• Monitoring sieci w czasie rzeczywistym</div>
                  <div>• Automatyczne żądania usunięcia DMCA</div>
                  <div>• Detekcja plagiatów AI-powered</div>
                  <div>• Ochrona międzynarodowa</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}