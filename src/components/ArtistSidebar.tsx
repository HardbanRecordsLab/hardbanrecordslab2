import { Music, Upload, BarChart3, DollarSign, User, Home, Settings } from "lucide-react"
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

const artistMenuItems = [
  { title: "Dashboard", url: "/artist", icon: Home },
  { title: "Moje Utwory", url: "/artist/tracks", icon: Music },
  { title: "Dodaj Utwór", url: "/artist/upload", icon: Upload },
  { title: "Statystyki", url: "/artist/analytics", icon: BarChart3 },
  { title: "Wypłaty", url: "/artist/payments", icon: DollarSign },
  { title: "Profil", url: "/artist/profile", icon: User },
]

export function ArtistSidebar() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
              <Music className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">HardbanRecords</h2>
              <p className="text-xs text-muted-foreground">Music Lab</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Panel Artysty</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {artistMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) =>
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
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