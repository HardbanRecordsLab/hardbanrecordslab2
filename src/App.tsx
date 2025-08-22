import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

// Importuj komponenty z poprawnymi ścieżkami
import AppLayout from "@/components/AppLayout";
import Auth from "@/pages/Auth";
import LandingPage from "@/pages/LandingPage";
import NotFound from "@/pages/NotFound";
import AdminDashboard from "@/pages/AdminDashboard";
import ArtistDashboard from "@/pages/ArtistDashboard";
import AuthorDashboard from "@/pages/AuthorDashboard";
import InstructorDashboard from "@/pages/eLearning/InstructorDashboard"; // POPRAWIONA ŚCIEŻKA
import StudentDashboard from "@/pages/eLearning/StudentDashboard";   // POPRAWIONA ŚCIEŻKA
import AddNewRelease from "@/pages/AddNewRelease";

// Komponent do ochrony ścieżek
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Możesz tu wstawić spinner
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

// Komponent do wyboru dashboardu na podstawie roli
const RoleBasedDashboard = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Spinner na czas ładowania profilu
  }

  switch (profile?.role) {
    case "admin":
      return <Navigate to="/admin/dashboard" />;
    case "music_creator":
      return <Navigate to="/artist/dashboard" />;
    case "book_author":
      return <Navigate to="/author/dashboard" />;
    case "e-learning_instructor":
      return <Navigate to="/instructor/dashboard" />;
    case "e-learning_student":
      return <Navigate to="/student/dashboard" />;
    default:
      return <Navigate to="/" />; // Przekierowanie domyślne, jeśli rola nie pasuje
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Ścieżka główna po zalogowaniu */}
          <Route path="/dashboard" element={<ProtectedRoute><RoleBasedDashboard /></ProtectedRoute>} />

          {/* Chronione ścieżki z layoutem */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/artist/dashboard" element={<ArtistDashboard />} />
            <Route path="/author/dashboard" element={<AuthorDashboard />} />
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/add-new-release" element={<AddNewRelease />} />
            {/* Tutaj dodaj resztę chronionych ścieżek */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;