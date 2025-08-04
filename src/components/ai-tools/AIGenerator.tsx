import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Wand2,
  Image,
  Type,
  Music,
  Sparkles,
  Loader2,
  Copy,
  Download,
  RefreshCw,
  Coins
} from 'lucide-react';

interface AIRequest {
  id: string;
  request_type: string;
  input_data: any;
  output_data: any;
  status: string;
  credits_used: number;
  created_at: string;
  completed_at: string | null;
}

interface UserCredits {
  total_credits: number;
  used_credits: number;
  remaining_credits: number;
}

const aiTools = [
  {
    id: 'cover_generation',
    title: 'Generator okładek',
    description: 'Twórz profesjonalne okładki dla swoich produktów',
    icon: Image,
    credits: 10,
    category: 'graphics'
  },
  {
    id: 'description',
    title: 'Opis produktu',
    description: 'Generuj atrakcyjne opisy dla Twoich produktów',
    icon: Type,
    credits: 5,
    category: 'text'
  },
  {
    id: 'tags',
    title: 'Tagi i słowa kluczowe',
    description: 'Automatyczne tagowanie dla lepszej widoczności',
    icon: Sparkles,
    credits: 3,
    category: 'text'
  },
  {
    id: 'mastering',
    title: 'AI Mastering',
    description: 'Profesjonalny mastering Twoich utworów',
    icon: Music,
    credits: 15,
    category: 'audio'
  },
  {
    id: 'lyrics',
    title: 'Generator tekstów',
    description: 'Twórz kreatywne teksty piosenek',
    icon: Type,
    credits: 8,
    category: 'text'
  },
  {
    id: 'titles',
    title: 'Tytuły produktów',
    description: 'Generuj chwytliwe tytuły dla Twoich utworów',
    icon: Sparkles,
    credits: 3,
    category: 'text'
  }
];

export const AIGenerator: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string>('cover_generation');
  const [inputData, setInputData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<AIRequest[]>([]);
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCredits();
      fetchRequests();
    }
  }, [user]);

  const fetchCredits = async () => {
    try {
      const { data, error } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setCredits(data);
      } else {
        // Initialize credits for new user
        const { data: newCredits, error: initError } = await supabase
          .from('user_credits')
          .insert({
            user_id: user?.id,
            total_credits: 100,
            used_credits: 0
          })
          .select()
          .single();

        if (initError) throw initError;
        setCredits(newCredits);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('ai_requests')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const generateContent = async () => {
    const tool = aiTools.find(t => t.id === selectedTool);
    if (!tool || !user) return;

    if (!credits || credits.remaining_credits < tool.credits) {
      toast({
        title: "Niewystarczające kredyty",
        description: `Potrzebujesz ${tool.credits} kredytów do użycia tego narzędzia`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_requests')
        .insert({
          user_id: user.id,
          request_type: selectedTool,
          input_data: inputData,
          credits_used: tool.credits,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Update credits
      await supabase
        .from('user_credits')
        .update({
          used_credits: credits.used_credits + tool.credits
        })
        .eq('user_id', user.id);

      // Simulate AI processing (in real app, this would be done by background service)
      setTimeout(async () => {
        const mockOutput = generateMockOutput(selectedTool, inputData);
        
        await supabase
          .from('ai_requests')
          .update({
            output_data: mockOutput,
            status: 'completed',
            completed_at: new Date().toISOString()
          })
          .eq('id', data.id);

        toast({
          title: "Sukces!",
          description: "Treść została wygenerowana pomyślnie",
        });

        fetchCredits();
        fetchRequests();
      }, 3000);

      toast({
        title: "Przetwarzanie...",
        description: "Twoja treść jest generowana. To może potrwać kilka minut.",
      });

      fetchRequests();
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas generowania treści",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMockOutput = (type: string, input: any) => {
    switch (type) {
      case 'cover_generation':
        return {
          image_url: 'https://picsum.photos/512/512',
          variants: [
            'https://picsum.photos/512/512',
            'https://picsum.photos/512/512',
            'https://picsum.photos/512/512'
          ]
        };
      case 'description':
        return {
          description: `Odkryj niesamowity świat dźwięków w "${input.title || 'tym wyjątkowym utworze'}". To produkcja, która łączy nowoczesne brzmienia z ponadczasową melodią, tworząc niezapomniane doświadczenie muzyczne. Idealny dla fanów ${input.genre || 'dobrej muzyki'}.`,
          short_description: `Wyjątkowy utwór łączący ${input.genre || 'różne style'} w jedną harmonijną całość.`,
          keywords: ['muzyka', 'utwór', input.genre || 'soundtrack', 'audio', 'produkcja']
        };
      case 'tags':
        return {
          tags: ['ambient', 'chill', 'electronic', 'instrumental', 'mood', 'atmospheric'],
          seo_keywords: ['muzyka ambient', 'chill beats', 'relaksująca muzyka', 'tło muzyczne'],
          hashtags: ['#ambient', '#chillmusic', '#electronic', '#instrumental']
        };
      case 'titles':
        return {
          titles: [
            'Echoes of Tomorrow',
            'Digital Dreams',
            'Midnight Reflections',
            'Urban Landscapes',
            'Synthetic Emotions'
          ]
        };
      case 'lyrics':
        return {
          lyrics: `[Verse 1]
Walking through the city lights
Searching for something true
In this digital paradise
I'm looking for you

[Chorus]
We're living in electric dreams
Nothing's quite the way it seems
But together we can find our way
Through the noise of yesterday

[Verse 2]
Synthetic beats and neon glow
Paint the world in shades of blue
In this moment, here and now
I know that I found you`,
          structure: ['Verse 1', 'Chorus', 'Verse 2', 'Chorus', 'Bridge', 'Chorus']
        };
      default:
        return { result: 'Generated content' };
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Skopiowane!",
      description: "Treść została skopiowana do schowka",
    });
  };

  const renderToolInterface = () => {
    const tool = aiTools.find(t => t.id === selectedTool);
    if (!tool) return null;

    switch (selectedTool) {
      case 'cover_generation':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Tytuł produktu</label>
              <Input
                placeholder="Wpisz tytuł swojego produktu..."
                value={inputData.title || ''}
                onChange={(e) => setInputData({ ...inputData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Gatunek</label>
              <Select
                value={inputData.genre || ''}
                onValueChange={(value) => setInputData({ ...inputData, genre: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz gatunek" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="ambient">Ambient</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Styl wizualny</label>
              <Select
                value={inputData.style || ''}
                onValueChange={(value) => setInputData({ ...inputData, style: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz styl" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimalist">Minimalistyczny</SelectItem>
                  <SelectItem value="abstract">Abstrakcyjny</SelectItem>
                  <SelectItem value="photographic">Fotograficzny</SelectItem>
                  <SelectItem value="artistic">Artystyczny</SelectItem>
                  <SelectItem value="vintage">Vintage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Dodatkowe wskazówki</label>
              <Textarea
                placeholder="Opisz jak ma wyglądać okładka..."
                value={inputData.prompt || ''}
                onChange={(e) => setInputData({ ...inputData, prompt: e.target.value })}
              />
            </div>
          </div>
        );

      case 'description':
      case 'tags':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Tytuł produktu</label>
              <Input
                placeholder="Wpisz tytuł produktu..."
                value={inputData.title || ''}
                onChange={(e) => setInputData({ ...inputData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Gatunek/Kategoria</label>
              <Input
                placeholder="np. ambient, electronic, poradnik..."
                value={inputData.genre || ''}
                onChange={(e) => setInputData({ ...inputData, genre: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Dodatkowe informacje</label>
              <Textarea
                placeholder="Opisz swój produkt, nastrój, grupę docelową..."
                value={inputData.context || ''}
                onChange={(e) => setInputData({ ...inputData, context: e.target.value })}
              />
            </div>
          </div>
        );

      case 'lyrics':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Temat piosenki</label>
              <Input
                placeholder="O czym ma być piosenka?"
                value={inputData.theme || ''}
                onChange={(e) => setInputData({ ...inputData, theme: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Nastrój</label>
              <Select
                value={inputData.mood || ''}
                onValueChange={(value) => setInputData({ ...inputData, mood: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz nastrój" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="happy">Radosny</SelectItem>
                  <SelectItem value="melancholic">Melancholijny</SelectItem>
                  <SelectItem value="energetic">Energiczny</SelectItem>
                  <SelectItem value="romantic">Romantyczny</SelectItem>
                  <SelectItem value="introspective">Introspektywny</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Język</label>
              <Select
                value={inputData.language || 'pl'}
                onValueChange={(value) => setInputData({ ...inputData, language: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz język" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pl">Polski</SelectItem>
                  <SelectItem value="en">Angielski</SelectItem>
                  <SelectItem value="de">Niemiecki</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <label className="text-sm font-medium mb-2 block">Opis</label>
            <Textarea
              placeholder="Opisz co chcesz wygenerować..."
              value={inputData.description || ''}
              onChange={(e) => setInputData({ ...inputData, description: e.target.value })}
            />
          </div>
        );
    }
  };

  const renderRequestOutput = (request: AIRequest) => {
    if (!request.output_data) return null;

    switch (request.request_type) {
      case 'cover_generation':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <img
                src={request.output_data.image_url}
                alt="Generated cover"
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="space-y-2">
                <p className="text-sm font-medium">Warianty:</p>
                <div className="grid grid-cols-3 gap-2">
                  {request.output_data.variants?.map((url: string, idx: number) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Variant ${idx + 1}`}
                      className="w-full aspect-square object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button onClick={() => window.open(request.output_data.image_url, '_blank')}>
              <Download className="h-4 w-4 mr-2" />
              Pobierz
            </Button>
          </div>
        );

      case 'description':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Pełny opis:</label>
              <div className="mt-1 p-3 bg-muted rounded">
                <p className="text-sm">{request.output_data.description}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="mt-2"
                onClick={() => copyToClipboard(request.output_data.description)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Skopiuj
              </Button>
            </div>
            <div>
              <label className="text-sm font-medium">Krótki opis:</label>
              <div className="mt-1 p-3 bg-muted rounded">
                <p className="text-sm">{request.output_data.short_description}</p>
              </div>
            </div>
          </div>
        );

      case 'tags':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Tagi:</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {request.output_data.tags?.map((tag: string, idx: number) => (
                  <Badge key={idx} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Hashtagi:</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {request.output_data.hashtags?.map((tag: string, idx: number) => (
                  <Badge key={idx} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 'lyrics':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Tekst piosenki:</label>
              <div className="mt-1 p-4 bg-muted rounded font-mono text-sm whitespace-pre-line">
                {request.output_data.lyrics}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="mt-2"
                onClick={() => copyToClipboard(request.output_data.lyrics)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Skopiuj tekst
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-3 bg-muted rounded">
            <pre className="text-sm">{JSON.stringify(request.output_data, null, 2)}</pre>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Credits */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Narzędzia AI</h2>
          <p className="text-muted-foreground">
            Wykorzystaj sztuczną inteligencję do tworzenia treści
          </p>
        </div>
        
        {credits && (
          <Card className="w-48">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="font-semibold">{credits.remaining_credits}</div>
                  <div className="text-xs text-muted-foreground">kredytów pozostało</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs defaultValue="generator" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="history">Historia</TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tool Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Wybierz narzędzie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {aiTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={tool.id}
                      className={`p-3 rounded cursor-pointer transition-all ${
                        selectedTool === tool.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedTool(tool.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{tool.title}</div>
                          <div className="text-xs opacity-80">{tool.description}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Coins className="h-3 w-3" />
                            <span className="text-xs">{tool.credits} kredytów</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Input Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  {aiTools.find(t => t.id === selectedTool)?.title}
                </CardTitle>
                <CardDescription>
                  {aiTools.find(t => t.id === selectedTool)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderToolInterface()}
                
                <Button
                  onClick={generateContent}
                  disabled={loading || !credits || credits.remaining_credits < (aiTools.find(t => t.id === selectedTool)?.credits || 0)}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generowanie...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generuj ({aiTools.find(t => t.id === selectedTool)?.credits} kredytów)
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Historia generowania</h3>
            <Button variant="outline" onClick={fetchRequests}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Odśwież
            </Button>
          </div>

          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">
                        {aiTools.find(t => t.id === request.request_type)?.title || request.request_type}
                      </CardTitle>
                      <CardDescription>
                        {new Date(request.created_at).toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          request.status === 'completed' ? 'default' :
                          request.status === 'failed' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {request.status === 'completed' ? 'Ukończone' :
                         request.status === 'failed' ? 'Błąd' :
                         request.status === 'processing' ? 'Przetwarzanie' :
                         'Oczekuje'}
                      </Badge>
                      <Badge variant="outline">
                        {request.credits_used} kredytów
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                {request.status === 'completed' && (
                  <CardContent>
                    {renderRequestOutput(request)}
                  </CardContent>
                )}
              </Card>
            ))}

            {requests.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Nie masz jeszcze żadnych wygenerowanych treści
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};