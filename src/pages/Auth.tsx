import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Music, BookOpen, GraduationCap, User } from 'lucide-react'
import { toast } from 'sonner'

export default function Auth() {
  const { user, signIn, signUp, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'artist' | 'author' | 'instructor' | 'student' | 'admin'>('artist')

  // If user is already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (user && !loading) {
      // Redirect will happen automatically via Navigate component below
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        setError(error.message)
        toast.error('Błąd logowania: ' + error.message)
      } else {
        toast.success('Zalogowano pomyślnie!')
      }
    } catch (err: any) {
      setError('Wystąpił nieoczekiwany błąd')
      toast.error('Wystąpił nieoczekiwany błąd')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Hasła nie są zgodne')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await signUp(email, password, {
        full_name: fullName,
        role: role
      })
      
      if (error) {
        if (error.message.includes('already registered')) {
          setError('Użytkownik o tym adresie email już istnieje')
        } else {
          setError(error.message)
        }
        toast.error('Błąd rejestracji: ' + error.message)
      } else {
        toast.success('Konto zostało utworzone! Sprawdź email aby potwierdzić konto.')
      }
    } catch (err: any) {
      setError('Wystąpił nieoczekiwany błąd')
      toast.error('Wystąpił nieoczekiwany błąd')
    } finally {
      setIsLoading(false)
    }
  }

  const getRoleInfo = (roleValue: string) => {
    switch (roleValue) {
      case 'artist':
        return { icon: Music, label: 'Artysta', description: 'Twórz i publikuj muzykę' }
      case 'author':
        return { icon: BookOpen, label: 'Autor', description: 'Publikuj książki i treści' }
      case 'instructor':
        return { icon: GraduationCap, label: 'Instruktor', description: 'Twórz kursy online' }
      case 'student':
        return { icon: User, label: 'Student', description: 'Ucz się i rozwijaj' }
      case 'admin':
        return { icon: User, label: 'Administrator', description: 'Zarządzaj platformą' }
      default:
        return { icon: User, label: 'Użytkownik', description: '' }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">HardbanRecords Lab</h1>
          <p className="text-muted-foreground mt-2">Platforma dla twórców</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Witamy!</CardTitle>
            <CardDescription>
              Zaloguj się do swojego konta lub utwórz nowe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Logowanie</TabsTrigger>
                <TabsTrigger value="signup">Rejestracja</TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="twoj@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Hasło</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Zaloguj się
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Imię i nazwisko</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Jan Kowalski"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="twoj@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rola</Label>
                    <Select value={role} onValueChange={(value: any) => setRole(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz swoją rolę" />
                      </SelectTrigger>
                      <SelectContent>
                        {(['artist', 'author', 'instructor', 'student', 'admin'] as const).map((roleOption) => {
                          const roleInfo = getRoleInfo(roleOption)
                          const Icon = roleInfo.icon
                          return (
                            <SelectItem key={roleOption} value={roleOption}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                <div>
                                  <div className="font-medium">{roleInfo.label}</div>
                                  <div className="text-xs text-muted-foreground">{roleInfo.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Hasło</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Potwierdź hasło</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Utwórz konto
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>Tworząc konto akceptujesz nasze warunki użytkowania</p>
        </div>
      </div>
    </div>
  )
}