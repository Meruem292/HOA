"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Users,
  CreditCard,
  FileText,
  BarChart3,
  Building2,
  Settings,
  Menu,
  LogOut,
  UserCheck,
} from "lucide-react"

interface SidebarProps {
  userRole?: "admin" | "homeowner"
}

const adminNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Homeowners", href: "/homeowners", icon: Users },
  { title: "Applications", href: "/applications", icon: UserCheck },
  { title: "Payments", href: "/payments", icon: CreditCard },
  { title: "Blocks & Lots", href: "/blocks-lots", icon: Building2 },
  { title: "Policies", href: "/policies", icon: FileText },
  { title: "Analytics", href: "/analytics", icon: BarChart3 },
  { title: "Settings", href: "/settings", icon: Settings },
]

const homeownerNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "My Payments", href: "/my-payments", icon: CreditCard },
  { title: "Policies", href: "/policies", icon: FileText },
  { title: "My Profile", href: "/profile", icon: Settings },
]

export function Sidebar({ userRole = "homeowner" }: SidebarProps) {
  const pathname = usePathname()
  const navItems = userRole === "admin" ? adminNavItems : homeownerNavItems

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-gradient-to-b from-green-600 to-green-700">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">HOA System</span>
            <span className="text-xs text-green-100">Management</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-green-100 hover:bg-white/10 hover:text-white",
                    isActive && "bg-white/20 text-white font-medium",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </div>
      </ScrollArea>

      {/* User section */}
      <div className="border-t border-green-500/20 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-green-100 capitalize">{userRole}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-green-100 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden fixed top-4 left-4 z-40 bg-white shadow-md">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
