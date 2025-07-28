import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, MessageCircle, Share2, Clock, CheckCircle, UserPlus, Music, FileText, Download, Upload, Plus } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { FileUpload } from "@/components/FileUpload"
import { toast } from "sonner"

interface Project {
  id: string
  title: string
  description: string
  status: string
  type: string
  created_at: string
  file_url?: string
  cover_url?: string
}

interface ProjectFile {
  id: string
  name: string
  file_url: string
  file_type: string
  file_size: number
  version: string
  created_at: string
  uploaded_by: string
}

interface Collaboration {
  id: string
  project_id: string
  collaborator_id: string
  role: string
  status: string
  created_at: string
  profiles: {
    full_name: string
    avatar_url?: string
  }
}

export default function ArtistCollaborationReal() {
  const { user, profile } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([])
  const [collaborations, setCollaborations] = useState<Collaboration[]>([])
  const [loading, setLoading] = useState(true)
  const [newProjectOpen, setNewProjectOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  // New project form
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    type: 'music'
  })

  useEffect(() => {
    if (user) {
      loadProjects()
      loadCollaborations()
    }
  }, [user])

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id)
        .eq('type', 'music')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error: any) {
      console.error('Error loading projects:', error)
      toast.error('Błąd podczas ładowania projektów')
    } finally {
      setLoading(false)
    }
  }

  const loadProjectFiles = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjectFiles(data || [])
    } catch (error: any) {
      console.error('Error loading project files:', error)
      toast.error('Błąd podczas ładowania plików')
    }
  }

  const loadCollaborations = async () => {
    try {
      // Load collaborations for current user's projects
      const { data, error } = await supabase
        .from('collaborations')
        .select('*')
        .in('project_id', projects.map(p => p.id))

      if (error) throw error
      setCollaborations(data || [])
    } catch (error: any) {
      console.error('Error loading collaborations:', error)
    }
  }

  const createProject = async () => {
    if (!newProject.title.trim()) {
      toast.error('Tytuł projektu jest wymagany')
      return
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: newProject.title,
          description: newProject.description,
          type: newProject.type,
          user_id: user?.id
        })
        .select()
        .single()

      if (error) throw error

      setProjects(prev => [data, ...prev])
      setNewProject({ title: '', description: '', type: 'music' })
      setNewProjectOpen(false)
      toast.success('Projekt został utworzony')
    } catch (error: any) {
      console.error('Error creating project:', error)
      toast.error('Błąd podczas tworzenia projektu')
    }
  }

  const handleFileUpload = async (url: string, fileName: string) => {
    if (!selectedProject) return

    try {
      const { error } = await supabase
        .from('project_files')
        .insert({
          project_id: selectedProject,
          name: fileName,
          file_url: url,
          file_type: fileName.split('.').pop() || '',
          file_size: 0, // We don't have size info from upload
          uploaded_by: user?.id
        })

      if (error) throw error

      await loadProjectFiles(selectedProject)
      toast.success('Plik został przesłany')
    } catch (error: any) {
      console.error('Error saving file info:', error)
      toast.error('Błąd podczas zapisywania informacji o pliku')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Zakończony'
      case 'in_progress':
        return 'W trakcie'
      case 'draft':
        return 'Szkic'
      default:
        return status
    }
  }

  if (loading) {
    return <div className="p-6">Ładowanie...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Współpraca</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj projektami muzycznymi i zespołami twórczymi
          </p>
        </div>
        <Dialog open={newProjectOpen} onOpenChange={setNewProjectOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nowy Projekt
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Utwórz nowy projekt</DialogTitle>
              <DialogDescription>
                Dodaj nowy projekt muzyczny do współpracy
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Tytuł projektu</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nazwa utworu lub albumu"
                />
              </div>
              <div>
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Opis projektu, gatunek, cel..."
                />
              </div>
              <div>
                <Label htmlFor="type">Typ projektu</Label>
                <Select
                  value={newProject.type}
                  onValueChange={(value) => setNewProject(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Muzyka</SelectItem>
                    <SelectItem value="album">Album</SelectItem>
                    <SelectItem value="remix">Remix</SelectItem>
                    <SelectItem value="collaboration">Kolaboracja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setNewProjectOpen(false)}>
                  Anuluj
                </Button>
                <Button onClick={createProject}>
                  Utwórz projekt
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Aktywne projekty</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'in_progress').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Kolaboracje</p>
                <p className="text-2xl font-bold">{collaborations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Wszystkie projekty</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Zakończone</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === 'completed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Moje Projekty</TabsTrigger>
          <TabsTrigger value="files">Pliki & Wersje</TabsTrigger>
          <TabsTrigger value="collaborations">Kolaboracje</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {projects.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Music className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Brak projektów</h3>
                  <p className="text-muted-foreground mb-4">
                    Utwórz swój pierwszy projekt muzyczny
                  </p>
                  <Button onClick={() => setNewProjectOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nowy Projekt
                  </Button>
                </CardContent>
              </Card>
            ) : (
              projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>
                          {project.description}
                        </CardDescription>
                        <p className="text-xs text-muted-foreground mt-1">
                          Utworzony: {new Date(project.created_at).toLocaleDateString('pl-PL')}
                        </p>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusLabel(project.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>Typ: {project.type}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedProject(project.id)
                            loadProjectFiles(project.id)
                          }}
                        >
                          <Music className="w-3 h-3 mr-1" />
                          Zarządzaj
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pliki projektu</CardTitle>
              <CardDescription>
                {selectedProject ? 'Zarządzaj plikami wybranego projektu' : 'Wybierz projekt aby zobaczyć pliki'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedProject ? (
                <>
                  <FileUpload
                    bucket="project-files"
                    folder="music"
                    allowedTypes={['audio/*', 'image/*', 'application/pdf']}
                    maxSize={50}
                    onUploadComplete={handleFileUpload}
                    onUploadError={(error) => toast.error(error)}
                    multiple
                  />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Przesłane pliki:</h4>
                    {projectFiles.length === 0 ? (
                      <p className="text-muted-foreground">Brak plików</p>
                    ) : (
                      projectFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4" />
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {file.version} • {new Date(file.created_at).toLocaleDateString('pl-PL')}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                              <Download className="w-3 h-3 mr-1" />
                              Pobierz
                            </a>
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Wybierz projekt z zakładki "Moje Projekty" aby zarządzać plikami
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaborations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kolaboracje</CardTitle>
              <CardDescription>Zarządzaj współpracą z innymi artystami</CardDescription>
            </CardHeader>
            <CardContent>
              {collaborations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Brak aktywnych kolaboracji</p>
                  <p className="text-sm">Zaproś innych artystów do współpracy</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {collaborations.map((collab) => (
                    <div key={collab.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={collab.profiles?.avatar_url} />
                          <AvatarFallback>
                            {collab.profiles?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{collab.profiles?.full_name || 'Użytkownik'}</p>
                          <p className="text-sm text-muted-foreground">
                            Rola: {collab.role} • Status: {collab.status}
                          </p>
                        </div>
                      </div>
                      <Badge variant={collab.status === 'accepted' ? 'default' : 'secondary'}>
                        {collab.status === 'accepted' ? 'Aktywny' : 'Oczekuje'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}