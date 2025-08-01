import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage";
import ArtistDashboard from "./pages/ArtistDashboard";
import ArtistDistribution from "./pages/ArtistDistribution";
import ArtistContentId from "./pages/ArtistContentId";
import ArtistRights from "./pages/ArtistRights";
import ArtistPromotion from "./pages/ArtistPromotion";
import ArtistCollaborationReal from "./pages/ArtistCollaborationReal";
import ArtistAITools from "./pages/ArtistAITools";
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
import AdminDashboard from "./pages/AdminDashboard";
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
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/artist" element={
              <ProtectedRoute allowedRoles={['artist']}>
                <AppLayout><ArtistDashboard /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/artist/distribution" element={
              <ProtectedRoute allowedRoles={['artist']}>
                <AppLayout><ArtistDistribution /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/artist/content-id" element={
              <ProtectedRoute allowedRoles={['artist']}>
                <AppLayout><ArtistContentId /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/artist/rights" element={
              <ProtectedRoute allowedRoles={['artist']}>
                <AppLayout><ArtistRights /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/artist/promotion" element={
              <ProtectedRoute allowedRoles={['artist']}>
                <AppLayout><ArtistPromotion /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/artist/collaboration" element={
              <ProtectedRoute allowedRoles={['artist']}>
                <AppLayout><ArtistCollaborationReal /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/artist/ai-tools" element={
              <ProtectedRoute allowedRoles={['artist']}>
                <AppLayout><ArtistAITools /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/author" element={
              <ProtectedRoute allowedRoles={['author']}>
                <AppLayout><AuthorDashboard /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/author/distribution" element={
              <ProtectedRoute allowedRoles={['author']}>
                <AppLayout><AuthorDistribution /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/author/copyright" element={
              <ProtectedRoute allowedRoles={['author']}>
                <AppLayout><AuthorCopyright /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/author/rights" element={
              <ProtectedRoute allowedRoles={['author']}>
                <AppLayout><AuthorRights /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/author/promotion" element={
              <ProtectedRoute allowedRoles={['author']}>
                <AppLayout><AuthorPromotion /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/author/analytics" element={
              <ProtectedRoute allowedRoles={['author']}>
                <AppLayout><AuthorAnalytics /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/author/collaboration" element={
              <ProtectedRoute allowedRoles={['author']}>
                <AppLayout><AuthorCollaboration /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/author/ai-tools" element={
              <ProtectedRoute allowedRoles={['author']}>
                <AppLayout><AuthorAITools /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/instructor" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <AppLayout><InstructorDashboard /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/instructor/course-creation" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <AppLayout><CourseCreation /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/instructor/interactive-lessons" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <AppLayout><InteractiveLessons /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/instructor/quiz-system" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <AppLayout><QuizSystem /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/instructor/ai-generator" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <AppLayout><AIGenerator /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/instructor/certificates" element={
              <ProtectedRoute allowedRoles={['instructor']}>
                <AppLayout><CertificateSystem /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/student" element={
              <ProtectedRoute allowedRoles={['student']}>
                <AppLayout><StudentDashboard /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AppLayout><AdminDashboard /></AppLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
