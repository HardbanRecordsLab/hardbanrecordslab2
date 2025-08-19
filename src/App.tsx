// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleProtectedRoute } from "@/components/RoleProtectedRoute";
import AppLayout from "../AppLayout"; // <--- OSTATECZNA POPRAWKA IMPORTU

// Importy wszystkich stron (bez zmian)
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage";
import ArtistDashboard from "./pages/ArtistDashboard";
import AuthorDashboard from "./pages/AuthorDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import MusicPublishing from "./pages/MusicPublishing";
import DigitalPublishing from "./pages/DigitalPublishing";
import ELearningPlatform from "./pages/ELearningPlatform";
import MarketplaceBrowse from "./pages/MarketplaceBrowse";
import ProductDetails from "./pages/ProductDetails";
import UserProfile from "./pages/UserProfile";
import PaymentHistory from "./pages/PaymentHistory";
import SubscriptionManagement from "./pages/SubscriptionManagement";

// Admin pages
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminMusicProjects from "./pages/Admin/AdminMusicProjects";
import AdminDigitalPublications from "./pages/Admin/AdminDigitalPublications";
import AdminCourses from "./pages/Admin/AdminCourses";
import AdminAnalytics from "./pages/Admin/AdminAnalytics";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminDatabase from "./pages/Admin/AdminDatabase";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationsProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<LandingPage />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  {/* Protected routes for all authenticated users */}
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/payment-history" element={<PaymentHistory />} />
                  <Route path="/subscription" element={<SubscriptionManagement />} />
                  <Route path="/marketplace" element={<MarketplaceBrowse />} />
                  <Route path="/product/:id" element={<ProductDetails />} />

                  {/* Role-specific protected routes */}
                  <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/music-projects" element={<AdminMusicProjects />} />
                    <Route path="/admin/digital-publications" element={<AdminDigitalPublications />} />
                    <Route path="/admin/courses" element={<AdminCourses />} />
                    <Route path="/admin/analytics" element={<AdminAnalytics />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                    <Route path="/admin/database" element={<AdminDatabase />} />
                  </Route>

                  <Route element={<RoleProtectedRoute allowedRoles={["artist"]} />}>
                    <Route path="/artist" element={<ArtistDashboard />} />
                    <Route path="/artist/music-publishing" element={<MusicPublishing />} />
                    {/* Add other artist-specific routes here */}
                  </Route>

                  <Route element={<RoleProtectedRoute allowedRoles={["author"]} />}>
                    <Route path="/author" element={<AuthorDashboard />} />
                    <Route path="/author/digital-publishing" element={<DigitalPublishing />} />
                    {/* Add other author-specific routes here */}
                  </Route>

                  <Route element={<RoleProtectedRoute allowedRoles={["instructor"]} />}>
                    <Route path="/instructor" element={<InstructorDashboard />} />
                    <Route path="/instructor/e-learning" element={<ELearningPlatform />} />
                    {/* Add other instructor-specific routes here */}
                  </Route>

                  <Route element={<RoleProtectedRoute allowedRoles={["student"]} />}>
                    <Route path="/student" element={<StudentDashboard />} />
                    {/* Add other student-specific routes here */}
                  </Route>
                </Route>
              </Route>

              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        <Toaster />
        <Sonner />
      </NotificationsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;