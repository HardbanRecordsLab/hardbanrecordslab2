import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Crown, 
  Check, 
  X,
  CreditCard,
  Calendar,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Star,
  Gift,
  AlertCircle,
  Clock,
  Sparkles,
  Infinity,
  Download
} from "lucide-react";

const SubscriptionManagement = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [autoRenewal, setAutoRenewal] = useState(true);

  const currentPlan = {
    name: "Premium",
    price: 29.99,
    interval: "miesięcznie",
    nextBilling: "2024-02-08",
    startDate: "2023-06-08",
    status: "active",
    features: [
      "Dostęp do wszystkich kursów",
      "Certyfikaty ukończenia",
      "Priorytetowe wsparcie",
      "Materiały do pobrania",
      "Brak reklam"
    ],
    usage: {
      coursesAccessed: 12,
      coursesLimit: "unlimited",
      certificatesEarned: 8,
      certificatesLimit: "unlimited",
      storageUsed: 2.4,
      storageLimit: 50
    }
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      interval: "na zawsze",
      popular: false,
      description: "Idealny do rozpoczęcia nauki",
      features: [
        "Dostęp do kursów darmowych",
        "Podstawowe certyfikaty",
        "Społeczność",
        "5 GB przestrzeni"
      ],
      limits: {
        courses: 5,
        certificates: 3,
        storage: 5,
        support: "Społeczność"
      }
    },
    {
      id: "premium",
      name: "Premium", 
      price: 29.99,
      interval: "miesięcznie",
      popular: true,
      description: "Najlepsza wartość dla regularnych uczniów",
      features: [
        "Wszystkie kursy premium",
        "Nieograniczone certyfikaty",
        "Priorytetowe wsparcie",
        "50 GB przestrzeni",
        "Analityka postępów",
        "Materiały offline"
      ],
      limits: {
        courses: "unlimited",
        certificates: "unlimited", 
        storage: 50,
        support: "Email i chat"
      }
    },
    {
      id: "pro",
      name: "Pro",
      price: 49.99,
      interval: "miesięcznie",
      popular: false,
      description: "Dla profesjonalistów i firm",
      features: [
        "Wszystko z Premium",
        "Kursy ekskluzywne",
        "1:1 mentoring (2h/miesiąc)",
        "200 GB przestrzeni",
        "Zaawansowana analityka",
        "API dostęp",
        "Certyfikaty branded"
      ],
      limits: {
        courses: "unlimited",
        certificates: "unlimited",
        storage: 200,
        support: "Dedykowany manager"
      }
    }
  ];

  const billingHistory = [
    {
      id: "INV-2024-001",
      date: "2024-01-08",
      amount: 29.99,
      status: "paid",
      plan: "Premium",
      period: "Sty 2024"
    },
    {
      id: "INV-2023-012",
      date: "2023-12-08", 
      amount: 29.99,
      status: "paid",
      plan: "Premium",
      period: "Gru 2023"
    },
    {
      id: "INV-2023-011",
      date: "2023-11-08",
      amount: 29.99,
      status: "paid",
      plan: "Premium", 
      period: "Lis 2023"
    }
  ];

  const addOns = [
    {
      id: "extra_storage",
      name: "Dodatkowa przestrzeń",
      description: "100 GB dodatkowej przestrzeni na materiały",
      price: 9.99,
      interval: "miesięcznie",
      active: false
    },
    {
      id: "priority_support",
      name: "Wsparcie priorytetowe",
      description: "Odpowiedź w ciągu 1 godziny",
      price: 14.99,
      interval: "miesięcznie", 
      active: false
    },
    {
      id: "mentoring",
      name: "Sesje mentoringowe",
      description: "2 godziny 1:1 mentoringu miesięcznie",
      price: 99.99,
      interval: "miesięcznie",
      active: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Zarządzanie Subskrypcją</h1>
          <p className="text-muted-foreground">Kontroluj swój plan i płatności</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Pobierz faktury
          </Button>
          <Button>
            <Gift className="mr-2 h-4 w-4" />
            Poleć znajomemu
          </Button>
        </div>
      </div>

      {/* Current Plan Overview */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl">Twój aktualny plan: {currentPlan.name}</CardTitle>
              <Badge variant="default">Aktywny</Badge>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{currentPlan.price} PLN</div>
              <div className="text-sm text-muted-foreground">{currentPlan.interval}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Informacje o planie</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Następna płatność:</span>
                  <span className="font-medium">{currentPlan.nextBilling}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan aktywny od:</span>
                  <span className="font-medium">{currentPlan.startDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Automatyczne odnawianie:</span>
                  <Switch 
                    checked={autoRenewal}
                    onCheckedChange={setAutoRenewal}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Wykorzystanie</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Przestrzeń dyskowa</span>
                    <span>{currentPlan.usage.storageUsed} / {currentPlan.usage.storageLimit} GB</span>
                  </div>
                  <Progress value={(currentPlan.usage.storageUsed / currentPlan.usage.storageLimit) * 100} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Kursy w tym miesiącu:</span>
                  <span className="font-medium">{currentPlan.usage.coursesAccessed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Zdobyte certyfikaty:</span>
                  <span className="font-medium">{currentPlan.usage.certificatesEarned}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Aktualny plan</TabsTrigger>
          <TabsTrigger value="plans">Zmień plan</TabsTrigger>
          <TabsTrigger value="billing">Płatności</TabsTrigger>
          <TabsTrigger value="addons">Dodatki</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funkcje Twojego Planu</CardTitle>
              <CardDescription>Co otrzymujesz w ramach planu {currentPlan.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statystyki Wykorzystania</CardTitle>
              <CardDescription>Twoja aktywność w ostatnich 30 dniach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">12</div>
                  <div className="text-sm text-muted-foreground">Ukończone lekcje</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">48h</div>
                  <div className="text-sm text-muted-foreground">Czas nauki</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">3</div>
                  <div className="text-sm text-muted-foreground">Nowe certyfikaty</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zarządzanie Planem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                Ulepsz plan
              </Button>
              <Button className="w-full" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Zmień cykl rozliczeniowy
              </Button>
              <Button className="w-full" variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Anuluj subskrypcję
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Wybierz plan idealny dla Ciebie</h2>
            <p className="text-muted-foreground">Zmień plan w dowolnym momencie. Bez zobowiązań.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Najpopularniejszy
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-foreground">
                    {plan.price === 0 ? 'Darmowy' : `${plan.price} PLN`}
                  </div>
                  <div className="text-sm text-muted-foreground">{plan.interval}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={plan.id === "premium" ? "default" : "outline"}
                    disabled={plan.id === "premium"}
                  >
                    {plan.id === "premium" ? "Aktualny plan" : 
                     plan.id === "free" ? "Przejdź na Free" : "Wybierz plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Porównanie planów</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Funkcja</th>
                      <th className="text-center p-2">Free</th>
                      <th className="text-center p-2">Premium</th>
                      <th className="text-center p-2">Pro</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-2">Dostęp do kursów</td>
                      <td className="text-center p-2">5</td>
                      <td className="text-center p-2"><Infinity className="h-4 w-4 mx-auto" /></td>
                      <td className="text-center p-2"><Infinity className="h-4 w-4 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Certyfikaty</td>
                      <td className="text-center p-2">3</td>
                      <td className="text-center p-2"><Infinity className="h-4 w-4 mx-auto" /></td>
                      <td className="text-center p-2"><Infinity className="h-4 w-4 mx-auto" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Przestrzeń</td>
                      <td className="text-center p-2">5 GB</td>
                      <td className="text-center p-2">50 GB</td>
                      <td className="text-center p-2">200 GB</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Wsparcie</td>
                      <td className="text-center p-2">Społeczność</td>
                      <td className="text-center p-2">Email + Chat</td>
                      <td className="text-center p-2">Dedykowany</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metoda płatności</CardTitle>
              <CardDescription>Zarządzaj swoimi metodami płatności</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <CreditCard className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <h4 className="font-medium">**** **** **** 1234</h4>
                  <p className="text-sm text-muted-foreground">Visa • Wygasa 12/26</p>
                </div>
                <Badge variant="default">Domyślna</Badge>
                <Button variant="outline" size="sm">Edytuj</Button>
              </div>
              
              <Button variant="outline" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Dodaj metodę płatności
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historia płatności</CardTitle>
              <CardDescription>Twoje ostatnie faktury i płatności</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingHistory.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{bill.plan} - {bill.period}</h4>
                      <p className="text-sm text-muted-foreground">#{bill.id} • {bill.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{bill.amount} PLN</p>
                        <Badge variant="default" className="mt-1">
                          <Check className="h-3 w-3 mr-1" />
                          Opłacona
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                Zobacz wszystkie faktury
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ustawienia rozliczania</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Automatyczne odnawianie</h4>
                  <p className="text-sm text-muted-foreground">Plan będzie automatycznie odnawiany</p>
                </div>
                <Switch checked={autoRenewal} onCheckedChange={setAutoRenewal} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Powiadomienia o płatnościach</h4>
                  <p className="text-sm text-muted-foreground">Otrzymuj przypomnienia przed płatnością</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addons" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dostępne dodatki</CardTitle>
              <CardDescription>Rozszerz swój plan o dodatkowe funkcje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {addOns.map((addon) => (
                <div key={addon.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{addon.name}</h4>
                      <p className="text-sm text-muted-foreground">{addon.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{addon.price} PLN</p>
                      <p className="text-sm text-muted-foreground">{addon.interval}</p>
                    </div>
                    
                    {addon.active ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="default">Aktywny</Badge>
                        <Button variant="outline" size="sm">Anuluj</Button>
                      </div>
                    ) : (
                      <Button size="sm">Dodaj</Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Konfiguracja przedsiębiorstwa</CardTitle>
              <CardDescription>Dodatkowe opcje dla zespołów i firm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Users className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <h4 className="font-medium">Konta zespołowe</h4>
                  <p className="text-sm text-muted-foreground">Zarządzaj kontami dla swojego zespołu</p>
                </div>
                <Button variant="outline">Skonfiguruj</Button>
              </div>
              
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Shield className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <h4 className="font-medium">SSO i zabezpieczenia</h4>
                  <p className="text-sm text-muted-foreground">Single Sign-On i zaawansowane zabezpieczenia</p>
                </div>
                <Button variant="outline">Dowiedz się więcej</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionManagement;