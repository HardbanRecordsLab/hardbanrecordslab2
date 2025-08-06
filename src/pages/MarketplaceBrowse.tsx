import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Star, 
  Music, 
  Book, 
  GraduationCap,
  Play,
  Download,
  Eye,
  Heart,
  TrendingUp,
  Clock,
  Globe
} from "lucide-react";

const MarketplaceBrowse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('digital_products')
        .select('*')
        .eq('status', 'published');

      // Filter by category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'music') {
          query = query.eq('product_type', 'music');
        } else if (selectedCategory === 'ebook') {
          query = query.eq('product_type', 'ebook');
        } else if (selectedCategory === 'course') {
          // For courses, we'd need to fetch from courses table instead
          const { data: coursesData, error: coursesError } = await supabase
            .from('courses')
            .select('*')
            .eq('status', 'published');
          
          if (coursesError) throw coursesError;
          
          // Transform courses data to match products format
          const transformedCourses = coursesData?.map(course => ({
            ...course,
            product_type: 'course',
            author: 'Nieznany autor',
            type: 'course'
          })) || [];
          
          setProducts(transformedCourses);
          setLoading(false);
          return;
        }
      }

      // Apply sorting
      switch (sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'popular':
        default:
          query = query.order('view_count', { ascending: false });
          break;
      }

      const { data, error } = await query.limit(20);
      
      if (error) throw error;

      // Transform data to match expected format
      const transformedProducts = data?.map(product => ({
        ...product,
        author: 'Nieznany autor',
        type: product.product_type,
        rating: 4.5, // Placeholder - would need reviews table
        reviews: Math.floor(Math.random() * 200) + 10, // Placeholder
        duration: product.duration ? `${Math.floor(product.duration / 60)}:${(product.duration % 60).toString().padStart(2, '0')}` : 'N/A'
      })) || [];

      setProducts(transformedProducts);

    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać produktów",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "Wszystkie", count: 1247 },
    { id: "music", name: "Muzyka", count: 534, icon: Music },
    { id: "ebook", name: "E-booki", count: 312, icon: Book },
    { id: "course", name: "Kursy", count: 267, icon: GraduationCap },
    { id: "audiobook", name: "Audiobooki", count: 134, icon: Play },
  ];

  const featuredProducts = [
    {
      id: 1,
      title: "Complete React Course 2024",
      author: "Jan Kowalski",
      type: "course",
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.9,
      reviews: 2847,
      students: 12453,
      image: "/placeholder.svg",
      badge: "Bestseller",
      duration: "32 godziny"
    },
    {
      id: 2,
      title: "Midnight Dreams",
      author: "Luna Smith",
      type: "music",
      price: 9.99,
      rating: 4.7,
      reviews: 156,
      plays: 89234,
      image: "/placeholder.svg",
      badge: "Nowe",
      duration: "3:24"
    },
    {
      id: 3,
      title: "AI w Biznesie",
      author: "Dr. Anna Nowak",
      type: "ebook",
      price: 49.99,
      rating: 4.8,
      reviews: 234,
      pages: 284,
      image: "/placeholder.svg",
      badge: "Popularne",
      duration: "284 strony"
    },
  ];

  const trendingProducts = [
    {
      id: 4,
      title: "Marketing Cyfrowy Masterclass",
      author: "Piotr Wiśniewski",
      type: "course",
      price: 149.99,
      rating: 4.6,
      reviews: 892,
      image: "/placeholder.svg",
      growth: "+245%"
    },
    {
      id: 5,
      title: "Summer Vibes EP",
      author: "Beat Master",
      type: "music",
      price: 19.99,
      rating: 4.8,
      reviews: 67,
      image: "/placeholder.svg",
      growth: "+180%"
    },
    {
      id: 6,
      title: "Kryptochemie dla każdego",
      author: "Maria Kowalczyk",
      type: "ebook",
      price: 39.99,
      rating: 4.5,
      reviews: 123,
      image: "/placeholder.svg",
      growth: "+156%"
    },
  ];

  const allProducts = [
    ...featuredProducts,
    ...trendingProducts,
    {
      id: 7,
      title: "JavaScript od podstaw",
      author: "Tomasz Nowak",
      type: "course",
      price: 89.99,
      rating: 4.4,
      reviews: 445,
      image: "/placeholder.svg"
    },
    {
      id: 8,
      title: "Chill Beats Collection",
      author: "Ambient Producer",
      type: "music",
      price: 14.99,
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg"
    },
    {
      id: 9,
      title: "Przewodnik po Freelancingu",
      author: "Agnieszka Kowal",
      type: "ebook",
      price: 29.99,
      rating: 4.7,
      reviews: 167,
      image: "/placeholder.svg"
    },
  ];

  const filteredProducts = products.filter(product => {
    if (searchQuery) {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             product.author.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "music": return Music;
      case "ebook": return Book;
      case "course": return GraduationCap;
      case "audiobook": return Play;
      default: return Music;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "music": return "Muzyka";
      case "ebook": return "E-book";
      case "course": return "Kurs";
      case "audiobook": return "Audiobook";
      default: return "Produkt";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
                <p className="text-muted-foreground">Odkryj i kup najlepsze produkty cyfrowe</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Ulubione
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Moje zakupy
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Szukaj produktów, autorów..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sortuj według" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Najpopularniejsze</SelectItem>
                    <SelectItem value="newest">Najnowsze</SelectItem>
                    <SelectItem value="price-low">Cena: od najniższej</SelectItem>
                    <SelectItem value="price-high">Cena: od najwyższej</SelectItem>
                    <SelectItem value="rating">Najwyżej oceniane</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Categories */}
          <div className="hidden lg:block w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kategorie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm opacity-70">{category.count}</span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popularne tagi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["React", "AI", "Marketing", "Design", "Business", "Music Production", "Photography"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Featured Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-yellow-500" />
                <h2 className="text-2xl font-bold text-foreground">Polecane</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    Ładowanie produktów...
                  </div>
                ) : filteredProducts.slice(0, 6).map((product) => {
                  const TypeIcon = getTypeIcon(product.type);
                  return (
                    <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                          <TypeIcon className="h-12 w-12 text-primary" />
                        </div>
                        {product.badge && (
                          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                            {product.badge}
                          </Badge>
                        )}
                        <Button size="sm" variant="secondary" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{getTypeLabel(product.type)}</Badge>
                          <span className="text-sm text-muted-foreground">{product.duration}</span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{product.author}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{product.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({product.reviews})</span>
                          {product.students && (
                            <span className="text-sm text-muted-foreground">• {product.students.toLocaleString()} studentów</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-foreground">{product.price || 0} PLN</span>
                          </div>
                          <Button size="sm">Kup teraz</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Trending Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <h2 className="text-2xl font-bold text-foreground">Trending</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingProducts.map((product) => {
                  const TypeIcon = getTypeIcon(product.type);
                  return (
                    <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-50 rounded-t-lg flex items-center justify-center">
                          <TypeIcon className="h-12 w-12 text-green-600" />
                        </div>
                        <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                          {product.growth}
                        </Badge>
                        <Button size="sm" variant="secondary" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{getTypeLabel(product.type)}</Badge>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{product.author}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{product.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-foreground">{product.price} PLN</span>
                          <Button size="sm">Kup teraz</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* All Products */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Wszystkie produkty 
                  <span className="text-muted-foreground text-lg ml-2">
                    ({filteredProducts.length})
                  </span>
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Lista
                  </Button>
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Siatka
                  </Button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const TypeIcon = getTypeIcon(product.type);
                  return (
                    <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg flex items-center justify-center">
                          <TypeIcon className="h-8 w-8 text-primary" />
                        </div>
                        <Button size="sm" variant="secondary" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <Badge variant="outline" className="mb-2">{getTypeLabel(product.type)}</Badge>
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.author}</p>
                        <div className="flex items-center gap-1 mb-3">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground">{product.price} PLN</span>
                          <Button size="sm" variant="outline">Kup</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceBrowse;