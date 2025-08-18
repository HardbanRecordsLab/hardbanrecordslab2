import { useParams } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Music, BookOpen, GraduationCap, DollarSign, Heart, Share2 } from "lucide-react"

export default function ProductDetails() {
  const { id } = useParams()

  // Placeholder data - in a real app, this would be fetched based on the id
  const product = {
    id: id,
    title: "Przykładowy Produkt",
    author: "Twórca Produktu",
    type: "music",
    price: 49.99,
    rating: 4.8,
    reviews: 123,
    description: "To jest szczegółowy opis przykładowego produktu. Zawiera informacje o jego cechach, korzyściach i o tym, dla kogo jest przeznaczony. Można tu umieścić długi tekst, aby zaprezentować produkt w najlepszym świetle.",
    tags: ["elektronika", "ambient", "nowość"],
    coverUrl: "/placeholder.svg" // Placeholder
  }

  const getProductIcon = (type: string) => {
    switch (type) {
      case "music": return <Music className="w-12 h-12 text-primary" />;
      case "ebook": return <BookOpen className="w-12 h-12 text-primary" />;
      case "course": return <GraduationCap className="w-12 h-12 text-primary" />;
      default: return null;
    }
  }
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
              <CardContent className="p-0">
              <div className="aspect-square bg-muted flex items-center justify-center rounded-lg">
                {getProductIcon(product.type)}
                  </div>
              </CardContent>
            </Card>
                        </div>
        <div className="md:col-span-2 space-y-4">
                          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {product.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                          </div>
            <h1 className="text-4xl font-bold">{product.title}</h1>
            <p className="text-lg text-muted-foreground">Autor: {product.author}</p>
                          </div>

          <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-bold">{product.rating}</span>
                        </div>
            <p className="text-muted-foreground">({product.reviews} recenzji)</p>
                      </div>
          <Card>
            <CardContent className="p-6">
              <p>{product.description}</p>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-4">
            <div className="text-3xl font-bold flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              {product.price.toFixed(2)} PLN
      </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button size="lg">Dodaj do koszyka</Button>
    </div>
          </div>
        </div>
      </div>
    </div>
  )
}
