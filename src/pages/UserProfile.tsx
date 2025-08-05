import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit3,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Star,
  Award,
  BookOpen,
  Download,
  Heart,
  Globe,
  Github,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    fullName: "Anna Kowalska",
    email: "anna.kowalska@example.com",
    phone: "+48 123 456 789",
    location: "Warszawa, Polska",
    bio: "Frontend Developer i mentor. Pasjonuję się nowoczesnymi technologiami webowymi, szczególnie React i TypeScript. Lubię dzielić się wiedzą i pomagać innym w rozwoju.",
    website: "https://annakowalska.dev",
    github: "annakowalska",
    twitter: "@annakowalska",
    linkedin: "anna-kowalska",
    instagram: "anna.codes"
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    showProgress: true
  });

  const userStats = {
    coursesCompleted: 12,
    certificatesEarned: 8,
    totalLearningTime: "156 godzin",
    averageRating: 4.8,
    reviewsGiven: 24,
    wishlistItems: 15
  };

  const recentActivity = [
    { type: "course_completed", title: "React Advanced Patterns", date: "2024-01-15", rating: 5 },
    { type: "certificate", title: "JavaScript Expert Certificate", date: "2024-01-12" },
    { type: "review", title: "Reviewed: TypeScript Masterclass", date: "2024-01-10", rating: 4 },
    { type: "purchase", title: "Node.js Backend Development", date: "2024-01-08" },
  ];

  const ownedCourses = [
    { 
      id: 1, 
      title: "React dla początkujących", 
      instructor: "Jan Kowalski", 
      progress: 100, 
      rating: 5, 
      completedDate: "2024-01-15",
      certificateUrl: "#"
    },
    { 
      id: 2, 
      title: "TypeScript Masterclass", 
      instructor: "Anna Nowak", 
      progress: 85, 
      rating: 4, 
      completedDate: null,
      certificateUrl: null
    },
    { 
      id: 3, 
      title: "Node.js Backend", 
      instructor: "Piotr Kowal", 
      progress: 45, 
      rating: null, 
      completedDate: null,
      certificateUrl: null
    },
  ];

  const wishlist = [
    { id: 1, title: "Vue.js Complete Guide", instructor: "Maria Jankowska", price: 149.99, rating: 4.7 },
    { id: 2, title: "Python dla Data Science", instructor: "Tomasz Nowak", price: 199.99, rating: 4.9 },
    { id: 3, title: "AWS Cloud Practitioner", instructor: "Katarzyna Kowal", price: 179.99, rating: 4.6 },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course_completed": return BookOpen;
      case "certificate": return Award;
      case "review": return Star;
      case "purchase": return Download;
      default: return BookOpen;
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Tu byłoby wywołanie API do zapisania danych
    console.log("Saving profile data:", profileData);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl">{profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Edit3 className="h-4 w-4 mr-2" />
                Zmień zdjęcie
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{profileData.fullName}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? "Zapisz" : "Edytuj profil"}
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Ustawienia
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground">{profileData.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{userStats.coursesCompleted}</div>
                  <div className="text-sm text-muted-foreground">Ukończone kursy</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{userStats.certificatesEarned}</div>
                  <div className="text-sm text-muted-foreground">Certyfikaty</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{userStats.totalLearningTime}</div>
                  <div className="text-sm text-muted-foreground">Czas nauki</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{userStats.averageRating}</div>
                  <div className="text-sm text-muted-foreground">Średnia ocena</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {profileData.github && (
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4" />
                  </Button>
                )}
                {profileData.twitter && (
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                )}
                {profileData.linkedin && (
                  <Button variant="outline" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                )}
                {profileData.website && (
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="courses">Moje kursy</TabsTrigger>
          <TabsTrigger value="wishlist">Lista życzeń</TabsTrigger>
          <TabsTrigger value="activity">Aktywność</TabsTrigger>
          <TabsTrigger value="settings">Ustawienia</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informacje osobiste</CardTitle>
              <CardDescription>Zarządzaj swoimi danymi osobowymi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Imię i nazwisko</Label>
                  <Input 
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input 
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Lokalizacja</Label>
                  <Input 
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Strona internetowa</Label>
                  <Input 
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input 
                    id="github"
                    value={profileData.github}
                    onChange={(e) => setProfileData({...profileData, github: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Moje kursy</CardTitle>
              <CardDescription>Przegląd ukończonych i aktualnych kursów</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ownedCourses.map((course) => (
                  <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Postęp</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        {course.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {course.progress === 100 && course.certificateUrl && (
                        <Button variant="outline" size="sm">
                          <Award className="h-4 w-4 mr-2" />
                          Certyfikat
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        {course.progress === 100 ? "Recenzja" : "Kontynuuj"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista życzeń</CardTitle>
              <CardDescription>Kursy które chcesz kupić w przyszłości</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.instructor}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-lg font-bold text-foreground ml-auto">{item.price} PLN</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm">Kup teraz</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ostatnia aktywność</CardTitle>
              <CardDescription>Twoja aktywność na platformie</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                      {activity.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{activity.rating}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Powiadomienia
              </CardTitle>
              <CardDescription>Zarządzaj swoimi preferencjami powiadomień</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Powiadomienia email</h4>
                  <p className="text-sm text-muted-foreground">Otrzymuj powiadomienia na email</p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Powiadomienia push</h4>
                  <p className="text-sm text-muted-foreground">Powiadomienia w przeglądarce</p>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Marketing</h4>
                  <p className="text-sm text-muted-foreground">Oferty specjalne i promocje</p>
                </div>
                <Switch 
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Prywatność
              </CardTitle>
              <CardDescription>Kontroluj widoczność swoich danych</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Publiczny profil</h4>
                  <p className="text-sm text-muted-foreground">Czy Twój profil ma być widoczny dla innych</p>
                </div>
                <Switch 
                  checked={privacy.profilePublic}
                  onCheckedChange={(checked) => setPrivacy({...privacy, profilePublic: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Pokaż email</h4>
                  <p className="text-sm text-muted-foreground">Czy inni mogą widzieć Twój email</p>
                </div>
                <Switch 
                  checked={privacy.showEmail}
                  onCheckedChange={(checked) => setPrivacy({...privacy, showEmail: checked})}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Pokaż postępy</h4>
                  <p className="text-sm text-muted-foreground">Czy inni mogą widzieć Twoje postępy w nauce</p>
                </div>
                <Switch 
                  checked={privacy.showProgress}
                  onCheckedChange={(checked) => setPrivacy({...privacy, showProgress: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Konto
              </CardTitle>
              <CardDescription>Zarządzaj swoim kontem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Metody płatności
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Zmień hasło
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Eksportuj dane
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                Usuń konto
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;