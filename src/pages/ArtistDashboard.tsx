import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProductCreationWizard } from "@/components/digital-products/ProductCreationWizard";
export default function ArtistDashboard() {
  const { user, profile } = useAuth()
  const { toast } = useToast()
  const [projects, setProjects] = useState<any[]>([])
  const [stats, setStats] = useState<ProjectStats>({
    // ... (bez zmian)
  })
  const [loading, setLoading] = useState(true)
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchArtistData()
    }
  }, [user])

  const fetchArtistData = async () => {
    // ... (implementacja bez zmian)
  }
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pl-PL').format(num)
  }

  const handleProductCreated = () => {
    setIsWizardOpen(false);
    fetchArtistData(); // Odśwież dane po utworzeniu produktu
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Witaj ponownie, <span className="text-primary">{profile?.full_name || 'Artysto'}</span>! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj swoją muzyką i śledź postępy w karierze
          </p>
        </div>
        <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
          <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Dodaj Nowy Utwór
        </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-full max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Kreator nowego produktu</DialogTitle>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto">
              <ProductCreationWizard
                onProductCreated={handleProductCreated}
                onCancel={() => setIsWizardOpen(false)}
        />
      </div>
          </DialogContent>
        </Dialog>
                      </div>

      {/* Stats Cards (bez zmian) */}
      {/* ... */}

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent projects card (bez zmian) */}
        <Card>
          {/* ... */}
        </Card>
      <Card>
        <CardHeader>
            <CardTitle>Szybkie akcje</CardTitle>
            <CardDescription>Najczęściej używane funkcje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => setIsWizardOpen(true)}
            >
              <Upload className="w-4 h-4" />
              Prześlij nowy utwór
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <TrendingUp className="w-4 h-4" />
              Zobacz statystyki
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <DollarSign className="w-4 h-4" />
              Zarządzaj wypłatami
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Music className="w-4 h-4" />
              Edytuj profil artysty
            </Button>
        </CardContent>
      </Card>
    </div>

      {/* Notifications card (bez zmian) */}
      {/* ... */}
    </div>
  )
}