// src/components/AppLayout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ArtistSidebar } from "@/components/ArtistSidebar";
import { AuthorSidebar } from "@/components/AuthorSidebar";
import { InstructorSidebar } from "@/components/InstructorSidebar";
import { StudentSidebar } from "@/components/StudentSidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User } from "lucide-react";
import { useLocation, Outlet } from "react-router-dom"; // Zmieniono importy

export function AppLayout() {
  const location = useLocation();
  const isArtistPanel = location.pathname.startsWith('/artist');
  const isAuthorPanel = location.pathname.startsWith('/author');
  const isInstructorPanel = location.pathname.startsWith('/instructor');
  const isStudentPanel = location.pathname.startsWith('/student');
  const isAdminPanel = location.pathname.startsWith('/admin');

  const isAnyPanel = isArtistPanel || isAuthorPanel || isInstructorPanel || isStudentPanel || isAdminPanel;

  // Zawsze renderujemy wewnątrz SidebarProvider, żeby uniknąć błędów
  return (
    <SidebarProvider>
      {isAnyPanel ? (
        // Layout z Sidebarem dla paneli
        <div className="min-h-screen flex w-full">
          {isArtistPanel && <ArtistSidebar />}
          {isAuthorPanel && <AuthorSidebar />}
          {isInstructorPanel && <InstructorSidebar />}
          {isStudentPanel && <StudentSidebar />}
          {isAdminPanel && <AdminSidebar />}

          <div className="flex-1 flex flex-col">
            <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div className="hidden md:block">
                  <h2 className="text-lg font-semibold">
                    {isArtistPanel && "Panel Artysty"}
                    {isAuthorPanel && "Panel Autora"}
                    {isInstructorPanel && "Panel Instruktora"}
                    {isStudentPanel && "Panel Ucznia"}
                    {isAdminPanel && "Panel Administratora"}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">2</Badge>
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="w-4 h-4" />
                </Button>
              </div>
            </header>
            <main className="flex-1 p-6 bg-muted/20">
              <Outlet /> {/* Zamiast {children} używamy Outlet */}
            </main>
          </div>
        </div>
      ) : (
        // Layout bez Sidebara dla stron ogólnych (np. Marketplace, Profile)
        <div>
          {/* Tutaj trafi globalna nawigacja */}
          <main className="p-6">
            <Outlet /> {/* Zamiast {children} używamy Outlet */}
          </main>
        </div>
      )}
    </SidebarProvider>
  );
}