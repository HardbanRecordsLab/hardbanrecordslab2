// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";

// Importy wszystkich stron (bez zmian)
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage";
import ArtistDashboard from "./pages/ArtistDashboard";
import ArtistDistribution from "./pages/ArtistDistribution";
import ArtistContentId from "./pages/ArtistContentId";
import ArtistRights from "./pages/ArtistRights";
import ArtistPromotion from "./pages/ArtistPromotion";
import ArtistCollaborationReal from "./pages/ArtistCollaborationReal";
import ArtistAITools from "./pages/ArtistAITools";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminMusicProjects from "./pages/AdminMusicProjects";
import AdminDigitalPublications from "./pages/AdminDigitalPublications";
import AdminCourses from "./pages/AdminCourses";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";
import AdminDatabase from "./pages/AdminDatabase";
import AuthorDashboard from "./pages/AuthorDashboard";
import AuthorDistribution from "./pages/AuthorDistribution";
import AuthorCopyright from "./pages/AuthorCopyright";
import AuthorRights from "./pages/AuthorRights";
import AuthorPromotion from "./pages/AuthorPromotion";
import AuthorAnalytics from "./pages/AuthorAnalytics";
import AuthorCollaboration from "./pages/AuthorCollaboration";
import AuthorAITools from "./pages/AuthorAITools";
import InstructorDashboard from "./pages/eLearning/InstructorDashboard";
import CourseCreation from "./pages/eLearning/CourseCreation";
import InteractiveLessons from "./pages/eLearning/InteractiveLessons";
import QuizSystem from "./pages/eLearning/QuizSystem";
import AIGenerator from "./pages/eLearning/AIGenerator";
import CertificateSystem from "./pages/eLearning/CertificateSystem";
import StudentDashboard from "./pages/eLearning/StudentDashboard";
import MyCoursesPage from './pages/eLearning/MyCoursesPage';
import MusicPublishing from "./pages/MusicPublishing";
import DigitalPublishing from "./pages/DigitalPublishing";
import ELearningPlatform from "./pages/ELearningPlatform";
import MarketplaceBrowse from "./pages/MarketplaceBrowse";
import ProductDetails from "./pages/ProductDetails";
import UserProfile from "./pages/UserProfile";
import PaymentHistory from "./pages/PaymentHistory";
import SubscriptionManagement from "./pages/SubscriptionManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* === TRASY PUBLICZNE === */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<LandingPage />} />

            {/* === NOWA, UPROSZCZONA STRUKTURA TRAS CHRONIONYCH === */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* Trasy Artysty */}
              <Route path="/artist" element={<ArtistDashboard />} />
              <Route path="/artist/distribution" element={<ArtistDistribution />} />
              <Route path="/artist/content-id" element={<ArtistContentId />} />
              <Route path="/artist/rights" element={<ArtistRights />} />
              <Route path="/artist/promotion" element={<ArtistPromotion />} />
              <Route path="/artist/collaboration" element={<ArtistCollaborationReal />} />
              <Route path="/artist/ai-tools" element={<ArtistAITools />} />

              {/* Trasy Autora */}
              <Route path="/author" element={<AuthorDashboard />} />
              <Route path="/author/distribution" element={<AuthorDistribution />} />
              <Route path="/author/copyright" element={<AuthorCopyright />} />
              <Route path="/author/rights" element={<AuthorRights />} />
              <Route path="/author/promotion" element={<AuthorPromotion />} />
              <Route path="/author/analytics" element={<AuthorAnalytics />} />
              <Route path="/author/collaboration" element={<AuthorCollaboration />} />
              <Route path="/author/ai-tools" element={<AuthorAITools />} />

              {/* Trasy Instruktora */}
              <Route path="/instructor" element={<InstructorDashboard />} />
              <Route path="/instructor/course-creation" element={<CourseCreation />} />
              <Route path="/instructor/interactive-lessons" element={<InteractiveLessons />} />
              <Route path="/instructor/quiz-system" element={<QuizSystem />} />
              <Route path="/instructor/ai-generator" element={<AIGenerator />} />
              <Route path="/instructor/certificates" element={<CertificateSystem />} />

              {/* Trasy Studenta */}
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/my-courses" element={<MyCoursesPage />} />

              {/* Trasy Admina */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/music-projects" element={<AdminMusicProjects />} />
              <Route path="/admin/digital-publications" element={<AdminDigitalPublications />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/database" element={<AdminDatabase />} />

              {/* Trasy Główne */}
              <Route path="/music-publishing" element={<MusicPublishing />} />
              <Route path="/digital-publishing" element={<DigitalPublishing />} />
              <Route path="/e-learning" element={<ELearningPlatform />} />
              <Route path="/marketplace" element={<MarketplaceBrowse />} />
              <Route path="/product/:id" element={<ProductDetails />} />

              {/* Trasy Profilu Użytkownika */}
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/payments" element={<PaymentHistory />} />
              <Route path="/subscription" element={<SubscriptionManagement />} />
            </Route>

            {/* === STRONA 404 === */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;