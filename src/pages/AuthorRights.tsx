import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scale, FileText, Globe, Users, DollarSign, Calendar, BookOpen, ExternalLink } from "lucide-react"

const publishingRights = [
  {
    title: "Nocne Opowieści",
    territories: ["Worldwide"],
    languages: ["Polish", "English", "German"],
    formats: ["Digital", "Print", "Audio"],
    exclusivity: "Exclusive",
    expiry: "2029-01-15",
    revenue: "$2,345.67"
  },
  {
    title: "Miasto Marzeń", 
    territories: ["Europe", "North America"],
    languages: ["Polish", "English"],
    formats: ["Digital", "Print"],
    exclusivity: "Non-exclusive",
    expiry: "2027-06-20",
    revenue: "$1,678.90"
  },
]

const translationRights = [
  {
    title: "Nocne Opowieści",
    targetLanguage: "English",
    translator: "Sarah Johnson",
    status: "completed",
    territory: "Worldwide",
    revenue: "$567.89",
    progress: 100
  },
  {
    title: "Miasto Marzeń",
    targetLanguage: "German", 
    translator: "Hans Mueller",
    status: "in_progress",
    territory: "DACH Region",
    revenue: "$0.00",
    progress: 65
  },
  {
    title: "Krótkie Opowiadania",
    targetLanguage: "Spanish",
    translator: "Maria Garcia",
    status: "pending",
    territory: "Spain & Latin America", 
    revenue: "$0.00",
    progress: 0
  },
]

const adaptationRights = [
  {
    title: "Nocne Opowieści",
    type: "Audiobook",
    partner: "AudioLab Studio",
    status: "active",
    revenue: "$1,234.56",
    royaltyRate: "25%"
  },
  {
    title: "Miasto Marzeń",
    type: "Screenplay",
    partner: "Film Studio XYZ",
    status: "negotiation",
    revenue: "$0.00",
    royaltyRate: "15%"
  },
  {
    title: "Krótkie Opowiadania",
    type: "Podcast Series",
    partner: "PodcastNet",
    status: "pending",
    revenue: "$0.00", 
    royaltyRate: "20%"
  },
]

const territorialRights = [
  {
    region: "Europe",
    countries: ["Poland", "Germany", "France", "UK", "Spain"],
    books: 8,
    status: "active",
    revenue: "$3,456.78"
  },
  {
    region: "North America",
    countries: ["USA", "Canada"],
    books: 5,
    status: "active", 
    revenue: "$2,345.67"
  },
  {
    region: "Asia-Pacific",
    countries: ["Japan", "Australia", "South Korea"],
    books: 2,
    status: "pending",
    revenue: "$0.00"
  },
]

const statusConfig = {
  active: { label: "Aktywny", color: "text-green-600", bg: "bg-green-50" },
  completed: { label: "Ukończone", color: "text-green-600", bg: "bg-green-50" },
  in_progress: { label: "W trakcie", color: "text-blue-600", bg: "bg-blue-50" },
  pending: { label: "Oczekuje", color: "text-yellow-600", bg: "bg-yellow-50" },
  negotiation: { label: "Negocjacje", color: "text-orange-600", bg: "bg-orange-50" },
}

export default function AuthorRights() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Zarządzanie Prawami</h1>
          <p className="text-muted-foreground mt-1">
            Kontroluj prawa wydawnicze, terytorialne i adaptacyjne swoich publikacji
          </p>
        </div>
        <Button className="gap-2">
          <Scale className="w-4 h-4" />
          Nowa Umowa
        </Button>
      </div>

      {/* Rights Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5" />
            Przegląd Praw
          </CardTitle>
          <CardDescription>Podsumowanie wszystkich aktywnych praw i umów</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">24</div>
              <div className="text-sm text-muted-foreground">Aktywne umowy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-muted-foreground">Terytoria</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-muted-foreground">Języki</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">$8,234.56</div>
              <div className="text-sm text-muted-foreground">Przychód z praw</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="publishing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="publishing">Prawa Wydawnicze</TabsTrigger>
          <TabsTrigger value="translation">Prawa Tłumaczenia</TabsTrigger>
          <TabsTrigger value="adaptation">Prawa Adaptacji</TabsTrigger>
          <TabsTrigger value="territorial">Prawa Terytorialne</TabsTrigger>
        </TabsList>

        <TabsContent value="publishing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prawa Wydawnicze</CardTitle>
              <CardDescription>Zarządzanie prawami do publikacji w różnych formatach i territoriach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {publishingRights.map((right, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">{right.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {right.exclusivity} | Wygasa: {right.expiry}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-accent">{right.revenue}</p>
                        <p className="text-xs text-muted-foreground">Przychód całkowity</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Terytoria:</p>
                        <div className="flex flex-wrap gap-1">
                          {right.territories.map((territory, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{territory}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Języki:</p>
                        <div className="flex flex-wrap gap-1">
                          {right.languages.map((language, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">{language}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Formaty:</p>
                        <div className="flex flex-wrap gap-1">
                          {right.formats.map((format, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{format}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prawa Tłumaczenia</CardTitle>
              <CardDescription>Status tłumaczeń i prawa językowe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {translationRights.map((translation, index) => {
                  const status = statusConfig[translation.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <Globe className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{translation.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {translation.targetLanguage} | {translation.translator}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Postęp tłumaczenia:</span>
                          <span className="text-sm font-medium">{translation.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full transition-all duration-300"
                            style={{ width: `${translation.progress}%` }}
                          ></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Terytorium: </span>
                            <span className="text-muted-foreground">{translation.territory}</span>
                          </div>
                          <div>
                            <span className="font-medium">Przychód: </span>
                            <span className="text-accent font-medium">{translation.revenue}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adaptation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prawa Adaptacji</CardTitle>
              <CardDescription>Umowy na adaptacje audiobooków, filmów i innych mediów</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {adaptationRights.map((adaptation, index) => {
                  const status = statusConfig[adaptation.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{adaptation.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {adaptation.type} | {adaptation.partner}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Stawka tantiem: </span>
                          <span className="text-muted-foreground">{adaptation.royaltyRate}</span>
                        </div>
                        <div>
                          <span className="font-medium">Przychód: </span>
                          <span className="text-accent font-medium">{adaptation.revenue}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex justify-end">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Szczegóły umowy
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="territorial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prawa Terytorialne</CardTitle>
              <CardDescription>Zarządzanie prawami w różnych regionach geograficznych</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {territorialRights.map((territory, index) => {
                  const status = statusConfig[territory.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <Globe className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{territory.region}</h4>
                            <p className="text-sm text-muted-foreground">
                              {territory.books} publikacji aktywnych
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className={`${status.color} ${status.bg} mb-2`}>
                            {status.label}
                          </Badge>
                          <p className="font-medium text-accent">{territory.revenue}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Kraje:</p>
                        <div className="flex flex-wrap gap-1">
                          {territory.countries.map((country, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{country}</Badge>
                          ))}
                        </div>
                      </div>
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