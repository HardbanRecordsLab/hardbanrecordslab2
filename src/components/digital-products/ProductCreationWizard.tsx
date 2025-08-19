import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileUpload } from '@/components/FileUpload';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Music, Book, GraduationCap, Podcast, Package, Zap, Disc, Volume2, Sparkles, Loader2 } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const productSchema = z.object({
  title: z.string().min(1, 'Tytuł jest wymagany'),
  description: z.string().optional(),
  product_type: z.enum(['music', 'ebook', 'audiobook', 'course', 'podcast', 'sample_pack', 'beat', 'stems']),
  price: z.number().min(0, 'Cena musi być dodatnia'),
  tags: z.array(z.string()).default([]),
  genres: z.array(z.string()).default([]),
  languages: z.array(z.string()).default(['pl']),
  license_type: z.enum(['standard', 'exclusive', 'non_exclusive', 'creative_commons', 'royalty_free']),
  release_date: z.string().optional(),
  isrc: z.string().optional(),
  upc: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const productTypes = [
  { value: 'music', label: 'Muzyka', icon: Music, description: 'Pojedyncze utwory, albumy, EP' },
  { value: 'ebook', label: 'E-book', icon: Book, description: 'Książki cyfrowe, poradniki' },
  { value: 'audiobook', label: 'Audiobook', icon: Volume2, description: 'Nagrania audio książek' },
  { value: 'course', label: 'Kurs', icon: GraduationCap, description: 'Kursy online, szkolenia' },
  { value: 'podcast', label: 'Podcast', icon: Podcast, description: 'Odcinki podcastu, serie audio' },
  { value: 'sample_pack', label: 'Sample Pack', icon: Package, description: 'Pakiety sampli, loop-ów' },
  { value: 'beat', label: 'Beat', icon: Zap, description: 'Instrumentale, beaty' },
  { value: 'stems', label: 'Stems', icon: Disc, description: 'Ścieżki wielotorowe' },
];

const genres = [
  'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Folk', 'Country', 
  'R&B', 'Reggae', 'Metal', 'Ambient', 'Techno', 'House', 'Trap', 'Lo-Fi'
];

const languages = [
  { value: 'pl', label: 'Polski' },
  { value: 'en', label: 'Angielski' },
  { value: 'de', label: 'Niemiecki' },
  { value: 'fr', label: 'Francuski' },
  { value: 'es', label: 'Hiszpański' },
  { value: 'it', label: 'Włoski' },
];

interface ProductCreationWizardProps {
  onProductCreated?: (productId: string) => void;
  onCancel?: () => void;
}

export const ProductCreationWizard: React.FC<ProductCreationWizardProps> = ({
  onProductCreated,
  onCancel
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatingCode, setGeneratingCode] = useState<'isrc' | 'upc' | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [newTag, setNewTag] = useState('');
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      product_type: 'music',
      price: 0,
      tags: [],
      genres: [],
      languages: ['pl'],
      license_type: 'standard',
      isrc: '',
      upc: '',
    },
  });

  const watchedProductType = form.watch('product_type');
  const watchedTags = form.watch('tags');

  const handleGenerateCode = async (type: 'isrc' | 'upc') => {
    setGeneratingCode(type);
    toast({ title: `Generowanie kodu ${type.toUpperCase()}...`, description: "Proszę czekać." });
    try {
      const { data, error } = await supabase.functions.invoke('generate-codes', {
        body: { type },
      });
      if (error) throw error;

      form.setValue(type, data.code);
      toast({ title: "Sukces!", description: `Kod ${type.toUpperCase()} został wygenerowany i wstawiony.` });
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: `Nie udało się wygenerować kodu: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setGeneratingCode(null);
    }
  };


  const addTag = useCallback(() => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      form.setValue('tags', [...watchedTags, newTag.trim()]);
      setNewTag('');
    }
  }, [newTag, watchedTags, form);

  const removeTag = useCallback((tagToRemove: string) => {
    form.setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  }, [watchedTags, form]);

  const handleSubmit = async (data: ProductFormData) => {
    if (!user) {
      toast({
        title: "Błąd",
        description: "Musisz być zalogowany aby utworzyć produkt",
                        variant: "destructive",
                      });
      return;
    }

    setLoading(true);
    try {
      // Upload files if provided
      let coverUrl = null;
      let fileUrl = null;

      if (coverFile) {
        const { data: coverData, error: coverError } = await supabase.storage
          .from('project-files')
          .upload(`covers/${user.id}/${Date.now()}_${coverFile.name}`, coverFile);
        
        if (coverError) throw coverError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('project-files')
          .getPublicUrl(coverData.path);
        
        coverUrl = publicUrl;
      }

      if (contentFile) {
        const { data: fileData, error: fileError } = await supabase.storage
          .from('project-files')
          .upload(`content/${user.id}/${Date.now()}_${contentFile.name}`, contentFile);
        
        if (fileError) throw fileError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('project-files')
          .getPublicUrl(fileData.path);
        
        fileUrl = publicUrl;
      }

      // Create product
      const { data: product, error } = await supabase
        .from('digital_products')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          product_type: data.product_type,
          price: data.price,
          tags: data.tags,
          genres: data.genres,
          languages: data.languages,
          license_type: data.license_type,
          cover_url: coverUrl,
          file_url: fileUrl,
          release_date: data.release_date ? new Date(data.release_date).toISOString() : null,
          file_size: contentFile?.size || null,
          file_format: contentFile?.type || null,
          isrc: data.isrc,
          upc: data.upc,
        })
        .select()
        .single();

      if (error) throw error;
      toast({
        title: "Sukces!",
        description: "Produkt został utworzony pomyślnie",
      });

      onProductCreated?.(product.id);
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas tworzenia produktu",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 4) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Utwórz nowy produkt</h2>
        <p className="text-muted-foreground">
          Przejdź przez proces tworzenia swojego produktu cyfrowego
        </p>
        <Progress value={progress} className="w-full" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Krok 1: Wybierz typ produktu</CardTitle>
                <CardDescription>
                  Wybierz rodzaj treści, którą chcesz opublikować
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="product_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Typ produktu</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {productTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <Card
                                key={type.value}
                                className={`cursor-pointer transition-all hover:shadow-md ${
                                  field.value === type.value
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-border'
                                }`}
                                onClick={() => field.onChange(type.value)}
                              >
                                <CardContent className="p-4 text-center">
                                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                                  <h3 className="font-medium">{type.label}</h3>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {type.description}
                                  </p>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Krok 2: Podstawowe informacje</CardTitle>
                <CardDescription>
                  Podaj tytuł, opis, cenę i kody swojego produktu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tytuł</FormLabel>
                      <FormControl>
                        <Input placeholder="Wpisz tytuł produktu..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opis</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Opisz swój produkt..."
                          className="min-h-[100px"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Dobry opis pomoże użytkownikom zrozumieć wartość Twojego produktu
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cena (PLN)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="license_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Typ licencji</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Wybierz licencję" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standardowa</SelectItem>
                            <SelectItem value="exclusive">Ekskluzywna</SelectItem>
                            <SelectItem value="non_exclusive">Nieekskluzywna</SelectItem>
                            <SelectItem value="creative_commons">Creative Commons</SelectItem>
                            <SelectItem value="royalty_free">Royalty Free</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {(watchedProductType === 'music' || watchedProductType === 'beat') && (
                  <div className="space-y-4 pt-4 border-t">
                    <FormField
                      control={form.control}
                      name="isrc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kod ISRC (dla pojedynczego utworu)</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input placeholder="PL-ABC-24-00001" {...field} />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleGenerateCode('isrc')}
                              disabled={!!generatingCode}
                            >
                              {generatingCode === 'isrc' ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Sparkles className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>
                            Międzynarodowy standardowy kod nagrania.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="upc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kod UPC (dla albumu/singla)</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input placeholder="12-cyfrowy kod kreskowy" {...field} />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => handleGenerateCode('upc')}
                              disabled={!!generatingCode}
                            >
                              {generatingCode === 'upc' ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Sparkles className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>
                            Uniwersalny kod produktu dla wydania.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="release_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data premiery (opcjonalna)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Zostaw puste dla natychmiastowej publikacji
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Krok 3: Kategoryzacja i tagi</CardTitle>
                <CardDescription>
                  Dodaj tagi i gatunki, aby ułatwić odnalezienie Twojego produktu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="genres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gatunki</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {genres.map((genre) => (
                            <Badge
                              key={genre}
                              variant={field.value.includes(genre) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                const newGenres = field.value.includes(genre)
                                  ? field.value.filter(g => g !== genre)
                                  : [...field.value, genre;
                                field.onChange(newGenres);
                              }}
                            >
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Języki</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {languages.map((lang) => (
                            <Badge
                              key={lang.value}
                              variant={field.value.includes(lang.value) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                const newLangs = field.value.includes(lang.value)
                                  ? field.value.filter(l => l !== lang.value)
                                  : [...field.value, lang.value];
                                field.onChange(newLangs);
                              }}
                            >
                              {lang.label}
                            </Badge>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Niestandardowe tagi</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Dodaj tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Dodaj
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {watchedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeTag(tag)}
                      >
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Krok 4: Pliki</CardTitle>
                <CardDescription>
                  Prześlij okładkę i główny plik produktu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Okładka</label>
                  <FileUpload
                    bucket="project-files"
                    folder="covers"
                    allowedTypes={['image/*']}
                    maxSize={5 * 1024 * 1024} // 5MB
                    onUploadComplete={(url, fileName) => {
                      setCoverFile(new File([], fileName));
                    }}
                    onUploadError={(error) => {
                      toast({
                        title: "Błąd",
                        description: error,
                        variant: "destructive",
                      });
                    }}
                  />
                  {coverFile && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Wybrano: {coverFile.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Plik produktu</label>
                  <FileUpload
                    bucket="project-files"
                    folder="content"
                    allowedTypes={
                      watchedProductType === 'music' || watchedProductType === 'beat' || watchedProductType === 'sample_pack' || watchedProductType === 'stems'
                        ? ['audio/*']
                        : watchedProductType === 'ebook'
                        ? ['.pdf', '.epub', '.mobi']
                        : watchedProductType === 'audiobook' || watchedProductType === 'podcast'
                        ? ['audio/*']
                        : ['*']
                    }
                    maxSize={500 * 1024 * 1024} // 500MB
                    onUploadComplete={(url, fileName) => {
                      setContentFile(new File([], fileName));
                    }}
                    onUploadError={(error) => {
                      toast({
                        title: "Błąd",
                        description: error,
                        variant: "destructive",
                      });
                    }}
                  />
                  {contentFile && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Wybrano: {contentFile.name}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            <div>
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  Wstecz
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
              >
                Anuluj
              </Button>
              
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                >
                  Dalej
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Tworzenie...' : 'Utwórz produkt'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
