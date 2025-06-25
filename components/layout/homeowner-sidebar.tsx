"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  CreditCard,
  FileText,
  Settings,
  Menu,
  LogOut,
  Receipt,
  Bell,
  MessageSquare,
  HelpCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

const homeownerNavItems = [
  { title: "Dashboard", href: "/homeowner/dashboard", icon: Home },
  { title: "My Payments", href: "/homeowner/payments", icon: CreditCard },
  { title: "My Invoices", href: "/homeowner/invoices", icon: Receipt },
  { title: "Policies", href: "/homeowner/policies", icon: FileText },
  { title: "Notifications", href: "/homeowner/notifications", icon: Bell },
  { title: "Support", href: "/homeowner/support", icon: MessageSquare },
  { title: "Help", href: "/homeowner/help", icon: HelpCircle },
  { title: "My Profile", href: "/homeowner/profile", icon: Settings },
]

export function HomeownerSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-gradient-to-b from-blue-600 to-blue-700">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
            <Home className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">HOA Portal</span>
            <span className="text-xs text-blue-100">Homeowner</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {homeownerNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-blue-100 hover:bg-white/10 hover:text-white",
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
      <div className="border-t border-blue-500/20 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <Home className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Homeowner</p>
            <p className="text-xs text-blue-100">Block A, Lot 12</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-blue-100 hover:bg-white/10 hover:text-white"
          onClick={handleSignOut}
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
