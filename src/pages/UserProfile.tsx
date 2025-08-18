import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function UserProfile() {
  const { user, profile } = useAuth()

  if (!user || !profile) {
    return <div>Loading...</div>
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
          <AvatarFallback>{getInitials(profile.full_name || user.email || 'U')}</AvatarFallback>
              </Avatar>
                <div>
          <h1 className="text-3xl font-bold">{profile.full_name || 'Użytkownik'}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <Badge className="mt-2 capitalize">{profile.role}</Badge>
                  </div>
                </div>
          <Card>
            <CardHeader>
          <CardTitle>Profil Użytkownika</CardTitle>
          <CardDescription>
            Zaktualizuj swoje dane osobowe i informacje profilowe.
          </CardDescription>
            </CardHeader>
        <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Imię i nazwisko</Label>
              <Input id="fullName" defaultValue={profile.full_name || ''} />
            </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} disabled />
            </div>
                </div>

                <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
              placeholder="Opowiedz coś o sobie..."
              defaultValue={profile.bio || ''}
              className="min-h-[100px]"
                />
              </div>

          <div className="space-y-2">
            <Label htmlFor="country">Kraj</Label>
            <Input id="country" defaultValue={profile.country || ''} placeholder="np. Polska" />
                </div>
          <div className="flex justify-end">
            <Button>Zapisz zmiany</Button>
                </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
          <CardTitle>Zmiana Hasła</CardTitle>
          <CardDescription>
            Zmień swoje hasło, aby zabezpieczyć konto.
          </CardDescription>
            </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Aktualne hasło</Label>
            <Input id="current-password" type="password" />
                    </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nowe hasło</Label>
            <Input id="new-password" type="password" />
                          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Potwierdź nowe hasło</Label>
            <Input id="confirm-password" type="password" />
                          </div>
          <div className="flex justify-end">
            <Button>Zmień hasło</Button>
                        </div>
            </CardContent>
          </Card>
                    </div>
  )
}
