import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/integrations/supabase/client"
import { Music, Search, Eye, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MusicProject {
  id: string
  title: string
  type: string
  status: string
  created_at: string
  user_id: string
  profiles?: {
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
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <div>
                        <div>Artysta</div>
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