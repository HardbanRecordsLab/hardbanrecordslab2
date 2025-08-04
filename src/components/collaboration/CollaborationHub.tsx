import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Users,
  Plus,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Music,
  Book,
  GraduationCap,
  Search,
  Filter,
  MessageCircle,
  Star
} from 'lucide-react';

interface CollaborationRequest {
  id: string;
  project_id: string;
  collaborator_id: string;
  role: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  project: {
    title: string;
    type: string;
    description: string;
    user_id: string;
  };
  collaborator: {
    full_name: string;
    avatar_url: string;
    bio: string;
  };
}

interface OpenCollaboration {
  id: string;
  title: string;
  description: string;
  type: string;
  roles_needed: string[];
  budget?: number;
  deadline?: string;
  user: {
    full_name: string;
    avatar_url: string;
    role: string;
  };
  created_at: string;
}

const roleOptions = [
  { value: 'vocalist', label: 'Wokalista/ka' },
  { value: 'producer', label: 'Producent' },
  { value: 'songwriter', label: 'Autor tekstów' },
  { value: 'musician', label: 'Muzyk' },
  { value: 'mixer', label: 'Mix engineer' },
  { value: 'editor', label: 'Redaktor' },
  { value: 'illustrator', label: 'Ilustrator' },
  { value: 'translator', label: 'Tłumacz' },
  { value: 'instructor', label: 'Instruktor' },
  { value: 'content_creator', label: 'Twórca treści' },
];

export const CollaborationHub: React.FC = () => {
  const [collaborations, setCollaborations] = useState<OpenCollaboration[]>([]);
  const [myRequests, setMyRequests] = useState<CollaborationRequest[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<CollaborationRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const [newCollab, setNewCollab] = useState({
    title: '',
    description: '',
    type: 'music',
    roles_needed: [] as string[],
    budget: '',
    deadline: '',
  });

  useEffect(() => {
    if (user) {
      fetchCollaborations();
      fetchMyRequests();
      fetchReceivedRequests();
    }
  }, [user]);

  const fetchCollaborations = async () => {
    try {
      // Simplified query without foreign key relationships for now
      const { data, error } = await supabase
        .from('digital_products')
        .select('*')
        .eq('status', 'draft')
        .neq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Mock data for demonstration
      const mockCollabs: OpenCollaboration[] = [
        {
          id: '1',
          title: 'Ambient EP - Szukam wokalisty',
          description: 'Tworzę ambient EP i szukam wokalisty do dodania atmosferycznych partii wokalnych',
          type: 'music',
          roles_needed: ['vocalist', 'songwriter'],
          budget: 500,
          user: {
            full_name: 'Jan Kowalski',
            avatar_url: '',
            role: 'artist'
          },
          created_at: new Date().toISOString()
        }
      ];

      setCollaborations(mockCollabs);
    } catch (error) {
      console.error('Error fetching collaborations:', error);
    }
  };

  const fetchMyRequests = async () => {
    try {
      // Simplified for now - would need proper foreign key setup
      setMyRequests([]);
    } catch (error) {
      console.error('Error fetching my requests:', error);
    }
  };

  const fetchReceivedRequests = async () => {
    try {
      // Simplified for now - would need proper foreign key setup
      setReceivedRequests([]);
    } catch (error) {
      console.error('Error fetching received requests:', error);
    }
  };

  const createCollaboration = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('digital_products')
        .insert({
          user_id: user.id,
          title: newCollab.title,
          description: newCollab.description,
          product_type: newCollab.type as any,
          status: 'draft',
          metadata: {
            seeking_collaboration: true,
            roles_needed: newCollab.roles_needed,
            budget: newCollab.budget ? parseFloat(newCollab.budget) : null,
            deadline: newCollab.deadline || null,
          }
        });

      if (error) throw error;

      toast({
        title: "Sukces!",
        description: "Ogłoszenie o współpracy zostało opublikowane",
      });

      setShowCreateDialog(false);
      setNewCollab({
        title: '',
        description: '',
        type: 'music',
        roles_needed: [],
        budget: '',
        deadline: '',
      });
      
      fetchCollaborations();
    } catch (error) {
      console.error('Error creating collaboration:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas tworzenia ogłoszenia",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendCollaborationRequest = async (projectId: string, role: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('collaborations')
        .insert({
          project_id: projectId,
          collaborator_id: user.id,
          role: role,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Sukces!",
        description: "Prośba o współpracę została wysłana",
      });

      fetchMyRequests();
    } catch (error) {
      console.error('Error sending collaboration request:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas wysyłania prośby",
        variant: "destructive",
      });
    }
  };

  const respondToRequest = async (requestId: string, status: 'accepted' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('collaborations')
        .update({ status })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Sukces!",
        description: `Prośba została ${status === 'accepted' ? 'zaakceptowana' : 'odrzucona'}`,
      });

      fetchReceivedRequests();
    } catch (error) {
      console.error('Error responding to request:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas odpowiadania na prośbę",
        variant: "destructive",
      });
    }
  };

  const toggleRole = (role: string) => {
    setNewCollab(prev => ({
      ...prev,
      roles_needed: prev.roles_needed.includes(role)
        ? prev.roles_needed.filter(r => r !== role)
        : [...prev.roles_needed, role]
    }));
  };

  const filteredCollaborations = collaborations.filter(collab => {
    const matchesSearch = collab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collab.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || collab.type === filterType;
    const matchesRole = filterRole === 'all' || collab.roles_needed.includes(filterRole);
    
    return matchesSearch && matchesType && matchesRole;
  });

  const getProductTypeIcon = (type: string) => {
    switch (type) {
      case 'music':
      case 'beat':
      case 'sample_pack':
        return Music;
      case 'ebook':
      case 'audiobook':
        return Book;
      case 'course':
        return GraduationCap;
      default:
        return Music;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hub współpracy</h2>
          <p className="text-muted-foreground">
            Znajdź współpracowników i dołącz do projektów
          </p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nowe ogłoszenie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Utwórz ogłoszenie o współpracy</DialogTitle>
              <DialogDescription>
                Opisz swój projekt i role, których szukasz
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Tytuł projektu</label>
                <Input
                  placeholder="Wpisz tytuł swojego projektu..."
                  value={newCollab.title}
                  onChange={(e) => setNewCollab({ ...newCollab, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Typ projektu</label>
                <Select
                  value={newCollab.type}
                  onValueChange={(value) => setNewCollab({ ...newCollab, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Muzyka</SelectItem>
                    <SelectItem value="ebook">E-book</SelectItem>
                    <SelectItem value="audiobook">Audiobook</SelectItem>
                    <SelectItem value="course">Kurs</SelectItem>
                    <SelectItem value="podcast">Podcast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Opis projektu</label>
                <Textarea
                  placeholder="Opisz swój projekt, cele i wizję..."
                  className="min-h-[100px]"
                  value={newCollab.description}
                  onChange={(e) => setNewCollab({ ...newCollab, description: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Potrzebne role</label>
                <div className="flex flex-wrap gap-2">
                  {roleOptions.map((role) => (
                    <Badge
                      key={role.value}
                      variant={newCollab.roles_needed.includes(role.value) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleRole(role.value)}
                    >
                      {role.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Budżet (PLN, opcjonalnie)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newCollab.budget}
                    onChange={(e) => setNewCollab({ ...newCollab, budget: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Deadline (opcjonalnie)</label>
                  <Input
                    type="date"
                    value={newCollab.deadline}
                    onChange={(e) => setNewCollab({ ...newCollab, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Anuluj
                </Button>
                <Button onClick={createCollaboration} disabled={loading}>
                  {loading ? 'Tworzenie...' : 'Opublikuj ogłoszenie'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Przeglądaj projekty</TabsTrigger>
          <TabsTrigger value="my-requests">Moje prośby</TabsTrigger>
          <TabsTrigger value="received">Otrzymane prośby</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Szukaj projektów..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie typy</SelectItem>
                    <SelectItem value="music">Muzyka</SelectItem>
                    <SelectItem value="ebook">E-book</SelectItem>
                    <SelectItem value="course">Kursy</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie role</SelectItem>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Collaborations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollaborations.map((collab) => {
              const TypeIcon = getProductTypeIcon(collab.type);
              
              return (
                <Card key={collab.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-5 w-5 text-primary" />
                        <Badge variant="outline">{collab.type}</Badge>
                      </div>
                      {collab.budget && (
                        <Badge variant="secondary">{collab.budget} PLN</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{collab.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {collab.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={collab.user.avatar_url} />
                        <AvatarFallback>
                          {collab.user.full_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">{collab.user.full_name}</div>
                        <div className="text-muted-foreground capitalize">{collab.user.role}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Potrzebne role:</div>
                      <div className="flex flex-wrap gap-1">
                        {collab.roles_needed.map((role) => (
                          <Badge key={role} variant="outline" className="text-xs">
                            {roleOptions.find(r => r.value === role)?.label || role}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {collab.deadline && (
                      <div className="text-sm text-muted-foreground">
                        Deadline: {new Date(collab.deadline).toLocaleDateString()}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Szczegóły
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{collab.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p>{collab.description}</p>
                            <div>
                              <h4 className="font-medium mb-2">Potrzebne role:</h4>
                              <div className="flex flex-wrap gap-2">
                                {collab.roles_needed.map((role) => (
                                  <Badge key={role} variant="outline">
                                    {roleOptions.find(r => r.value === role)?.label || role}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Select onValueChange={(role) => sendCollaborationRequest(collab.id, role)}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Aplikuj" />
                        </SelectTrigger>
                        <SelectContent>
                          {collab.roles_needed.map((role) => (
                            <SelectItem key={role} value={role}>
                              {roleOptions.find(r => r.value === role)?.label || role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredCollaborations.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nie znaleziono projektów pasujących do Twoich kryteriów</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-4">
          {myRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{request.project?.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Rola: {roleOptions.find(r => r.value === request.role)?.label || request.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Wysłano: {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(request.status)} text-white`}
                  >
                    {request.status === 'pending' ? 'Oczekuje' :
                     request.status === 'accepted' ? 'Zaakceptowane' :
                     'Odrzucone'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}

          {myRequests.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Nie wysłałeś jeszcze żadnych próśb o współpracę
            </div>
          )}
        </TabsContent>

        <TabsContent value="received" className="space-y-4">
          {receivedRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={request.collaborator?.avatar_url} />
                      <AvatarFallback>
                        {request.collaborator?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{request.collaborator?.full_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Chce dołączyć jako: {roleOptions.find(r => r.value === request.role)?.label || request.role}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Projekt: {request.project?.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(request.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => respondToRequest(request.id, 'accepted')}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Akceptuj
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => respondToRequest(request.id, 'rejected')}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Odrzuć
                      </Button>
                    </div>
                  )}

                  {request.status !== 'pending' && (
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(request.status)} text-white`}
                    >
                      {request.status === 'accepted' ? 'Zaakceptowane' : 'Odrzucone'}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {receivedRequests.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Nie masz jeszcze żadnych próśb o współpracę
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};