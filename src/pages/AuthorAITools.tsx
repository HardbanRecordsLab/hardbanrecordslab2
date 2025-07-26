import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, FileText, Image, Globe, Lightbulb, Zap, Sparkles, PenTool, BookOpen, Languages, Palette, MessageSquare } from "lucide-react"

const aiTools = [
  {
    name: "AI Writing Assistant",
    description: "Wsparcie w pisaniu, sugestie stylistyczne i poprawki gramatyczne",
    category: "writing",
    usage: "2,345 słów przeanalizowanych",
    status: "active",
    credits: 8750
  },
  {
    name: "Cover Art Generator",
    description: "Automatyczne generowanie okładek na podstawie treści książki",
    category: "design",
    usage: "12 okładek wygenerowanych",
    status: "active", 
    credits: 450
  },
  {
    name: "Translation Assistant",
    description: "Tłumaczenie automatyczne z korektą kontekstową",
    category: "translation",
    usage: "5 rozdziałów przetłumaczonych",
    status: "active",
    credits: 2100
  },
  {
    name: "Genre Classifier",
    description: "Automatyczna klasyfikacja gatunków na podstawie treści",
    category: "analysis",
    usage: "8 książek przeanalizowanych",
    status: "active",
    credits: 320
  },
]

const writingProjects = [
  {
    id: 1,
    title: "Opowieść o Przyszłości - Rozdział 12",
    type: "Nowy rozdział",
    aiSuggestions: 23,
    wordsGenerated: 1250,
    status: "in_progress",
    lastUpdated: "2 godziny temu",
    quality: 85
  },
  {
    id: 2,
    title: "Magiczny Świat - Opis postaci",
    type: "Rozwój postaci",
    aiSuggestions: 15,
    wordsGenerated: 750,
    status: "completed",
    lastUpdated: "1 dzień temu",
    quality: 92
  },
  {
    id: 3,
    title: "Krótkie Opowiadania - Dialogi",
    type: "Poprawa dialogów",
    aiSuggestions: 18,
    wordsGenerated: 450,
    status: "review",
    lastUpdated: "3 godziny temu",
    quality: 78
  },
]

const generatedCovers = [
  {
    id: 1,
    title: "Nocne Opowieści",
    style: "Dark Fantasy",
    variant: "A",
    rating: 4.8,
    downloads: 156,
    status: "published"
  },
  {
    id: 2,
    title: "Miasto Marzeń",
    style: "Urban Fiction",
    variant: "B",
    rating: 4.6,
    downloads: 89,
    status: "draft"
  },
  {
    id: 3,
    title: "Magiczny Świat",
    style: "Epic Fantasy",
    variant: "C",
    rating: 4.9,
    downloads: 234,
    status: "published"
  },
]

const translationProjects = [
  {
    id: 1,
    title: "Nocne Opowieści",
    sourceLanguage: "Polish",
    targetLanguage: "English",
    progress: 85,
    quality: "95%",
    estimatedCompletion: "2024-02-15",
    status: "in_progress"
  },
  {
    id: 2,
    title: "Miasto Marzeń",
    sourceLanguage: "Polish", 
    targetLanguage: "German",
    progress: 100,
    quality: "92%",
    estimatedCompletion: "2024-01-20",
    status: "completed"
  },
  {
    id: 3,
    title: "Krótkie Opowiadania",
    sourceLanguage: "Polish",
    targetLanguage: "Spanish",
    progress: 45,
    quality: "88%",
    estimatedCompletion: "2024-03-10",
    status: "in_progress"
  },
]

const statusConfig = {
  active: { label: "Aktywny", color: "text-green-600", bg: "bg-green-50" },
  in_progress: { label: "W trakcie", color: "text-blue-600", bg: "bg-blue-50" },
  completed: { label: "Ukończone", color: "text-green-600", bg: "bg-green-50" },
  review: { label: "Do przeglądu", color: "text-orange-600", bg: "bg-orange-50" },
  published: { label: "Opublikowane", color: "text-green-600", bg: "bg-green-50" },
  draft: { label: "Szkic", color: "text-gray-600", bg: "bg-gray-50" },
}

export default function AuthorAITools() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Narzędzia AI</h1>
          <p className="text-muted-foreground mt-1">
            Wykorzystaj sztuczną inteligencję do usprawnienia procesu pisania i publikacji
          </p>
        </div>
        <Button className="gap-2">
          <Sparkles className="w-4 h-4" />
          Nowe Narzędzie AI
        </Button>
      </div>

      {/* AI Tools Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Przegląd Narzędzi AI
          </CardTitle>
          <CardDescription>Status wykorzystania narzędzi sztucznej inteligencji</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">11,620</div>
              <div className="text-sm text-muted-foreground">Dostępne kredyty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-muted-foreground">Aktywne narzędzia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-muted-foreground">Ukończone zadania</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">92%</div>
              <div className="text-sm text-muted-foreground">Średnia jakość</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tools">Narzędzia AI</TabsTrigger>
          <TabsTrigger value="writing">Asystent Pisania</TabsTrigger>
          <TabsTrigger value="covers">Generator Okładek</TabsTrigger>
          <TabsTrigger value="translation">Tłumaczenia</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dostępne Narzędzia AI</CardTitle>
              <CardDescription>Pełny zestaw narzędzi sztucznej inteligencji dla autorów</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {aiTools.map((tool, index) => {
                  const status = statusConfig[tool.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            {tool.category === 'writing' && <PenTool className="w-5 h-5 text-accent" />}
                            {tool.category === 'design' && <Palette className="w-5 h-5 text-accent" />}
                            {tool.category === 'translation' && <Languages className="w-5 h-5 text-accent" />}
                            {tool.category === 'analysis' && <Lightbulb className="w-5 h-5 text-accent" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{tool.name}</h4>
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{tool.usage}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className={`${status.color} ${status.bg} mb-2`}>
                            {status.label}
                          </Badge>
                          <p className="text-sm font-medium text-accent">{tool.credits} kredytów</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Zap className="w-3 h-3 mr-1" />
                          Użyj Narzędzia
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-3 h-3 mr-1" />
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

        <TabsContent value="writing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asystent Pisania AI</CardTitle>
              <CardDescription>Projekty wspierane przez sztuczną inteligencję</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {writingProjects.map((project) => {
                  const status = statusConfig[project.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={project.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <PenTool className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{project.title}</h4>
                            <p className="text-sm text-muted-foreground">{project.type}</p>
                            <p className="text-xs text-muted-foreground">
                              Ostatnia aktualizacja: {project.lastUpdated}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Sugestie AI: </span>
                            <span className="text-accent font-medium">{project.aiSuggestions}</span>
                          </div>
                          <div>
                            <span className="font-medium">Słowa: </span>
                            <span className="text-muted-foreground">{project.wordsGenerated}</span>
                          </div>
                          <div>
                            <span className="font-medium">Jakość: </span>
                            <span className="text-green-600 font-medium">{project.quality}%</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Jakość treści:</span>
                            <span className="text-sm font-medium">{project.quality}%</span>
                          </div>
                          <Progress value={project.quality} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Chat AI
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-3 h-3 mr-1" />
                          Otwórz Projekt
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="covers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generator Okładek AI</CardTitle>
              <CardDescription>Automatycznie generowane okładki książek</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {generatedCovers.map((cover) => {
                  const status = statusConfig[cover.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={cover.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <Image className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{cover.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {cover.style} | Wariant {cover.variant}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs">⭐ {cover.rating}</span>
                              <span className="text-xs text-muted-foreground">
                                {cover.downloads} pobrań
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Image className="w-3 h-3 mr-1" />
                          Podgląd
                        </Button>
                        <Button variant="outline" size="sm">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Nowe Warianty
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6">
                <Button className="w-full gap-2">
                  <Palette className="w-4 h-4" />
                  Wygeneruj Nową Okładkę
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="translation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asystent Tłumaczeń AI</CardTitle>
              <CardDescription>Automatyczne tłumaczenia z korektą kontekstową</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {translationProjects.map((project) => {
                  const status = statusConfig[project.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={project.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <Languages className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{project.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {project.sourceLanguage} → {project.targetLanguage}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Ukończenie: {project.estimatedCompletion}
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
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Jakość AI: </span>
                            <span className="text-green-600 font-medium">{project.quality}</span>
                          </div>
                          <div>
                            <span className="font-medium">Status: </span>
                            <span className="text-muted-foreground">{status.label}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Languages className="w-3 h-3 mr-1" />
                          Korekta
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-3 h-3 mr-1" />
                          Podgląd
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-6">
                <Button className="w-full gap-2">
                  <Globe className="w-4 h-4" />
                  Nowe Tłumaczenie
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}