// Pełny, samowystarczalny kod komponentu AddNewRelease.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createArtistRelease } from '@/services/musicService'; // Ta linia zostanie odkomentowana później
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const releaseFormSchema = z.object({
  title: z.string().min(1, 'Tytuł jest wymagany.'),
  artist: z.string().min(1, 'Nazwa artysty jest wymagana.'),
  coverImage: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, 'Okładka jest wymagana.'),
  audioFile: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, 'Plik audio jest wymagany.'),
});

type ReleaseFormValues = z.infer<typeof releaseFormSchema>;

// Tymczasowa funkcja asynchroniczna, aby uniknąć błędów
const createArtistRelease = async (data: FormData) => {
    console.log("Wysyłanie danych:", Object.fromEntries(data.entries()));
    // Symulacja opóźnienia sieciowego
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Zwróć przykładowe dane
    return { id: '123', title: data.get('title'), artist: data.get('artist') };
};


const AddNewRelease = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<ReleaseFormValues>({
    resolver: zodResolver(releaseFormSchema),
    defaultValues: {
      title: '',
      artist: '',
    },
  });

  const mutation = useMutation({
    mutationFn: createArtistRelease,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artistReleases'] });
      toast.success('Sukces!', { description: 'Twoje wydanie zostało pomyślnie dodane (symulacja).' });
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error('Błąd', { description: `Wystąpił błąd: ${error.message}` });
    },
  });

  const onSubmit = (data: ReleaseFormValues) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('artist', data.artist);
    formData.append('cover_image', data.coverImage[0]);
    formData.append('audio_file', data.audioFile[0]);

    mutation.mutate(formData);
  };

  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Dodaj Nowe Wydanie</CardTitle>
          <CardDescription>Uzupełnij poniższe pola, aby przesłać swój nowy utwór.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tytuł utworu</FormLabel>
                    <FormControl>
                      <Input placeholder="Np. Mój nowy hit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="artist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wykonawca</FormLabel>
                    <FormControl>
                      <Input placeholder="Np. DJ Gemini" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Okładka (plik graficzny)</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" {...form.register('coverImage')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audioFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plik audio (np. WAV, MP3)</FormLabel>
                    <FormControl>
                      <Input type="file" accept="audio/*" {...form.register('audioFile')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Przesyłanie...' : 'Dodaj wydanie'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewRelease;