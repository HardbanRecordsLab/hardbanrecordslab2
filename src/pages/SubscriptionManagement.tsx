import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, CreditCard } from "lucide-react"

export default function SubscriptionManagement() {
  const subscription = {
    plan: "Pro Artist",
    status: "active",
      price: 49.99,
    currency: "PLN",
    billingCycle: "miesięcznie",
    renewalDate: "2024-08-15",
      features: [
      "Nielimitowane wydania",
      "Dystrybucja do 150+ platform",
      "Szczegółowa analityka",
      "Content ID",
      "Wsparcie priorytetowe"
    ]
  }

  const getStatusVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary'
  }

  const getStatusLabel = (status: string) => {
    return status === 'active' ? 'Aktywna' : 'Nieaktywna'
  }
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Zarządzanie Subskrypcją</h1>
        <p className="text-muted-foreground">
          Zarządzaj swoim planem, metodami płatności i historią rachunków.
        </p>
        </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Twój Aktualny Plan</CardTitle>
              <CardDescription>
                Szczegóły Twojej subskrypcji
              </CardDescription>
            </div>
            <Badge variant={getStatusVariant(subscription.status)}>
              {getStatusLabel(subscription.status)}
            </Badge>
          </div>
            </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6 p-6 border rounded-lg">
                    <div>
              <h3 className="text-lg font-semibold">{subscription.plan}</h3>
              <p className="text-2xl font-bold">
                {subscription.price.toFixed(2)} {subscription.currency}
                <span className="text-sm font-normal text-muted-foreground"> / {subscription.billingCycle}</span>
              </p>
                      </div>
            <div className="space-y-2">
                      <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p>Następne odnowienie: {subscription.renewalDate}</p>
                      </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <p>Metoda płatności: Visa **** 1234</p>
              </div>
                  </div>
                </div>
          <div>
            <h4 className="font-semibold mb-2">Funkcje Twojego planu:</h4>
            <ul className="grid grid-cols-2 gap-2">
              {subscription.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Button className="flex-1">Zmień Plan</Button>
            <Button variant="outline" className="flex-1">
              Aktualizuj Metodę Płatności
            </Button>
            <Button variant="destructive" className="flex-1">
              Anuluj Subskrypcję
            </Button>
                </div>
            </CardContent>
          </Card>
    </div>
  )
}
