import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/integrations/supabase/client"
import { GraduationCap, Search, Eye, Edit, Trash2, Users, BookOpen, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { StatsCard } from "@/components/StatsCard"

interface Course {
  id: string
  title: string
  description: string
  status: string
  price: number
  created_at: string
  instructor_id: string
  profiles?: {
    full_name: string
    email: string
  }
}

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { toast } = useToast()

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [courses, searchTerm, statusFilter])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error: any) {
      console.error('Error fetching courses:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać kursów",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filterCourses = () => {
    let filtered = courses

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(course => course.status === statusFilter)
    }

    setFilteredCourses(filtered)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published':
        return 'default'
      case 'draft':
        return 'secondary'
      case 'review':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published':
        return 'Opublikowany'
      case 'draft':
        return 'Szkic'
      case 'review':
        return 'W recenzji'
      default:
        return status
    }
  }

  const totalCourses = courses.length
  const publishedCourses = courses.filter(c => c.status === 'published').length
  const totalRevenue = courses.reduce((sum, course) => sum + (course.price || 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="w-8 h-8" />
            Kursy eLearning
          </h1>
          <p className="text-muted-foreground">
            Zarządzanie kursami online na platformie
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Wszystkie kursy"
          value={totalCourses.toString()}
          description="Łączna liczba kursów"
          icon={<BookOpen className="w-4 h-4" />}
        />
        <StatsCard
          title="Opublikowane"
          value={publishedCourses.toString()}
          description="Dostępne kursy"
          icon={<GraduationCap className="w-4 h-4" />}
        />
        <StatsCard
          title="Instruktorzy"
          value={new Set(courses.map(c => c.instructor_id)).size.toString()}
          description="Aktywni instruktorzy"
          icon={<Users className="w-4 h-4" />}
        />
        <StatsCard
          title="Łączna cena"
          value={`${totalRevenue} zł`}
          description="Suma cen kursów"
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtry</CardTitle>
          <CardDescription>
            Wyszukuj i filtruj kursy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Szukaj kursów, instruktorów..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie statusy</SelectItem>
                <SelectItem value="draft">Szkic</SelectItem>
                <SelectItem value="review">W recenzji</SelectItem>
                <SelectItem value="published">Opublikowany</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista Kursów ({filteredCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Ładowanie...</div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nie znaleziono kursów spełniających kryteria wyszukiwania
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tytuł</TableHead>
                  <TableHead>Instruktor</TableHead>
                  <TableHead>Cena</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data utworzenia</TableHead>
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{course.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {course.description?.substring(0, 50)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>Instruktor</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {course.instructor_id.substring(0, 8)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{course.price ? `${course.price} zł` : 'Darmowy'}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(course.status)}>
                        {getStatusLabel(course.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(course.created_at).toLocaleDateString('pl-PL')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}