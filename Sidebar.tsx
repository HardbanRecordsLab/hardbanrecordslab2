import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "./AdminSidebar";
import { ArtistSidebar } from "./ArtistSidebar";
import { AuthorSidebar } from "./AuthorSidebar";
import { InstructorSidebar } from "./InstructorSidebar";
import { StudentSidebar } from "./StudentSidebar";
import { Loader2 } from "lucide-react";

export function Sidebar() {
  const { profile, loading } = useAuth();

  if (loading || !profile) {
    return (
      <aside className="hidden md:flex w-64 flex-col border-r bg-background">
        <div className="flex h-full items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </aside>
    );
  }

  switch (profile.role) {
    case "admin":
      return <AdminSidebar />;
    case "artist":
      return <ArtistSidebar />;
    case "author":
      return <AuthorSidebar />;
    case "instructor":
      return <InstructorSidebar />;
    case "student":
      return <StudentSidebar />;
    default:
      return (
        <aside className="hidden md:flex w-64 flex-col border-r bg-background">
          <div className="p-4">Nieznana rola</div>
        </aside>
      );
  }
}import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Upload, TrendingUp, DollarSign } from "lucide-react"

export default function DigitalPublishing() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8" />
            Digital Publishing
          </h1>
          <p className="text-muted-foreground">
            Publikuj e-booki, audiobooki i inne treści cyfrowe.
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Nowa Publikacja
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Moje Publikacje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Opublikowane pozycje</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sprzedaż (30 dni)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15% vs poprzedni miesiąc</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Przychody (30 dni)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678 PLN</div>
            <p className="text-xs text-muted-foreground">+20% vs poprzedni miesiąc</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Średnia Ocena</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8 ★</div>
            <p className="text-xs text-muted-foreground">Na podstawie 567 recenzji</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Funkcje wkrótce</CardTitle>
          <CardDescription>
            Ten moduł jest w trakcie budowy. Dostępne będą następujące funkcje:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Kreator publikacji (e-book, audiobook)</li>
            <li>Zarządzanie dystrybucją do Amazon KDP, Apple Books, etc.</li>
            <li>Szczegółowa analityka sprzedaży</li>
            <li>Zarządzanie prawami autorskimi i ISBN</li>
            <li>Narzędzia promocyjne i marketingowe</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Upload, TrendingUp, DollarSign } from "lucide-react"

export default function MusicPublishing() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Music className="w-8 h-8" />
            Music Publishing
          </h1>
          <p className="text-muted-foreground">
            Dystrybuuj swoją muzykę na całym świecie i zarządzaj prawami.
          </p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Nowe Wydanie
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Moje Utwory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Opublikowane utwory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Odsłuchania (30 dni)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">+12% vs poprzedni miesiąc</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tantiemy (30 dni)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456 PLN</div>
            <p className="text-xs text-muted-foreground">+8% vs poprzedni miesiąc</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Platformy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150+</div>
            <p className="text-xs text-muted-foreground">Aktywne kanały dystrybucji</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Funkcje wkrótce</CardTitle>
          <CardDescription>
            Ten moduł jest w trakcie budowy. Dostępne będą następujące funkcje:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Kreator wydań muzycznych (single, EP, albumy)</li>
            <li>Zarządzanie dystrybucją do Spotify, Apple Music, etc.</li>
            <li>Szczegółowa analityka odsłuchań i przychodów</li>
            <li>Zarządzanie prawami autorskimi i ISRC/UPC</li>
            <li>Narzędzia promocyjne i pitching do playlist</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Strona nie została znaleziona</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        Przepraszamy, ale strona, której szukasz, nie istnieje lub została przeniesiona.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Wróć na stronę główną</Link>
      </Button>
    </div>
  )
}import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "./AdminSidebar";
import { ArtistSidebar } from "./ArtistSidebar";
import { AuthorSidebar } from "./AuthorSidebar";
import { InstructorSidebar } from "./InstructorSidebar";
import { StudentSidebar } from "./StudentSidebar";
import { Loader2 } from "lucide-react";

export function Sidebar() {
  const { profile, loading } = useAuth();

  if (loading || !profile) {
    return (
      <aside className="hidden md:flex w-64 flex-col border-r bg-background">
        <div className="flex h-full items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </aside>
    );
  }

  switch (profile.role) {
    case "admin":
      return <AdminSidebar />;
    case "artist":
      return <ArtistSidebar />;
    case "author":
      return <AuthorSidebar />;
    case "instructor":
      return <InstructorSidebar />;
    case "student":
      return <StudentSidebar />;
    default:
      return (
        <aside className="hidden md:flex w-64 flex-col border-r bg-background">
          <div className="p-4">Nieznana rola</div>
        </aside>
      );
  }
}