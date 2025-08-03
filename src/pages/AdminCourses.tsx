
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { GraduationCap, Search, Eye, Edit, Trash2, Users, BookOpen, TrendingUp, Plus, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { StatsCard } from "@/components/StatsCard"
import { useForm } from "react-hook-form"

interface Course {
  id: string
  title: string
  description: string
  status: string
  price: number
  created_at: string
  instructor_id: string
  instructor?: {
    full_name: string
    email: string
  }
}

interface CourseFormData {
  title: string
  description: string
  price: number
}

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [reviewNote, setReviewNote] = useState("")
  const { toast } = useToast()

  const form = useForm<CourseFormData>({
    defaultValues: {
      title: "",
      description: "",
      price: 0
    }
  })

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

  const createCourse = async (data: CourseFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Nie jesteś zalogowany")

      const { error } = await supabase
        .from('courses')
        .insert({
          ...data,
          instructor_id: user.id,
          status: 'draft'
        })

      if (error) throw error

      fetchCourses()
      setCreateDialogOpen(false)
      form.reset()

      toast({
        title: "Sukces",
        description: "Kurs został utworzony"
      })
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: "Nie udało się utworzyć kursu",
        variant: "destructive"
      })
    }
  }

  const updateCourseStatus = async (courseId: string, status: string, note?: string) => {
    try {
      const updateData: any = { status }

      const { error } = await supabase
        .from('courses')
        .update(updateData)
        .eq('id', courseId)

      if (error) throw error

      fetchCourses()
      setReviewDialogOpen(false)
      setReviewNote("")
      setSelectedCourse(null)

      toast({
        title: "Sukces",
        description: `Status kursu został zmieniony na: ${getStatusLabel(status)}`
      })
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować statusu kursu",
        variant: "destructive"
      })
    }
  }

  const deleteCourse = async (courseId: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten kurs?")) return

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId)

      if (error) throw error

      fetchCourses()
      toast({
        title: "Sukces",
        description: "Kurs został usunięty"
      })
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć kursu",
        variant: "destructive"
      })
    }
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
  const pendingCourses = courses.filter(c => c.status === 'review').length
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
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Dodaj Kurs
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Utwórz Nowy Kurs</DialogTitle>
              <DialogDescription>
                Dodaj nowy kurs do platformy eLearning
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(createCourse)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tytuł kursu</FormLabel>
                      <FormControl>
                        <Input placeholder="Wprowadź tytuł kursu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opis</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Opisz kurs" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cena (zł)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Anuluj
                  </Button>
                  <Button type="submit">Utwórz Kurs</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
          title="Oczekujące"
          value={pendingCourses.toString()}
          description="Do recenzji"
          icon={<Eye className="w-4 h-4" />}
        />
        <StatsCard
          title="Łączna wartość"
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
                        <div>Administrator</div>
                        <div className="text-sm text-muted-foreground">
                          System
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
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedCourse(course)
                            setReviewDialogOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {course.status === 'review' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateCourseStatus(course.id, 'published')}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateCourseStatus(course.id, 'draft')}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteCourse(course.id)}
                        >
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

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Szczegóły Kursu</DialogTitle>
            <DialogDescription>
              Kurs: {selectedCourse?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Opis kursu:</h4>
              <p className="text-sm text-muted-foreground">
                {selectedCourse?.description || 'Brak opisu'}
              </p>
            </div>
            <div>
              <h4 className="font-medium">Cena:</h4>
              <p className="text-sm text-muted-foreground">
                {selectedCourse?.price ? `${selectedCourse.price} zł` : 'Darmowy'}
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="review-note" className="text-sm font-medium">
                Notatka:
              </label>
              <Textarea
                id="review-note"
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Dodaj notatkę..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Zamknij
            </Button>
            {selectedCourse?.status === 'draft' && (
              <Button 
                onClick={() => selectedCourse && updateCourseStatus(selectedCourse.id, 'published')}
              >
                Opublikuj
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
