"use client"

import { useState } from "react"
import { ThemeProvider } from "@/src/contexts/theme-context"
import MobileApp from "./features/mobile/mobile-app"
import AdminApp from "./features/admin/admin-app"
import { MobileFrame, DesktopFrame } from "@/src/components"
import { Smartphone, Monitor } from "lucide-react"
import { ugoColors } from "@/src/lib/colors"

export default function UgoPrototypes() {
  const [currentApp, setCurrentApp] = useState<"mobile" | "admin">("mobile")

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50 flex flex-col">
        {/* App Switcher */}
        <div className="bg-white shadow-sm p-4 border-b">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <img src="/assets/images/ugo-logo-new.png" alt="UGO" className="h-12 mr-4" />
              <h1 className="text-xl font-bold" style={{ color: ugoColors.primary }}>
                Prototipos UGO - Sistema de Tokens Digitales Universitarios
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
        <div className="flex-1">
          {currentApp === "mobile" ? (
            <MobileFrame>
              <MobileApp />
            </MobileFrame>
          ) : (
            <DesktopFrame>
              <AdminApp />
            </DesktopFrame>
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}
