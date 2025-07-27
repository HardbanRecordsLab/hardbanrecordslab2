import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ArtistSidebar } from "@/components/ArtistSidebar"
import { AuthorSidebar } from "@/components/AuthorSidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, User } from "lucide-react"
import { useLocation } from "react-router-dom"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation()
  const isArtistPanel = location.pathname.startsWith('/artist')
  const isAuthorPanel = location.pathname.startsWith('/author')
  
  // Jeśli nie jesteśmy w panelu artysty ani autora, nie pokazuj sidebara
  if (!isArtistPanel && !isAuthorPanel) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar - różny dla artysty i autora */}
        {isArtistPanel && <ArtistSidebar />}
        {isAuthorPanel && <AuthorSidebar />}
        {isInstructorPanel && <InstructorSidebar />}
        {isStudentPanel && <StudentSidebar />}

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="hidden md:block">
                <h2 className="text-lg font-semibold">
                  {isArtistPanel ? "Panel Artysty" : "Panel Autora"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-4 h-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  2
                </Badge>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-muted/20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}