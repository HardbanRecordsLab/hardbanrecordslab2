// src/pages/ArtistDashboard.tsx - Zaktualizowany i podłączony do API
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Definicja typu dla pojedynczego wydania muzycznego
interface MusicRelease {
  id: number;
  title: string;
  artist: string;
  status: string;
  release_meta: {
    genre?: string;
    original_filename?: string;
  };
}

// Funkcja pomocnicza do pobierania danych z API
const fetchFromApi = async (endpoint: string, token: string) => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


export default function ArtistDashboard() {
  const { user, token } = useAuth();
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [stats, setStats] = useState({ total_releases: 0, published_releases: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Równoległe pobieranie danych
        const [releasesData, statsData] = await Promise.all([
          fetchFromApi('/music/releases/', token),
          fetchFromApi('/music/stats', token)
        ]);

        setReleases(releasesData);
        setStats(statsData);

      } catch (err) {
        setError("Nie udało się załadować danych. Spróbuj odświeżyć stronę.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [token]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Witaj, {user?.email || 'Artysto'}!</h1>

      {/* Sekcja Statystyk */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Wszystkie Wydania</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{isLoading ? '...' : stats.total_releases}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Opublikowane</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{isLoading ? '...' : stats.published_releases}</p>
          </CardContent>
        </Card>
      </div>

      {/* Sekcja Ostatnich Wydań */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Twoje Wydania Muzyczne</CardTitle>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Dodaj Nowe Wydanie
          </Button>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {isLoading ? (
            <p className="text-center">Ładowanie Twoich wydań...</p>
          ) : releases.length === 0 ? (
            <p className="text-center text-gray-500">Nie masz jeszcze żadnych wydań. Czas dodać pierwsze!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tytuł</TableHead>
                  <TableHead>Artysta</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Gatunek</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {releases.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell className="font-medium">{release.title}</TableCell>
                    <TableCell>{release.artist}</TableCell>
                    <TableCell>
                      <Badge variant={release.status === 'published' ? 'default' : 'secondary'}>
                        {release.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{release.release_meta?.genre || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
