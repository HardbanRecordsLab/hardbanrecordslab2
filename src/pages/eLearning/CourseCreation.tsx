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
  Save, 
  Upload, 
  Video, 
  FileText, 
  Image,
  Plus,
  Trash2,
  Move,
  Play,
  PenTool,
  BookOpen,
  Clock,
  Users,
  DollarSign,
  Tag,
  Globe
} from "lucide-react"

export default function CourseCreation() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    language: "pl",
    price: "",
    duration: "",
    maxStudents: ""
  })

  const [lessons, setLessons] = useState([
    { id: 1, title: "Wprowadzenie do kursu", type: "video", duration: "10:30", status: "completed" },
    { id: 2, title: "Podstawy teoretyczne", type: "text", duration: "15:00", status: "draft" },
    { id: 3, title: "Praktyczne ćwiczenia", type: "video", duration: "25:45", status: "draft" }
  ])

  const categories = [
    "Programowanie",
    "Projektowanie",
    "Marketing",
    "Biznes",
    "Fotografia",
    "Muzyka",
    "Języki",
    "Inne"
  ]

  const levels = ["Początkujący", "Średniozaawansowany", "Zaawansowany"]

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Studio Kursu</h1>
          <p className="text-muted-foreground">Twórz i zarządzaj treścią kursu</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Zapisz Szkic
          </Button>
          <Button>
            Opublikuj Kurs
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Postęp kursu:</span>
            <Progress value={45} className="flex-1" />
            <span className="text-sm text-muted-foreground">45% ukończone</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-[600px]">
          <TabsTrigger value="basic">Podstawy</TabsTrigger>
          <TabsTrigger value="content">Treść</TabsTrigger>
          <TabsTrigger value="quizzes">Quizy</TabsTrigger>
          <TabsTrigger value="settings">Ustawienia</TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Podstawowe Informacje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tytuł Kursu *</Label>
                  <Input
                    id="title"
                    placeholder="Wprowadź tytuł kursu"
                    value={courseData.title}
                    onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategoria *</Label>
                  <Select value={courseData.category} onValueChange={(value) => setCourseData({...courseData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz kategorię" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Opis Kursu *</Label>
                <Textarea
                  id="description"
                  placeholder="Opisz o czym jest kurs, co uczniowie się nauczą..."
                  className="min-h-[120px]"
                  value={courseData.description}
                  onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Poziom Trudności</Label>
                  <Select value={courseData.level} onValueChange={(value) => setCourseData({...courseData, level: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz poziom" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Język</Label>
                  <Select value={courseData.language} onValueChange={(value) => setCourseData({...courseData, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pl">Polski</SelectItem>
                      <SelectItem value="en">Angielski</SelectItem>
                      <SelectItem value="de">Niemiecki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Szacowany Czas</Label>
                  <Input
                    id="duration"
                    placeholder="np. 8 godzin"
                    value={courseData.duration}
                    onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Cena (PLN)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="299"
                    value={courseData.price}
                    onChange={(e) => setCourseData({...courseData, price: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Maksymalna liczba uczniów</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    placeholder="nieograniczona"
                    value={courseData.maxStudents}
                    onChange={(e) => setCourseData({...courseData, maxStudents: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Grafika Kursu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">Przeciągnij i upuść obraz lub kliknij aby wybrać</p>
                <p className="text-sm text-muted-foreground">Zalecane: 1280x720px, JPG lub PNG</p>
                <Button variant="outline" className="mt-4">
                  Wybierz Plik
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Lekcje Kursu
              </CardTitle>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Dodaj Lekcję
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{lesson.title}</h4>
                        <Badge variant={lesson.status === 'completed' ? 'default' : 'secondary'}>
                          {lesson.status === 'completed' ? 'Ukończone' : 'Szkic'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          {lesson.type === 'video' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          {lesson.type === 'video' ? 'Wideo' : 'Tekst'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <PenTool className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Move className="w-4 h-4" />
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

        {/* Quizzes Tab */}
        <TabsContent value="quizzes" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Quizy i Testy</CardTitle>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Utwórz Quiz
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Brak quizów</h3>
                <p className="text-muted-foreground mb-4">Dodaj quizy aby sprawdzić wiedzę uczniów</p>
                <Button>Utwórz Pierwszy Quiz</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ustawienia Kursu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Automatyczne certyfikaty</h4>
                    <p className="text-sm text-muted-foreground">Wydawaj certyfikaty po ukończeniu kursu</p>
                  </div>
                  <Button variant="outline">Konfiguruj</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Forum dyskusyjne</h4>
                    <p className="text-sm text-muted-foreground">Włącz forum dla uczniów</p>
                  </div>
                  <Button variant="outline">Włącz</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Powiadomienia</h4>
                    <p className="text-sm text-muted-foreground">Skonfiguruj powiadomienia email</p>
                  </div>
                  <Button variant="outline">Ustawienia</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}