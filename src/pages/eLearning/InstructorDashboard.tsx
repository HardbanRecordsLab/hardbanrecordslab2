import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Award, 
  Plus,
  Video,
  FileText,
  DollarSign,
  Star,
  PlayCircle,
  Eye,
  Download
} from "lucide-react"

export default function InstructorDashboard() {
  const stats = [
    { title: "Aktywne Kursy", value: "12", icon: BookOpen, color: "text-blue-600" },
    { title: "Łączni Uczniowie", value: "1,247", icon: Users, color: "text-green-600" },
    { title: "Przychody (30 dni)", value: "15,890 PLN", icon: DollarSign, color: "text-purple-600" },
    { title: "Wydane Certyfikaty", value: "892", icon: Award, color: "text-orange-600" },
  ]

  const recentCourses = [
    {
      id: 1,
      title: "React i TypeScript - Kompletny Kurs",
      students: 256,
      completion: 78,
      revenue: "4,230 PLN",
      rating: 4.8,
      status: "active"
    },
    {
      id: 2,
      title: "Node.js Backend Development",
      students: 189,
      completion: 65,
      revenue: "3,120 PLN",
      rating: 4.6,
      status: "active"
    },
    {
      id: 3,
      title: "Podstawy Data Science",
      students: 142,
      completion: 43,
      revenue: "2,890 PLN",
      rating: 4.7,
      status: "draft"
    }
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel Instruktora</h1>
          <p className="text-muted-foreground">Zarządzaj kursami i śledź postępy</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Utwórz Nowy Kurs
        </Button>
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
        {/* Recent Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Moje Kursy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{course.title}</h3>
                        <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                          {course.status === 'active' ? 'Aktywny' : 'Szkic'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {course.students} uczniów
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {course.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {course.revenue}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span>Ukończenie:</span>
                          <Progress value={course.completion} className="flex-1 max-w-[100px]" />
                          <span>{course.completion}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Szybkie Akcje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Video className="w-4 h-4" />
                Nagraj Lekcję
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <FileText className="w-4 h-4" />
                Utwórz Quiz
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <Award className="w-4 h-4" />
                Wydaj Certyfikat
              </Button>
              <Button className="w-full justify-start gap-2" variant="outline">
                <TrendingUp className="w-4 h-4" />
                Zobacz Statystyki
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ostatnie Powiadomienia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Nowy student zapisał się na kurs React</p>
                    <p className="text-muted-foreground">2 godz. temu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Certyfikat został wydany dla Jana Kowalskiego</p>
                    <p className="text-muted-foreground">5 godz. temu</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Nowa recenzja kursu Node.js (5 gwiazdek)</p>
                    <p className="text-muted-foreground">1 dzień temu</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Wydajność Kursów (30 dni)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Wykres wydajności zostanie wkrótce dodany</p>
              <p className="text-sm">Integracja z systemem analityki w toku</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}