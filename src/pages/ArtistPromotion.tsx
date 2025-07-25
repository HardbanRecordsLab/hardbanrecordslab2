import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Megaphone, Target, TrendingUp, Users, Calendar, Share2, ExternalLink, Play, Mail, Hash, DollarSign } from "lucide-react"

const campaigns = [
  {
    id: 1,
    name: "Nocny Lot - Launch Campaign",
    type: "Release Campaign",
    status: "active",
    budget: "$500",
    spent: "$234.56",
    impressions: "45.2K",
    clicks: "1.2K",
    conversions: "89",
    startDate: "2024-01-10",
    endDate: "2024-02-10",
    platforms: ["Spotify", "Instagram", "TikTok"]
  },
  {
    id: 2,
    name: "Miasto Świateł - Pre-Save",
    type: "Pre-Save Campaign",
    status: "completed",
    budget: "$200",
    spent: "$200.00",
    impressions: "23.1K",
    clicks: "567",
    conversions: "156",
    startDate: "2024-01-05",
    endDate: "2024-01-20",
    platforms: ["Facebook", "Google"]
  }
]

const playlistPitches = [
  {
    id: 1,
    playlist: "Polish Electronic Mix",
    curator: "Electronic PL",
    followers: "12.5K",
    genre: "Electronic",
    status: "accepted",
    submissionDate: "2024-01-15",
    track: "Nocny Lot"
  },
  {
    id: 2,
    playlist: "New Music Friday Poland",
    curator: "Spotify Editorial",
    followers: "456K",
    genre: "Electronic/Dance",
    status: "pending",
    submissionDate: "2024-01-18",
    track: "Miasto Świateł"
  },
  {
    id: 3,
    playlist: "Underground Beats",
    curator: "BeatCollective",
    followers: "8.9K",
    genre: "Electronic",
    status: "rejected",
    submissionDate: "2024-01-12",
    track: "Elektroniczny Sen"
  }
]

const socialMedia = {
  instagram: {
    followers: "2.4K",
    engagement: "3.2%",
    posts: 45,
    stories: 123
  },
  tiktok: {
    followers: "5.7K",
    engagement: "8.5%",
    videos: 23,
    views: "234K"
  },
  youtube: {
    subscribers: "1.8K",
    views: "45.6K",
    videos: 12,
    watchTime: "1.2K hrs"
  }
}

const aiInsights = [
  {
    type: "Audience Optimization",
    insight: "Twoi słuchacze są najbardziej aktywni w piątki między 18:00-22:00",
    action: "Planuj premiery na piątek o 18:00"
  },
  {
    type: "Content Strategy",
    insight: "Posty z behind-the-scenes generują 40% więcej engagement",
    action: "Dodaj więcej treści ze studia"
  },
  {
    type: "Genre Analysis",
    insight: "Electronic/Ambient ma 23% wyższy reach w Twoim segmencie",
    action: "Rozważ eksperymenty z ambient"
  }
]

const statusConfig = {
  active: { label: "Aktywna", color: "text-green-600", bg: "bg-green-50" },
  completed: { label: "Zakończona", color: "text-blue-600", bg: "bg-blue-50" },
  paused: { label: "Wstrzymana", color: "text-yellow-600", bg: "bg-yellow-50" },
  accepted: { label: "Zaakceptowany", color: "text-green-600", bg: "bg-green-50" },
  pending: { label: "Oczekuje", color: "text-yellow-600", bg: "bg-yellow-50" },
  rejected: { label: "Odrzucony", color: "text-red-600", bg: "bg-red-50" },
}

export default function ArtistPromotion() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Promocja i Marketing</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj kampaniami, playlist pitching i social media
          </p>
        </div>
        <Button className="gap-2">
          <Megaphone className="w-4 h-4" />
          Nowa Kampania
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Aktywne kampanie</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Reach miesiąc</p>
                <p className="text-2xl font-bold">68.3K</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Nowi fani</p>
                <p className="text-2xl font-bold">234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">ROI kampanii</p>
                <p className="text-2xl font-bold">245%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Kampanie</TabsTrigger>
          <TabsTrigger value="playlists">Playlist Pitching</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kampanie Promocyjne</CardTitle>
              <CardDescription>Aktywne i zakończone kampanie marketingowe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaigns.map((campaign) => {
                const status = statusConfig[campaign.status as keyof typeof statusConfig]
                const progressPercentage = (parseFloat(campaign.spent.replace('$', '')) / parseFloat(campaign.budget.replace('$', ''))) * 100
                
                return (
                  <div key={campaign.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground">{campaign.type}</p>
                      </div>
                      <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                        {status.label}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Budżet</p>
                        <p className="font-medium">{campaign.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Wydane</p>
                        <p className="font-medium">{campaign.spent}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Wyświetlenia</p>
                        <p className="font-medium">{campaign.impressions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Konwersje</p>
                        <p className="font-medium">{campaign.conversions}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Wykorzystanie budżetu</span>
                        <span>{progressPercentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={progressPercentage} />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex flex-wrap gap-1">
                        {campaign.platforms.map((platform, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{platform}</Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {campaign.startDate} - {campaign.endDate}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playlists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Playlist Pitching</CardTitle>
              <CardDescription>Status zgłoszeń do playlist i kuratorów</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {playlistPitches.map((pitch) => {
                const status = statusConfig[pitch.status as keyof typeof statusConfig]
                
                return (
                  <div key={pitch.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{pitch.playlist}</h4>
                        <p className="text-sm text-muted-foreground">
                          {pitch.curator} • {pitch.followers} followers
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Utwór: {pitch.track} • Zgłoszono: {pitch.submissionDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge variant="outline">{pitch.genre}</Badge>
                      </div>
                      <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                )
              })}
              
              <Button className="w-full gap-2">
                <Share2 className="w-4 h-4" />
                Nowe Zgłoszenie Playlist
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Instagram
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Obserwujący</span>
                  <span className="font-medium">{socialMedia.instagram.followers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Engagement</span>
                  <span className="font-medium">{socialMedia.instagram.engagement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Posty</span>
                  <span className="font-medium">{socialMedia.instagram.posts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Stories</span>
                  <span className="font-medium">{socialMedia.instagram.stories}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Otwórz Creator Studio
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  TikTok
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Obserwujący</span>
                  <span className="font-medium">{socialMedia.tiktok.followers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Engagement</span>
                  <span className="font-medium">{socialMedia.tiktok.engagement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Filmy</span>
                  <span className="font-medium">{socialMedia.tiktok.videos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Wyświetlenia</span>
                  <span className="font-medium">{socialMedia.tiktok.views}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  TikTok Creator Center
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  YouTube
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Subskrybenci</span>
                  <span className="font-medium">{socialMedia.youtube.subscribers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Wyświetlenia</span>
                  <span className="font-medium">{socialMedia.youtube.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Filmy</span>
                  <span className="font-medium">{socialMedia.youtube.videos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Czas oglądania</span>
                  <span className="font-medium">{socialMedia.youtube.watchTime}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  YouTube Studio
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Zaplanowane Posty</CardTitle>
              <CardDescription>Automatyczne publikacje i kampanie social media</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                <div className="text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2" />
                  <p>Brak zaplanowanych postów</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Zaplanuj Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Marketing Insights</CardTitle>
              <CardDescription>Automatyczne analizy i rekomendacje promocyjne</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-purple-600">{insight.type}</h4>
                      <p className="text-sm mt-1">{insight.insight}</p>
                      <div className="mt-2 p-2 bg-purple-50 rounded-lg">
                        <p className="text-sm font-medium text-purple-800">Rekomendacja:</p>
                        <p className="text-sm text-purple-700">{insight.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automatyzacja Marketingu</CardTitle>
              <CardDescription>Inteligentne narzędzia promocyjne napędzane AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Mail className="w-4 h-4" />
                Generuj Email Newsletter
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Share2 className="w-4 h-4" />
                Utwórz Social Media Content
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Target className="w-4 h-4" />
                Optymalizuj Targetowanie Reklam
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <TrendingUp className="w-4 h-4" />
                Analiza Competitive Intelligence
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}