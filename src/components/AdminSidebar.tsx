import { useState } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  FileText, 
  GraduationCap, 
  BarChart3, 
  Settings, 
  Shield,
  ChevronLeft,
  ChevronRight,
  Home,
  Database,
  UserCheck,
  Lock
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const menuItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      href: "/admin",
      badge: null
    },
    { 
      icon: Users, 
      label: "Zarządzanie Użytkownikami", 
      href: "/admin/users",
      badge: null
    },
    { 
      icon: FileText, 
      label: "Zarządzanie Projektami", 
      href: "/admin/projects",
      badge: null
    },
    { 
      icon: GraduationCap, 
      label: "Zarządzanie Kursami", 
      href: "/admin/courses",
      badge: null
    },
    { 
      icon: Database, 
      label: "Zarządzanie Treścią", 
      href: "/admin/content",
      badge: null
    },
    { 
      icon: BarChart3, 
      label: "Analityka", 
      href: "/admin/analytics",
      badge: null
    },
    { 
      icon: UserCheck, 
      label: "Weryfikacja", 
      href: "/admin/verification",
      badge: "3" // przykładowa liczba oczekujących
    },
    { 
      icon: Lock, 
      label: "Bezpieczeństwo", 
      href: "/admin/security",
      badge: null
    },
    { 
      icon: Settings, 
      label: "Ustawienia Systemu", 
      href: "/admin/settings",
      badge: null
    }
  ]

  return (
    <div className={cn(
      "flex flex-col h-screen bg-card border-r transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-sm">Panel Admina</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          
          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Admin Info */}
      {!collapsed && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>HardbanRecords Lab Admin</span>
          </div>
        </div>
      )}
    </div>
  )
}