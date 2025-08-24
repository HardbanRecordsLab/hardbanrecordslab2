// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import stron
import AppLayout from './components/AppLayout';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

// Import paneli dla ról
import ArtistDashboard from './pages/ArtistDashboard';
import AuthorDashboard from './pages/AuthorDashboard';
import InstructorDashboard from './pages/eLearning/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { isLoading } = useAuth();

  // Wyświetlamy loader, dopóki sprawdzamy stan uwierzytelnienia
  if (isLoading) {
    return <div>Loading...</div>; // Możesz tu wstawić ładniejszy komponent spinnera
  }

  return (
    <Routes>
      {/* Trasy publiczne */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />

      {/* Trasy chronione zagnieżdżone w AppLayout */}
      <Route 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Przekierowanie bazowe po zalogowaniu */}
        <Route path="/dashboard" element={<Navigate to="/" />} /> 

        {/* Trasy dla Twórcy Muzycznego */}
        <Route path="/artist/dashboard" element={<ArtistDashboard />} />
        {/* Dodaj tutaj inne trasy dla artysty, np. /artist/releases/:id */}

        {/* Trasy dla Autora */}
        <Route path="/author/dashboard" element={<AuthorDashboard />} />
        {/* Dodaj tutaj inne trasy dla autora */}

        {/* Trasy dla Instruktora */}
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        {/* Dodaj tutaj inne trasy dla instruktora */}

        {/* Trasy dla Administratora */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Dodaj tutaj inne trasy dla admina */}
      </Route>

      {/* Strona 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;