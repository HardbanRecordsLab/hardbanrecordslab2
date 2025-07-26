import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, CheckCircle, Clock, AlertCircle, Download, Upload, BookOpen, ExternalLink, Printer } from "lucide-react"

const distributionPlatforms = [
  { name: "Amazon KDP", status: "active", sales: "2,234", revenue: "$1,432.15", lastUpdate: "2024-01-15" },
  { name: "Apple Books", status: "active", sales: "1,432", revenue: "$967.89", lastUpdate: "2024-01-15" },
  { name: "Google Play Books", status: "active", sales: "891", revenue: "$603.67", lastUpdate: "2024-01-15" },
  { name: "Draft2Digital", status: "pending", sales: "0", revenue: "$0.00", lastUpdate: "2024-01-20" },
  { name: "Kobo", status: "active", sales: "567", revenue: "$370.37", lastUpdate: "2024-01-15" },
  { name: "Smashwords", status: "active", sales: "345", revenue: "$237.04", lastUpdate: "2024-01-15" },
  { name: "Empik", status: "inactive", sales: "0", revenue: "$0.00", lastUpdate: "N/A" },
  { name: "Scribd", status: "active", sales: "789", revenue: "$203.70", lastUpdate: "2024-01-15" },
]

const printOnDemandPlatforms = [
  { name: "IngramSpark", status: "active", orders: "156", revenue: "$892.45", format: "Paperback + Hardcover" },
  { name: "BookBaby", status: "active", orders: "89", revenue: "$567.23", format: "Paperback" },
  { name: "Blurb", status: "pending", orders: "0", revenue: "$0.00", format: "Photo Books" },
]

const digitalBundles = [
  { 
    id: 1, 
    title: "Nocne Opowieści - Complete Package", 
    includes: ["EPUB", "PDF", "MOBI", "Audiobook MP3", "Bonus Chapter"],
    platforms: ["Gumroad", "Payhip", "Sellfy"],
    sales: 78,
    revenue: "$389.50"
  },
  { 
    id: 2, 
    title: "Miasto Marzeń - Deluxe Edition", 
    includes: ["Enhanced EPUB", "PDF", "Character Guide", "Author Commentary"],
    platforms: ["Gumroad", "Itch.io"],
    sales: 45,
    revenue: "$225.00"
  }
]

const statusConfig = {
  active: { label: "Aktywny", color: "bg-green-500", icon: CheckCircle },
  pending: { label: "Oczekuje", color: "bg-yellow-500", icon: Clock },
  inactive: { label: "Nieaktywny", color: "bg-gray-500", icon: AlertCircle },
}

export default function AuthorDistribution() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dystrybucja Cyfrowa</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj dystrybucją swoich publikacji na globalnych platformach
          </p>
        </div>
        <Button className="gap-2">
          <Globe className="w-4 h-4" />
          Nowa Dystrybucja
        </Button>
      </div>

      {/* Distribution Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Przegląd Dystrybucji
          </CardTitle>
          <CardDescription>Status dystrybucji na wszystkich platformach</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">18</div>
              <div className="text-sm text-muted-foreground">Aktywne platformy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-muted-foreground">Oczekujące</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94.7%</div>
              <div className="text-sm text-muted-foreground">Skuteczność</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">$3,847.23</div>
              <div className="text-sm text-muted-foreground">Całkowity przychód</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ebooks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ebooks">E-booki & Audiobooki</TabsTrigger>
          <TabsTrigger value="print">Print-on-Demand</TabsTrigger>
          <TabsTrigger value="bundles">Digital Bundles</TabsTrigger>
        </TabsList>

        <TabsContent value="ebooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platformy Cyfrowe (20+ DSP)</CardTitle>
              <CardDescription>Status dystrybucji na głównych platformach sprzedażowych</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {distributionPlatforms.map((platform) => {
                  const status = statusConfig[platform.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={platform.name} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">{platform.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {platform.sales} sprzedaży | {platform.revenue}
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

        <TabsContent value="print" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Print-on-Demand Services</CardTitle>
              <CardDescription>Dystrybucja książek drukowanych na żądanie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 mb-6">
                {printOnDemandPlatforms.map((platform) => {
                  const status = statusConfig[platform.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={platform.name} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                          <Printer className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">{platform.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {platform.orders} zamówień | {platform.revenue}
                          </p>
                          <p className="text-xs text-muted-foreground">{platform.format}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Panel
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Dostępne formaty druku:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Paperback (6x9")</Badge>
                  <Badge variant="outline">Hardcover (6x9")</Badge>
                  <Badge variant="outline">A4 Magazine</Badge>
                  <Badge variant="outline">Photo Book</Badge>
                  <Badge variant="outline">Large Format</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bundles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Bundles</CardTitle>
              <CardDescription>Pakiety cyfrowe z dodatkami (bonus materials, multimedia)</CardDescription>
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