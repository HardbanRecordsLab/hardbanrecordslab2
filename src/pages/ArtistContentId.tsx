import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Eye, DollarSign, Youtube, Facebook, Instagram, Music2, TrendingUp, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react"

const contentIdPlatforms = [
  {
    name: "YouTube Content ID",
    icon: Youtube,
    enabled: true,
    claims: 245,
    revenue: "$1,234.56",
    policy: "monetize",
    description: "Automatyczne rozpoznawanie i monetyzacja w YouTube"
  },
  {
    name: "Facebook Rights Manager",
    icon: Facebook,
    enabled: true,
    claims: 89,
    revenue: "$456.78",
    policy: "track",
    description: "Ochrona treści na Facebook i Instagram"
  },
  {
    name: "Instagram Music",
    icon: Instagram,
    enabled: false,
    claims: 0,
    revenue: "$0.00",
    policy: "block",
    description: "Licencjonowanie dla Stories i Reels"
  },
  {
    name: "TikTok Sound Library",
    icon: Music2,
    enabled: true,
    claims: 156,
    revenue: "$789.23",
    policy: "monetize",
    description: "Dystrybucja do TikTok Commercial Music Library"
  },
  {
    name: "CapCut Integration",
    icon: Music2,
    enabled: true,
    claims: 67,
    revenue: "$234.56",
    policy: "monetize",
    description: "Biblioteka muzyczna dla twórców wideo"
  },
  {
    name: "SoundCloud Fingerprint",
    icon: Music2,
    enabled: false,
    claims: 12,
    revenue: "$45.67",
    policy: "track",
    description: "Rozpoznawanie na SoundCloud"
  }
]

const recentClaims = [
  {
    id: 1,
    title: "Nocny Lot",
    platform: "YouTube",
    type: "Video używa audio",
    views: "45.2K",
    revenue: "$23.45",
    status: "monetized",
    date: "2024-01-18"
  },
  {
    id: 2,
    title: "Miasto Świateł",
    platform: "TikTok",
    type: "Commercial use",
    views: "123.4K",
    revenue: "$67.89",
    status: "monetized",
    date: "2024-01-17"
  },
  {
    id: 3,
    title: "Elektroniczny Sen",
    platform: "Facebook",
    type: "Post background",
    views: "12.1K",
    revenue: "$8.90",
    status: "tracked",
    date: "2024-01-16"
  },
  {
    id: 4,
    title: "Nocny Lot",
    platform: "Instagram",
    type: "Story audio",
    views: "8.7K",
    revenue: "$12.34",
    status: "pending",
    date: "2024-01-15"
  }
]

const fingerprintingStats = {
  totalTracks: 23,
  protectedTracks: 20,
  detectionRate: 99.7,
  falsePositives: 0.1,
  processingTime: "< 2 min"
}

const statusConfig = {
  monetized: { label: "Monetyzowany", color: "text-green-600", bg: "bg-green-50" },
  tracked: { label: "Śledzony", color: "text-blue-600", bg: "bg-blue-50" },
  pending: { label: "Oczekuje", color: "text-yellow-600", bg: "bg-yellow-50" },
  blocked: { label: "Zablokowany", color: "text-red-600", bg: "bg-red-50" },
}

const policyConfig = {
  monetize: { label: "Monetyzuj", color: "text-green-600" },
  track: { label: "Śledź", color: "text-blue-600" },
  block: { label: "Blokuj", color: "text-red-600" },
}

export default function ArtistContentId() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content ID & UGC</h1>
          <p className="text-muted-foreground mt-1">
            Rozpoznawanie treści i ochrona praw autorskich na platformach UGC
          </p>
        </div>
        <Button className="gap-2">
          <Shield className="w-4 h-4" />
          Konfiguruj Ochronę
        </Button>
      </div>

      {/* Fingerprinting Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            System Fingerprinting
          </CardTitle>
          <CardDescription>Automatyczne rozpoznawanie utworów i ochrona praw autorskich</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{fingerprintingStats.totalTracks}</div>
              <div className="text-sm text-muted-foreground">Utwory w systemie</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{fingerprintingStats.protectedTracks}</div>
              <div className="text-sm text-muted-foreground">Chronione</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{fingerprintingStats.detectionRate}%</div>
              <div className="text-sm text-muted-foreground">Skuteczność</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{fingerprintingStats.falsePositives}%</div>
              <div className="text-sm text-muted-foreground">Fałszywe alarmy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{fingerprintingStats.processingTime}</div>
              <div className="text-sm text-muted-foreground">Czas analizy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="platforms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="platforms">Platformy UGC</TabsTrigger>
          <TabsTrigger value="claims">Ostatnie Claims</TabsTrigger>
          <TabsTrigger value="analytics">Analityka</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid gap-4">
            {contentIdPlatforms.map((platform) => {
              const IconComponent = platform.icon
              const policy = policyConfig[platform.policy as keyof typeof policyConfig]
              
              return (
                <Card key={platform.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{platform.name}</h3>
                          <p className="text-sm text-muted-foreground">{platform.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{platform.claims} claims</span>
                            <Badge variant="outline" className={policy.color}>
                              {policy.label}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">{platform.revenue}</div>
                        </div>
                        <Switch checked={platform.enabled} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ostatnie Claims i Wykrycia</CardTitle>
              <CardDescription>Historia rozpoznanych wykorzystań Twoich utworów</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClaims.map((claim) => {
                  const status = statusConfig[claim.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={claim.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                          <Music2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{claim.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {claim.platform} • {claim.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{claim.views}</span>
                          </div>
                          <div className="text-sm text-green-600 font-medium">{claim.revenue}</div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`${status.color} ${status.bg}`}
                        >
                          {status.label}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{claim.date}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Wykrycia w czasie</CardTitle>
                <CardDescription>Trend wykrywania użycia Twoich utworów</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  [Wykres wykryć w czasie - 7 dni]
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Przychody z UGC</CardTitle>
                <CardDescription>Zarobki z monetyzacji treści</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  [Wykres przychodów z platform UGC]
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Najpopularniejsze platformy</CardTitle>
                <CardDescription>Gdzie Twoja muzyka jest najczęściej używana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">YouTube</span>
                  <div className="flex items-center gap-2">
                    <Progress value={75} className="w-20" />
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">TikTok</span>
                  <div className="flex items-center gap-2">
                    <Progress value={45} className="w-20" />
                    <span className="text-sm font-medium">45%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Facebook</span>
                  <div className="flex items-center gap-2">
                    <Progress value={30} className="w-20" />
                    <span className="text-sm font-medium">30%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Instagram</span>
                  <div className="flex items-center gap-2">
                    <Progress value={25} className="w-20" />
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Polityki Content ID</CardTitle>
                <CardDescription>Jak obsługiwane są wykrycia</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Monetyzuj</span>
                  </div>
                  <span className="text-sm font-medium">85% utworów</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Śledź</span>
                  </div>
                  <span className="text-sm font-medium">10% utworów</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Blokuj</span>
                  </div>
                  <span className="text-sm font-medium">5% utworów</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}