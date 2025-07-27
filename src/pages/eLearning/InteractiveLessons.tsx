import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Video,
  FileText,
  Headphones,
  Download,
  MessageCircle,
  BookOpen,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize,
  Settings,
  Clock,
  CheckCircle,
  Circle,
  FileDown,
  Link,
  Image,
  PenTool
} from "lucide-react"

export default function InteractiveLessons() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(35)

  const lessons = [
    {
      id: 1,
      title: "Wprowadzenie do React",
      type: "video",
      duration: "12:30",
      completed: true,
      description: "Poznaj podstawy biblioteki React i jej główne koncepcje"
    },
    {
      id: 2,
      title: "Komponenty i Props",
      type: "video",
      duration: "18:45",
      completed: true,
      description: "Dowiedz się jak tworzyć komponenty i przekazywać props"
    },
    {
      id: 3,
      title: "Stan komponentów (State)",
      type: "video",
      duration: "15:20",
      completed: false,
      description: "Zarządzanie stanem w komponentach React"
    },
    {
      id: 4,
      title: "Hooks - useState i useEffect",
      type: "text",
      duration: "8:00",
      completed: false,
      description: "Najważniejsze hooki w React"
    },
    {
      id: 5,
      title: "Praktyczne ćwiczenia",
      type: "audio",
      duration: "25:10",
      completed: false,
      description: "Kodowanie na żywo - budujemy aplikację"
    }
  ]

  const materials = [
    { name: "Kod źródłowy lekcji", type: "zip", size: "2.3 MB" },
    { name: "Prezentacja PDF", type: "pdf", size: "1.8 MB" },
    { name: "Dokumentacja dodatkowa", type: "docx", size: "0.5 MB" },
    { name: "Przydatne linki", type: "txt", size: "0.1 MB" }
  ]

  const annotations = [
    { time: "02:15", text: "Ważne pojęcie - Virtual DOM" },
    { time: "05:30", text: "Quiz: Co to jest JSX?" },
    { time: "08:45", text: "Praktyczne przykłady użycia" },
    { time: "11:20", text: "Podsumowanie lekcji" }
  ]

  const currentLessonData = lessons[currentLesson]

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Lesson Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Spis Lekcji</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                      currentLesson === index ? 'bg-muted' : ''
                    }`}
                    onClick={() => setCurrentLesson(index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-muted-foreground">
                            Lekcja {index + 1}
                          </span>
                          {lesson.type === 'video' && <Video className="w-3 h-3" />}
                          {lesson.type === 'text' && <FileText className="w-3 h-3" />}
                          {lesson.type === 'audio' && <Headphones className="w-3 h-3" />}
                        </div>
                        <h4 className="font-medium text-sm leading-tight mb-1">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Progress */}
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Postęp kursu</span>
                  <span className="font-medium">2 z 5 lekcji</span>
                </div>
                <Progress value={40} />
                <p className="text-xs text-muted-foreground">
                  Ukończyłeś 40% kursu
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Lesson Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Lekcja {currentLesson + 1}</Badge>
                    {currentLessonData.type === 'video' && <Video className="w-4 h-4" />}
                    {currentLessonData.type === 'text' && <FileText className="w-4 h-4" />}
                    {currentLessonData.type === 'audio' && <Headphones className="w-4 h-4" />}
                  </div>
                  <h1 className="text-2xl font-bold">{currentLessonData.title}</h1>
                  <p className="text-muted-foreground mt-1">{currentLessonData.description}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {currentLessonData.duration}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Video Player / Content Area */}
          <Card>
            <CardContent className="p-0">
              {currentLessonData.type === 'video' && (
                <div className="aspect-video bg-black rounded-t-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-white mb-4 mx-auto" />
                      <p className="text-white">Odtwarzacz wideo</p>
                      <p className="text-white/70 text-sm">Tutaj będzie osadzony odtwarzacz</p>
                    </div>
                  </div>
                  
                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/20">
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/20">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      <div className="flex-1">
                        <Progress value={progress} className="h-1" />
                      </div>
                      <span className="text-white text-sm">03:45 / 12:30</span>
                      <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/20">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/20">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/20">
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {currentLessonData.type === 'text' && (
                <div className="p-6">
                  <div className="prose max-w-none">
                    <h2>Hooks - useState i useEffect</h2>
                    <p>
                      Hooks to funkcje specjalne w React, które pozwalają na korzystanie ze stanu (state) 
                      i innych funkcji React w komponentach funkcyjnych.
                    </p>
                    <h3>useState Hook</h3>
                    <p>
                      Hook useState pozwala na dodanie stanu lokalnego do komponentów funkcyjnych. 
                      Zwraca tablicę z dwoma elementami: aktualną wartością stanu i funkcją do jego aktualizacji.
                    </p>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>{`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Kliknięto {count} razy</p>
      <button onClick={() => setCount(count + 1)}>
        Kliknij mnie
      </button>
    </div>
  );
}`}</code>
                    </pre>
                    <h3>useEffect Hook</h3>
                    <p>
                      useEffect pozwala na wykonywanie efektów ubocznych w komponentach funkcyjnych. 
                      Może być używany do pobierania danych, subskrypcji, czy ręcznej zmiany DOM.
                    </p>
                  </div>
                </div>
              )}

              {currentLessonData.type === 'audio' && (
                <div className="p-6">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-8 text-center text-white">
                    <Headphones className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Lekcja Audio</h3>
                    <p className="mb-6">Praktyczne ćwiczenia - kodowanie na żywo</p>
                    
                    {/* Audio Controls */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <Button variant="secondary" size="sm">
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button variant="secondary" size="lg">
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </Button>
                      <Button variant="secondary" size="sm">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span>08:30</span>
                      <Progress value={34} className="flex-1" />
                      <span>25:10</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lesson Tabs */}
          <Tabs defaultValue="materials" className="space-y-4">
            <TabsList>
              <TabsTrigger value="materials">Materiały</TabsTrigger>
              <TabsTrigger value="annotations">Adnotacje</TabsTrigger>
              <TabsTrigger value="discussion">Dyskusja</TabsTrigger>
              <TabsTrigger value="notes">Notatki</TabsTrigger>
            </TabsList>

            <TabsContent value="materials">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Materiały do Pobrania
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileDown className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-muted-foreground">{material.size}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Pobierz
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="annotations">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="w-5 h-5" />
                    Adnotacje Wideo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {annotations.map((annotation, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <Badge variant="outline">{annotation.time}</Badge>
                        <p className="flex-1">{annotation.text}</p>
                        <Button variant="ghost" size="sm">
                          Przejdź
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Dyskusja
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-medium mb-2">Brak komentarzy</h3>
                    <p className="text-muted-foreground mb-4">Bądź pierwszy i zadaj pytanie!</p>
                    <Button>Dodaj Komentarz</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Moje Notatki
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-medium mb-2">Brak notatek</h3>
                    <p className="text-muted-foreground mb-4">Rób notatki podczas nauki</p>
                    <Button>Dodaj Notatkę</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              disabled={currentLesson === 0}
              onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
            >
              <SkipBack className="w-4 h-4 mr-2" />
              Poprzednia Lekcja
            </Button>
            
            <Button className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Oznacz jako Ukończone
            </Button>

            <Button 
              disabled={currentLesson === lessons.length - 1}
              onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
            >
              Następna Lekcja
              <SkipForward className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}