import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Award,
  Download,
  Mail,
  Eye,
  Edit,
  Copy,
  Share,
  CheckCircle,
  Calendar,
  User,
  Building,
  Palette,
  FileText,
  QrCode,
  Shield,
  Settings,
  Trophy,
  Star,
  Globe,
  Lock
} from "lucide-react"

export default function CertificateSystem() {
  const [activeTab, setActiveTab] = useState("issued")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")

  const certificates = [
    {
      id: "CERT-2024-001",
      studentName: "Jan Kowalski",
      studentEmail: "jan.kowalski@email.com",
      courseName: "React i TypeScript - Kompletny Kurs",
      completionDate: "2024-01-15",
      score: 92,
      status: "issued",
      verificationCode: "RTC-2024-001-92K"
    },
    {
      id: "CERT-2024-002",
      studentName: "Anna Nowak", 
      studentEmail: "anna.nowak@email.com",
      courseName: "Node.js Backend Development",
      completionDate: "2024-01-14",
      score: 87,
      status: "sent",
      verificationCode: "NBD-2024-002-87N"
    },
    {
      id: "CERT-2024-003",
      studentName: "Piotr Wiśniewski",
      studentEmail: "piotr.wisniewski@email.com", 
      courseName: "Podstawy Data Science",
      completionDate: "2024-01-13",
      score: 78,
      status: "pending",
      verificationCode: "PDS-2024-003-78W"
    }
  ]

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Nowoczesny design z gradientami",
      preview: "🎨 Kolorowy gradient z minimalistycznym układem"
    },
    {
      id: "classic",
      name: "Classic",
      description: "Klasyczny profesjonalny design",
      preview: "📜 Elegancki border z tradycyjnym fontem"
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Czysty i prosty design",
      preview: "⚪ Białe tło z prostymi liniami"
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Firmowy styl z logo",
      preview: "🏢 Profesjonalny design z miejscem na logo"
    }
  ]

  const stats = [
    { title: "Wydane Certyfikaty", value: "1,247", icon: Award, color: "text-blue-600" },
    { title: "Aktywne Szablony", value: "8", icon: Palette, color: "text-purple-600" },
    { title: "Weryfikacje (30 dni)", value: "89", icon: Shield, color: "text-green-600" },
    { title: "Średnia Ocena", value: "84%", icon: Star, color: "text-yellow-600" },
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Award className="w-8 h-8 text-yellow-500" />
            System Certyfikatów
          </h1>
          <p className="text-muted-foreground">Automatyczne wydawanie i zarządzanie certyfikatami</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Ustawienia
          </Button>
          <Button className="gap-2">
            <Award className="w-4 h-4" />
            Wydaj Certyfikat
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-[500px]">
          <TabsTrigger value="issued">Wydane</TabsTrigger>
          <TabsTrigger value="templates">Szablony</TabsTrigger>
          <TabsTrigger value="create">Utwórz</TabsTrigger>
          <TabsTrigger value="verify">Weryfikacja</TabsTrigger>
        </TabsList>

        {/* Issued Certificates Tab */}
        <TabsContent value="issued" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Wydane Certyfikaty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{cert.studentName}</h3>
                        <Badge variant={
                          cert.status === 'issued' ? 'default' : 
                          cert.status === 'sent' ? 'secondary' : 
                          'outline'
                        }>
                          {cert.status === 'issued' ? 'Wydany' :
                           cert.status === 'sent' ? 'Wysłany' :
                           'Oczekuje'}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {cert.courseName}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {cert.completionDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {cert.score}%
                        </span>
                        <span className="flex items-center gap-1">
                          <QrCode className="w-4 h-4" />
                          {cert.verificationCode}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" title="Podgląd">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Pobierz">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Wyślij email">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Udostępnij">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Szablony Certyfikatów
              </CardTitle>
              <Button className="gap-2">
                <FileText className="w-4 h-4" />
                Nowy Szablon
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className={`cursor-pointer transition-all ${
                    selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                  }`} onClick={() => setSelectedTemplate(template.id)}>
                    <CardContent className="p-6">
                      <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4 flex items-center justify-center text-6xl">
                        {template.preview.split(' ')[0]}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{template.name}</h3>
                          {selectedTemplate === template.id && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                        <p className="text-xs text-muted-foreground">{template.preview}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Podgląd
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Edytuj
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Certificate Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Wydaj Certyfikat Ręcznie
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-name">Imię i nazwisko</Label>
                    <Input id="student-name" placeholder="Jan Kowalski" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email</Label>
                    <Input id="student-email" type="email" placeholder="jan@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course-name">Nazwa kursu</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz kurs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React i TypeScript - Kompletny Kurs</SelectItem>
                      <SelectItem value="nodejs">Node.js Backend Development</SelectItem>
                      <SelectItem value="datascience">Podstawy Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="completion-date">Data ukończenia</Label>
                    <Input id="completion-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="score">Wynik (%)</Label>
                    <Input id="score" type="number" placeholder="85" min="0" max="100" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Szablon certyfikatu</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-notes">Dodatkowe uwagi</Label>
                  <Textarea id="additional-notes" placeholder="Opcjonalne uwagi..." />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gap-2">
                    <Award className="w-4 h-4" />
                    Wydaj Certyfikat
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Podgląd
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Podgląd Certyfikatu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 rounded-lg flex items-center justify-center border-4 border-gold-200 relative overflow-hidden">
                  <div className="text-center p-8 space-y-4">
                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4">
                      <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                    
                    {/* Main content */}
                    <h1 className="text-2xl font-bold text-gray-800">Certyfikat Ukończenia</h1>
                    <p className="text-lg text-gray-600">przyznany</p>
                    <h2 className="text-xl font-bold text-blue-800">[Imię i Nazwisko]</h2>
                    <p className="text-gray-600">za ukończenie kursu</p>
                    <h3 className="text-lg font-semibold text-purple-800">[Nazwa Kursu]</h3>
                    
                    <div className="flex justify-between items-end mt-8 text-sm text-gray-500">
                      <div>
                        <p>Data: [Data]</p>
                        <p>Wynik: [Wynik]%</p>
                      </div>
                      <div className="text-right">
                        <p>HardbanRecords Lab</p>
                        <p>eLearning Platform</p>
                      </div>
                    </div>

                    {/* QR Code placeholder */}
                    <div className="absolute bottom-4 left-4">
                      <QrCode className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Weryfikacja online dostępna</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>Unikalny kod weryfikacyjny</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Zabezpieczenie przed podrabianiem</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verify" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Weryfikacja Certyfikatów
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verification-code">Kod weryfikacyjny</Label>
                    <Input 
                      id="verification-code" 
                      placeholder="np. RTC-2024-001-92K"
                      className="text-center font-mono"
                    />
                  </div>
                  <Button className="w-full gap-2">
                    <Shield className="w-4 h-4" />
                    Weryfikuj Certyfikat
                  </Button>
                </div>
              </div>

              {/* Verification Result */}
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Certyfikat Zweryfikowany</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><strong>Imię:</strong> Jan Kowalski</p>
                    <p><strong>Kurs:</strong> React i TypeScript</p>
                    <p><strong>Data:</strong> 15 stycznia 2024</p>
                    <p><strong>Wynik:</strong> 92%</p>
                    <p><strong>Wydawca:</strong> HardbanRecords Lab</p>
                  </div>
                  <Badge className="mt-4">Certyfikat ważny</Badge>
                </CardContent>
              </Card>

              {/* Public Verification Info */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold">Publiczna Weryfikacja</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Każdy certyfikat wydany przez naszą platformę posiada unikalny kod weryfikacyjny.
                  Użyj tego narzędzia aby zweryfikować autentyczność certyfikatu.
                </p>
                <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4" />
                    <span>Kod QR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Weryfikacja online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Blockchain zabezpieczenie</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}