// Pełna zawartość pliku: src/pages/ArtistDashboard.tsx

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

// Definicja typu dla pojedynczego wydania z API
interface Release {
    id: number;
    title: string;
    artist: string;
    audio_file_path: string | null;
}

const ArtistDashboard: React.FC = () => {
    const [releases, setReleases] = useState<Release[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchReleases = async () => {
            if (!token) {
                setLoading(false);
                setError("Brak autoryzacji. Zaloguj się ponownie.");
                return;
            }

            try {
                // Adres URL Twojego API wdrożonego na Render.com
                const apiUrl = 'https://hardbanrecords-lab-backend.onrender.com';
                const response = await fetch(`${apiUrl}/releases/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.detail || `Nie udało się pobrać danych (status: ${response.status}).`);
                }

                const data: Release[] = await response.json();
                setReleases(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, [token]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Panel Artysty</h1>
                    <p className="text-muted-foreground">Zarządzaj swoją muzyką i finansami.</p>
                </div>
                 <Button asChild>
                    <Link to="/artist/add-release">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Dodaj Nowe Wydanie
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Moje Wydania Muzyczne</CardTitle>
                    <CardDescription>Lista wszystkich Twoich utworów dodanych do systemu.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && <p className="text-center text-muted-foreground">Ładowanie danych...</p>}
                    {error && <p className="text-center text-red-500">Błąd: {error}</p>}
                    {!loading && !error && (
                        releases.length > 0 ? (
                            <ul className="divide-y">
                                {releases.map(release => (
                                    <li key={release.id} className="py-3 flex justify-between items-center">
                                        <span>
                                            <span className="font-semibold">{release.title}</span>
                                            <span className="text-muted-foreground"> - {release.artist}</span>
                                        </span>
                                        {/* W przyszłości można dodać przyciski akcji */}
                                    </li>

                                ))}
                            </ul>
                        ) : (
                            <div className="text-center text-muted-foreground py-8">
                                <p>Nie masz jeszcze żadnych wydań.</p>
                                <p>Kliknij przycisk "Dodaj Nowe Wydanie", aby opublikować swój pierwszy utwór.</p>
                            </div>
                        )
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ArtistDashboard;