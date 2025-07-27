import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Sparkles,
  Brain,
  FileText,
  HelpCircle,
  Download,
  Copy,
  RefreshCw,
  Wand2,
  BookOpen,
  MessageSquare,
  Languages,
  Target,
  TrendingUp,
  Settings,
  Zap,
  CheckCircle,
  Clock,
  Users
} from "lucide-react"

export default function AIGenerator() {
  const [activeTab, setActiveTab] = useState("quiz")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const [quizConfig, setQuizConfig] = useState({
    topic: "",
    difficulty: "medium",
    questionCount: "10",
    questionTypes: ["single", "multiple"],
    language: "pl"
  })

  const [materialConfig, setMaterialConfig] = useState({
    content: "",
    materialType: "summary",
    language: "pl",
    targetAudience: "beginner"
  })

  const generatedQuiz = {
    title: "React Hooks - Test AI",
    questions: [
      {
        id: 1,
        type: "single",
        question: "Który hook używamy do zarządzania stanem lokalnym w komponencie funkcyjnym?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correct: 1,
        explanation: "useState to podstawowy hook do zarządzania stanem lokalnym"
      },
      {
        id: 2,
        type: "multiple",
        question: "Które z poniższych są wbudowanymi hookami React?",
        options: ["useState", "useCustom", "useEffect", "useCallback", "useRandom"],
        correct: [0, 2, 3],
        explanation: "useState, useEffect i useCallback to wbudowane hooki React"
      }
    ]
  }

  const generatedMaterials = {
    summary: `# React Hooks - Podsumowanie

## Wprowadzenie
React Hooks to funkcje, które pozwalają korzystać ze stanu i innych funkcji React w komponentach funkcyjnych.

## Główne Hooki

### useState
- Służy do zarządzania stanem lokalnym
- Zwraca parę: wartość stanu i funkcję do jej aktualizacji
- Przykład: \`const [count, setCount] = useState(0)\`

### useEffect
- Pozwala wykonywać efekty uboczne
- Odpowiednik componentDidMount, componentDidUpdate, componentWillUnmount
- Może mieć zależności w drugim parametrze

### useContext
- Umożliwia korzystanie z React Context
- Alternatywa dla przekazywania props przez wiele poziomów

## Zalety Hooków
1. Mniej kodu boilerplate
2. Łatwiejsze testowanie
3. Lepsze dzielenie logiki między komponentami
4. Możliwość tworzenia własnych hooków`,

    notes: `📝 **Kluczowe Punkty - React Hooks**

🔹 **useState**
  • Stan lokalny w komponentach funkcyjnych
  • Syntax: [value, setValue] = useState(initial)
  • Może przechowywać dowolny typ danych

🔹 **useEffect**
  • Efekty uboczne (API calls, subscriptions)
  • Uruchamia się po renderze
  • Cleanup function możliwa

🔹 **Własne Hooki**
  • Prefix "use" wymagany
  • Dzielenie logiki między komponentami
  • Lepsze testowanie

💡 **Tips**
  → Hooki tylko na najwyższym poziomie
  → Nie używaj w pętlach ani warunkach
  → ESLint plugin dla hooków`,

    exercises: `# Ćwiczenia Praktyczne - React Hooks

## Ćwiczenie 1: Licznik z useState
Stwórz komponent licznika, który:
- Wyświetla aktualną wartość
- Ma przyciski +1 i -1
- Resetuje do zera

\`\`\`javascript
// Twój kod tutaj
\`\`\`

## Ćwiczenie 2: Pobieranie danych z useEffect
Utwórz komponent, który:
- Pobiera listę użytkowników z API
- Pokazuje loading podczas pobierania
- Wyświetla błąd jeśli wystąpi

\`\`\`javascript
// Twój kod tutaj
\`\`\`

## Ćwiczenie 3: Własny hook
Napisz hook useLocalStorage, który:
- Zapisuje wartość w localStorage
- Odczytuje wartość przy inicjalizacji
- Aktualizuje localStorage przy zmianie

\`\`\`javascript
// Twój kod tutaj
\`\`\`

## Rozwiązania
Rozwiązania dostępne po ukończeniu wszystkich ćwiczeń.`
  }

  const handleGenerateQuiz = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Symulacja generowania
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setGenerationProgress(i)
    }
    
    setIsGenerating(false)
  }

  const handleGenerateMaterials = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    
    // Symulacja generowania
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setGenerationProgress(i)
    }
    
    setIsGenerating(false)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-500" />
            AI Generator
          </h1>
          <p className="text-muted-foreground">Automatyczne tworzenie quizów i materiałów edukacyjnych</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Ustawienia AI
          </Button>
          <Button className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Statystyki
          </Button>
        </div>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">Wygenerowanych pytań</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Materiałów</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">156h</p>
                <p className="text-sm text-muted-foreground">Zaoszczędzonego czasu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Zadowolenie</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-[400px]">
          <TabsTrigger value="quiz">Generator Quizów</TabsTrigger>
          <TabsTrigger value="materials">Materiały</TabsTrigger>
          <TabsTrigger value="analytics">Analityka AI</TabsTrigger>
        </TabsList>

        {/* Quiz Generator Tab */}
        <TabsContent value="quiz" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Konfiguracja Quizu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Temat/Treść do analizy</Label>
                  <Textarea
                    id="topic"
                    placeholder="Wklej treść kursu, artykuł lub wprowadź temat..."
                    value={quizConfig.topic}
                    onChange={(e) => setQuizConfig({...quizConfig, topic: e.target.value})}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Poziom trudności</Label>
                    <Select value={quizConfig.difficulty} onValueChange={(value) => setQuizConfig({...quizConfig, difficulty: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Łatwy</SelectItem>
                        <SelectItem value="medium">Średni</SelectItem>
                        <SelectItem value="hard">Trudny</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="count">Liczba pytań</Label>
                    <Select value={quizConfig.questionCount} onValueChange={(value) => setQuizConfig({...quizConfig, questionCount: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 pytań</SelectItem>
                        <SelectItem value="10">10 pytań</SelectItem>
                        <SelectItem value="15">15 pytań</SelectItem>
                        <SelectItem value="20">20 pytań</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Typy pytań</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "single", label: "Jednokrotny wybór" },
                      { id: "multiple", label: "Wielokrotny wybór" },
                      { id: "boolean", label: "Prawda/Fałsz" },
                      { id: "text", label: "Otwarte" }
                    ].map((type) => (
                      <Badge
                        key={type.id}
                        variant={quizConfig.questionTypes.includes(type.id) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const types = quizConfig.questionTypes.includes(type.id)
                            ? quizConfig.questionTypes.filter(t => t !== type.id)
                            : [...quizConfig.questionTypes, type.id]
                          setQuizConfig({...quizConfig, questionTypes: types})
                        }}
                      >
                        {type.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Generowanie quizu...</span>
                    </div>
                    <Progress value={generationProgress} />
                  </div>
                )}

                <Button 
                  className="w-full gap-2" 
                  onClick={handleGenerateQuiz}
                  disabled={isGenerating || !quizConfig.topic}
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? "Generowanie..." : "Wygeneruj Quiz"}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Quiz Preview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Wygenerowany Quiz
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {!isGenerating && generatedQuiz ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">{generatedQuiz.title}</h3>
                      <Badge className="mb-4">{generatedQuiz.questions.length} pytań</Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {generatedQuiz.questions.map((question, index) => (
                        <div key={question.id} className="p-4 border rounded-lg">
                          <div className="flex items-start gap-3">
                            <Badge variant="outline">{index + 1}</Badge>
                            <div className="flex-1">
                              <p className="font-medium mb-2">{question.question}</p>
                              {question.options && (
                                <div className="space-y-1 text-sm">
                                  {question.options.map((option, optIndex) => (
                                    <div
                                      key={optIndex}
                                      className={`p-2 rounded ${
                                        (Array.isArray(question.correct) ? question.correct.includes(optIndex) : question.correct === optIndex)
                                          ? 'bg-green-50 border border-green-200'
                                          : 'bg-muted'
                                      }`}
                                    >
                                      {option}
                                      {(Array.isArray(question.correct) ? question.correct.includes(optIndex) : question.correct === optIndex) && (
                                        <CheckCircle className="w-4 h-4 text-green-600 inline ml-2" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                              <p className="text-xs text-muted-foreground mt-2">
                                💡 {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">Dodaj do Kursu</Button>
                      <Button variant="outline" className="flex-1">Edytuj</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-medium mb-2">Gotowy do generowania</h3>
                    <p className="text-muted-foreground text-sm">
                      Wprowadź temat i skonfiguruj parametry aby wygenerować quiz
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Materials Generator Tab */}
        <TabsContent value="materials" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generator Materiałów
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">Treść do przetworzenia</Label>
                  <Textarea
                    id="content"
                    placeholder="Wklej tekst lekcji, artykuł lub notatki..."
                    value={materialConfig.content}
                    onChange={(e) => setMaterialConfig({...materialConfig, content: e.target.value})}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="material-type">Typ materiału</Label>
                    <Select value={materialConfig.materialType} onValueChange={(value) => setMaterialConfig({...materialConfig, materialType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="summary">Podsumowanie</SelectItem>
                        <SelectItem value="notes">Notatki</SelectItem>
                        <SelectItem value="exercises">Ćwiczenia</SelectItem>
                        <SelectItem value="flashcards">Fiszki</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="audience">Grupa docelowa</Label>
                    <Select value={materialConfig.targetAudience} onValueChange={(value) => setMaterialConfig({...materialConfig, targetAudience: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Początkujący</SelectItem>
                        <SelectItem value="intermediate">Średniozaawansowany</SelectItem>
                        <SelectItem value="advanced">Zaawansowany</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 animate-pulse" />
                      <span className="text-sm">Generowanie materiałów...</span>
                    </div>
                    <Progress value={generationProgress} />
                  </div>
                )}

                <Button 
                  className="w-full gap-2" 
                  onClick={handleGenerateMaterials}
                  disabled={isGenerating || !materialConfig.content}
                >
                  <Sparkles className="w-4 h-4" />
                  {isGenerating ? "Generowanie..." : "Wygeneruj Materiały"}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Materials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Wygenerowane Materiały
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="summary">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="summary">Podsumowanie</TabsTrigger>
                    <TabsTrigger value="notes">Notatki</TabsTrigger>
                    <TabsTrigger value="exercises">Ćwiczenia</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary" className="mt-4">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
                        {generatedMaterials.summary}
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="notes" className="mt-4">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
                        {generatedMaterials.notes}
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="exercises" className="mt-4">
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg overflow-auto max-h-[400px]">
                        {generatedMaterials.exercises}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Kopiuj
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Pobierz
                  </Button>
                  <Button size="sm" className="flex-1">
                    Dodaj do Kursu
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Analityka AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Analityka AI</h3>
                <p className="text-muted-foreground mb-4">
                  Szczegółowe statystyki wydajności AI będą dostępne wkrótce
                </p>
                <Button variant="outline">Skonfiguruj Tracking</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}