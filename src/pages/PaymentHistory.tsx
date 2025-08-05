import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Download, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Receipt,
  RefreshCw,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown
} from "lucide-react";

const PaymentHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [activeTab, setActiveTab] = useState("transactions");

  const paymentStats = {
    totalSpent: 2847.50,
    thisMonth: 199.99,
    lastMonth: 149.99,
    transactionCount: 23,
    averageTransaction: 123.78,
    monthlyChange: +33.3
  };

  const transactions = [
    {
      id: "TXN-2024-001",
      date: "2024-01-15",
      description: "React Advanced Course",
      vendor: "Jan Kowalski",
      amount: 199.99,
      currency: "PLN",
      status: "completed",
      method: "card",
      invoice: true,
      refundable: false
    },
    {
      id: "TXN-2024-002", 
      date: "2024-01-12",
      description: "TypeScript Masterclass",
      vendor: "Anna Nowak",
      amount: 149.99,
      currency: "PLN",
      status: "completed",
      method: "paypal",
      invoice: true,
      refundable: true
    },
    {
      id: "TXN-2024-003",
      date: "2024-01-10",
      description: "AI w Praktyce - E-book",
      vendor: "Dr. Maria Kowal",
      amount: 49.99,
      currency: "PLN", 
      status: "completed",
      method: "card",
      invoice: true,
      refundable: true
    },
    {
      id: "TXN-2024-004",
      date: "2024-01-08",
      description: "Premium Subscription",
      vendor: "HardbanRecords Lab",
      amount: 29.99,
      currency: "PLN",
      status: "completed",
      method: "card",
      invoice: true,
      refundable: false,
      recurring: true
    },
    {
      id: "TXN-2024-005",
      date: "2024-01-05",
      description: "Node.js Backend Course",
      vendor: "Piotr Wiśniewski",
      amount: 179.99,
      currency: "PLN",
      status: "pending",
      method: "bank_transfer",
      invoice: false,
      refundable: false
    },
    {
      id: "TXN-2024-006",
      date: "2024-01-03",
      description: "AWS Certification Prep",
      vendor: "Tomasz Nowak",
      amount: 89.99,
      currency: "PLN",
      status: "failed",
      method: "card",
      invoice: false,
      refundable: false
    }
  ];

  const subscriptions = [
    {
      id: "SUB-001",
      name: "Premium Plan",
      description: "Dostęp do wszystkich kursów premium",
      amount: 29.99,
      currency: "PLN",
      interval: "miesięczny",
      status: "active",
      nextBilling: "2024-02-08",
      startDate: "2023-06-08",
      method: "card"
    },
    {
      id: "SUB-002", 
      name: "Pro Analytics",
      description: "Zaawansowane narzędzia analityczne",
      amount: 19.99,
      currency: "PLN",
      interval: "miesięczny",
      status: "cancelled",
      nextBilling: null,
      startDate: "2023-08-15",
      endDate: "2023-12-15",
      method: "paypal"
    }
  ];

  const refunds = [
    {
      id: "REF-001",
      transactionId: "TXN-2023-089",
      date: "2024-01-05",
      reason: "Nie spełnił oczekiwań",
      amount: 99.99,
      currency: "PLN",
      status: "completed",
      processedDate: "2024-01-06"
    },
    {
      id: "REF-002",
      transactionId: "TXN-2023-078", 
      date: "2023-12-20",
      reason: "Błędna płatność",
      amount: 149.99,
      currency: "PLN",
      status: "processing",
      processedDate: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "pending": return Clock;
      case "failed": return XCircle;
      case "processing": return RefreshCw;
      case "cancelled": return XCircle;
      case "active": return CheckCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": 
      case "active": return "default";
      case "pending": 
      case "processing": return "secondary";
      case "failed":
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "card": return CreditCard;
      case "paypal": return DollarSign;
      case "bank_transfer": return Receipt;
      default: return CreditCard;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || transaction.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Historia Płatności</h1>
          <p className="text-muted-foreground">Zarządzaj swoimi transakcjami i subskrypcjami</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Eksportuj
          </Button>
          <Button variant="outline">
            <Receipt className="mr-2 h-4 w-4" />
            Faktury
          </Button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Łączne Wydatki
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{paymentStats.totalSpent.toLocaleString()} PLN</div>
            <p className="text-xs text-muted-foreground">Od początku korzystania</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ten Miesiąc
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{paymentStats.thisMonth} PLN</div>
            <div className="flex items-center text-xs">
              {paymentStats.monthlyChange > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
              )}
              <span className={paymentStats.monthlyChange > 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(paymentStats.monthlyChange)}%
              </span>
              <span className="text-muted-foreground ml-1">vs poprzedni miesiąc</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Liczba Transakcji
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{paymentStats.transactionCount}</div>
            <p className="text-xs text-muted-foreground">Wszystkich transakcji</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Średnia Transakcja
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{paymentStats.averageTransaction} PLN</div>
            <p className="text-xs text-muted-foreground">Średnia wartość</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transakcje</TabsTrigger>
          <TabsTrigger value="subscriptions">Subskrypcje</TabsTrigger>
          <TabsTrigger value="refunds">Zwroty</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Szukaj transakcji..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie statusy</SelectItem>
                    <SelectItem value="completed">Zakończone</SelectItem>
                    <SelectItem value="pending">Oczekujące</SelectItem>
                    <SelectItem value="failed">Nieudane</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Okres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie okresy</SelectItem>
                    <SelectItem value="7days">Ostatnie 7 dni</SelectItem>
                    <SelectItem value="30days">Ostatnie 30 dni</SelectItem>
                    <SelectItem value="90days">Ostatnie 90 dni</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card>
            <CardHeader>
              <CardTitle>Transakcje ({filteredTransactions.length})</CardTitle>
              <CardDescription>Historia Twoich płatności</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => {
                  const StatusIcon = getStatusIcon(transaction.status);
                  const MethodIcon = getMethodIcon(transaction.method);
                  
                  return (
                    <div key={transaction.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <MethodIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{transaction.description}</h4>
                          <p className="text-sm text-muted-foreground">
                            {transaction.vendor} • {transaction.date} • ID: {transaction.id}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            {transaction.amount} {transaction.currency}
                          </p>
                          {transaction.recurring && (
                            <Badge variant="outline" className="mt-1">Cykliczna</Badge>
                          )}
                        </div>
                        
                        <Badge variant={getStatusColor(transaction.status)} className="flex items-center gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {transaction.status === "completed" && "Zakończona"}
                          {transaction.status === "pending" && "Oczekuje"}
                          {transaction.status === "failed" && "Nieudana"}
                        </Badge>
                        
                        <div className="flex gap-2">
                          {transaction.invoice && (
                            <Button variant="outline" size="sm">
                              <Receipt className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {transaction.refundable && (
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aktywne Subskrypcje</CardTitle>
              <CardDescription>Zarządzaj swoimi subskrypcjami</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.filter(sub => sub.status === "active").map((subscription) => {
                  const StatusIcon = getStatusIcon(subscription.status);
                  const MethodIcon = getMethodIcon(subscription.method);
                  
                  return (
                    <div key={subscription.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{subscription.name}</h4>
                          <p className="text-sm text-muted-foreground">{subscription.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Następna płatność: {subscription.nextBilling}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            {subscription.amount} {subscription.currency}
                          </p>
                          <p className="text-sm text-muted-foreground">{subscription.interval}</p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Zarządzaj
                          </Button>
                          <Button variant="outline" size="sm">
                            Anuluj
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historia Subskrypcji</CardTitle>
              <CardDescription>Anulowane i zakończone subskrypcje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscriptions.filter(sub => sub.status !== "active").map((subscription) => {
                  const StatusIcon = getStatusIcon(subscription.status);
                  
                  return (
                    <div key={subscription.id} className="flex items-center gap-4 p-4 border rounded-lg opacity-60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{subscription.name}</h4>
                          <p className="text-sm text-muted-foreground">{subscription.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {subscription.startDate} - {subscription.endDate || "anulowana"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 ml-auto">
                        <Badge variant={getStatusColor(subscription.status)}>
                          {subscription.status === "cancelled" ? "Anulowana" : subscription.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historia Zwrotów</CardTitle>
              <CardDescription>Twoje wnioski o zwrot pieniędzy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {refunds.map((refund) => {
                  const StatusIcon = getStatusIcon(refund.status);
                  
                  return (
                    <div key={refund.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <RefreshCw className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Zwrot #{refund.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            Transakcja: {refund.transactionId}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Powód: {refund.reason} • Zgłoszono: {refund.date}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            {refund.amount} {refund.currency}
                          </p>
                          {refund.processedDate && (
                            <p className="text-xs text-muted-foreground">
                              Przetworzone: {refund.processedDate}
                            </p>
                          )}
                        </div>
                        
                        <Badge variant={getStatusColor(refund.status)} className="flex items-center gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {refund.status === "completed" && "Zakończony"}
                          {refund.status === "processing" && "W trakcie"}
                        </Badge>
                        
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Refund Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Polityka Zwrotów</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Zwroty są możliwe w ciągu 30 dni od zakupu</p>
                <p>• Kursy z postępem powyżej 50% nie kwalifikują się do zwrotu</p>
                <p>• Subskrypcje można anulować w dowolnym momencie</p>
                <p>• Czas przetwarzania zwrotu: 3-5 dni roboczych</p>
                <p>• Zwroty są dokonywane na oryginalną metodę płatności</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentHistory;