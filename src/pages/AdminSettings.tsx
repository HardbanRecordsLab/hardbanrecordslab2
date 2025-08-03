
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Save, Users, Music, BookOpen, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    autoApproveMusic: false,
    autoApproveBooks: false,
    maxFileSize: 100,
    allowedAudioFormats: "mp3,wav,flac",
    allowedBookFormats: "pdf,epub,docx",
    platformCommission: 15
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleSave = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          user_id: user?.id,
          permissions: {
            auto_approve_music: settings.autoApproveMusic,
            auto_approve_books: settings.autoApproveBooks,
            max_file_size: settings.maxFileSize,
            allowed_audio_formats: settings.allowedAudioFormats.split(','),
            allowed_book_formats: settings.allowedBookFormats.split(','),
            platform_commission: settings.platformCommission
          }
        })

      if (error) throw error

      toast({
        title: "Sukces",
        description: "Ustawienia zostały zapisane"
      })
    } catch (error: any) {
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać ustawień",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="w-8 h-8" />
            Ustawienia Systemu
          </h1>
          <p className="text-muted-foreground">
            Zarządzanie konfiguracją platformy HardbanRecords Lab
          </p>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          Zapisz Ustawienia
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Ogólne</TabsTrigger>
          <TabsTrigger value="music">Muzyka</TabsTrigger>
          <TabsTrigger value="books">Książki</TabsTrigger>
          <TabsTrigger value="courses">Kursy</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Ustawienia Ogólne</CardTitle>
              <CardDescription>
                Podstawowa konfiguracja platformy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-approve-music">Automatyczna akceptacja muzyki</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatycznie akceptuj nowe wydania muzyczne
                  </p>
                </div>
                <Switch
                  id="auto-approve-music"
                  checked={settings.autoApproveMusic}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, autoApproveMusic: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-approve-books">Automatyczna akceptacja książek</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatycznie akceptuj nowe publikacje cyfrowe
                  </p>
                </div>
                <Switch
                  id="auto-approve-books"
                  checked={settings.autoApproveBooks}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, autoApproveBooks: checked }))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="commission">Komisja platformy (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  value={settings.platformCommission}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, platformCommission: Number(e.target.value) }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="music">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="w-5 h-5" />
                Ustawienia Muzyki
              </CardTitle>
              <CardDescription>
                Konfiguracja dla projektów muzycznych
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="audio-formats">Dozwolone formaty audio</Label>
                <Input
                  id="audio-formats"
                  value={settings.allowedAudioFormats}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, allowedAudioFormats: e.target.value }))
                  }
                  placeholder="mp3,wav,flac"
                />
                <p className="text-sm text-muted-foreground">
                  Oddziel formaty przecinkami
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="max-file-size">Maksymalny rozmiar pliku (MB)</Label>
                <Input
                  id="max-file-size"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, maxFileSize: Number(e.target.value) }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="books">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Ustawienia Publikacji Cyfrowych
              </CardTitle>
              <CardDescription>
                Konfiguracja dla publikacji cyfrowych
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="book-formats">Dozwolone formaty publikacji</Label>
                <Input
                  id="book-formats"
                  value={settings.allowedBookFormats}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, allowedBookFormats: e.target.value }))
                  }
                  placeholder="pdf,epub,docx"
                />
                <p className="text-sm text-muted-foreground">
                  Oddziel formaty przecinkami
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Ustawienia Kursów
              </CardTitle>
              <CardDescription>
                Konfiguracja dla kursów eLearning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ustawienia kursów będą dostępne wkrótce
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
