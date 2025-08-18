import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, DollarSign } from "lucide-react"

const payments = [
  { id: "PAY-001", date: "2024-07-15", description: "Tantiemy za Czerwiec 2024", amount: 1234.56, status: "completed" },
  { id: "PAY-002", date: "2024-06-15", description: "Tantiemy za Maj 2024", amount: 987.65, status: "completed" },
  { id: "PAY-003", date: "2024-05-15", description: "Tantiemy za Kwiecień 2024", amount: 1123.45, status: "completed" },
  { id: "PAY-004", date: "2024-04-15", description: "Tantiemy za Marzec 2024", amount: 876.54, status: "completed" },
]

export default function PaymentHistory() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default'
      case 'pending': return 'secondary'
      case 'failed': return 'destructive'
      default: return 'outline'
    }
  }
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Zakończona'
      case 'pending': return 'Oczekująca'
      case 'failed': return 'Nieudana'
      default: return status
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <DollarSign className="w-8 h-8" />
            Historia Płatności
          </h1>
          <p className="text-muted-foreground">
            Przeglądaj historię swoich wypłat i transakcji.
          </p>
        </div>
      </div>
                      
          <Card>
            <CardHeader>
          <CardTitle>Twoje Transakcje</CardTitle>
          <CardDescription>
            Lista wszystkich wypłat i transakcji na Twoim koncie.
          </CardDescription>
            </CardHeader>
            <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transakcji</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Opis</TableHead>
                <TableHead>Kwota</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{payment.amount.toFixed(2)} PLN</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(payment.status)}>
                      {getStatusLabel(payment.status)}
                        </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Faktura
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
              </div>
  )
}
