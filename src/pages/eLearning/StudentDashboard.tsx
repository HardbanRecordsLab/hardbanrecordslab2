import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  PlayCircle, 
  Award,
  Clock,
  TrendingUp,
  Star,
  Download,
  Calendar,
  Target,
  Users,
  CheckCircle,
  RotateCcw,
  MessageCircle,
  Bookmark,
  Search,
  Filter
} from "lucide-react"

export default function StudentDashboard() {
  const stats = [
    { title: "Aktywne Kursy", value: "3", icon: BookOpen, color: "text-blue-600" },
    { title: "Ukończone Kursy", value: "12", icon: CheckCircle, color: "text-green-600" },
    { title: "Zdobyte Certyfikaty", value: "8", icon: Award, color: "text-yellow-600" },
    { title: "Godziny Nauki", value: "89h", icon: Clock, color: "text-purple-600" },
  ]

  const activeCourses = [
    {
      id: 1,
      title: "React i TypeScript - Kompletny Kurs",
      instructor: "Jan Kowalski",
      progress: 78,
      totalLessons: 45,
      completedLessons: 35,
      nextLesson: "Zaawansowane Hooki",
      timeSpent: "12h 30m",
      lastAccessed: "2 godziny temu",
      difficulty: "Średniozaawansowany",
      rating: 4.8
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      instructor: "Anna Nowak",
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      nextLesson: "Express.js Middleware",
      timeSpent: "8h 15m",
      lastAccessed: "1 dzień temu",
      difficulty: "Zaawansowany",
      rating: 4.6
    },
    {
      id: 3,
      title: "Podstawy Data Science",
      instructor: "Piotr Wiśniewski",
      progress: 23,
      totalLessons: 28,
      completedLessons: 6,
      nextLesson: "Python dla Data Science",
      timeSpent: "4h 45m",
      lastAccessed: "3 dni temu",
      difficulty: "Początkujący",
      rating: 4.7
    }
  ]

  const completedCourses = [
    {
      id: 1,
      title: "HTML i CSS - Podstawy",
      instructor: "Maria Kowalczyk",
      completedDate: "2024-01-10",
      score: 94,
      certificateId: "HTML-CSS-001",
      duration: "6h"
    },
    {
      id: 2,
      title: "JavaScript ES6+",
      instructor: "Tomasz Nowak",
      completedDate: "2024-01-05",
      score: 87,
      certificateId: "JS-ES6-002",
      duration: "8h"
    }
  ]

  const achievements = [
    { icon: "🎯", title: "Pierwsze ukończenie", description: "Ukończyłeś pierwszy kurs" },
    { icon: "⚡", title: "Szybka nauka", description: "3 lekcje w jeden dzień" },
    { icon: "📚", title: "Żądny wiedzy", description: "10 ukończonych kursów" },
    { icon: "🔥", title: "Seria 7 dni", description: "Nauka przez 7 dni z rzędu" }
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mój Panel Ucznia</h1>
          <p className="text-muted-foreground">Kontynuuj naukę i śledź swoje postępy</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Search className="w-4 h-4" />
            Przeglądaj Kursy
          </Button>
          <Button className="gap-2">
            <BookOpen className="w-4 h-4" />
            Moje Kursy
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Aktywne Kursy
              </CardTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtruj
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCourses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{course.title}</h3>
                          <Badge variant="outline">{course.difficulty}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Prowadzący: {course.instructor}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Postęp kursu</span>
                        <span>{course.completedLessons}/{course.totalLessons} lekcji</span>
                      </div>
                      <Progress value={course.progress} />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{course.progress}% ukończone</span>
                        <span>Następna: {course.nextLesson}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.timeSpent}
                        </span>
                        <span>Ostatnio: {course.lastAccessed}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-2">
                          <PlayCircle className="w-4 h-4" />
                          Kontynuuj
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Learning Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Cele Tygodniowe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Czas nauki</span>
                  <span>8h / 10h</span>
                </div>
                <Progress value={80} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Ukończone lekcje</span>
                  <span>12 / 15</span>
                </div>
                <Progress value={80} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Rozwiązane quizy</span>
                  <span>3 / 5</span>
                </div>
                <Progress value={60} />
              </div>
              <Button className="w-full mt-4">
                Zobacz Szczegóły
              </Button>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Osiągnięcia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Zobacz Wszystkie
              </Button>
            </CardContent>
          </Card>

          {/* Study Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Seria Nauki
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">7 dni</div>
              <p className="text-sm text-muted-foreground mb-4">
                Kontynuuj naukę aby utrzymać serię!
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full ${
                      i < 7 ? 'bg-green-500' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <Button size="sm" className="w-full">
                Kontynuuj Serię
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Completed Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Ukończone Kursy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedCourses.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
                    <p className="text-xs text-muted-foreground">Prowadzący: {course.instructor}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Ukończono:</span>
                    <span>{course.completedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Wynik:</span>
                    <Badge variant="secondary">{course.score}%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Czas trwania:</span>
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Award className="w-3 h-3" />
                    Certyfikat
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <RotateCcw className="w-3 h-3" />
                    Powtórz
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Ostatnia Aktywność
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Ukończyłeś lekcję "Zaawansowane Hooki"</p>
                <p className="text-xs text-muted-foreground">React i TypeScript - 2 godziny temu</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Zdobyłeś osiągnięcie "Szybka nauka"</p>
                <p className="text-xs text-muted-foreground">5 godzin temu</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Rozwiązałeś quiz z wynikiem 92%</p>
                <p className="text-xs text-muted-foreground">Node.js Backend - 1 dzień temu</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Zapisałeś się na nowy kurs</p>
                <p className="text-xs text-muted-foreground">Podstawy Data Science - 3 dni temu</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}