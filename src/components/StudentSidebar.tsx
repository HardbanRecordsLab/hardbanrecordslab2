import { BookOpen, PlayCircle, Award, TrendingUp, User, Home, Settings, Search, MessageCircle, Calendar } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

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

const studentMenuItems = [
  { title: "Dashboard", url: "/student", icon: Home },
  { title: "Moje Kursy", url: "/student/courses", icon: BookOpen },
  { title: "Przeglądaj Kursy", url: "/student/browse", icon: Search },
  { title: "Lekcje", url: "/student/lessons", icon: PlayCircle },
  { title: "Certyfikaty", url: "/student/certificates", icon: Award },
  { title: "Postępy", url: "/student/progress", icon: TrendingUp },
  { title: "Kalendarz", url: "/student/calendar", icon: Calendar },
  { title: "Forum", url: "/student/forum", icon: MessageCircle },
]

export function StudentSidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">HardbanRecords</h2>
              <p className="text-xs text-muted-foreground">eLearning Platform</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Panel Ucznia</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studentMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-accent/10 text-accent font-medium" 
                          : "hover:bg-muted/50"
                      }
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t">
          <SidebarMenuButton className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            <span>Ustawienia</span>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}