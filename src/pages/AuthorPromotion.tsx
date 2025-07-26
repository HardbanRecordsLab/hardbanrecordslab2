import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Megaphone, TrendingUp, Target, Users, DollarSign, Eye, BookOpen, Star, Calendar, BarChart3, Play, PenTool } from "lucide-react"

const campaigns = [
  {
    name: "Nocne Opowieści - Launch Campaign",
    type: "book_launch",
    status: "active",
    budget: "$500",
    spent: "$342",
    impressions: "45,234",
    clicks: "1,245",
    conversions: "89",
    roi: "156%",
    endDate: "2024-02-15"
  },
  {
    name: "Miasto Marzeń - Retargeting",
    type: "retargeting", 
    status: "active",
    budget: "$200",
    spent: "$156",
    impressions: "23,456",
    clicks: "789",
    conversions: "34",
    roi: "123%",
    endDate: "2024-02-20"
  },
  {
    name: "Krótkie Opowiadania - Social Media",
    type: "social_media",
    status: "paused",
    budget: "$300",
    spent: "$245",
    impressions: "67,891",
    clicks: "2,345",
    conversions: "156",
    roi: "89%",
    endDate: "2024-01-30"
  },
]

const socialPlatforms = [
  {
    name: "Facebook & Instagram",
    followers: "12,345",
    engagement: "4.2%",
    posts: 45,
    reach: "89,234",
    status: "active"
  },
  {
    name: "Goodreads",
    followers: "3,456", 
    engagement: "8.7%",
    posts: 23,
    reach: "15,678",
    status: "active"
  },
  {
    name: "BookBub",
    followers: "8,901",
    engagement: "6.3%",
    posts: 12,
    reach: "45,123",
    status: "active"
  },
  {
    name: "TikTok",
    followers: "5,678",
    engagement: "12.4%",
    posts: 34,
    reach: "123,456",
    status: "active"
  },
]

const bookClubs = [
  {
    name: "Virtual Book Club Network",
    members: "15,000",
    genre: "Fantasy",
    status: "featured",
    book: "Nocne Opowieści",
    readingDate: "2024-02-15"
  },
  {
    name: "Polish Literature Circle",
    members: "3,500",
    genre: "Literary Fiction", 
    status: "submitted",
    book: "Miasto Marzeń",
    readingDate: "2024-03-01"
  },
  {
    name: "Young Adult Book Society",
    members: "8,200",
    genre: "YA Fiction",
    status: "pending",
    book: "Krótkie Opowiadania",
    readingDate: "2024-03-15"
  },
]

const influencers = [
  {
    name: "BookReviewer Sarah",
    platform: "YouTube",
    followers: "45,000",
    engagement: "7.8%",
    category: "Book Reviews",
    status: "collaborated",
    book: "Nocne Opowieści",
    views: "12,345"
  },
  {
    name: "Literary_Tom",
    platform: "Instagram", 
    followers: "23,000",
    engagement: "9.2%",
    category: "Bookstagram",
    status: "contacted",
    book: "Miasto Marzeń",
    views: "0"
  },
  {
    name: "PolishBooks",
    platform: "TikTok",
    followers: "67,000",
    engagement: "15.3%",
    category: "Book Recommendations",
    status: "negotiating",
    book: "Krótkie Opowiadania", 
    views: "0"
  },
]

const statusConfig = {
  active: { label: "Aktywna", color: "text-green-600", bg: "bg-green-50" },
  paused: { label: "Wstrzymana", color: "text-yellow-600", bg: "bg-yellow-50" },
  featured: { label: "Polecana", color: "text-green-600", bg: "bg-green-50" },
  submitted: { label: "Zgłoszona", color: "text-blue-600", bg: "bg-blue-50" },
  pending: { label: "Oczekuje", color: "text-yellow-600", bg: "bg-yellow-50" },
  collaborated: { label: "Współpraca", color: "text-green-600", bg: "bg-green-50" },
  contacted: { label: "Skontaktowano", color: "text-blue-600", bg: "bg-blue-50" },
  negotiating: { label: "Negocjacje", color: "text-orange-600", bg: "bg-orange-50" },
}

export default function AuthorPromotion() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Promocja i Marketing</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj kampaniami marketingowymi i promocją swoich publikacji
          </p>
        </div>
        <Button className="gap-2">
          <Megaphone className="w-4 h-4" />
          Nowa Kampania
        </Button>
      </div>

      {/* Marketing Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Przegląd Marketingu
          </CardTitle>
          <CardDescription>Podsumowanie wszystkich aktywnych kampanii promocyjnych</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">5</div>
              <div className="text-sm text-muted-foreground">Aktywne kampanie</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">$743</div>
              <div className="text-sm text-muted-foreground">Wydane środki</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">136K</div>
              <div className="text-sm text-muted-foreground">Impressions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">134%</div>
              <div className="text-sm text-muted-foreground">Średni ROI</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Kampanie Reklamowe</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="clubs">Kluby Książki</TabsTrigger>
          <TabsTrigger value="influencers">Influencerzy</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kampanie Reklamowe</CardTitle>
              <CardDescription>Płatne kampanie na Google Ads, Facebook, Amazon i innych platformach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {campaigns.map((campaign, index) => {
                  const status = statusConfig[campaign.status as keyof typeof statusConfig]
                  const progressPercentage = (parseFloat(campaign.spent.replace('$', '')) / parseFloat(campaign.budget.replace('$', ''))) * 100
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <Target className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{campaign.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {campaign.type.replace('_', ' ')} | Kończy: {campaign.endDate}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Budżet: {campaign.spent} / {campaign.budget}</span>
                          <span className="text-sm font-medium">{progressPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Impressions: </span>
                            <span className="text-muted-foreground">{campaign.impressions}</span>
                          </div>
                          <div>
                            <span className="font-medium">Clicks: </span>
                            <span className="text-muted-foreground">{campaign.clicks}</span>
                          </div>
                          <div>
                            <span className="font-medium">Konwersje: </span>
                            <span className="text-muted-foreground">{campaign.conversions}</span>
                          </div>
                          <div>
                            <span className="font-medium">ROI: </span>
                            <span className="text-accent font-medium">{campaign.roi}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-3 h-3 mr-1" />
                          Analityka
                        </Button>
                        <Button variant="outline" size="sm">
                          <PenTool className="w-3 h-3 mr-1" />
                          Edytuj
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Zarządzanie profilami społecznościowymi i organiczną promocją</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {socialPlatforms.map((platform, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">{platform.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {platform.followers} obserwujących
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-green-600 bg-green-50">
                        Aktywny
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Engagement: </span>
                        <span className="text-accent font-medium">{platform.engagement}</span>
                      </div>
                      <div>
                        <span className="font-medium">Posty (30d): </span>
                        <span className="text-muted-foreground">{platform.posts}</span>
                      </div>
                      <div>
                        <span className="font-medium">Zasięg: </span>
                        <span className="text-muted-foreground">{platform.reach}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clubs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kluby Książki</CardTitle>
              <CardDescription>Promocja przez kluby czytelnicze i społeczności literackie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {bookClubs.map((club, index) => {
                  const status = statusConfig[club.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{club.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {club.members} członków | {club.genre}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Książka: </span>
                          <span className="text-muted-foreground">{club.book}</span>
                        </div>
                        <div>
                          <span className="font-medium">Data czytania: </span>
                          <span className="text-muted-foreground">{club.readingDate}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="influencers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Współpraca z Influencerami</CardTitle>
              <CardDescription>Marketing przez influencerów i recenzentów książek</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {influencers.map((influencer, index) => {
                  const status = statusConfig[influencer.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <Star className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{influencer.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {influencer.platform} | {influencer.followers} obserwujących
                            </p>
                            <p className="text-xs text-muted-foreground">{influencer.category}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Engagement: </span>
                          <span className="text-accent font-medium">{influencer.engagement}</span>
                        </div>
                        <div>
                          <span className="font-medium">Książka: </span>
                          <span className="text-muted-foreground">{influencer.book}</span>
                        </div>
                        <div>
                          <span className="font-medium">Wyświetlenia: </span>
                          <span className="text-muted-foreground">{influencer.views || "Brak danych"}</span>
                        </div>
                      </div>
                      
                      {influencer.status === "collaborated" && (
                        <div className="mt-3 flex justify-end">
                          <Button variant="outline" size="sm">
                            <Play className="w-3 h-3 mr-1" />
                            Zobacz recenzję
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}