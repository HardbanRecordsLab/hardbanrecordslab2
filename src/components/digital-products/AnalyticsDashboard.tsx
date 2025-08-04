import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  Eye,
  Download,
  DollarSign,
  Users,
  Globe,
  Calendar,
  RefreshCw,
  Loader2
} from 'lucide-react';

interface AnalyticsData {
  revenue: number;
  views: number;
  downloads: number;
  streams: number;
  countries: Record<string, number>;
  platforms: Record<string, number>;
  timeSeriesData: Array<{
    date: string;
    views: number;
    downloads: number;
    revenue: number;
  }>;
  topProducts: Array<{
    id: string;
    title: string;
    views: number;
    revenue: number;
    product_type: string;
  }>;
}

interface AnalyticsDashboardProps {
  productId?: string;
  dateRange?: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#ff00ff', '#00ffff'];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  productId,
  dateRange = '30d'
}) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(dateRange);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, [productId, selectedDateRange]);

  const fetchAnalytics = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      
      switch (selectedDateRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        case '1y':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        default:
          startDate.setDate(endDate.getDate() - 30);
      }

      let query = supabase
        .from('analytics')
        .select(`
          event_type,
          platform,
          country,
          revenue,
          timestamp,
          product_id,
          digital_products!inner(title, product_type)
        `)
        .eq('user_id', user.id)
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString());

      if (productId) {
        query = query.eq('product_id', productId);
      }

      const { data: rawData, error } = await query;

      if (error) throw error;

      // Process analytics data
      const processedData = processAnalyticsData(rawData || []);
      setAnalytics(processedData);

    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać danych analitycznych",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (data: any[]): AnalyticsData => {
    const revenue = data.reduce((sum, item) => sum + (item.revenue || 0), 0);
    const views = data.filter(item => item.event_type === 'view').length;
    const downloads = data.filter(item => item.event_type === 'download').length;
    const streams = data.filter(item => item.event_type === 'play').length;

    // Countries
    const countries: Record<string, number> = {};
    data.forEach(item => {
      if (item.country) {
        countries[item.country] = (countries[item.country] || 0) + 1;
      }
    });

    // Platforms
    const platforms: Record<string, number> = {};
    data.forEach(item => {
      if (item.platform) {
        platforms[item.platform] = (platforms[item.platform] || 0) + 1;
      }
    });

    // Time series data
    const timeSeriesMap: Record<string, { views: number; downloads: number; revenue: number }> = {};
    data.forEach(item => {
      const date = new Date(item.timestamp).toISOString().split('T')[0];
      if (!timeSeriesMap[date]) {
        timeSeriesMap[date] = { views: 0, downloads: 0, revenue: 0 };
      }
      
      if (item.event_type === 'view') timeSeriesMap[date].views++;
      if (item.event_type === 'download') timeSeriesMap[date].downloads++;
      timeSeriesMap[date].revenue += item.revenue || 0;
    });

    const timeSeriesData = Object.entries(timeSeriesMap)
      .map(([date, values]) => ({ date, ...values }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Top products
    const productMap: Record<string, { title: string; views: number; revenue: number; product_type: string }> = {};
    data.forEach(item => {
      if (!productMap[item.product_id]) {
        productMap[item.product_id] = {
          title: item.digital_products.title,
          views: 0,
          revenue: 0,
          product_type: item.digital_products.product_type,
        };
      }
      
      if (item.event_type === 'view') productMap[item.product_id].views++;
      productMap[item.product_id].revenue += item.revenue || 0;
    });

    const topProducts = Object.entries(productMap)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    return {
      revenue,
      views,
      downloads,
      streams,
      countries,
      platforms,
      timeSeriesData,
      topProducts,
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pl-PL').format(value);
  };

  const getCountryData = () => {
    return Object.entries(analytics?.countries || {})
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const getPlatformData = () => {
    return Object.entries(analytics?.platforms || {})
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count);
  };

  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analityka</h2>
          <p className="text-muted-foreground">
            Szczegółowe statystyki wydajności Twoich produktów
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 dni</SelectItem>
              <SelectItem value="30d">30 dni</SelectItem>
              <SelectItem value="90d">90 dni</SelectItem>
              <SelectItem value="1y">1 rok</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="icon"
            onClick={fetchAnalytics}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Przychody</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics?.revenue || 0)}</div>
            <p className="text-xs text-muted-foreground">
              +12% od ostatniego miesiąca
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wyświetlenia</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics?.views || 0)}</div>
            <p className="text-xs text-muted-foreground">
              +8% od ostatniego miesiąca
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pobrania</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics?.downloads || 0)}</div>
            <p className="text-xs text-muted-foreground">
              +23% od ostatniego miesiąca
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Odtworzenia</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics?.streams || 0)}</div>
            <p className="text-xs text-muted-foreground">
              +19% od ostatniego miesiąca
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Przegląd</TabsTrigger>
          <TabsTrigger value="geography">Geografia</TabsTrigger>
          <TabsTrigger value="platforms">Platformy</TabsTrigger>
          <TabsTrigger value="products">Produkty</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trendy w czasie</CardTitle>
              <CardDescription>
                Wyświetlenia, pobrania i przychody w wybranym okresie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={analytics?.timeSeriesData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="views"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Wyświetlenia"
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="downloads"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Pobrania"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ff7300"
                    name="Przychody (PLN)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top kraje</CardTitle>
                <CardDescription>
                  Największy ruch według krajów
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getCountryData().map((item, index) => (
                    <div key={item.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{index + 1}</Badge>
                        <span>{item.country}</span>
                      </div>
                      <span className="font-medium">{formatNumber(item.count)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rozkład geograficzny</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getCountryData()}
                      dataKey="count"
                      nameKey="country"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {getCountryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wydajność platform</CardTitle>
              <CardDescription>
                Ruch według platform dystrybucji
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={getPlatformData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Najlepsze produkty</CardTitle>
              <CardDescription>
                Produkty generujące największe przychody
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{index + 1}</Badge>
                      <div>
                        <div className="font-medium">{product.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.product_type} • {formatNumber(product.views)} wyświetleń
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatCurrency(product.revenue)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};