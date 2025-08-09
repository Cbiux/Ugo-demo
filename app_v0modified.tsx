"use client"

import { useState } from "react"
import { ThemeProvider } from "@/contexts/theme-context"
import MobileApp from "./mobile-app"
import AdminApp from "./admin-app"
import { Smartphone, Monitor } from "lucide-react"
import { ugoColors } from "@/lib/colors"

export default function UgoPrototypes() {
  const [currentApp, setCurrentApp] = useState<"mobile" | "admin">("mobile")

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50">
        {/* App Switcher */}
        <div className="bg-white shadow-sm p-4 border-b">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <img src="/ugo-logo-new.png" alt="UGO" className="h-12 mr-4" />
              <h1 className="text-xl font-bold" style={{ color: ugoColors.primary }}>
                Prototipos UGO - Sistema de Tokens Digitales
              </h1>
            </div>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentApp("mobile")}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  currentApp === "mobile" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Smartphone size={16} className="mr-2" />
                App Móvil
              </button>
              <button
                onClick={() => setCurrentApp("admin")}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  currentApp === "admin" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <Monitor size={16} className="mr-2" />
                Panel Admin
              </button>
            </div>
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1">{currentApp === "mobile" ? <MobileApp /> : <AdminApp />}</div>
      </div>
    </ThemeProvider>
  )
}
