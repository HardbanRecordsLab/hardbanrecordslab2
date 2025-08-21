// Pełna zawartość pliku: src/pages/AddNewRelease.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const AddNewRelease: React.FC = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setAudioFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!title.trim() || !artist.trim() || !audioFile) {
            toast.error("Wszystkie pola, włącznie z plikiem audio, są wymagane.");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Przesyłanie utworu...");

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('audio_file', audioFile);

        try {
            const apiUrl = 'https://hardbanrecords-lab-backend.onrender.com';
            const response = await fetch(`${apiUrl}/releases/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ detail: 'Wystąpił nieznany błąd serwera.' }));
                throw new Error(errorData.detail || `Błąd serwera: ${response.statusText}`);
            }
            
            toast.success("Utwór został pomyślnie dodany!", { id: toastId });
            navigate('/artist'); // Przekieruj do głównego panelu artysty

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Nie udało się dodać wydania.';
            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Dodaj Nowe Wydanie</CardTitle>
                <CardDescription>Wypełnij poniższe pola, aby dodać nowy utwór do swojego katalogu.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Tytuł utworu</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="np. Mój Nowy Hit" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="artist">Wykonawca</Label>
                        <Input id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="np. Nazwa Artysty" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="audioFile">Plik audio (MP3, WAV)</Label>
                        <Input id="audioFile" type="file" onChange={handleFileChange} accept=".mp3,.wav,audio/mpeg,audio/wav" required />
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Przesyłanie...' : 'Dodaj i Prześlij Utwór'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddNewRelease;