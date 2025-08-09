"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { TransferModal, ReceiveModal } from "@/components/modals"
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
} from "lucide-react"
import { ugoColors, getThemeColors } from "@/lib/colors"
import { useTheme } from "@/contexts/theme-context"

export default function MobileApp() {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const [activeTab, setActiveTab] = useState<"home" | "wallet" | "notifications" | "profile">("home")
  const [selectedToken, setSelectedToken] = useState<any>(null)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [showReceiveModal, setShowReceiveModal] = useState(false)

  const tokens = [
    { id: 1, name: "Comida", icon: Utensils, amount: 15, color: ugoColors.red, total: 30 },
    { id: 2, name: "Transporte", icon: Bus, amount: 8, color: ugoColors.orange, total: 20 },
    { id: 3, name: "Biblioteca", icon: BookOpen, amount: 5, color: ugoColors.blue, total: 10 },
    { id: 4, name: "Acceso", icon: CreditCard, amount: 12, color: ugoColors.green, total: 15 },
  ]

  const notifications = [
    { id: 1, title: "Tokens recibidos", message: "15 tokens de comida agregados", time: "2h", read: false },
    { id: 2, title: "Token usado", message: "Token de transporte consumido", time: "4h", read: true },
    { id: 3, title: "Recordatorio", message: "Tokens de biblioteca por vencer", time: "1d", read: false },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copiado al portapapeles")
  }

  if (selectedToken) {
    return (
      <div className="max-w-sm mx-auto min-h-screen" style={{ backgroundColor: colors.bg }}>
        <header className="p-4 flex items-center text-white" style={{ backgroundColor: selectedToken.color }}>
          <button onClick={() => setSelectedToken(null)} className="text-white mr-4">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">{selectedToken.name}</h1>
        </header>

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

          <button
            onClick={() => setShowTransferModal(true)}
            className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 flex items-center justify-center"
            style={{ backgroundColor: selectedToken.color }}
          >
            <Send size={16} className="mr-2" />
            Transferir Tokens
          </button>
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
              {notifications.slice(0, 3).map((notif) => (
                <div key={notif.id} className="p-3 rounded-lg" style={{ backgroundColor: colors.surface }}>
                  <p className="font-medium text-sm" style={{ color: colors.text }}>
                    {notif.title}
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    {notif.message}
                  </p>
                </div>
              ))}
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
                onClick={() => setShowReceiveModal(true)}
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
                    onClick={() => setSelectedToken(token)}
                    className="p-4 rounded-lg shadow-md border-2 hover:shadow-lg transition-shadow"
                    style={{
                      backgroundColor: colors.surface,
                      borderColor: token.color,
                    }}
                  >
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
                  className={`p-4 rounded-lg shadow-sm border ${!notif.read ? "border-l-4 border-l-blue-500" : ""}`}
                  style={{
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold" style={{ color: colors.text }}>
                      {notif.title}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-xs mr-2" style={{ color: colors.textSecondary }}>
                        {notif.time}
                      </span>
                      {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {notif.message}
                  </p>
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
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: colors.bg }}
                >
                  <User size={32} style={{ color: colors.textSecondary }} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: colors.text }}>
                    Juan Pérez
                  </h2>
                  <p style={{ color: colors.textSecondary }}>Estudiante</p>
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
                  <div className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: colors.bg }}>
                    <span className="text-sm font-mono" style={{ color: colors.text }}>
                      GCKF...X7Y2
                    </span>
                    <button onClick={() => copyToClipboard("GCKFX7Y2EXAMPLE")} className="text-blue-500">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div
              className="p-4 rounded-lg shadow-sm border mb-6 text-center"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <h3 className="font-semibold mb-4" style={{ color: colors.text }}>
                Mi Código QR
              </h3>
              <div
                className="w-32 h-32 rounded-lg mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: colors.bg }}
              >
                <QrCode size={80} className="text-gray-400" />
              </div>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Comparte este código para recibir tokens
              </p>
            </div>

            <div className="space-y-3">
              <button
                className="w-full text-left p-3 rounded-lg shadow-sm border flex items-center justify-between"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                <span style={{ color: colors.text }}>Configuración</span>
                <ChevronRight size={16} style={{ color: colors.textSecondary }} />
              </button>
              <button
                className="w-full text-left p-3 rounded-lg shadow-sm border flex items-center justify-between"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                <span style={{ color: colors.text }}>Ayuda</span>
                <ChevronRight size={16} style={{ color: colors.textSecondary }} />
              </button>
              <button
                className="w-full text-left p-3 rounded-lg shadow-sm border flex items-center justify-between text-red-600"
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
              >
                <span>Cerrar Sesión</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </MobileLayout>
  )
}
