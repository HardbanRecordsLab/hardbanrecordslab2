import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { axiosClient } from '@/api/axios';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from "sonner";
import { RoyaltySplitDialog } from '@/components/dashboard/RoyaltySplitDialog';
import { Users } from 'lucide-react';

// --- Schematy i Typy ---
const releaseSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany"),
  artist: z.string().min(1, "Artysta jest wymagany"),
  genre: z.string().min(1, "Gatunek jest wymagany"),
  audio_file: z.instanceof(FileList).refine(files => files?.length === 1, "Plik audio jest wymagany."),
  cover_art_file: z.instanceof(FileList).optional(),
});
type ReleaseFormData = z.infer<typeof releaseSchema>;
interface UserStats { total_releases: number; published_releases: number; draft_releases: number; }
interface MusicRelease {
  id: number;
  title: string;
  artist: string;
  status: string;
  release_meta: { genre?: string; cover_art_url?: string; };
  royalty_splits: { email: string; share: number; }[];
}

// --- Główny komponent ---
const ArtistDashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Stan do zarządzania oknem dialogowym
  const [isSplitDialogOpen, setSplitDialogOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<MusicRelease | null>(null);

  const handleOpenSplitDialog = (release: MusicRelease) => {
    setSelectedRelease(release);
    setSplitDialogOpen(true);
  };

  const { data: stats, isLoading: isLoadingStats } = useQuery<UserStats>({queryKey: ['userStats', user?.id], queryFn: async () => { const { data } = await axiosClient.get('/music/stats'); return data; }, enabled: !!user });
  const { data: releases, isLoading: isLoadingReleases } = useQuery<MusicRelease[]>({queryKey: ['musicReleases', user?.id], queryFn: async () => { const { data } = await axiosClient.get('/music/releases/'); return data; }, enabled: !!user });
  const { mutate: createRelease, isPending: isCreatingRelease } = useMutation({ mutationFn: async (formData: FormData) => { const { data } = await axiosClient.post('/music/releases/', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); return data; }, onSuccess: () => { toast.success("Sukces!", { description: "Twoje wydanie zostało pomyślnie dodane." }); queryClient.invalidateQueries({ queryKey: ['musicReleases', user?.id] }); queryClient.invalidateQueries({ queryKey: ['userStats', user?.id] }); reset(); }, onError: (error: any) => { const errorMsg = error.response?.data?.detail || error.message; toast.error("Błąd", { description: `Nie udało się dodać wydania: ${errorMsg}` }); }, });
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ReleaseFormData>({ resolver: zodResolver(releaseSchema) });
  const onSubmit = (data: ReleaseFormData) => { const formData = new FormData(); formData.append('title', data.title); formData.append('artist', data.artist); formData.append('genre', data.genre); formData.append('audio_file', data.audio_file[0]); if (data.cover_art_file && data.cover_art_file.length > 0) { formData.append('cover_art_file', data.cover_art_file[0]); } createRelease(formData); };

  return (
    <>
      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-3xl font-bold">Panel Artysty</h1>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Wszystkie Wydania</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{isLoadingStats ? '...' : stats?.total_releases ?? 0}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Opublikowane</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{isLoadingStats ? '...' : stats?.published_releases ?? 0}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Wersje Robocze</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{isLoadingStats ? '...' : stats?.draft_releases ?? 0}</div></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card><CardHeader><CardTitle>Dodaj Nowy Utwór</CardTitle></CardHeader><CardContent><form onSubmit={handleSubmit(onSubmit)} className="space-y-4"><div><Label htmlFor="title">Tytuł utworu</Label><Input id="title" {...register("title")} />{errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}</div><div><Label htmlFor="artist">Artysta</Label><Input id="artist" {...register("artist")} />{errors.artist && <p className="text-red-500 text-xs mt-1">{errors.artist.message}</p>}</div><div><Label>Gatunek</Label><Controller name="genre" control={control} render={({ field }) => (<Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Wybierz gatunek" /></SelectTrigger><SelectContent><SelectItem value="Electronic">Electronic</SelectItem><SelectItem value="Hip-Hop">Hip-Hop</SelectItem><SelectItem value="Rock">Rock</SelectItem><SelectItem value="Pop">Pop</SelectItem><SelectItem value="Jazz">Jazz</SelectItem></SelectContent></Select>)} />{errors.genre && <p className="text-red-500 text-xs mt-1">{errors.genre.message}</p>}</div><div><Label htmlFor="audio_file">Plik Audio (MP3, WAV, FLAC)</Label><Input id="audio_file" type="file" accept=".mp3,.wav,.flac" {...register("audio_file")} />{errors.audio_file && <p className="text-red-500 text-xs mt-1">{errors.audio_file.message}</p>}</div><div><Label htmlFor="cover_art_file">Okładka (JPG, PNG)</Label><Input id="cover_art_file" type="file" accept="image/jpeg,image/png" {...register("cover_art_file")} />{errors.cover_art_file && <p className="text-red-500 text-xs mt-1">{errors.cover_art_file.message}</p>}</div><Button type="submit" className="w-full" disabled={isCreatingRelease}>{isCreatingRelease ? 'Dodawanie...' : 'Dodaj Wydanie'}</Button></form></CardContent></Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle>Twoje Wydania</CardTitle></CardHeader>
              <CardContent>
                {isLoadingReleases ? (<p>Ładowanie...</p>)