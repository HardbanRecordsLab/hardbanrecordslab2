import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Zap, Music, Image, FileText, Mic, AudioWaveform, Palette, TrendingUp, Clock, CheckCircle } from "lucide-react"

const aiTools = [
  {
    name: "AI Mastering",
    description: "Automatyczne masterowanie utworów z analizą spektralną",
    icon: AudioWaveform,
    category: "Audio",
    usage: "23/50",
    status: "available"
  },
  {
    name: "Cover Art Generator",
    description: "Generowanie okładek na podstawie analizy muzyki",
    icon: Palette,
    category: "Visual",
    usage: "8/20",
    status: "available"
  },
  {
    name: "Lyrics Assistant",
    description: "Pomoc w pisaniu tekstów zgodnych z klimatem utworu",
    icon: FileText,
    category: "Content",
    usage: "12/30",
    status: "available"
  },
  {
    name: "Genre Classification",
    description: "Automatyczne określanie gatunku i subgatunku",
    icon: Music,
    category: "Analysis",
    usage: "45/100",
    status: "available"
  },
  {
    name: "Voice Synthesis",
    description: "Tworzenie ścieżek wokalnych AI",
    icon: Mic,
    category: "Audio",
    usage: "0/10",
    status: "premium"
  },
  {
    name: "Marketing Copy",
    description: "Generowanie opisów i materiałów promocyjnych",
    icon: TrendingUp,
    category: "Marketing",
    usage: "15/25",
    status: "available"
  }
]

const recentJobs = [
  {
    id: 1,
    tool: "AI Mastering",
    track: "Nocny Lot",
    status: "completed",
    startTime: "2024-01-19 14:30",
    completionTime: "2024-01-19 14:32",
    result: "Master z improved dynamics i stereo width"
  },
  {
    id: 2,
    tool: "Cover Art Generator", 
    track: "Miasto Świateł",
    status: "processing",
    startTime: "2024-01-19 15:45",
    completionTime: null,
    result: null
  },
  {
    id: 3,
    tool: "Genre Classification",
    track: "Elektroniczny Sen",
    status: "completed",
    startTime: "2024-01-19 13:15",
    completionTime: "2024-01-19 13:16",
    result: "Electronic/Ambient - 94% confidence"
  }
]

const aiInsights = [
  {
    type: "Audio Analysis",
    track: "Nocny Lot", 
    insight: "Utwór ma charakterystyczne cechy lo-fi house z elementami ambient",
    confidence: 92,
    suggestions: ["Rozważ dodanie vinyl crackle", "Pogłoś reverb w breakdownie"]
  },
  {
    type: "Trend Analysis",
    track: "Miasto Świateł",
    insight: "Podobne utwory mają 40% większy reach w godzinach wieczornych",
    confidence: 78,
    suggestions: ["Publikuj o 19:00-21:00", "Targetuj audience 25-35 lat"]
  }
]

const statusConfig = {
  available: { label: "Dostępne", color: "text-green-600", bg: "bg-green-50" },
  premium: { label: "Premium", color: "text-purple-600", bg: "bg-purple-50" },
  processing: { label: "Przetwarzanie", color: "text-blue-600", bg: "bg-blue-50" },
  completed: { label: "Zakończone", color: "text-green-600", bg: "bg-green-50" },
  failed: { label: "Błąd", color: "text-red-600", bg: "bg-red-50" },
}

export default function ArtistAITools() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Tools</h1>
          <p className="text-muted-foreground mt-1">
            Inteligentne narzędzia wspierające proces twórczy
          </p>
        </div>
        <Button className="gap-2">
          <Zap className="w-4 h-4" />
          Upgrade Premium
        </Button>
      </div>

      {/* Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            AI Credits & Usage
          </CardTitle>
          <CardDescription>Miesięczne limity i dostępne narzędzia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">127</div>
              <div className="text-sm text-muted-foreground">Kredyty pozostałe</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">23</div>
              <div className="text-sm text-muted-foreground">Zakończone zadania</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-muted-foreground">W trakcie</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">6</div>
              <div className="text-sm text-muted-foreground">Dostępne narzędzia</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tools">Narzędzia AI</TabsTrigger>
          <TabsTrigger value="jobs">Historia Zadań</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="custom">Custom AI</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {aiTools.map((tool) => {
              const IconComponent = tool.icon
              const status = statusConfig[tool.status as keyof typeof statusConfig]
              const usageNum = parseInt(tool.usage.split('/')[0])
              const usageMax = parseInt(tool.usage.split('/')[1])
              const usagePercent = (usageNum / usageMax) * 100
              
              return (
                <Card key={tool.name}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <CardDescription>{tool.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Wykorzystanie miesięczne</span>
                        <span>{tool.usage}</span>
                      </div>
                      <Progress value={usagePercent} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{tool.category}</Badge>
                      <Button 
                        size="sm" 
                        disabled={tool.status === 'premium'}
                        className="gap-1"
                      >
                        <Zap className="w-3 h-3" />
                        {tool.status === 'premium' ? 'Premium' : 'Użyj'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historia Zadań AI</CardTitle>
              <CardDescription>Ostatnie procesy i ich wyniki</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentJobs.map((job) => {
                const status = statusConfig[job.status as keyof typeof statusConfig]
                
                return (
                  <div key={job.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                        {job.status === 'processing' ? (
                          <Clock className="w-5 h-5 text-primary animate-pulse" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{job.tool}</h4>
                        <p className="text-sm text-muted-foreground">
                          Utwór: {job.track}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Started: {job.startTime}
                          {job.completionTime && ` • Completed: ${job.completionTime}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        {job.result && (
                          <p className="text-sm font-medium">{job.result}</p>
                        )}
                        {job.status === 'processing' && (
                          <p className="text-sm text-blue-600">Przetwarzanie...</p>
                        )}
                      </div>
                      <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights & Analizy</CardTitle>
              <CardDescription>Automatyczne analizy utworów i rekomendacje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className="p-4 rounded-lg border">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{insight.type}</h4>
                        <Badge variant="outline">{insight.track}</Badge>
                        <Badge variant="secondary" className="text-xs">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{insight.insight}</p>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-600">Sugestie:</p>
                        {insight.suggestions.map((suggestion, sidx) => (
                          <p key={sidx} className="text-sm text-muted-foreground ml-4">
                            • {suggestion}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Progress value={insight.confidence} className="flex-1 mr-4" />
                    <Button variant="outline" size="sm">
                      Zastosuj
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom AI Assistant</CardTitle>
              <CardDescription>Zadaj pytanie lub poproś o analizę</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Typ analizy</label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>Analiza utworu</option>
                    <option>Rekomendacje promocyjne</option>
                    <option>Porównanie z trendami</option>
                    <option>Optymalizacja metadanych</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Wybierz utwór</label>
                  <select className="w-full mt-1 p-2 border rounded-lg">
                    <option>Nocny Lot</option>
                    <option>Miasto Świateł</option>
                    <option>Elektroniczny Sen</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Dodatkowe pytania (opcjonalne)</label>
                  <Textarea 
                    placeholder="Np. 'Jak mogę poprawić mastering?' lub 'Jakie tagi będą najlepsze?'"
                    className="mt-1"
                  />
                </div>
                
                <Button className="w-full gap-2">
                  <Zap className="w-4 h-4" />
                  Uruchom Analizę AI (10 kredytów)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulk Processing</CardTitle>
              <CardDescription>Przetwarzaj wiele utworów jednocześnie</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="gap-2">
                  <Music className="w-4 h-4" />
                  Klasyfikacja gatunków
                </Button>
                <Button variant="outline" className="gap-2">
                  <Palette className="w-4 h-4" />
                  Generuj okładki
                </Button>
                <Button variant="outline" className="gap-2">
                  <AudioWaveform className="w-4 h-4" />
                  Mastering wszystkich
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Optymalizuj metadane
                </Button>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Bulk processing dostępny dla kont Premium</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}