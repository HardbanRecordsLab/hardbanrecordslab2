import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, FileText, Globe, Users, CheckCircle, AlertCircle, Clock, ExternalLink, Download } from "lucide-react"

const proOrganizations = [
  {
    name: "ZAIKS",
    country: "Polska",
    type: "PRO",
    status: "registered",
    memberSince: "2023-03-15",
    tracksRegistered: 23,
    lastRoyalty: "$234.56",
    nextDistribution: "2024-03-31"
  },
  {
    name: "ASCAP",
    country: "USA",
    type: "PRO",
    status: "pending",
    memberSince: null,
    tracksRegistered: 0,
    lastRoyalty: "$0.00",
    nextDistribution: "N/A"
  },
  {
    name: "PRS for Music",
    country: "UK",
    type: "PRO",
    status: "registered",
    memberSince: "2023-06-20",
    tracksRegistered: 18,
    lastRoyalty: "$156.78",
    nextDistribution: "2024-04-15"
  },
  {
    name: "GEMA",
    country: "Niemcy",
    type: "PRO",
    status: "inactive",
    memberSince: null,
    tracksRegistered: 0,
    lastRoyalty: "$0.00",
    nextDistribution: "N/A"
  }
]

const copyrightRegistrations = [
  {
    id: 1,
    title: "Nocny Lot",
    isrc: "PLHBL2300001",
    registrationDate: "2024-01-15",
    status: "registered",
    office: "US Copyright Office",
    certificate: "TX0009123456"
  },
  {
    id: 2,
    title: "Miasto Świateł",
    isrc: "PLHBL2300002",
    registrationDate: "2024-01-20",
    status: "pending",
    office: "US Copyright Office",
    certificate: null
  },
  {
    id: 3,
    title: "Elektroniczny Sen",
    isrc: "PLHBL2300003",
    registrationDate: "2024-01-18",
    status: "registered",
    office: "US Copyright Office",
    certificate: "TX0009123457"
  }
]

const splitSheets = [
  {
    id: 1,
    title: "Nocny Lot",
    collaborators: [
      { name: "DJ Soundwave", role: "Kompozytor", percentage: 60, ipi: "00123456789" },
      { name: "Producer X", role: "Producent", percentage: 25, ipi: "00987654321" },
      { name: "Vocalist Y", role: "Wokalista", percentage: 15, ipi: "00555666777" }
    ],
    status: "signed",
    createdDate: "2024-01-10"
  },
  {
    id: 2,
    title: "Miasto Świateł",
    collaborators: [
      { name: "DJ Soundwave", role: "Kompozytor", percentage: 80, ipi: "00123456789" },
      { name: "Lyricist Z", role: "Tekściarz", percentage: 20, ipi: "00444555666" }
    ],
    status: "pending",
    createdDate: "2024-01-19"
  }
]

const publishingInfo = {
  publisherName: "HardbanRecords Lab Publishing",
  publisherIPI: "00999888777",
  territory: "Worldwide",
  exclusivity: "Exclusive",
  term: "Life of Copyright",
  administrationFee: "15%"
}

const statusConfig = {
  registered: { label: "Zarejestrowany", color: "text-green-600", icon: CheckCircle },
  pending: { label: "Oczekuje", color: "text-yellow-600", icon: Clock },
  inactive: { label: "Nieaktywny", color: "text-gray-600", icon: AlertCircle },
  signed: { label: "Podpisany", color: "text-green-600", icon: CheckCircle },
}

export default function ArtistRights() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Prawa Autorskie</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzanie prawami, rejestracjami PRO i administracją wydawniczą
          </p>
        </div>
        <Button className="gap-2">
          <Shield className="w-4 h-4" />
          Nowa Rejestracja
        </Button>
      </div>

      {/* Publishing Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Administracja Wydawnicza
          </CardTitle>
          <CardDescription>Informacje o wydawcy i administracji praw</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Wydawca</p>
              <p className="font-semibold">{publishingInfo.publisherName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">IPI Wydawcy</p>
              <p className="font-semibold">{publishingInfo.publisherIPI}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Terytorium</p>
              <p className="font-semibold">{publishingInfo.territory}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Typ umowy</p>
              <p className="font-semibold">{publishingInfo.exclusivity}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Czas trwania</p>
              <p className="font-semibold">{publishingInfo.term}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Prowizja</p>
              <p className="font-semibold">{publishingInfo.administrationFee}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pro" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pro">Organizacje PRO</TabsTrigger>
          <TabsTrigger value="copyright">Copyright</TabsTrigger>
          <TabsTrigger value="splits">Split Sheets</TabsTrigger>
        </TabsList>

        <TabsContent value="pro" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejestracje w Organizacjach PRO</CardTitle>
              <CardDescription>Status członkostwa w organizacjach praw wykonawczych</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {proOrganizations.map((org) => {
                  const status = statusConfig[org.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={org.name} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                          <Globe className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{org.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {org.country} • {org.type}
                          </p>
                          {org.memberSince && (
                            <p className="text-xs text-muted-foreground">
                              Członek od: {org.memberSince}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{org.tracksRegistered} utworów</p>
                          <p className="text-sm text-muted-foreground">{org.lastRoyalty}</p>
                          <p className="text-xs text-muted-foreground">Następna: {org.nextDistribution}</p>
                        </div>
                        <Badge variant="secondary" className={`gap-1 ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                        {org.status === 'registered' && (
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Portal
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="copyright" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejestracje Copyright</CardTitle>
              <CardDescription>Status rejestracji w urzędach praw autorskich</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {copyrightRegistrations.map((registration) => {
                  const status = statusConfig[registration.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  
                  return (
                    <div key={registration.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{registration.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            ISRC: {registration.isrc}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {registration.office} • {registration.registrationDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {registration.certificate && (
                          <div className="text-right">
                            <p className="text-sm font-medium">Certyfikat</p>
                            <p className="text-xs text-muted-foreground">{registration.certificate}</p>
                          </div>
                        )}
                        <Badge variant="secondary" className={`gap-1 ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                        {registration.certificate && (
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Pobierz
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="splits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Split Sheets</CardTitle>
              <CardDescription>Zarządzanie podziałami autorskimi dla współprac</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {splitSheets.map((split) => {
                const status = statusConfig[split.status as keyof typeof statusConfig]
                const StatusIcon = status.icon
                
                return (
                  <div key={split.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{split.title}</h4>
                        <p className="text-sm text-muted-foreground">Utworzono: {split.createdDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={`gap-1 ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <FileText className="w-3 h-3 mr-1" />
                          Edytuj
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium text-sm">Współpracownicy:</h5>
                      {split.collaborators.map((collaborator, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{collaborator.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {collaborator.role} • IPI: {collaborator.ipi}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">{collaborator.percentage}%</p>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Razem:</span>
                          <span className="font-semibold">
                            {split.collaborators.reduce((sum, collab) => sum + collab.percentage, 0)}%
                          </span>
                        </div>
                        <Progress 
                          value={split.collaborators.reduce((sum, collab) => sum + collab.percentage, 0)} 
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
              
              <Button className="w-full gap-2">
                <FileText className="w-4 h-4" />
                Utwórz Nowy Split Sheet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}