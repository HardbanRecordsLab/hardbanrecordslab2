
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { Music, Search, Eye, Edit, Trash2, Check, X, Plus, Users, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { StatsCard } from "@/components/StatsCard"

interface MusicProject {
  id: string
  title: string
  type: string
  status: string
  created_at: string
  user_id: string
  description?: string
  profile?: {
    full_name: string
    email: string
  }
}

export default function AdminMusicProjects() {
  const [projects, setProjects] = useState<MusicProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<MusicProject[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<MusicProject | null>(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [reviewNote, setReviewNote] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchTerm, statusFilter])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error: any) {
      console.error('Error fetching projects:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać projektów muzycznych",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.type?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(project => project.status === statusFilter)
    }

    setFilteredProjects(filtered)
  }

  const updateProjectStatus = async (projectId: string, status: string, note?: string) => {
    try {
      const updateData: any = { status }
      if (note) {
        updateData.metadata = { review_note: note }
      }

      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', projectId)

      if (error) throw error

      // Refresh projects
      fetchProjects()
      setReviewDialogOpen(false)
      setReviewNote("")
      setSelectedProject(null)

      toast({
        title: "Sukces",
        description: `Status projektu został zmieniony na: ${getStatusLabel(status)}`
      })
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować statusu projektu",
        variant: "destructive"
      })
    }
  }

  const deleteProject = async (projectId: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten projekt?")) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (error) throw error

      fetchProjects()
      toast({
        title: "Sukces",
        description: "Projekt został usunięty"
      })
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć projektu",
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
      case 'rejected':
        return 'destructive'
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
      case 'rejected':
        return 'Odrzucony'
      default:
        return status
    }
  }

  const totalProjects = projects.length
  const publishedProjects = projects.filter(p => p.status === 'published').length
  const pendingProjects = projects.filter(p => p.status === 'review').length
  const totalArtists = new Set(projects.map(p => p.user_id)).size

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Music className="w-8 h-8" />
            Projekty Muzyczne
          </h1>
          <p className="text-muted-foreground">
            Zarządzanie wszystkimi projektami muzycznymi na platformie
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Wszystkie projekty"
          value={totalProjects.toString()}
          description="Łączna liczba projektów"
          icon={<Music className="w-4 h-4" />}
        />
        <StatsCard
          title="Opublikowane"
          value={publishedProjects.toString()}
          description="Dostępne publicznie"
          icon={<Check className="w-4 h-4" />}
        />
        <StatsCard
          title="Oczekujące"
          value={pendingProjects.toString()}
          description="Do recenzji"
          icon={<Eye className="w-4 h-4" />}
        />
        <StatsCard
          title="Artyści"
          value={totalArtists.toString()}
          description="Aktywni artyści"
          icon={<Users className="w-4 h-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtry</CardTitle>
          <CardDescription>
            Wyszukuj i filtruj projekty muzyczne
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Szukaj projektów, artystów..."
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
                <SelectItem value="rejected">Odrzucony</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista Projektów ({filteredProjects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Ładowanie...</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nie znaleziono projektów spełniających kryteria wyszukiwania
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tytuł</TableHead>
                  <TableHead>Artysta</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data utworzenia</TableHead>
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{project.title}</div>
                        {project.description && (
                          <div className="text-sm text-muted-foreground">
                            {project.description.substring(0, 50)}...
                          </div>
                        )}
                      </div>
                    </TableCell>
                     <TableCell>
                      <div>
                        <div>Użytkownik</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {project.user_id.substring(0, 8)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{project.type}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(project.status)}>
                        {getStatusLabel(project.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(project.created_at).toLocaleDateString('pl-PL')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedProject(project)
                            setReviewDialogOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {project.status === 'review' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => updateProjectStatus(project.id, 'published')}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedProject(project)
                                setReviewDialogOpen(true)
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteProject(project.id)}
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
            <DialogTitle>Recenzja Projektu</DialogTitle>
            <DialogDescription>
              Projekt: {selectedProject?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Opis projektu:</h4>
              <p className="text-sm text-muted-foreground">
                {selectedProject?.description || 'Brak opisu'}
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="review-note" className="text-sm font-medium">
                Notatka do recenzji:
              </label>
              <Textarea
                id="review-note"
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Dodaj notatkę do recenzji..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Anuluj
            </Button>
            <Button 
              variant="destructive"
              onClick={() => selectedProject && updateProjectStatus(selectedProject.id, 'rejected', reviewNote)}
            >
              Odrzuć
            </Button>
            <Button 
              onClick={() => selectedProject && updateProjectStatus(selectedProject.id, 'published', reviewNote)}
            >
              Zatwierdź
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
