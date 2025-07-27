import { BookOpen, Upload, BarChart3, DollarSign, User, Home, Settings, PenTool, Shield, Scale, Megaphone, Users, Bot } from "lucide-react"
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

const authorMenuItems = [
  { title: "Dashboard", url: "/author", icon: Home },
  { title: "Dystrybucja", url: "/author/distribution", icon: BookOpen },
  { title: "Prawa Autorskie", url: "/author/copyright", icon: Shield },
  { title: "Zarządzanie Prawami", url: "/author/rights", icon: Scale },
  { title: "Promocja", url: "/author/promotion", icon: Megaphone },
  { title: "Analityka", url: "/author/analytics", icon: BarChart3 },
  { title: "Współpraca", url: "/author/collaboration", icon: Users },
  { title: "Narzędzia AI", url: "/author/ai-tools", icon: Bot },
]

export function AuthorSidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/60 rounded-lg flex items-center justify-center">
              <PenTool className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">HardbanRecords</h2>
              <p className="text-xs text-muted-foreground">Digital Publishing</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Panel Autora</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authorMenuItems.map((item) => (
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