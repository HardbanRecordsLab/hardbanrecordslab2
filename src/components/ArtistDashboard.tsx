// src/components/ArtistDashboard.tsx

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

// Definicja typu dla pojedynczego wydania
interface Release {
    id: number;
    title: string;
    artist: string;
    // Dodaj inne pola, które zwraca Twoje API, np. status, data wydania
}

const ArtistDashboard: React.FC = () => {
    const [releases, setReleases] = useState<Release[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth(); // Pobieramy token z kontekstu

    useEffect(() => {
        const fetchReleases = async () => {
            if (!token) {
                setLoading(false);
                setError("Brak autoryzacji. Zaloguj się ponownie.");
                return;
            }

            try {
                // Upewnij się, że URL jest poprawny dla Twojego wdrożenia na Render.com
                const response = await fetch('https://hardbanrecords-lab-backend.onrender.com/music/releases/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Nie udało się pobrać danych.');
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
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Panel Artysty</h1>
                <Button asChild>
                    <Link to="/add-release">Dodaj Nowe Wydanie</Link>
                </Button>
            </div>

            {/* Tutaj mogą być karty ze statystykami */}

            <Card>
                <CardHeader>
                    <CardTitle>Moje Wydania</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading && <p>Ładowanie...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && (
                        releases.length > 0 ? (
                            <ul>
                                {releases.map(release => (
                                    <li key={release.id} className="border-b p-2">
                                        {release.title} - {release.artist}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nie masz jeszcze żadnych wydań. Dodaj pierwsze!</p>
                        )
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ArtistDashboard;