import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  Users, 
  Settings, 
  BarChart3, 
  Music, 
  BookOpen, 
  GraduationCap,
  Shield,
  Database
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "Zarządzanie Użytkownikami",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Projekty Muzyczne",
    url: "/admin/music-projects",
    icon: Music,
  },
  {
    title: "Publikacje Cyfrowe",
    url: "/admin/digital-publications",
    icon: BookOpen,
  },
  {
    title: "Kursy eLearning",
    url: "/admin/courses",
    icon: GraduationCap,
  },
  {
    title: "Analityka",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Ustawienia Systemu",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Baza Danych",
    url: "/admin/database",
    icon: Database,
  },
]

export function AdminSidebar() {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Panel Administracyjny
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}