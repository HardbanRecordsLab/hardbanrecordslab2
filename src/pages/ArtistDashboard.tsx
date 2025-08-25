// src/pages/ArtistDashboard.tsx

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RoyaltySplitForm } from '@/components/forms/RoyaltySplitForm';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Definicja typów danych oczekiwanych z API
interface RoyaltySplit {
  id: number;
  email: string;
  share_percentage: number;
}

interface MusicRelease {
  id: number;
  title: string;
  artist: string;
  cover_image_url: string;
  status: string;
  royalty_splits: RoyaltySplit[];
}

const fetchUserReleases = async (): Promise<MusicRelease[]> => {
  const { data } = await axiosClient.get('/music/releases/');
  return data;
};

export default function ArtistDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<MusicRelease | null>(null);
  
  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['userReleases'],
    queryFn: fetchUserReleases,
  });

  const handleManageSplitsClick = (release: MusicRelease) => {
    setSelectedRelease(release);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Ładowanie danych...</div>;
  if (error) return <div>Wystąpił błąd: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel Artysty</h1>
        <Button asChild>
          <Link to="/add-new-release">Dodaj Nowe Wydanie</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Moje Wydawnictwa</CardTitle>
        </CardHeader>
        <CardContent>
          {releases && releases.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Okładka</TableHead>
                  <TableHead>Tytuł / Artysta</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Podział tantiem</TableHead>
                  <TableHead>Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {releases.map((release) => (
                  <TableRow key={release.id}>
                    <TableCell>
                      <img src={release.cover_image_url} alt={release.title} className="h-16 w-16 object-cover rounded-md" />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{release.title}</div>
                      <div className="text-sm text-muted-foreground">{release.artist}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={release.status === 'approved' ? 'default' : 'secondary'}>
                        {release.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {release.royalty_splits.length > 0 ? (
                        <ul className="text-xs">
                          {release.royalty_splits.map(split => (
                            <li key={split.id}>{split.email}: {split.share_percentage}%</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-xs text-muted-foreground">Brak</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleManageSplitsClick(release)}>
                        Zarządzaj udziałami
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <p>Nie masz jeszcze żadnych wydawnictw.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Okno modalne do dodawania podziału */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zarządzaj podziałem dla "{selectedRelease?.title}"</DialogTitle>
            <DialogDescription>
              Dodaj nowego współtwórcę i przypisz mu udział procentowy w zyskach. Pamiętaj, że suma udziałów nie może przekroczyć 100%.
            </DialogDescription>
          </DialogHeader>
          {selectedRelease && (
            <RoyaltySplitForm
              releaseId={selectedRelease.id}
              onSuccess={() => setIsModalOpen(false)} // Zamykamy modal po sukcesie
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}