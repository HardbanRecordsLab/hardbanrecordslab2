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
import { Music, Upload, TrendingUp, DollarSign, Users, Globe, Shield, Zap } from "lucide-react";

const MusicPublishing = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Opublikowane Utwory", value: "247", change: "+12%", icon: Music },
    { title: "Miesięczne Odsłuchania", value: "1.2M", change: "+23%", icon: TrendingUp },
    { title: "Przychód Miesięczny", value: "12,340 PLN", change: "+18%", icon: DollarSign },
    { title: "Aktywni Fani", value: "45.2K", change: "+8%", icon: Users },
  ];

  const recentTracks = [
    { title: "Midnight Dreams", artist: "Alex Johnson", status: "Opublikowany", streams: "89.2K", revenue: "2,340 PLN" },
    { title: "Summer Vibes", artist: "Luna Smith", status: "W Review", streams: "-", revenue: "-" },
    { title: "Digital Horizon", artist: "Beat Master", status: "Opublikowany", streams: "156.8K", revenue: "4,120 PLN" },
    { title: "Urban Flow", artist: "City Sounds", status: "Dystrybuowany", streams: "203.1K", revenue: "5,670 PLN" },
  ];

  const distributionChannels = [
    { name: "Spotify", status: "Aktywny", tracks: 189, revenue: "45%" },
    { name: "Apple Music", status: "Aktywny", tracks: 189, revenue: "28%" },
    { name: "YouTube Music", status: "Aktywny", tracks: 189, revenue: "15%" },
    { name: "Amazon Music", status: "Aktywny", tracks: 167, revenue: "8%" },
    { name: "Deezer", status: "Aktywny", tracks: 134, revenue: "4%" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Music Publishing</h1>
          <p className="text-muted-foreground text-lg">Zarządzaj swoją muzyką i maksymalizuj przychody</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg">
            <Globe className="mr-2 h-5 w-5" />
            Marketplaces
          </Button>
          <Button size="lg">
            <Upload className="mr-2 h-5 w-5" />
            Dodaj Utwór
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
          <TabsTrigger value="rights">Prawa</TabsTrigger>
          <TabsTrigger value="monetization">Monetyzacja</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Tracks */}
          <Card>
            <CardHeader>
              <CardTitle>Ostatnie Utwory</CardTitle>
              <CardDescription>Twoje najnowsze publikacje i ich status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTracks.map((track, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Music className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Badge variant={track.status === "Opublikowany" ? "default" : track.status === "Dystrybuowany" ? "secondary" : "outline"}>
                        {track.status}
                      </Badge>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{track.streams}</p>
                        <p className="text-sm text-muted-foreground">odsłuchania</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{track.revenue}</p>
                        <p className="text-sm text-muted-foreground">przychód</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distribution Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status Dystrybucji</CardTitle>
              <CardDescription>Przegląd Twoich kanałów dystrybucji</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {distributionChannels.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Globe className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{channel.name}</h4>
                        <p className="text-sm text-muted-foreground">{channel.tracks} utworów</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
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
        </TabsContent>

        <TabsContent value="upload">
          <ProductCreationWizard />
        </TabsContent>

        <TabsContent value="distribution">
          <DistributionManager productId="sample-product-id" productType="music" />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="rights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Zarządzanie Prawami Autorskimi
              </CardTitle>
              <CardDescription>Chroń swoją własność intelektualną i zarządzaj licencjami</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ISRC Management */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Kody ISRC</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="isrc">Generuj nowy kod ISRC</Label>
                    <div className="flex gap-2">
                      <Input id="isrc" placeholder="Automatycznie generowany" disabled />
                      <Button>Generuj</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upc">Kod UPC dla albumu</Label>
                    <div className="flex gap-2">
                      <Input id="upc" placeholder="Wprowadź lub generuj" />
                      <Button variant="outline">Auto</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Copyright Registration */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Rejestracja Praw Autorskich</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Prawa Kompozycyjne</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Zarejestrowane utwory:</span>
                          <span className="font-medium">189</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Oczekujące:</span>
                          <span className="font-medium">12</span>
                        </div>
                        <Button className="w-full" variant="outline">Zarządzaj Prawami</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Prawa Wykonawcze</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Zarejestrowane nagrania:</span>
                          <span className="font-medium">201</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Content ID aktywny:</span>
                          <span className="font-medium">167</span>
                        </div>
                        <Button className="w-full" variant="outline">Content ID</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Licensing */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Licencjonowanie</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Sync Licensing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">Licencje dla filmu, TV, reklam</p>
                      <Button className="w-full">Dodaj do Sync</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cover Versions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">Zarządzaj prawami do coverów</p>
                      <Button className="w-full" variant="outline">Ustawienia</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Remiksy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">Licencje na remiksy i edycje</p>
                      <Button className="w-full" variant="outline">Zarządzaj</Button>
                    </CardContent>
                  </Card>
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
                Monetyzacja i Tantiemy
              </CardTitle>
              <CardDescription>Optymalizuj swoje przychody i zarządzaj podziałem tantiem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Revenue Overview */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Streaming</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">8,540 PLN</div>
                    <div className="text-sm text-green-600">+15% vs. poprzedni miesiąc</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Downloads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">2,120 PLN</div>
                    <div className="text-sm text-green-600">+8% vs. poprzedni miesiąc</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Sync Licensing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">1,680 PLN</div>
                    <div className="text-sm text-green-600">+45% vs. poprzedni miesiąc</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-muted-foreground">Inne</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">340 PLN</div>
                    <div className="text-sm text-muted-foreground">+2% vs. poprzedni miesiąc</div>
                  </CardContent>
                </Card>
              </div>

              {/* Royalty Splits */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Podział Tantiem</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-foreground">Midnight Dreams</h4>
                      <Badge>Aktywny</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Alex Johnson (Kompozytor)</span>
                        <span className="font-medium">50%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Luna Smith (Tekściarz)</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Beat Master (Producent)</span>
                        <span className="font-medium">25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Settings */}
              <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-foreground">Ustawienia Wypłat</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment-method">Metoda Wypłaty</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz metodę" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Przelew bankowy</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-payout">Minimalna kwota wypłaty</Label>
                    <Input id="min-payout" placeholder="100 PLN" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MusicPublishing;