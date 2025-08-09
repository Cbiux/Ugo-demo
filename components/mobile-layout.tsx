"use client"

import type { ReactNode } from "react"
import { Home, Wallet, Bell, User, Moon, Sun } from "lucide-react"
import { ugoColors, getThemeColors } from "@/lib/colors"
import { useTheme } from "@/contexts/theme-context"

interface MobileLayoutProps {
  children: ReactNode
  activeTab: "home" | "wallet" | "notifications" | "profile"
  onTabChange: (tab: "home" | "wallet" | "notifications" | "profile") => void
}

export function MobileLayout({ children, activeTab, onTabChange }: MobileLayoutProps) {
  const { isDark, toggleTheme } = useTheme()
  const colors = getThemeColors(isDark)

  const tabs = [
    { id: "home", icon: Home, label: "Inicio" },
    { id: "wallet", icon: Wallet, label: "Billetera" },
    { id: "notifications", icon: Bell, label: "Notificaciones" },
    { id: "profile", icon: User, label: "Perfil" },
  ]

  return (
    <div className="max-w-sm mx-auto min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* Header */}
      <header className="shadow-sm p-4 flex items-center justify-between" style={{ backgroundColor: colors.surface }}>
        <img src="/ugo-logo-new.png" alt="UGO" className="h-10" />
        <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100" style={{ color: colors.text }}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto">{children}</main>

      {/* Bottom Navigation */}
      <nav className="border-t px-4 py-2" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
        <div className="flex justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as any)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive ? "text-white" : "hover:opacity-70"
                }`}
                style={{
                  backgroundColor: isActive ? ugoColors.primary : "transparent",
                  color: isActive ? "white" : colors.text,
                }}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
