"use client"

import type { ReactNode } from "react"
import { Home, Wallet, Bell, User, Moon, Sun } from "lucide-react"
import { ugoColors, getThemeColors } from "@/src/lib/colors"
import { useTheme } from "@/src/contexts/theme-context"

interface MobileLayoutProps {
  children: ReactNode
  activeTab: "home" | "wallet" | "notifications" | "profile"
  onTabChange: (tab: "home" | "wallet" | "notifications" | "profile") => void
  unreadNotifications?: number
  isRefreshing?: boolean
  onPullToRefresh?: (e: React.TouchEvent) => void
}

export function MobileLayout({ children, activeTab, onTabChange, unreadNotifications = 0, isRefreshing = false, onPullToRefresh }: MobileLayoutProps) {
  const { isDark, toggleTheme } = useTheme()
  const colors = getThemeColors(isDark)

  const tabs = [
    { id: "home", icon: Home, label: "Inicio" },
    { id: "wallet", icon: Wallet, label: "Billetera" },
    { id: "notifications", icon: Bell, label: "Notificaciones" },
    { id: "profile", icon: User, label: "Perfil" },
  ]

  return (
    <div className="w-full h-full flex flex-col relative" style={{ backgroundColor: colors.bg }}>
      {/* Refresh Loading Overlay */}
      {isRefreshing && (
        <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
          <div className="text-center">
            {/* UGO Logo Animation */}
            <div className="relative mb-6">
              <div className="w-20 h-20 mx-auto mb-4 relative">
                {/* Outer spinning ring */}
                <div 
                  className="absolute inset-0 border-4 border-transparent rounded-full animate-spin" 
                  style={{ 
                    borderTopColor: ugoColors.primary,
                    borderRightColor: ugoColors.blue,
                    animationDuration: '1.5s'
                  }}
                ></div>
                {/* Inner pulsing ring */}
                <div 
                  className="absolute inset-2 border-2 border-transparent rounded-full animate-spin" 
                  style={{ 
                    borderBottomColor: ugoColors.green,
                    borderLeftColor: ugoColors.orange,
                    animationDuration: '2s',
                    animationDirection: 'reverse'
                  }}
                ></div>
                {/* Logo container */}
                <div className="absolute inset-3 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: colors.surface }}>
                  <img src="/assets/images/ugo-logo-new.png" alt="UGO" className="w-10 h-10" />
                </div>
              </div>
              {/* Ripple effect */}
              <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full animate-ping opacity-20" style={{ backgroundColor: ugoColors.primary }}></div>
            </div>
            
            {/* Loading dots */}
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: ugoColors.primary, animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: ugoColors.blue, animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: ugoColors.green, animationDelay: '300ms' }}></div>
            </div>
            
            <p className="text-sm font-medium" style={{ color: colors.text }}>Actualizando...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="shadow-sm p-4 flex items-center justify-between" style={{ backgroundColor: colors.surface }}>
        <img src="/assets/images/ugo-logo-new.png" alt="UGO" className="h-10" />
        <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100" style={{ color: colors.text }}>
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Content */}
      <main 
        className="flex-1 overflow-y-auto overflow-x-hidden mobile-content-scroll"
        onTouchStart={onPullToRefresh}
      >
        {children}
      </main>

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
                <div className="relative">
                  <Icon size={20} />
                  {tab.id === "notifications" && unreadNotifications > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </div>
                  )}
                </div>
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
