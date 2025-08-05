import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCreationWizard } from "@/components/digital-products/ProductCreationWizard";
import { DistributionManager } from "@/components/digital-products/DistributionManager";
import { AnalyticsDashboard } from "@/components/digital-products/AnalyticsDashboard";
import { Book, Upload, TrendingUp, DollarSign, Users, Globe, Shield, FileText, Download, Eye } from "lucide-react";

const DigitalPublishing = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Opublikowane Książki", value: "56", change: "+8%", icon: Book },
    { title: "Miesięczne Czytania", value: "24.5K", change: "+15%", icon: Eye },
    { title: "Przychód Miesięczny", value: "8,920 PLN", change: "+22%", icon: DollarSign },
    { title: "Aktywni Czytelnicy", value: "12.8K", change: "+12%", icon: Users },
  ];

  const recentBooks = [
    { title: "Przewodnik po AI", author: "Dr. Anna Kowalska", status: "Opublikowany", views: "2.1K", revenue: "1,240 PLN", format: "EPUB" },
    { title: "Krypto dla początkujących", author: "Piotr Nowak", status: "W Review", views: "-", revenue: "-", format: "PDF" },
    { title: "Marketing Cyfrowy 2024", author: "Maria Jankowska", status: "Opublikowany", views: "4.7K", revenue: "2,890 PLN", format: "EPUB" },
    { title: "Recepty babci", author: "Krystyna Wiśniewska", status: "Dystrybuowany", views: "8.3K", revenue: "3,450 PLN", format: "PDF" },
  ];

  const distributionChannels = [
    { name: "Amazon Kindle", status: "Aktywny", books: 42, revenue: "45%" },
    { name: "Google Books", status: "Aktywny", books: 38, revenue: "28%" },
    { name: "Apple Books", status: "Aktywny", books: 35, revenue: "15%" },
    { name: "Empik", status: "Aktywny", books: 29, revenue: "8%" },
    { name: "Legimi", status: "Aktywny", books: 24, revenue: "4%" },
  ];

  const genres = [
    { name: "Literatura faktu", count: 18, growth: "+15%" },
    { name: "Poradniki", count: 12, growth: "+8%" },
    { name: "Biznes", count: 9, growth: "+22%" },
    { name: "Technologia", count: 8, growth: "+35%" },
    { name: "Kulinaria", count: 6, growth: "+5%" },
    { name: "Rozwój osobisty", count: 3, growth: "+50%" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Digital Publishing</h1>
          <p className="text-muted-foreground text-lg">Publikuj, dystrybuuj i monetyzuj swoje książki cyfrowe</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg">
            <Globe className="mr-2 h-5 w-5" />
            Księgarnie
          </Button>
          <Button size="lg">
            <Upload className="mr-2 h-5 w-5" />
            Dodaj Książkę
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span className="ml-1">vs poprzedni miesiąc</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="distribution">Dystrybucja</TabsTrigger>
          <TabsTrigger value="analytics">Analityka</TabsTrigger>
          <TabsTrigger value="isbn">ISBN</TabsTrigger>
          <TabsTrigger value="monetization">Monetyzacja</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Books */}
          <Card>
            <CardHeader>
              <CardTitle>Ostatnie Publikacje</CardTitle>
              <CardDescription>Twoje najnowsze książki i ich status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBooks.map((book, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Book className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <Badge variant="outline" className="mt-1">{book.format}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Badge variant={book.status === "Opublikowany" ? "default" : book.status === "Dystrybuowany" ? "secondary" : "outline"}>
                        {book.status}
                      </Badge>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{book.views}</p>
                        <p className="text-sm text-muted-foreground">wyświetlenia</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{book.revenue}</p>
                        <p className="text-sm text-muted-foreground">przychód</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distribution and Genres Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Distribution Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status Dystrybucji</CardTitle>
                <CardDescription>Przegląd kanałów sprzedaży</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {distributionChannels.map((channel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <Globe className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{channel.name}</h4>
                          <p className="text-sm text-muted-foreground">{channel.books} książek</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="default">{channel.status}</Badge>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{channel.revenue}</p>
                          <p className="text-sm text-muted-foreground">przychodu</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Genres Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Popularność Gatunków</CardTitle>
                <CardDescription>Wydajność według kategorii</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {genres.map((genre, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{genre.name}</h4>
                        <p className="text-sm text-muted-foreground">{genre.count} publikacji</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{genre.growth}</p>
                        <p className="text-sm text-muted-foreground">wzrost</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upload">
          <ProductCreationWizard />
        </TabsContent>

        <TabsContent value="distribution">
          <DistributionManager productId="sample-book-id" productType="ebook" />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="isbn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Zarządzanie ISBN
              </CardTitle>
              <CardDescription>Zarządzaj numerami ISBN dla swoich publikacji</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ISBN Generator */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Generator ISBN</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isbn-13">ISBN-13</Label>
                    <div className="flex gap-2">
                      <Input id="isbn-13" placeholder="978-83-XXXXX-XX-X" disabled />
                      <Button>Generuj</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isbn-10">ISBN-10 (legacy)</Label>
                    <div className="flex gap-2">
                      <Input id="isbn-10" placeholder="83-XXXXX-XX-X" disabled />
                      <Button variant="outline">Konwertuj</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ISBN Status */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Status ISBN</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Aktywne ISBN</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">42</div>
                      <p className="text-sm text-muted-foreground">w użyciu</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Dostępne ISBN</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">158</div>
                      <p className="text-sm text-muted-foreground">do przydzielenia</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Zarejestrowane</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">200</div>
                      <p className="text-sm text-muted-foreground">łącznie</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* ISBN Registration */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Rejestracja ISBN</h3>
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="publisher">Wydawca</Label>
                      <Input id="publisher" value="HardbanRecords Lab Publishing" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="prefix">Prefix wydawcy</Label>
                      <Input id="prefix" value="978-83-956789" disabled />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title-isbn">Tytuł publikacji</Label>
                      <Input id="title-isbn" placeholder="Wprowadź tytuł książki" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="format-isbn">Format</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="epub">EPUB</SelectItem>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="mobi">MOBI</SelectItem>
                          <SelectItem value="audiobook">Audiobook</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full">Zarejestruj ISBN</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monetization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Monetyzacja Publikacji
              </CardTitle>
              <CardDescription>Optymalizuj przychody z książek cyfrowych</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Revenue Overview */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Sprzedaż</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">5,420 PLN</div>
                    <div className="text-sm text-green-600">+18% vs. poprzedni miesiąc</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Subskrypcje</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">2,120 PLN</div>
                    <div className="text-sm text-green-600">+25% vs. poprzedni miesiąc</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Licencje</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">1,380 PLN</div>
                    <div className="text-sm text-green-600">+12% vs. poprzedni miesiąc</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Inne</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">200 PLN</div>
                    <div className="text-sm text-muted-foreground">+5% vs. poprzedni miesiąc</div>
                  </CardContent>
                </Card>
              </div>

              {/* Pricing Models */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Modele Cenowe</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Jednorazowa Sprzedaż</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Średnia cena:</span>
                          <span className="font-medium">29.99 PLN</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Sprzedane egz.:</span>
                          <span className="font-medium">234</span>
                        </div>
                        <Button className="w-full" variant="outline">Ustaw Ceny</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Subskrypcja</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Miesięczni czytelnicy:</span>
                          <span className="font-medium">1,847</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Przychód/czytelnik:</span>
                          <span className="font-medium">1.15 PLN</span>
                        </div>
                        <Button className="w-full" variant="outline">Zarządzaj</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Licencje Biznesowe</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Aktywne licencje:</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Średnia wartość:</span>
                          <span className="font-medium">115 PLN</span>
                        </div>
                        <Button className="w-full" variant="outline">Dodaj Licencję</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Market Analysis */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Analiza Rynku</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Najlepiej sprzedające się gatunki</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Biznes & Finanse</span>
                            <span className="text-sm font-medium">2,340 PLN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Technologia</span>
                            <span className="text-sm font-medium">1,890 PLN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Rozwój osobisty</span>
                            <span className="text-sm font-medium">1,540 PLN</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Trendy cenowe</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">E-book (EPUB)</span>
                            <span className="text-sm font-medium">19-39 PLN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">PDF Premium</span>
                            <span className="text-sm font-medium">29-59 PLN</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Audiobook</span>
                            <span className="text-sm font-medium">49-99 PLN</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DigitalPublishing;