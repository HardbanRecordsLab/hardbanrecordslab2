import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import LandingPage from "./pages/LandingPage";
import ArtistDashboard from "./pages/ArtistDashboard";
import ArtistDistribution from "./pages/ArtistDistribution";
import ArtistContentId from "./pages/ArtistContentId";
import ArtistRights from "./pages/ArtistRights";
import ArtistPromotion from "./pages/ArtistPromotion";
import ArtistCollaboration from "./pages/ArtistCollaboration";
import ArtistAITools from "./pages/ArtistAITools";
import AuthorDashboard from "./pages/AuthorDashboard";
import AuthorDistribution from "./pages/AuthorDistribution";
import AuthorCopyright from "./pages/AuthorCopyright";
import AuthorRights from "./pages/AuthorRights";
import AuthorPromotion from "./pages/AuthorPromotion";
import AuthorAnalytics from "./pages/AuthorAnalytics";
import AuthorCollaboration from "./pages/AuthorCollaboration";
import AuthorAITools from "./pages/AuthorAITools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/artist" element={<ArtistDashboard />} />
            <Route path="/artist/distribution" element={<ArtistDistribution />} />
            <Route path="/artist/content-id" element={<ArtistContentId />} />
            <Route path="/artist/rights" element={<ArtistRights />} />
            <Route path="/artist/promotion" element={<ArtistPromotion />} />
            <Route path="/artist/collaboration" element={<ArtistCollaboration />} />
            <Route path="/artist/ai-tools" element={<ArtistAITools />} />
            <Route path="/author" element={<AuthorDashboard />} />
            <Route path="/author/distribution" element={<AuthorDistribution />} />
            <Route path="/author/copyright" element={<AuthorCopyright />} />
            <Route path="/author/rights" element={<AuthorRights />} />
            <Route path="/author/promotion" element={<AuthorPromotion />} />
            <Route path="/author/analytics" element={<AuthorAnalytics />} />
            <Route path="/author/collaboration" element={<AuthorCollaboration />} />
            <Route path="/author/ai-tools" element={<AuthorAITools />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
