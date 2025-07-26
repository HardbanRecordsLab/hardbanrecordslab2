import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, FileText, Calendar, Clock, CheckCircle, AlertCircle, Star, PenTool, BookOpen, Edit3 } from "lucide-react"

const activeProjects = [
  {
    id: 1,
    title: "Magiczny Świat - Trylogia",
    collaborators: ["Anna Kowalska", "Piotr Nowak"],
    type: "Co-authoring",
    status: "in_progress",
    progress: 65,
    deadline: "2024-03-15",
    lastActivity: "2 godziny temu",
    role: "Lead Author"
  },
  {
    id: 2,
    title: "Opowieści z Przyszłości",
    collaborators: ["Maria Wiśniewska"],
    type: "Editing",
    status: "review",
    progress: 85,
    deadline: "2024-02-20",
    lastActivity: "5 godzin temu",
    role: "Author"
  },
  {
    id: 3,
    title: "Zbiór Poezji Współczesnej",
    collaborators: ["Jan Kowalczyk", "Ewa Dąbrowska", "Michał Zieliński"],
    type: "Anthology",
    status: "planning",
    progress: 25,
    deadline: "2024-04-30",
    lastActivity: "1 dzień temu",
    role: "Contributing Author"
  },
]

const betaReaders = [
  {
    name: "Katarzyna Nowak",
    specialty: "Fantasy",
    rating: 4.9,
    completedProjects: 23,
    averageTime: "7 dni",
    status: "available",
    currentBook: null
  },
  {
    name: "Tomasz Kowalski",
    specialty: "Sci-Fi",
    rating: 4.8,
    completedProjects: 31,
    averageTime: "5 dni",
    status: "busy",
    currentBook: "Opowieści z Przyszłości"
  },
  {
    name: "Anna Wiśniewska",
    specialty: "Romance",
    rating: 4.7,
    completedProjects: 18,
    averageTime: "10 dni",
    status: "available",
    currentBook: null
  },
]

const writingGroups = [
  {
    name: "Polish Fantasy Writers",
    members: 156,
    activity: "Bardzo aktywna",
    focus: "Fantasy & Sci-Fi",
    joined: true,
    lastPost: "2 godziny temu"
  },
  {
    name: "Independent Authors PL",
    members: 342,
    activity: "Aktywna",
    focus: "Self-Publishing",
    joined: true,
    lastPost: "4 godziny temu"
  },
  {
    name: "Writing Critiques Circle",
    members: 89,
    activity: "Umiarkowana",
    focus: "Peer Review",
    joined: false,
    lastPost: "1 dzień temu"
  },
]

const feedbackHistory = [
  {
    id: 1,
    book: "Nocne Opowieści",
    reviewer: "Katarzyna Nowak",
    type: "Beta Reading",
    rating: 4.5,
    completedDate: "2024-01-15",
    feedback: "Doskonała fabuła, niewielkie problemy z rytmem w rozdziale 7-9.",
    status: "completed"
  },
  {
    id: 2,
    book: "Miasto Marzeń",
    reviewer: "Tomasz Kowalski",
    type: "Developmental Edit",
    rating: 4.8,
    completedDate: "2024-01-08",
    feedback: "Świetna charakteryzacja bohaterów, sugeruję rozwinięcie wątku pobocznego.",
    status: "completed"
  },
  {
    id: 3,
    book: "Krótkie Opowiadania",
    reviewer: "Anna Wiśniewska",
    type: "Copy Edit",
    rating: 4.6,
    completedDate: "2023-12-20",
    feedback: "Dobra proza, znalezione drobne błędy językowe zostały poprawione.",
    status: "completed"
  },
]

const statusConfig = {
  in_progress: { label: "W trakcie", color: "text-blue-600", bg: "bg-blue-50" },
  review: { label: "Do przeglądu", color: "text-orange-600", bg: "bg-orange-50" },
  planning: { label: "Planowanie", color: "text-purple-600", bg: "bg-purple-50" },
  completed: { label: "Ukończone", color: "text-green-600", bg: "bg-green-50" },
  available: { label: "Dostępny", color: "text-green-600", bg: "bg-green-50" },
  busy: { label: "Zajęty", color: "text-red-600", bg: "bg-red-50" },
}

export default function AuthorCollaboration() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Współpraca i Społeczność</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj projektami współpracy, beta readerami i społecznością pisarską
          </p>
        </div>
        <Button className="gap-2">
          <Users className="w-4 h-4" />
          Nowy Projekt
        </Button>
      </div>

      {/* Collaboration Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Przegląd Współpracy
          </CardTitle>
          <CardDescription>Podsumowanie wszystkich aktywnych projektów i współprac</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">8</div>
              <div className="text-sm text-muted-foreground">Aktywne projekty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">23</div>
              <div className="text-sm text-muted-foreground">Beta readerzy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-muted-foreground">Grupy pisarskie</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">4.7</div>
              <div className="text-sm text-muted-foreground">Średnia ocena</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projekty Współpracy</TabsTrigger>
          <TabsTrigger value="beta">Beta Readerzy</TabsTrigger>
          <TabsTrigger value="groups">Grupy Pisarskie</TabsTrigger>
          <TabsTrigger value="feedback">Historia Feedbacku</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktywne Projekty Współpracy</CardTitle>
              <CardDescription>Projekty tworzone wspólnie z innymi autorami</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {activeProjects.map((project) => {
                  const status = statusConfig[project.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={project.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{project.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {project.type} | {project.role}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Ostatnia aktywność: {project.lastActivity}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Postęp projektu:</span>
                            <span className="text-sm">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium mb-1">Współpracownicy:</p>
                            <div className="flex flex-wrap gap-1">
                              {project.collaborators.map((collaborator, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {collaborator}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>Deadline: {project.deadline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Czat
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="w-3 h-3 mr-1" />
                          Edytuj
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="beta" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Beta Readerzy</CardTitle>
              <CardDescription>Sieć recenzentów i edytorów wspierających Twoje publikacje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {betaReaders.map((reader, index) => {
                  const status = statusConfig[reader.status as keyof typeof statusConfig]
                  
                  return (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                            <PenTool className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">{reader.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Specjalizacja: {reader.specialty}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{reader.rating}</span>
                              <span className="text-xs text-muted-foreground">
                                ({reader.completedProjects} projektów)
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className={`${status.color} ${status.bg}`}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Średni czas: </span>
                          <span className="text-muted-foreground">{reader.averageTime}</span>
                        </div>
                        <div>
                          <span className="font-medium">Ukończone: </span>
                          <span className="text-muted-foreground">{reader.completedProjects}</span>
                        </div>
                        {reader.currentBook && (
                          <div>
                            <span className="font-medium">Obecnie: </span>
                            <span className="text-muted-foreground">{reader.currentBook}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={reader.status === "busy"}
                        >
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Skontaktuj
                        </Button>
                        <Button 
                          size="sm"
                          disabled={reader.status === "busy"}
                        >
                          <BookOpen className="w-3 h-3 mr-1" />
                          Wyślij Książkę
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grupy Pisarskie</CardTitle>
              <CardDescription>Społeczności i grupy wsparcia dla autorów</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {writingGroups.map((group, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-medium">{group.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {group.members} członków | {group.focus}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Ostatni post: {group.lastPost}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={group.activity === "Bardzo aktywna" ? "text-green-600 bg-green-50" : 
                                   group.activity === "Aktywna" ? "text-blue-600 bg-blue-50" : 
                                   "text-yellow-600 bg-yellow-50"}
                        >
                          {group.activity}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      {group.joined ? (
                        <>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Otwórz
                          </Button>
                          <Button variant="outline" size="sm">
                            Opuść Grupę
                          </Button>
                        </>
                      ) : (
                        <Button size="sm">
                          <Users className="w-3 h-3 mr-1" />
                          Dołącz
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historia Feedbacku</CardTitle>
              <CardDescription>Otrzymane recenzje i opinie od beta readerów</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {feedbackHistory.map((feedback) => (
                  <div key={feedback.id} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{feedback.book}</h4>
                        <p className="text-sm text-muted-foreground">
                          {feedback.reviewer} | {feedback.type}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{feedback.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-green-600 bg-green-50">
                          Ukończone
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{feedback.completedDate}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm italic">"{feedback.feedback}"</p>
                    </div>
                    
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm">
                        <FileText className="w-3 h-3 mr-1" />
                        Pełny Raport
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}