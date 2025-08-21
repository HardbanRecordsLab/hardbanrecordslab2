// Pełny, samowystarczalny kod komponentu ArtistDashboard.tsx
import { useQuery } from '@tanstack/react-query';
import { getArtistReleases, Release } from '@/services/musicService'; // Dostosuj ścieżkę importu
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

/**
 * Komponent panelu artysty, który wyświetla listę jego wydawnictw muzycznych.
 *
 * - Używa haka `useQuery` do pobierania danych z API.
 * - Klucz zapytania `['artistReleases']` jednoznacznie identyfikuje te dane w pamięci podręcznej.
 * - Obsługuje stany ładowania, błędu oraz pustej listy.
 * - Wykorzystuje komponenty `shadcn/ui` do stworzenia profesjonalnego interfejsu.
 */
const ArtistDashboard = () => {
  const { data: releases, isLoading, isError, error } = useQuery<Release[], Error>({
    queryKey: ['artistReleases'],
    queryFn: getArtistReleases,
  });

  // Stan ładowania danych
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Ładowanie danych...</p>
      </div>
    );
  }

  // Stan błędu podczas pobierania
  if (isError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <p>Wystąpił błąd: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Panel Artysty</h1>
          <p className="text-muted-foreground">Zarządzaj swoją muzyką i przeglądaj statystyki.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Dodaj Nowe Wydanie
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Twoje Wydania Muzyczne</CardTitle>
          <CardDescription>Lista wszystkich Twoich opublikowanych i oczekujących utworów.</CardDescription>
        </CardHeader>
        <CardContent>
          {releases && releases.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Okładka</TableHead>
                  <TableHead>Tytuł</TableHead>
                  <TableHead>Artysta</TableHead>
                  <TableHead>Data Wydania</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {releases.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell>
                      <img
                        src={release.cover_image_url || 'https://via.placeholder.com/40'}
                        alt={`Okładka ${release.title}`}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{release.title}</TableCell>
                    <TableCell>{release.artist}</TableCell>
                    <TableCell>{new Date(release.release_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={release.status === 'published' ? 'default' : 'secondary'}>
                        {release.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold">Nie masz jeszcze żadnych wydawnictw</h3>
              <p className="text-muted-foreground mt-2">
                Kliknij przycisk "Dodaj Nowe Wydanie", aby przesłać swój pierwszy utwór.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistDashboard;