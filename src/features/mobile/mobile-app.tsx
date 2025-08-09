"use client"

import { useState } from "react"
import { MobileLayout } from "@/src/components/layout/mobile-layout"
import { TransferModal, ReceiveModal } from "@/src/components/modals/modals"
import {
  QrCode,
  Copy,
  ChevronRight,
  Utensils,
  Bus,
  BookOpen,
  CreditCard,
  User,
  Send,
  Download,
  ArrowLeft,
  Settings,
  HelpCircle,
  LogOut,
  Palette,
  Shield,
  Bell,
  Camera,
  Edit3,
} from "lucide-react"
import { ugoColors, getThemeColors } from "@/src/lib/colors"
import { useTheme } from "@/src/contexts/theme-context"

export default function MobileApp() {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const [activeTab, setActiveTab] = useState<"home" | "wallet" | "notifications" | "profile">("home")
  const [tabLoading, setTabLoading] = useState(false)
  const [selectedToken, setSelectedToken] = useState<any>(null)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showReceiveModal, setShowReceiveModal] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingSection, setLoadingSection] = useState<string | null>(null)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Tokens recibidos", message: "15 tokens de comida agregados a tu cuenta", time: "2h", read: false },
    { id: 2, title: "Token usado", message: "Token de transporte consumido en Bus 401", time: "4h", read: true },
    { id: 3, title: "Recordatorio", message: "5 tokens de biblioteca vencen mañana", time: "1d", read: false },
    { id: 4, title: "Transferencia recibida", message: "Juan te envió 3 tokens de acceso", time: "2d", read: true },
    { id: 5, title: "Nueva promoción", message: "20% descuento en tokens de comida", time: "3d", read: false },
    { id: 6, title: "Token usado", message: "Acceso al laboratorio de química", time: "3d", read: true },
    { id: 7, title: "Recarga disponible", message: "Puedes solicitar más tokens este mes", time: "4d", read: false },
    { id: 8, title: "Token usado", message: "Préstamo de libro: Cálculo Avanzado", time: "5d", read: true },
    { id: 9, title: "Mantenimiento", message: "Sistema de tokens fuera de servicio 2-4 AM", time: "1w", read: true },
    { id: 10, title: "Bienvenida", message: "¡Tu cuenta UGO ha sido activada!", time: "2w", read: true },
  ])
  const [walletCopied, setWalletCopied] = useState(false)

  const tokens = [
    { id: 1, name: "Comida", icon: Utensils, amount: 15, color: ugoColors.red, total: 30, transferable: true },
    { id: 2, name: "Transporte", icon: Bus, amount: 8, color: ugoColors.orange, total: 20, transferable: true },
    { id: 3, name: "Biblioteca", icon: BookOpen, amount: 5, color: ugoColors.blue, total: 10, transferable: true },
    { id: 4, name: "Acceso", icon: CreditCard, amount: 12, color: ugoColors.green, total: 15, transferable: false },
  ]


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText("GCKFX7Y2EXAMPLE")
      setWalletCopied(true)
      setTimeout(() => setWalletCopied(false), 2000)
    } catch (error) {
      // Fallback silencioso
    }
  }

  const handleSettingClick = (setting: string) => {
    // Función silenciosa para demo
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simular carga de datos
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsRefreshing(false)
  }

  const handlePullToRefresh = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    const startY = touch.clientY
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      const currentY = moveEvent.touches[0].clientY
      const pullDistance = currentY - startY
      
      if (pullDistance > 80 && window.scrollY <= 0) {
        handleRefresh()
        document.removeEventListener('touchmove', handleTouchMove)
      }
    }
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }

  const handleTabChange = async (newTab: "home" | "wallet" | "notifications" | "profile") => {
    if (newTab === activeTab) return
    
    setTabLoading(true)
    setLoadingSection(`Cargando ${newTab === 'home' ? 'Inicio' : newTab === 'wallet' ? 'Billetera' : newTab === 'notifications' ? 'Notificaciones' : 'Perfil'}...`)
    
    // Simular delay de carga
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    setActiveTab(newTab)
    setTabLoading(false)
    setLoadingSection(null)
  }

  const handleTokenClick = async (token: any) => {
    setIsLoading(true)
    setLoadingSection(`Cargando detalles de ${token.name}...`)
    
    // Simular delay de carga de detalles del token
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setSelectedToken(token)
    setIsLoading(false)
    setLoadingSection(null)
  }

  const handleReceiveClick = async () => {
    setIsLoading(true)
    setLoadingSection('Generando código QR...')
    
    // Simular delay de generación de QR
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setShowReceiveModal(true)
    setIsLoading(false)
    setLoadingSection(null)
  }

  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // Componente de loading
  const LoadingOverlay = ({ message }: { message: string }) => (
    <div className="absolute inset-0 z-40 flex items-center justify-center" style={{ backgroundColor: colors.bg + 'CC' }}>
      <div className="text-center p-6 rounded-xl" style={{ backgroundColor: colors.surface }}>
        {/* Mini logo animation */}
        <div className="relative mb-4">
          <div className="w-12 h-12 mx-auto relative">
            <div 
              className="absolute inset-0 border-3 border-transparent rounded-full animate-spin" 
              style={{ 
                borderTopColor: ugoColors.primary,
                borderRightColor: ugoColors.blue,
                animationDuration: '1s'
              }}
            ></div>
            <div className="absolute inset-1 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.bg }}>
              <img src="/assets/images/ugo-logo-new.png" alt="UGO" className="w-6 h-6" />
            </div>
          </div>
        </div>
        <p className="text-sm font-medium" style={{ color: colors.text }}>{message}</p>
      </div>
    </div>
  )

  if (selectedToken) {
    return (
      <div className="w-full h-full flex flex-col" style={{ backgroundColor: colors.bg }}>
        <header className="p-4 flex items-center text-white flex-shrink-0" style={{ backgroundColor: selectedToken.color }}>
          <button onClick={() => setSelectedToken(null)} className="text-white mr-4">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">{selectedToken.name}</h1>
        </header>

        <div className="flex-1 overflow-y-auto mobile-content-scroll relative">
          <div className="p-6 text-center">
          <div className="mb-6">
            <selectedToken.icon size={64} className="mx-auto mb-4" style={{ color: selectedToken.color }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
              {selectedToken.amount}
            </h2>
            <p style={{ color: colors.textSecondary }}>tokens disponibles</p>
          </div>

          <div className="p-6 rounded-lg mb-6" style={{ backgroundColor: colors.surface }}>
            <div
              className="w-48 h-48 rounded-lg mx-auto flex items-center justify-center mb-4"
              style={{ backgroundColor: colors.bg }}
            >
              <QrCode size={120} className="text-gray-400" />
            </div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Escanea este código para usar tu token
            </p>
          </div>

          <div className="space-y-4 text-left mb-6">
            <div className="flex justify-between">
              <span style={{ color: colors.textSecondary }}>Total asignados:</span>
              <span className="font-semibold" style={{ color: colors.text }}>
                {selectedToken.total}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: colors.textSecondary }}>Usados:</span>
              <span className="font-semibold" style={{ color: colors.text }}>
                {selectedToken.total - selectedToken.amount}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: colors.textSecondary }}>Disponibles:</span>
              <span className="font-semibold" style={{ color: colors.text }}>
                {selectedToken.amount}
              </span>
            </div>
          </div>

            {selectedToken.transferable ? (
              <button
                onClick={() => setShowTransferModal(true)}
                className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 flex items-center justify-center"
                style={{ backgroundColor: selectedToken.color }}
              >
                <Send size={16} className="mr-2" />
                Transferir Tokens
              </button>
            ) : (
              <div className="w-full py-3 px-4 bg-gray-100 border-2 border-gray-300 rounded-lg text-center">
                <div className="flex items-center justify-center mb-2">
                  <CreditCard size={20} className="mr-2 text-gray-500" />
                  <span className="font-semibold text-gray-700">Token de Acceso Personal</span>
                </div>
                <p className="text-sm text-gray-600">
                  Este token no es transferible por razones de seguridad
                </p>
              </div>
            )}

            {/* Historial de Uso */}
            <div className="mt-8 text-left">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Historial de Uso
              </h3>
              <div className="space-y-3">
                {[
                  { date: "Hoy 2:30 PM", action: "Token usado", location: "Cafetería Central", status: "success" },
                  { date: "Hoy 10:15 AM", action: "Token recibido", location: "Transferencia de Juan", status: "received" },
                  { date: "Ayer 1:45 PM", action: "Token usado", location: "Biblioteca Principal", status: "success" },
                  { date: "Ayer 8:30 AM", action: "Token usado", location: "Transporte Campus", status: "success" },
                  { date: "2 días", action: "Token recibido", location: "Recarga mensual", status: "received" },
                  { date: "3 días", action: "Token usado", location: "Lab. Química", status: "success" },
                  { date: "4 días", action: "Token usado", location: "Comedor Estudiantes", status: "success" },
                  { date: "1 semana", action: "Token recibido", location: "Bono académico", status: "received" },
                ].map((item, index) => (
                  <div key={index} className="p-3 rounded-lg border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm" style={{ color: colors.text }}>{item.action}</p>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>{item.location}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs" style={{ color: colors.textSecondary }}>{item.date}</span>
                        <div className={`w-2 h-2 rounded-full mt-1 ml-auto ${
                          item.status === 'success' ? 'bg-green-500' : 
                          item.status === 'received' ? 'bg-blue-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas del Token */}
            <div className="mt-8 text-left">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Estadísticas
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.surface }}>
                  <p className="text-2xl font-bold" style={{ color: selectedToken.color }}>
                    {selectedToken.total - selectedToken.amount}
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>Tokens usados</p>
                </div>
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.surface }}>
                  <p className="text-2xl font-bold text-green-500">85%</p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>Eficiencia de uso</p>
                </div>
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.surface }}>
                  <p className="text-2xl font-bold text-blue-500">12</p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>Días activo</p>
                </div>
                <div className="p-4 rounded-lg text-center" style={{ backgroundColor: colors.surface }}>
                  <p className="text-2xl font-bold text-orange-500">4.8</p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>Promedio diario</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TransferModal
          isOpen={showTransferModal}
          onClose={() => setShowTransferModal(false)}
          tokenName={selectedToken.name}
          tokenColor={selectedToken.color}
        />
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>
                ¡Bienvenido a UGO!
              </h1>
              <p style={{ color: colors.textSecondary }}>Tu billetera digital universitaria</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                <h3 className="text-lg font-semibold">Total Tokens</h3>
                <p className="text-2xl font-bold">40</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-lg text-white">
                <h3 className="text-lg font-semibold">Usados Hoy</h3>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold" style={{ color: colors.text }}>
                Actividad Reciente
              </h2>
              {notifications.slice(0, 6).map((notif) => (
                <div key={notif.id} className="p-3 rounded-lg" style={{ backgroundColor: colors.surface }}>
                  <p className="font-medium text-sm" style={{ color: colors.text }}>
                    {notif.title}
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    {notif.message}
                  </p>
                  <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                    hace {notif.time}
                  </p>
                </div>
              ))}
              
              <div className="space-y-3 mt-6">
                <h2 className="text-lg font-semibold" style={{ color: colors.text }}>
                  Estadísticas del Mes
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.surface }}>
                    <p className="text-2xl font-bold text-green-500">47</p>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>Tokens usados</p>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.surface }}>
                    <p className="text-2xl font-bold text-blue-500">12</p>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>Transferencias</p>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.surface }}>
                    <p className="text-2xl font-bold text-orange-500">8</p>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>Días activos</p>
                  </div>
                  <div className="p-3 rounded-lg text-center" style={{ backgroundColor: colors.surface }}>
                    <p className="text-2xl font-bold text-purple-500">95%</p>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>Eficiencia</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <h2 className="text-lg font-semibold" style={{ color: colors.text }}>
                  Accesos Rápidos
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 rounded-lg flex flex-col items-center" style={{ backgroundColor: colors.surface }}>
                    <Utensils size={24} className="mb-2 text-red-500" />
                    <span className="text-sm" style={{ color: colors.text }}>Cafetería</span>
                  </button>
                  <button className="p-4 rounded-lg flex flex-col items-center" style={{ backgroundColor: colors.surface }}>
                    <Bus size={24} className="mb-2 text-orange-500" />
                    <span className="text-sm" style={{ color: colors.text }}>Transporte</span>
                  </button>
                  <button className="p-4 rounded-lg flex flex-col items-center" style={{ backgroundColor: colors.surface }}>
                    <BookOpen size={24} className="mb-2 text-blue-500" />
                    <span className="text-sm" style={{ color: colors.text }}>Biblioteca</span>
                  </button>
                  <button className="p-4 rounded-lg flex flex-col items-center" style={{ backgroundColor: colors.surface }}>
                    <CreditCard size={24} className="mb-2 text-green-500" />
                    <span className="text-sm" style={{ color: colors.text }}>Laboratorios</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case "wallet":
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
                Mi Billetera
              </h1>
              <button
                onClick={handleReceiveClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
              >
                <Download size={16} className="mr-2" />
                Recibir
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {tokens.map((token) => {
                const Icon = token.icon
                return (
                  <button
                    key={token.id}
                    onClick={() => handleTokenClick(token)}
                    className="p-4 rounded-lg shadow-md border-2 hover:shadow-lg transition-shadow relative"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: token.color,
                    }}
                  >
                    {!token.transferable && (
                      <div className="absolute top-1 right-1 bg-gray-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Personal
                      </div>
                    )}
                    <Icon size={32} className="mx-auto mb-2" style={{ color: token.color }} />
                    <h3 className="font-semibold text-sm mb-1" style={{ color: colors.text }}>
                      {token.name}
                    </h3>
                    <p className="text-2xl font-bold" style={{ color: token.color }}>
                      {token.amount}
                    </p>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>
                      tokens
                    </p>
                  </button>
                )
              })}
            </div>

            <ReceiveModal isOpen={showReceiveModal} onClose={() => setShowReceiveModal(false)} />
          </div>
        )

      case "notifications":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Notificaciones
            </h1>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => !notif.read && markNotificationAsRead(notif.id)}
                  className={`p-4 rounded-lg shadow-sm border cursor-pointer transition-all hover:shadow-md ${!notif.read ? "border-l-4 border-l-blue-500 hover:bg-blue-50" : "hover:bg-gray-50"}`}
                  style={{
                    backgroundColor: !notif.read ? (isDark ? colors.surface : '#fef7f7') : colors.surface,
                    borderColor: colors.border,
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${!notif.read ? 'font-bold' : ''}`} style={{ color: colors.text }}>
                      {notif.title}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-xs mr-2" style={{ color: colors.textSecondary }}>
                        {notif.time}
                      </span>
                      {!notif.read && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-sm" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {notif.message}
                  </p>
                  {!notif.read && (
                    <p className="text-xs mt-2 text-blue-600 font-medium">
                      Toca para marcar como leída
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Mi Perfil
            </h1>

            <div
              className="p-4 rounded-lg shadow-sm border mb-6"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <div className="flex items-center mb-4">
                <div className="relative mr-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg"
                  >
                    <span className="text-white font-bold text-xl">JP</span>
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-green-600 transition-colors">
                    <Camera size={12} className="text-white" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <h2 className="text-lg font-semibold mr-2" style={{ color: colors.text }}>
                      Juan Pérez
                    </h2>
                    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                      <Edit3 size={14} style={{ color: colors.textSecondary }} />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    <p style={{ color: colors.textSecondary }}>Estudiante • En línea</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm" style={{ color: colors.textSecondary }}>
                    Email
                  </label>
                  <p className="font-medium" style={{ color: colors.text }}>
                    juan.perez@universidad.edu
                  </p>
                </div>
                <div>
                  <label className="text-sm" style={{ color: colors.textSecondary }}>
                    ID Estudiante
                  </label>
                  <p className="font-medium" style={{ color: colors.text }}>
                    2024001234
                  </p>
                </div>
                <div>
                  <label className="text-sm" style={{ color: colors.textSecondary }}>
                    Wallet Address
                  </label>
                  <div className={`flex items-center justify-between p-2 rounded transition-all duration-200 ${walletCopied ? 'ring-2 ring-green-400' : ''}`} style={{ backgroundColor: walletCopied ? '#f0fdf4' : colors.bg }}>
                    <span className="text-sm font-mono flex-1" style={{ color: colors.text }}>
                      GCKF...X7Y2
                    </span>
                    <button 
                      onClick={copyWalletAddress} 
                      className={`ml-2 p-1 rounded transition-all duration-200 ${walletCopied ? 'text-green-600 bg-green-100' : 'text-blue-500 hover:bg-blue-100'}`}
                    >
                      {walletCopied ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                  {walletCopied && (
                    <p className="text-xs text-green-600 mt-1 animate-fade-in">
                      ¡Dirección copiada al portapapeles!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div
              className="p-4 rounded-xl shadow-lg border mb-6 text-center"
              style={{ 
                backgroundColor: isDark ? colors.surface : '#f8fafc',
                borderColor: colors.border 
              }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-2">
                  <QrCode size={14} className="text-white" />
                </div>
                <h3 className="font-semibold" style={{ color: colors.text }}>
                  Mi Código QR
                </h3>
              </div>
              <div className="relative flex justify-center">
                <div
                  className="w-32 h-32 rounded-xl flex items-center justify-center shadow-inner border-2 mb-4"
                  style={{ 
                    backgroundColor: isDark ? '#374151' : 'white', 
                    borderColor: colors.border 
                  }}
                >
                  <QrCode size={80} style={{ color: colors.text }} />
                </div>
                {/* Decorative corners - positioned relative to the QR container */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                  <div className="flex justify-center" style={{ width: '128px' }}>
                    <div className="flex justify-between w-full px-1">
                      <div className="w-4 h-4 border-l-2 border-t-2 border-indigo-500 rounded-tl-lg"></div>
                      <div className="w-4 h-4 border-r-2 border-t-2 border-indigo-500 rounded-tr-lg"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
                  <div className="flex justify-center" style={{ width: '128px' }}>
                    <div className="flex justify-between w-full px-1">
                      <div className="w-4 h-4 border-l-2 border-b-2 border-indigo-500 rounded-bl-lg"></div>
                      <div className="w-4 h-4 border-r-2 border-b-2 border-indigo-500 rounded-br-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium" style={{ color: isDark ? colors.textSecondary : '#4338ca' }}>
                Comparte este código para recibir tokens
              </p>
            </div>

            <div className="space-y-3">
              {/* Settings Group */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold mb-3" style={{ color: colors.textSecondary }}>
                  CONFIGURACIÓN
                </h3>
                <button
                  onClick={() => handleSettingClick('settings')}
                  className="w-full text-left p-4 rounded-xl shadow-sm border flex items-center hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4">
                    <Settings size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium" style={{ color: colors.text }}>Configuración</span>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>Preferencias de la app</p>
                  </div>
                  <ChevronRight size={16} style={{ color: colors.textSecondary }} />
                </button>
                
                <button
                  onClick={() => handleSettingClick('personalization')}
                  className="w-full text-left p-4 rounded-xl shadow-sm border flex items-center hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4">
                    <Palette size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium" style={{ color: colors.text }}>Personalización</span>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>Temas y apariencia</p>
                  </div>
                  <ChevronRight size={16} style={{ color: colors.textSecondary }} />
                </button>
                
                <button
                  onClick={() => handleSettingClick('notifications')}
                  className="w-full text-left p-4 rounded-xl shadow-sm border flex items-center hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-4">
                    <Bell size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium" style={{ color: colors.text }}>Notificaciones</span>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>Alertas y recordatorios</p>
                  </div>
                  <ChevronRight size={16} style={{ color: colors.textSecondary }} />
                </button>
                
                <button
                  onClick={() => handleSettingClick('security')}
                  className="w-full text-left p-4 rounded-xl shadow-sm border flex items-center hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-4">
                    <Shield size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium" style={{ color: colors.text }}>Seguridad</span>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>Privacidad y protección</p>
                  </div>
                  <ChevronRight size={16} style={{ color: colors.textSecondary }} />
                </button>
              </div>
              
              {/* Support Group */}
              <div className="space-y-2 pt-4">
                <h3 className="text-sm font-semibold mb-3" style={{ color: colors.textSecondary }}>
                  SOPORTE
                </h3>
                <button
                  onClick={() => handleSettingClick('help')}
                  className="w-full text-left p-4 rounded-xl shadow-sm border flex items-center hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center mr-4">
                    <HelpCircle size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium" style={{ color: colors.text }}>Centro de Ayuda</span>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>FAQ y tutoriales</p>
                  </div>
                  <ChevronRight size={16} style={{ color: colors.textSecondary }} />
                </button>
              </div>
              
              {/* Logout */}
              <div className="pt-4">
                <button
                  onClick={() => handleSettingClick('logout')}
                  className="w-full text-left p-4 rounded-xl shadow-sm border flex items-center hover:shadow-md transition-all duration-200 hover:scale-[1.02] hover:border-red-300 active:scale-[0.98]"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mr-4">
                    <LogOut size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-red-600">Cerrar Sesión</span>
                    <p className="text-xs text-red-400">Salir de la aplicación</p>
                  </div>
                  <ChevronRight size={16} className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <MobileLayout 
      activeTab={activeTab} 
      onTabChange={handleTabChange} 
      unreadNotifications={unreadCount}
      isRefreshing={isRefreshing}
      onPullToRefresh={handlePullToRefresh}
    >
      <div className="relative h-full">
        {renderContent()}
        {(isLoading || tabLoading) && loadingSection && (
          <LoadingOverlay message={loadingSection} />
        )}
      </div>
    </MobileLayout>
  )
}
