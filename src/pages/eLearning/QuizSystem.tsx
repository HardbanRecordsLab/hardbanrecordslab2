import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus,
  Trash2,
  Edit,
  Play,
  Clock,
  CheckCircle,
  X,
  RotateCcw,
  Trophy,
  Target,
  Brain,
  HelpCircle,
  FileText,
  BarChart3
} from "lucide-react"

export default function QuizSystem() {
  const [activeTab, setActiveTab] = useState("take")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const quiz = {
    id: 1,
    title: "React Podstawy - Test wiedzy",
    description: "Sprawdź swoją wiedzę z podstaw React",
    timeLimit: 15, // minutes
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "single",
        question: "Co to jest JSX?",
        options: [
          "Język programowania",
          "Rozszerzenie składni JavaScript",
          "Framework CSS",
          "Baza danych"
        ],
        correct: 1,
        explanation: "JSX to rozszerzenie składni JavaScript używane w React"
      },
      {
        id: 2,
        type: "multiple",
        question: "Które z poniższych są hookami React? (wybierz wszystkie)",
        options: [
          "useState",
          "useEffect",
          "useClass",
          "useRef",
          "useRender"
        ],
        correct: [0, 1, 3],
        explanation: "useState, useEffect i useRef to prawdziwe hooki React"
      },
      {
        id: 3,
        type: "text",
        question: "Wyjaśnij różnicę między props a state w React",
        correct: "Props są przekazywane z komponentu rodzica, state jest lokalny",
        explanation: "Props to dane przekazywane z zewnątrz, state to wewnętrzne dane komponentu"
      },
      {
        id: 4,
        type: "boolean",
        question: "React komponenty muszą zawsze zwracać jeden element główny",
        correct: false,
        explanation: "Od React 16 można zwracać Fragment lub tablicę elementów"
      }
    ]
  }

  const quizzes = [
    {
      id: 1,
      title: "React Podstawy",
      questions: 15,
      timeLimit: 20,
      attempts: 156,
      avgScore: 78,
      status: "active"
    },
    {
      id: 2,
      title: "JavaScript ES6+",
      questions: 12,
      timeLimit: 15,
      attempts: 89,
      avgScore: 65,
      status: "draft"
    },
    {
      id: 3,
      title: "CSS Flexbox i Grid",
      questions: 10,
      timeLimit: 12,
      attempts: 234,
      avgScore: 82,
      status: "active"
    }
  ]

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer })
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((q, index) => {
      const userAnswer = answers[q.id]
      if (q.type === "single" || q.type === "boolean") {
        if (userAnswer === q.correct) correct++
      } else if (q.type === "multiple") {
        if (Array.isArray(userAnswer) && Array.isArray(q.correct)) {
          if (userAnswer.sort().toString() === q.correct.sort().toString()) {
            correct++
          }
        }
      } else if (q.type === "text") {
        // Simplified text comparison
        if (userAnswer && userAnswer.toLowerCase().includes("props") && userAnswer.toLowerCase().includes("state")) {
          correct++
        }
      }
    })
    return Math.round((correct / quiz.questions.length) * 100)
  }

  const currentQuestionData = quiz.questions[currentQuestion]

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Quizów</h1>
          <p className="text-muted-foreground">Twórz i rozwiązuj quizy testowe</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-[400px]">
          <TabsTrigger value="take">Rozwiąż Quiz</TabsTrigger>
          <TabsTrigger value="manage">Zarządzaj</TabsTrigger>
          <TabsTrigger value="create">Utwórz</TabsTrigger>
        </TabsList>

        {/* Take Quiz Tab */}
        <TabsContent value="take" className="space-y-6">
          {!quizSubmitted ? (
            <>
              {/* Quiz Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-6 h-6" />
                        {quiz.title}
                      </CardTitle>
                      <p className="text-muted-foreground">{quiz.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="w-4 h-4" />
                        13:42 pozostało
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Target className="w-4 h-4" />
                        Próg zaliczenia: {quiz.passingScore}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">
                      Pytanie {currentQuestion + 1} z {quiz.questions.length}
                    </span>
                    <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="flex-1" />
                    <span className="text-sm text-muted-foreground">
                      {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Question Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Pytanie {currentQuestion + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-lg font-medium">
                    {currentQuestionData.question}
                  </div>

                  {/* Single Choice */}
                  {currentQuestionData.type === "single" && (
                    <RadioGroup
                      value={answers[currentQuestionData.id]?.toString()}
                      onValueChange={(value) => handleAnswer(currentQuestionData.id, parseInt(value))}
                    >
                      {currentQuestionData.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {/* Multiple Choice */}
                  {currentQuestionData.type === "multiple" && (
                    <div className="space-y-3">
                      {currentQuestionData.options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox
                            id={`multi-${index}`}
                            checked={(answers[currentQuestionData.id] || []).includes(index)}
                            onCheckedChange={(checked) => {
                              const current = answers[currentQuestionData.id] || []
                              if (checked) {
                                handleAnswer(currentQuestionData.id, [...current, index])
                              } else {
                                handleAnswer(currentQuestionData.id, current.filter((i: number) => i !== index))
                              }
                            }}
                          />
                          <Label htmlFor={`multi-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Text Answer */}
                  {currentQuestionData.type === "text" && (
                    <Textarea
                      placeholder="Wpisz swoją odpowiedź..."
                      value={answers[currentQuestionData.id] || ""}
                      onChange={(e) => handleAnswer(currentQuestionData.id, e.target.value)}
                      className="min-h-[100px]"
                    />
                  )}

                  {/* Boolean */}
                  {currentQuestionData.type === "boolean" && (
                    <RadioGroup
                      value={answers[currentQuestionData.id]?.toString()}
                      onValueChange={(value) => handleAnswer(currentQuestionData.id, value === "true")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="true" />
                        <Label htmlFor="true" className="cursor-pointer">Prawda</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="false" />
                        <Label htmlFor="false" className="cursor-pointer">Fałsz</Label>
                      </div>
                    </RadioGroup>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      variant="outline"
                      disabled={currentQuestion === 0}
                      onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    >
                      Poprzednie
                    </Button>

                    {currentQuestion === quiz.questions.length - 1 ? (
                      <Button onClick={() => setQuizSubmitted(true)}>
                        Zakończ Quiz
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setCurrentQuestion(currentQuestion + 1)}
                        disabled={!answers[currentQuestionData.id]}
                      >
                        Następne
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Quiz Results */
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <Trophy className="w-16 h-16 text-yellow-500" />
                </div>
                <CardTitle className="text-2xl">Quiz Zakończony!</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {calculateScore()}%
                  </div>
                  <p className="text-muted-foreground">
                    {calculateScore() >= quiz.passingScore ? "Gratulacje! Quiz zaliczony." : "Niestety, quiz niezaliczony."}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {quiz.questions.filter((_, i) => answers[quiz.questions[i].id] !== undefined).length}
                    </div>
                    <p className="text-sm text-muted-foreground">Odpowiedzi</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.floor(calculateScore() * quiz.questions.length / 100)}
                    </div>
                    <p className="text-sm text-muted-foreground">Poprawne</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {quiz.timeLimit - 2}m
                    </div>
                    <p className="text-sm text-muted-foreground">Czas</p>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => {
                    setQuizSubmitted(false)
                    setCurrentQuestion(0)
                    setAnswers({})
                  }}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Spróbuj Ponownie
                  </Button>
                  <Button>
                    Zobacz Odpowiedzi
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Manage Quizzes Tab */}
        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Moje Quizy
              </CardTitle>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nowy Quiz
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{quiz.title}</h3>
                        <Badge variant={quiz.status === 'active' ? 'default' : 'secondary'}>
                          {quiz.status === 'active' ? 'Aktywny' : 'Szkic'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>{quiz.questions} pytań</span>
                        <span>{quiz.timeLimit} min</span>
                        <span>{quiz.attempts} prób</span>
                        <span>Śr. wynik: {quiz.avgScore}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Quiz Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Utwórz Nowy Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quiz-title">Tytuł Quizu</Label>
                  <Input id="quiz-title" placeholder="np. Test z React" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-limit">Limit Czasu (minuty)</Label>
                  <Input id="time-limit" type="number" placeholder="15" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quiz-description">Opis</Label>
                <Textarea id="quiz-description" placeholder="Krótki opis quizu" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passing-score">Próg Zaliczenia (%)</Label>
                  <Input id="passing-score" type="number" placeholder="70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-attempts">Maksymalna liczba prób</Label>
                  <Input id="max-attempts" type="number" placeholder="3" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button>Zapisz i Dodaj Pytania</Button>
                <Button variant="outline">Użyj AI do Generowania</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}