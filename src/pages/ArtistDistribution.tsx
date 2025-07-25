import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, CheckCircle, Clock, AlertCircle, Download, Upload, Music, ExternalLink } from "lucide-react"

const distributionPlatforms = [
  { name: "Spotify", status: "active", streams: "145,234", revenue: "$432.15", lastUpdate: "2024-01-15" },
  { name: "Apple Music", status: "active", streams: "89,432", revenue: "$267.89", lastUpdate: "2024-01-15" },
  { name: "YouTube Music", status: "active", streams: "67,891", revenue: "$203.67", lastUpdate: "2024-01-15" },
  { name: "Amazon Music", status: "pending", streams: "0", revenue: "$0.00", lastUpdate: "2024-01-20" },
  { name: "Deezer", status: "active", streams: "23,456", revenue: "$70.37", lastUpdate: "2024-01-15" },
  { name: "TIDAL", status: "active", streams: "12,345", revenue: "$37.04", lastUpdate: "2024-01-15" },
  { name: "Napster", status: "inactive", streams: "0", revenue: "$0.00", lastUpdate: "N/A" },
  { name: "Pandora", status: "active", streams: "34,567", revenue: "$103.70", lastUpdate: "2024-01-15" },
]

const routeNoteIntegration = {
  status: "connected",
  lastSync: "2024-01-20 14:30",
  totalDistributed: 23,
  pendingDistribution: 2,
  successRate: 95.6
}

const digitalBundles = [
  { 
    id: 1, 
    title: "Nocny Lot - Complete Package", 
    includes: ["Audio WAV", "Audio MP3", "Lyrics PDF", "Cover Art", "MIDI Files"],
    platforms: ["iTunes", "Amazon Music", "Bandcamp"],
    sales: 45,
    revenue: "$225.00"
  },
  { 
    id: 2, 
    title: "Miasto Świateł - Deluxe", 
    includes: ["Audio FLAC", "Audio MP3", "Making Of PDF", "Cover Art", "Stems"],
    platforms: ["iTunes", "Qobuz", "Bandcamp"],
    sales: 23,
    revenue: "$115.00"
  }
]

const statusConfig = {
  active: { label: "Aktywny", color: "bg-green-500", icon: CheckCircle },
  pending: { label: "Oczekuje", color: "bg-yellow-500", icon: Clock },
  inactive: { label: "Nieaktywny", color: "bg-gray-500", icon: AlertCircle },
}

export default function ArtistDistribution() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dystrybucja Muzyki</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj dystrybucją swoich utworów na globalnych platformach
          </p>
        </div>
        <Button className="gap-2">
          <Globe className="w-4 h-4" />
          Nowa Dystrybucja
        </Button>
      </div>

      {/* RouteNote Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Integracja RouteNote
          </CardTitle>
          <CardDescription>Status połączenia z głównym partnerem dystrybucji</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium">Połączono</span>
            </div>
            <Badge variant="secondary">Ostatnia synchronizacja: {routeNoteIntegration.lastSync}</Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{routeNoteIntegration.totalDistributed}</div>
              <div className="text-sm text-muted-foreground">Dystrybuowane utwory</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{routeNoteIntegration.pendingDistribution}</div>
              <div className="text-sm text-muted-foreground">Oczekujące</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{routeNoteIntegration.successRate}%</div>
              <div className="text-sm text-muted-foreground">Skuteczność</div>
            </div>
            <div className="text-center">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-3 h-3 mr-1" />
                RouteNote Panel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="platforms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="platforms">Platformy Streamingowe</TabsTrigger>
          <TabsTrigger value="downloads">Digital Downloads</TabsTrigger>
          <TabsTrigger value="bundles">Digital Bundles</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platformy Streamingowe (30+ DSP)</CardTitle>
              <CardDescription>Status dystrybucji na głównych platformach streamingowych</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {distributionPlatforms.map((platform) => {
                  const status = statusConfig[platform.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={platform.name} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                          <Music className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{platform.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {platform.streams} odtworzeń | {platform.revenue}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Ostatnia aktualizacja</p>
                          <p className="text-sm font-medium">{platform.lastUpdate}</p>
                        </div>
                        <Badge variant="secondary" className="gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Downloads</CardTitle>
              <CardDescription>Sprzedaż w formatach WAV/FLAC/MP3 na platformach downloadowych</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">523</div>
                  <div className="text-sm text-muted-foreground">iTunes Downloads</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">234</div>
                  <div className="text-sm text-muted-foreground">Amazon Music</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-muted-foreground">Qobuz (Hi-Res)</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">89</div>
                  <div className="text-sm text-muted-foreground">TIDAL (Download)</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Dostępne formaty:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">MP3 320kbps</Badge>
                  <Badge variant="outline">FLAC 24-bit</Badge>
                  <Badge variant="outline">WAV 24-bit/96kHz</Badge>
                  <Badge variant="outline">Hi-Res Audio</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bundles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Bundles</CardTitle>
              <CardDescription>Pakiety cyfrowe z dodatkami (PDF, okładki, MIDI)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {digitalBundles.map((bundle) => (
                <div key={bundle.id} className="p-4 rounded-lg border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{bundle.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {bundle.sales} sprzedaży | {bundle.revenue}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      Zarządzaj
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium mb-1">Zawartość pakietu:</p>
                      <div className="flex flex-wrap gap-1">
                        {bundle.includes.map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">{item}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Dostępne na:</p>
                      <div className="flex flex-wrap gap-1">
                        {bundle.platforms.map((platform, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{platform}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button className="w-full gap-2">
                <Upload className="w-4 h-4" />
                Utwórz Nowy Bundle
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}