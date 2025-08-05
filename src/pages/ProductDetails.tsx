import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, 
  Heart, 
  Share2, 
  Download, 
  Play, 
  ShoppingCart,
  Clock,
  Users,
  Globe,
  Shield,
  CheckCircle,
  MessageSquare,
  ThumbsUp,
  Music,
  Book,
  GraduationCap,
  Volume2
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock product data - w rzeczywistej aplikacji pobierałbyś to z API na podstawie ID
  const product = {
    id: id || "1",
    title: "Complete React Course 2024 - Hooks, Context, Redux, TypeScript",
    author: {
      name: "Jan Kowalski",
      avatar: "/placeholder.svg",
      bio: "Senior Frontend Developer z 8-letnim doświadczeniem. Twórca popularnych kursów programowania.",
      followers: 12453,
      courses: 8,
      rating: 4.9
    },
    type: "course",
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    rating: 4.9,
    reviewCount: 2847,
    studentCount: 12453,
    lastUpdated: "2024-01-15",
    language: "Polski",
    level: "Wszystkie poziomy",
    duration: "32 godziny",
    lectures: 245,
    certificate: true,
    lifetime: true,
    mobile: true,
    description: "Kompletny kurs React.js od podstaw do zaawansowanych technik. Nauczysz się wszystkiego co potrzebne do tworzenia nowoczesnych aplikacji webowych.",
    whatYouLearn: [
      "Podstawy React.js i JSX",
      "Hooks - useState, useEffect, useContext",
      "Zarządzanie stanem z Redux Toolkit",
      "TypeScript w projektach React",
      "Testing z Jest i React Testing Library",
      "Deployment na Vercel i Netlify",
      "Optymalizacja wydajności",
      "Najlepsze praktyki i wzorce"
    ],
    curriculum: [
      {
        section: "Wprowadzenie do React",
        lectures: 12,
        duration: "2h 30m",
        lessons: [
          { title: "Czym jest React?", duration: "12:45", free: true },
          { title: "Instalacja i konfiguracja", duration: "15:30", free: true },
          { title: "Pierwszy komponent", duration: "18:20", free: false },
        ]
      },
      {
        section: "Hooks w React",
        lectures: 18,
        duration: "4h 15m",
        lessons: [
          { title: "useState Hook", duration: "22:10", free: false },
          { title: "useEffect Hook", duration: "28:45", free: false },
          { title: "Custom Hooks", duration: "19:35", free: false },
        ]
      },
      {
        section: "Redux Toolkit",
        lectures: 15,
        duration: "3h 45m",
        lessons: [
          { title: "Wprowadzenie do Redux", duration: "16:20", free: false },
          { title: "Store i Reducers", duration: "24:10", free: false },
          { title: "Async Actions", duration: "21:30", free: false },
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Anna Nowak",
        avatar: "/placeholder.svg",
        rating: 5,
        date: "2024-01-10",
        comment: "Fantastyczny kurs! Bardzo dobrze wytłumaczone podstawy i zaawansowane tematy. Polecam wszystkim początkującym i średnio zaawansowanym.",
        helpful: 24
      },
      {
        id: 2,
        user: "Piotr Wiśniewski",
        avatar: "/placeholder.svg",
        rating: 5,
        date: "2024-01-08",
        comment: "Świetny materiał, aktualny i praktyczny. Dzięki temu kursowi zdobyłem pracę jako React Developer.",
        helpful: 18
      },
      {
        id: 3,
        user: "Maria Kowalczyk",
        avatar: "/placeholder.svg",
        rating: 4,
        date: "2024-01-05",
        comment: "Dobry kurs, ale niektóre sekcje mogłyby być bardziej szczegółowe. Ogólnie polecam!",
        helpful: 12
      }
    ],
    relatedProducts: [
      { id: 2, title: "Advanced JavaScript ES6+", author: "Tomasz Nowak", price: 149.99, rating: 4.7 },
      { id: 3, title: "Node.js Backend Development", author: "Anna Kowal", price: 179.99, rating: 4.8 },
      { id: 4, title: "TypeScript Masterclass", author: "Piotr Jankowski", price: 129.99, rating: 4.6 },
    ]
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "music": return Music;
      case "ebook": return Book;
      case "course": return GraduationCap;
      case "audiobook": return Volume2;
      default: return GraduationCap;
    }
  };

  const TypeIcon = getTypeIcon(product.type);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <TypeIcon className="h-3 w-3" />
                  Kurs
                </Badge>
                <Badge variant="secondary">Bestseller</Badge>
                {product.certificate && <Badge variant="outline">Certyfikat</Badge>}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                {product.title}
              </h1>
              
              <p className="text-lg text-muted-foreground">
                {product.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium text-foreground">{product.rating}</span>
                  <span>({product.reviewCount.toLocaleString()} ocen)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{product.studentCount.toLocaleString()} studentów</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{product.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>{product.language}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={product.author.avatar} />
                  <AvatarFallback>{product.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">Utworzone przez {product.author.name}</p>
                  <p className="text-sm text-muted-foreground">Zaktualizowane {product.lastUpdated}</p>
                </div>
              </div>
            </div>

            {/* Preview/Demo */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center relative">
                  <Button size="lg" className="rounded-full w-16 h-16">
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                  <div className="absolute bottom-4 left-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    Podgląd: 5:23
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Przegląd</TabsTrigger>
                <TabsTrigger value="curriculum">Program</TabsTrigger>
                <TabsTrigger value="reviews">Recenzje</TabsTrigger>
                <TabsTrigger value="instructor">Instruktor</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Czego się nauczysz</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {product.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Wymagania</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Podstawowa znajomość HTML i CSS</li>
                      <li>• Znajomość JavaScript na poziomie podstawowym</li>
                      <li>• Komputer z dostępem do internetu</li>
                      <li>• Chęć do nauki i praktykowania</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Program kursu</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.lectures} lekcji • {product.duration} całkowity czas
                  </p>
                </div>
                
                {product.curriculum.map((section, index) => (
                  <Card key={index}>
                    <CardHeader className="cursor-pointer">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{section.section}</CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {section.lectures} lekcji • {section.duration}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                            <div className="flex items-center gap-2">
                              <Play className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{lesson.title}</span>
                              {lesson.free && <Badge variant="outline" className="text-xs">Darmowy</Badge>}
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Oceny studentów</h3>
                  <Button variant="outline">Napisz recenzję</Button>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-foreground mb-2">{product.rating}</div>
                        <div className="flex justify-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-5 w-5 ${star <= Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{product.reviewCount} ocen</p>
                      </div>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm w-8">{rating}★</span>
                            <Progress value={rating === 5 ? 85 : rating === 4 ? 12 : rating === 3 ? 2 : 1} className="flex-1" />
                            <span className="text-sm text-muted-foreground w-8">
                              {rating === 5 ? '85%' : rating === 4 ? '12%' : rating === 3 ? '2%' : '1%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{review.user}</h4>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Pomocne ({review.helpful})
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Odpowiedz
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex gap-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={product.author.avatar} />
                        <AvatarFallback className="text-lg">{product.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{product.author.name}</h3>
                        <p className="text-muted-foreground mb-4">{product.author.bio}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-foreground">{product.author.rating}</div>
                            <div className="text-sm text-muted-foreground">Ocena instruktora</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-foreground">{product.author.courses}</div>
                            <div className="text-sm text-muted-foreground">Kursów</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-foreground">{product.author.followers.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Obserwujących</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-foreground">12.4K</div>
                            <div className="text-sm text-muted-foreground">Studentów</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Purchase Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-4">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center relative">
                  <Button variant="outline" className="rounded-full w-12 h-12">
                    <Play className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">{product.price} PLN</span>
                    <span className="text-lg text-muted-foreground line-through">{product.originalPrice} PLN</span>
                    <Badge variant="destructive">{product.discount}% OFF</Badge>
                  </div>
                  <p className="text-sm text-red-600 font-medium">Oferta kończy się za 2 dni!</p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Dodaj do koszyka
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Kup teraz
                  </Button>
                </div>

                <div className="flex justify-center gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                    Ulubione
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Udostępnij
                  </Button>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <h4 className="font-semibold">Ten kurs zawiera:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{product.duration} materiału wideo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span>Materiały do pobrania</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span>Dożywotni dostęp</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>Dostęp na urządzeniach mobilnych</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Certyfikat ukończenia</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Products */}
            <Card>
              <CardHeader>
                <CardTitle>Podobne kursy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.relatedProducts.map((related) => (
                  <div key={related.id} className="flex gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                    <div className="w-16 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{related.title}</h4>
                      <p className="text-xs text-muted-foreground">{related.author}</p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{related.rating}</span>
                        </div>
                        <span className="text-sm font-semibold">{related.price} PLN</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;