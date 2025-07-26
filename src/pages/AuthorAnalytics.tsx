import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Download, DollarSign, Users, Globe, BookOpen, Calendar, Eye } from "lucide-react"

const salesData = [
  { month: 'Sty', sales: 145, revenue: 435 },
  { month: 'Lut', sales: 230, revenue: 690 },
  { month: 'Mar', sales: 320, revenue: 960 },
  { month: 'Kwi', sales: 280, revenue: 840 },
  { month: 'Maj', sales: 410, revenue: 1230 },
  { month: 'Cze', sales: 380, revenue: 1140 },
]

const platformData = [
  { name: 'Amazon KDP', value: 35, sales: 1245, color: '#FF9F40' },
  { name: 'Apple Books', value: 25, sales: 890, color: '#36A2EB' },
  { name: 'Google Play', value: 20, sales: 712, color: '#4BC0C0' },
  { name: 'Kobo', value: 12, sales: 427, color: '#9966FF' },
  { name: 'Inne', value: 8, sales: 285, color: '#FF6384' },
]

const geographicData = [
  { country: 'Polska', sales: 856, percentage: 42 },
  { country: 'USA', sales: 534, percentage: 26 },
  { country: 'Niemcy', sales: 312, percentage: 15 },
  { country: 'UK', sales: 178, percentage: 9 },
  { country: 'Kanada', sales: 89, percentage: 4 },
  { country: 'Inne', sales: 78, percentage: 4 },
]

const bookPerformance = [
  {
    title: "Nocne Opowieści",
    sales: 1245,
    revenue: "$3,735.00",
    rating: 4.8,
    reviews: 234,
    downloads: 1456,
    returnRate: "2.3%"
  },
  {
    title: "Miasto Marzeń", 
    sales: 890,
    revenue: "$2,670.00",
    rating: 4.6,
    reviews: 156,
    downloads: 1023,
    returnRate: "1.8%"
  },
  {
    title: "Krótkie Opowiadania",
    sales: 567,
    revenue: "$1,701.00", 
    rating: 4.7,
    reviews: 89,
    downloads: 689,
    returnRate: "1.2%"
  },
]

const readerDemographics = [
  { ageGroup: '18-24', percentage: 15, sales: 312 },
  { ageGroup: '25-34', percentage: 35, sales: 728 },
  { ageGroup: '35-44', percentage: 28, sales: 582 },
  { ageGroup: '45-54', percentage: 15, sales: 312 },
  { ageGroup: '55+', percentage: 7, sales: 145 },
]

export default function AuthorAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analityka i Statystyki</h1>
          <p className="text-muted-foreground mt-1">
            Szczegółowe analizy sprzedaży, czytelników i wydajności publikacji
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Eksportuj Raport
        </Button>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sprzedaż (30 dni)</p>
                <p className="text-2xl font-bold text-accent">2,702</p>
                <p className="text-xs text-green-600">+18.2% vs poprzedni miesiąc</p>
              </div>
              <BookOpen className="w-8 h-8 text-accent/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Przychód (30 dni)</p>
                <p className="text-2xl font-bold text-accent">$8,106</p>
                <p className="text-xs text-green-600">+23.1% vs poprzedni miesiąc</p>
              </div>
              <DollarSign className="w-8 h-8 text-accent/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nowi czytelnicy</p>
                <p className="text-2xl font-bold text-accent">1,456</p>
                <p className="text-xs text-green-600">+12.7% vs poprzedni miesiąc</p>
              </div>
              <Users className="w-8 h-8 text-accent/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Średnia ocena</p>
                <p className="text-2xl font-bold text-accent">4.7</p>
                <p className="text-xs text-green-600">479 nowych recenzji</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sprzedaż</TabsTrigger>
          <TabsTrigger value="platforms">Platformy</TabsTrigger>
          <TabsTrigger value="books">Wydajność Książek</TabsTrigger>
          <TabsTrigger value="demographics">Demografia</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trend Sprzedaży</CardTitle>
                <CardDescription>Sprzedaż i przychody w ostatnich 6 miesiącach</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="sales" fill="#hsl(var(--accent))" name="Sprzedaż" />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#hsl(var(--primary))" strokeWidth={2} name="Przychód ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sprzedaż Geograficzna</CardTitle>
                <CardDescription>Rozkład sprzedaży według krajów</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {geographicData.map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-accent" />
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-accent h-2 rounded-full"
                            style={{ width: `${country.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {country.sales}
                        </span>
                        <span className="text-sm font-medium w-8 text-right">
                          {country.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Udział Platform</CardTitle>
                <CardDescription>Rozkład sprzedaży według platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wydajność Platform</CardTitle>
                <CardDescription>Szczegóły sprzedaży według platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformData.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: platform.color }}
                        />
                        <span className="font-medium">{platform.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {platform.sales} sprzedaży
                        </span>
                        <Badge variant="secondary">
                          {platform.value}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wydajność Książek</CardTitle>
              <CardDescription>Porównanie wydajności poszczególnych publikacji</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {bookPerformance.map((book, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-lg">{book.title}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">{book.rating}</span>
                            <span className="text-sm text-muted-foreground">({book.reviews} recenzji)</span>
                          </div>
                          <Badge variant="outline">{book.returnRate} zwrotów</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-accent">{book.revenue}</p>
                        <p className="text-sm text-muted-foreground">{book.sales} sprzedaży</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Pobrania: </span>
                        <span className="text-muted-foreground">{book.downloads}</span>
                      </div>
                      <div>
                        <span className="font-medium">Konwersja: </span>
                        <span className="text-accent font-medium">
                          {((book.sales / book.downloads) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Średnia cena: </span>
                        <span className="text-muted-foreground">
                          ${(parseFloat(book.revenue.replace('$', '').replace(',', '')) / book.sales).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Demografia Czytelników</CardTitle>
                <CardDescription>Rozkład wiekowy czytelników</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={readerDemographics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#hsl(var(--accent))" name="Procent (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferencje Czytelników</CardTitle>
                <CardDescription>Analiza zachowań i preferencji</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Najlepsze dni sprzedaży:</h4>
                    <div className="space-y-2">
                      {['Niedziela', 'Sobota', 'Piątek', 'Poniedziałek'].map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{day}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-accent h-2 rounded-full"
                                style={{ width: `${85 - index * 15}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{85 - index * 15}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Preferowane formaty:</h4>
                    <div className="space-y-2">
                      {[
                        { format: 'EPUB', percentage: 45 },
                        { format: 'PDF', percentage: 30 },
                        { format: 'Audiobook', percentage: 20 },
                        { format: 'MOBI', percentage: 5 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{item.format}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-accent h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}