import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Search, Mail, Calendar, Shield } from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string
  role: 'artist' | 'author' | 'instructor' | 'student' | 'admin'
  created_at: string
  country?: string
  bio?: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, roleFilter])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data || [])
    } catch (error: any) {
      console.error('Error fetching users:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać listy użytkowników",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filterUsers = () => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    setFilteredUsers(filtered)
  }

  const updateUserRole = async (userId: string, newRole: 'artist' | 'author' | 'instructor' | 'student' | 'admin') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error

      toast({
        title: "Sukces",
        description: "Rola użytkownika została zaktualizowana"
      })

      // Refresh users list
      fetchUsers()
    } catch (error: any) {
      console.error('Error updating user role:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się zaktualizować roli użytkownika",
        variant: "destructive"
      })
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive'
      case 'instructor': return 'default'
      case 'artist': return 'secondary'
      case 'author': return 'outline'
      case 'student': return 'secondary'
      default: return 'outline'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator'
      case 'instructor': return 'Instruktor'
      case 'artist': return 'Artysta'
      case 'author': return 'Autor'
      case 'student': return 'Student'
      default: return role
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Zarządzanie Użytkownikami</h1>
          <p className="text-muted-foreground">
            Przeglądaj i zarządzaj wszystkimi użytkownikami platformy
          </p>
        </div>
      </div>

      {/* Filtry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Filtry i Wyszukiwanie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Szukaj po email lub nazwie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtruj po roli" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie role</SelectItem>
                <SelectItem value="admin">Administratorzy</SelectItem>
                <SelectItem value="instructor">Instruktorzy</SelectItem>
                <SelectItem value="artist">Artyści</SelectItem>
                <SelectItem value="author">Autorzy</SelectItem>
                <SelectItem value="student">Studenci</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista użytkowników */}
      <Card>
        <CardHeader>
          <CardTitle>Użytkownicy ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Lista wszystkich zarejestrowanych użytkowników
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Ładowanie...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Użytkownik</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rola</TableHead>
                  <TableHead>Kraj</TableHead>
                  <TableHead>Data rejestracji</TableHead>
                  <TableHead>Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.full_name || 'Brak nazwy'}</div>
                        {user.bio && (
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {user.bio}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {user.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {getRoleLabel(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.country || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(user.created_at).toLocaleDateString('pl-PL')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(newRole) => updateUserRole(user.id, newRole as 'artist' | 'author' | 'instructor' | 'student' | 'admin')}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="artist">Artysta</SelectItem>
                          <SelectItem value="author">Autor</SelectItem>
                          <SelectItem value="instructor">Instruktor</SelectItem>
                          <SelectItem value="admin">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Nie znaleziono użytkowników
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}