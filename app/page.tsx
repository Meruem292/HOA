"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Loader2, Building2 } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        // User is authenticated, check their role
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

        if (profile?.role === "admin") {
          router.push("/dashboard")
        } else {
          router.push("/homeowner/dashboard")
        }
      } else {
        // User is not authenticated, redirect to login
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-600">
            <Building2 className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Homeowners Association Portal</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Loading your dashboard...</p>
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-600" />
      </div>
    </div>
  )
}
