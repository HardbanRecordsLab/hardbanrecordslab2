import { BookOpen, Video, HelpCircle, Award, Users, TrendingUp, Settings, Home, Sparkles, FileText, DollarSign } from "lucide-react"
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

const instructorMenuItems = [
  { title: "Dashboard", url: "/instructor", icon: Home },
  { title: "Tworzenie Kursów", url: "/instructor/course-creation", icon: BookOpen },
  { title: "Interaktywne Lekcje", url: "/instructor/interactive-lessons", icon: Video },
  { title: "System Quizów", url: "/instructor/quiz-system", icon: HelpCircle },
  { title: "AI Generator", url: "/instructor/ai-generator", icon: Sparkles },
  { title: "Certyfikaty", url: "/instructor/certificates", icon: Award },
  { title: "Zarządzanie Użytkownikami", url: "/instructor/users", icon: Users },
  { title: "Płatności", url: "/instructor/payments", icon: DollarSign },
  { title: "Analityka", url: "/instructor/analytics", icon: TrendingUp },
]

export function InstructorSidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">HardbanRecords</h2>
              <p className="text-xs text-muted-foreground">eLearning Platform</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Panel Instruktora</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {instructorMenuItems.map((item) => (
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