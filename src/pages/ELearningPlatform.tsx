import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProductCreationWizard } from "@/components/digital-products/ProductCreationWizard";
import { AnalyticsDashboard } from "@/components/digital-products/AnalyticsDashboard";
import { 
  GraduationCap, 
  Upload, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Play, 
  Clock, 
  Star,
  Award,
  BookOpen,
  Video,
  FileText,
  MessageSquare,
  CheckCircle
} from "lucide-react";

const ELearningPlatform = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Opublikowane Kursy", value: "23", change: "+5%", icon: GraduationCap },
    { title: "Aktywni Studenci", value: "1,847", change: "+18%", icon: Users },
    { title: "Przychód Miesięczny", value: "15,670 PLN", change: "+25%", icon: DollarSign },
    { title: "Średnia Ocena", value: "4.8", change: "+0.2", icon: Star },
  ];

  const recentCourses = [
    { 
      title: "React dla Początkujących", 
      instructor: "Jan Kowalski", 
      status: "Opublikowany", 
      students: 142, 
      revenue: "4,260 PLN",
      rating: 4.9,
      lessons: 24,
      duration: "8h 30m"
    },
    { 
      title: "AI w Praktyce", 
      instructor: "Dr. Anna Nowak", 
      status: "W Review", 
      students: 0, 
      revenue: "-",
      rating: 0,
      lessons: 18,
      duration: "6h 15m"
    },
    { 
      title: "Marketing Cyfrowy", 
      instructor: "Piotr Wiśniewski", 
      status: "Opublikowany", 
      students: 89, 
      revenue: "2,670 PLN",
      rating: 4.7,
      lessons: 32,
      duration: "12h 45m"
    },
    { 
      title: "Grafika w Canva", 
      instructor: "Maria Jankowska", 
      status: "Aktualizowany", 
      students: 203, 
      revenue: "6,090 PLN",
      rating: 4.8,
      lessons: 16,
      duration: "5h 20m"
    },
  ];

  const categories = [
    { name: "Programowanie", courses: 8, students: 456, revenue: "13,680 PLN" },
    { name: "Marketing", courses: 5, students: 234, revenue: "7,020 PLN" },
    { name: "Design", courses: 4, students: 189, revenue: "5,670 PLN" },
    { name: "Biznes", courses: 3, students: 145, revenue: "4,350 PLN" },
    { name: "AI & ML", courses: 2, students: 98, revenue: "2,940 PLN" },
    { name: "Fotografia", courses: 1, students: 67, revenue: "2,010 PLN" },
  ];

  const topStudents = [
    { name: "Anna Kowalska", courses: 8, certificates: 6, avatar: "/placeholder.svg" },
    { name: "Piotr Nowak", courses: 6, certificates: 5, avatar: "/placeholder.svg" },
    { name: "Maria Wiśniewska", courses: 5, certificates: 4, avatar: "/placeholder.svg" },
    { name: "Jan Jankowski", courses: 4, certificates: 3, avatar: "/placeholder.svg" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">E-Learning Platform</h1>
          <p className="text-muted-foreground text-lg">Twórz, publikuj i monetyzuj kursy online</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg">
            <Users className="mr-2 h-5 w-5" />
            Studenci
          </Button>
          <Button size="lg">
            <Upload className="mr-2 h-5 w-5" />
            Nowy Kurs
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span className="ml-1">vs poprzedni miesiąc</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="create">Tworzenie</TabsTrigger>
          <TabsTrigger value="students">Studenci</TabsTrigger>
          <TabsTrigger value="analytics">Analityka</TabsTrigger>
          <TabsTrigger value="certificates">Certyfikaty</TabsTrigger>
          <TabsTrigger value="monetization">Monetyzacja</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Twoje Kursy</CardTitle>
              <CardDescription>Przegląd najnowszych kursów i ich wydajności</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {course.lessons} lekcji
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                          </span>
                          {course.rating > 0 && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {course.rating}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Badge variant={course.status === "Opublikowany" ? "default" : course.status === "Aktualizowany" ? "secondary" : "outline"}>
                        {course.status}
                      </Badge>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{course.students}</p>
                        <p className="text-sm text-muted-foreground">studentów</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{course.revenue}</p>
                        <p className="text-sm text-muted-foreground">przychód</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories and Top Students Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Categories Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Wydajność Kategorii</CardTitle>
                <CardDescription>Najpopularniejsze dziedziny</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">{category.courses} kursów • {category.students} studentów</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{category.revenue}</p>
                        <p className="text-sm text-muted-foreground">przychód</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Students */}
            <Card>
              <CardHeader>
                <CardTitle>Najaktywniejszi Studenci</CardTitle>
                <CardDescription>Studenci z największą liczbą ukończonych kursów</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-foreground">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.courses} kursów ukończonych</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium text-foreground">{student.certificates}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          {/* Course Creation Wizard */}
          <Card>
            <CardHeader>
              <CardTitle>Kreator Kursów</CardTitle>
              <CardDescription>Stwórz nowy kurs krok po kroku</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductCreationWizard />
            </CardContent>
          </Card>

          {/* Quick Course Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Szablony Kursów</CardTitle>
              <CardDescription>Rozpocznij od gotowego szablonu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-base">Kurs Wideo</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Tradycyjny format z nagraniami wideo i materiałami do pobrania</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-500" />
                      <CardTitle className="text-base">Kurs Tekstowy</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Kurs oparty na artykułach i dokumentach PDF</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                      <CardTitle className="text-base">Kurs Interaktywny</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Zawiera quizy, zadania praktyczne i forum dyskusyjne</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie Studentami</CardTitle>
              <CardDescription>Monitoruj postępy i komunikuj się ze studentami</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Search and Filters */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input placeholder="Wyszukaj studenta..." />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtruj po kursie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie kursy</SelectItem>
                    <SelectItem value="react">React dla Początkujących</SelectItem>
                    <SelectItem value="ai">AI w Praktyce</SelectItem>
                    <SelectItem value="marketing">Marketing Cyfrowy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Student Progress Overview */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Postępy Studentów</h3>
                <div className="space-y-4">
                  {[
                    { name: "Anna Kowalska", course: "React dla Początkujących", progress: 85, completed: 17, total: 20 },
                    { name: "Piotr Nowak", course: "Marketing Cyfrowy", progress: 60, completed: 12, total: 20 },
                    { name: "Maria Wiśniewska", course: "AI w Praktyce", progress: 95, completed: 19, total: 20 },
                    { name: "Jan Jankowski", course: "Grafika w Canva", progress: 40, completed: 8, total: 20 },
                  ].map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-foreground">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Postęp</span>
                            <span>{student.progress}%</span>
                          </div>
                          <Progress value={student.progress} className="h-2" />
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{student.completed}/{student.total}</p>
                          <p className="text-sm text-muted-foreground">lekcji</p>
                        </div>
                        <Button variant="outline" size="sm">Kontakt</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                System Certyfikatów
              </CardTitle>
              <CardDescription>Zarządzaj certyfikatami ukończenia kursów</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Certificate Templates */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Szablony Certyfikatów</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Szablon Podstawowy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-32 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-sm text-muted-foreground">Podgląd certyfikatu</p>
                      </div>
                      <Button className="w-full" variant="outline">Edytuj Szablon</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Szablon Premium</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-32 bg-gradient-to-r from-gold-50 to-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg flex items-center justify-center mb-4">
                        <p className="text-sm text-muted-foreground">Podgląd certyfikatu premium</p>
                      </div>
                      <Button className="w-full" variant="outline">Edytuj Szablon</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Certificate Statistics */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Wydane Certyfikaty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">342</div>
                    <p className="text-sm text-muted-foreground">+18% vs. poprzedni miesiąc</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Wskaźnik Ukończenia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">68%</div>
                    <p className="text-sm text-muted-foreground">studentów kończy kursy</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Średni Czas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">3.2</div>
                    <p className="text-sm text-muted-foreground">tygodni na ukończenie</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Certificates */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Ostatnio Wydane Certyfikaty</h3>
                <div className="space-y-3">
                  {[
                    { student: "Anna Kowalska", course: "React dla Początkujących", date: "2024-01-15", verified: true },
                    { student: "Piotr Nowak", course: "Marketing Cyfrowy", date: "2024-01-14", verified: true },
                    { student: "Maria Wiśniewska", course: "AI w Praktyce", date: "2024-01-13", verified: false },
                    { student: "Jan Jankowski", course: "Grafika w Canva", date: "2024-01-12", verified: true },
                  ].map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <div>
                          <h4 className="font-medium text-foreground">{cert.student}</h4>
                          <p className="text-sm text-muted-foreground">{cert.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{cert.date}</span>
                        {cert.verified ? (
                          <Badge variant="default" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Zweryfikowany
                          </Badge>
                        ) : (
                          <Badge variant="outline">Oczekuje</Badge>
                        )}
                        <Button variant="outline" size="sm">Zobacz</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monetization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Modele Monetyzacji
              </CardTitle>
              <CardDescription>Optymalizuj przychody z kursów online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Revenue Models */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Płatność Jednorazowa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-foreground">89.99 PLN</div>
                      <p className="text-sm text-muted-foreground">średnia cena kursu</p>
                      <div className="flex justify-between text-sm">
                        <span>Sprzedane kursy:</span>
                        <span className="font-medium">234</span>
                      </div>
                      <Button className="w-full" variant="outline">Ustaw Ceny</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Subskrypcja Miesięczna</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-foreground">29.99 PLN</div>
                      <p className="text-sm text-muted-foreground">miesięczny dostęp</p>
                      <div className="flex justify-between text-sm">
                        <span>Aktywni subskrybenci:</span>
                        <span className="font-medium">156</span>
                      </div>
                      <Button className="w-full" variant="outline">Zarządzaj</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Licencje Korporacyjne</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-foreground">499.99 PLN</div>
                      <p className="text-sm text-muted-foreground">za firmę</p>
                      <div className="flex justify-between text-sm">
                        <span>Aktywne licencje:</span>
                        <span className="font-medium">12</span>
                      </div>
                      <Button className="w-full" variant="outline">Skonfiguruj</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pricing Strategy */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Strategia Cenowa</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Analiza Konkurencji</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Kursy programowania:</span>
                            <span className="text-sm font-medium">79-199 PLN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Kursy marketingu:</span>
                            <span className="text-sm font-medium">59-149 PLN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Kursy designu:</span>
                            <span className="text-sm font-medium">69-179 PLN</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Rekomendacje Cenowe</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Kurs podstawowy (&lt; 5h):</span>
                            <span className="text-sm font-medium">49-89 PLN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Kurs średni (5-15h):</span>
                            <span className="text-sm font-medium">89-149 PLN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Kurs zaawansowany (&gt;15h):</span>
                            <span className="text-sm font-medium">149-299 PLN</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Revenue Analytics */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Analityka Przychodów</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground">Sprzedaż Bezpośrednia</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">9,420 PLN</div>
                      <div className="text-sm text-green-600">+22% vs. poprzedni miesiąc</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground">Subskrypcje</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">4,680 PLN</div>
                      <div className="text-sm text-green-600">+35% vs. poprzedni miesiąc</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground">Licencje B2B</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">5,990 PLN</div>
                      <div className="text-sm text-green-600">+15% vs. poprzedni miesiąc</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-muted-foreground">Certyfikaty</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">1,420 PLN</div>
                      <div className="text-sm text-green-600">+8% vs. poprzedni miesiąc</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ELearningPlatform;