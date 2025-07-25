import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageCircle, Share2, Clock, CheckCircle, UserPlus, Music, FileText, Download, Upload } from "lucide-react"

const activeCollaborations = [
  {
    id: 1,
    title: "Ambient Fusion Project",
    collaborators: [
      { name: "Producer Mike", avatar: "", role: "Producer", status: "active" },
      { name: "Vocalist Anna", avatar: "", role: "Vocalist", status: "active" }
    ],
    status: "in_progress",
    progress: 65,
    deadline: "2024-02-15",
    lastActivity: "2024-01-19",
    files: 12,
    comments: 8
  },
  {
    id: 2,
    title: "Electronic Remix",
    collaborators: [
      { name: "DJ Mixmaster", avatar: "", role: "Remixer", status: "pending" }
    ],
    status: "pending",
    progress: 20,
    deadline: "2024-02-28",
    lastActivity: "2024-01-18",
    files: 3,
    comments: 2
  }
]

const projectVersions = [
  {
    id: 1,
    version: "v2.3",
    title: "Ambient Fusion Project - Final Mix",
    author: "DJ Soundwave",
    uploadDate: "2024-01-19 14:30",
    fileSize: "45.2 MB",
    format: "WAV",
    changes: "Mastered version with improved bass"
  },
  {
    id: 2,
    version: "v2.2", 
    title: "Ambient Fusion Project - Vocal Mix",
    author: "Vocalist Anna",
    uploadDate: "2024-01-18 10:15",
    fileSize: "38.1 MB",
    format: "WAV",
    changes: "Added vocal harmonies in chorus"
  },
  {
    id: 3,
    version: "v2.1",
    title: "Ambient Fusion Project - Beat Only",
    author: "Producer Mike",
    uploadDate: "2024-01-17 16:45",
    fileSize: "32.4 MB", 
    format: "WAV",
    changes: "Updated drum pattern and bassline"
  }
]

const revenueSharing = [
  {
    projectId: 1,
    title: "Ambient Fusion Project",
    totalRevenue: "$1,234.56",
    distributions: [
      { name: "DJ Soundwave", percentage: 40, amount: "$493.82" },
      { name: "Producer Mike", percentage: 35, amount: "$432.10" },
      { name: "Vocalist Anna", percentage: 25, amount: "$308.64" }
    ],
    lastDistribution: "2024-01-15",
    nextDistribution: "2024-02-15"
  }
]

const invitations = [
  {
    id: 1,
    from: "Electronic Producer X",
    project: "House Anthem 2024",
    role: "Co-Producer",
    message: "Chciałbym zaprosić Cię do współpracy nad nowym house trackiem. Twój styl perfekcyjnie pasuje do tego projektu.",
    date: "2024-01-18",
    status: "pending"
  },
  {
    id: 2,
    from: "Indie Label Records",
    project: "Compilation Album",
    role: "Featured Artist",
    message: "Zapraszamy do udziału w naszym compilation albumie. Szukamy utworów w stylu electronic/ambient.",
    date: "2024-01-16",
    status: "pending"
  }
]

const statusConfig = {
  in_progress: { label: "W trakcie", color: "text-blue-600", bg: "bg-blue-50" },
  pending: { label: "Oczekuje", color: "text-yellow-600", bg: "bg-yellow-50" },
  completed: { label: "Zakończony", color: "text-green-600", bg: "bg-green-50" },
  active: { label: "Aktywny", color: "text-green-600", bg: "bg-green-50" },
}

export default function ArtistCollaboration() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Współpraca</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj projektami współpracy i zespołami twórczymi
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Nowy Projekt
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Aktywne projekty</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Nowe wiadomości</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Udostępnione pliki</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Zaproszenia</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projekty</TabsTrigger>
          <TabsTrigger value="versions">Wersje & Pliki</TabsTrigger>
          <TabsTrigger value="revenue">Przychody</TabsTrigger>
          <TabsTrigger value="invitations">Zaproszenia</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {activeCollaborations.map((project) => {
              const status = statusConfig[project.status as keyof typeof statusConfig]
              
              return (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>
                          Ostatnia aktywność: {project.lastActivity} • Deadline: {project.deadline}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {project.collaborators.map((collaborator, idx) => (
                          <Avatar key={idx} className="border-2 border-background">
                            <AvatarImage src={collaborator.avatar} />
                            <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2">
                          {project.collaborators.map((collaborator, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <span className="text-sm font-medium">{collaborator.name}</span>
                              <Badge variant="outline" className="text-xs">{collaborator.role}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Postęp projektu</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{project.files} plików</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{project.comments} komentarzy</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm">
                          <Music className="w-3 h-3 mr-1" />
                          Otwórz
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="versions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historia Wersji</CardTitle>
              <CardDescription>Kontrola wersji plików w projektach współpracy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectVersions.map((version) => (
                <div key={version.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <Music className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{version.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {version.author} • {version.uploadDate}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {version.changes}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Badge variant="outline">{version.version}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {version.format} • {version.fileSize}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      Pobierz
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button className="w-full gap-2">
                <Upload className="w-4 h-4" />
                Wgraj Nową Wersję
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Podział Przychodów</CardTitle>
              <CardDescription>Automatyczne rozliczenia z projektów współpracy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {revenueSharing.map((project) => (
                <div key={project.projectId} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Łączny przychód: {project.totalRevenue}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Ostatnia wypłata</p>
                      <p className="font-medium">{project.lastDistribution}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {project.distributions.map((distribution, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{distribution.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{distribution.name}</p>
                            <p className="text-xs text-muted-foreground">{distribution.percentage}% udziału</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{distribution.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Następna wypłata: {project.nextDistribution}</span>
                      <Button variant="outline" size="sm">
                        <FileText className="w-3 h-3 mr-1" />
                        Szczegóły
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zaproszenia do Współpracy</CardTitle>
              <CardDescription>Nowe możliwości projektów i kolaboracji</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {invitations.map((invitation) => (
                <div key={invitation.id} className="p-4 rounded-lg border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{invitation.project}</h4>
                      <p className="text-sm text-muted-foreground">
                        od {invitation.from} • Rola: {invitation.role}
                      </p>
                      <p className="text-xs text-muted-foreground">{invitation.date}</p>
                    </div>
                    <Badge variant="outline" className="text-yellow-600">
                      Oczekuje odpowiedzi
                    </Badge>
                  </div>
                  
                  <p className="text-sm mb-4">{invitation.message}</p>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Akceptuj
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Odrzuć
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {invitations.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Brak nowych zaproszeń</p>
                  <p className="text-sm">Zaproszenia do współpracy pojawią się tutaj</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}