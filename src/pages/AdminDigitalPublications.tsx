
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, FileText, Users, TrendingUp, Search, Eye, Check, X, Trash2 } from "lucide-react"
import { StatsCard } from "@/components/StatsCard"
import { useToast } from "@/hooks/use-toast"

// Placeholder data - w przyszłości będzie z Supabase
const placeholderPublications = [
  {
    id: "1",
    title: "Wprowadzenie do AI w Muzyce",
    author: "Jan Kowalski",
    type: "Ebook",
    status: "review",
    created_at: "2024-01-15",
    description: "Kompletny przewodnik po sztucznej inteligencji w produkcji muzycznej"
  },
  {
    id: "2",
    title: "Historia Jazz'u",
    author: "Anna Nowak",
    type: "Audiobook",
    status: "published",
    created_at: "2024-01-10",
    description: "Fascynująca podróż przez historię muzyki jazzowej"
  }
]

export default function AdminDigitalPublications() {
  const [publications] = useState(placeholderPublications)
  const [filteredPublications, setFilteredPublications] = useState(placeholderPublications)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedPublication, setSelectedPublication] = useState<any>(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [reviewNote, setReviewNote] = useState("")
  const { toast } = useToast()

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

  const handleApprove = (id: string) => {
    toast({
      title: "Sukces",
      description: "Publikacja została zatwierdzona"
    })
    setReviewDialogOpen(false)
  }

  const handleReject = (id: string) => {
    toast({
      title: "Sukces", 
      description: "Publikacja została odrzucona"
    })
    setReviewDialogOpen(false)
  }

  const totalPublications = publications.length
  const publishedPublications = publications.filter(p => p.status === 'published').length
  const pendingPublications = publications.filter(p => p.status === 'review').length
  const totalAuthors = new Set(publications.map(p => p.author)).size

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Publikacje Cyfrowe
          </h1>
          <p className="text-muted-foreground">
            Zarządzanie publikacjami cyfrowymi autorów
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Wszystkie publikacje"
          value={totalPublications.toString()}
          description="Łączna liczba publikacji"
          icon={<FileText className="w-4 h-4" />}
        />
        <StatsCard
          title="Opublikowane"
          value={publishedPublications.toString()}
          description="Dostępne publicznie"
          icon={<Check className="w-4 h-4" />}
        />
        <StatsCard
          title="Oczekujące"
          value={pendingPublications.toString()}
          description="Do recenzji"
          icon={<Eye className="w-4 h-4" />}
        />
        <StatsCard
          title="Autorzy"
          value={totalAuthors.toString()}
          description="Aktywni autorzy"
          icon={<Users className="w-4 h-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtry</CardTitle>
          <CardDescription>
            Wyszukuj i filtruj publikacje cyfrowe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Szukaj publikacji, autorów..."
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
          <CardTitle>Lista Publikacji ({filteredPublications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tytuł</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data utworzenia</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPublications.map((publication) => (
                <TableRow key={publication.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{publication.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {publication.description.substring(0, 50)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{publication.author}</TableCell>
                  <TableCell>{publication.type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(publication.status)}>
                      {getStatusLabel(publication.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(publication.created_at).toLocaleDateString('pl-PL')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedPublication(publication)
                          setReviewDialogOpen(true)
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {publication.status === 'review' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleApprove(publication.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReject(publication.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Recenzja Publikacji</DialogTitle>
            <DialogDescription>
              Publikacja: {selectedPublication?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Opis publikacji:</h4>
              <p className="text-sm text-muted-foreground">
                {selectedPublication?.description}
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
              onClick={() => selectedPublication && handleReject(selectedPublication.id)}
            >
              Odrzuć
            </Button>
            <Button 
              onClick={() => selectedPublication && handleApprove(selectedPublication.id)}
            >
              Zatwierdź
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
