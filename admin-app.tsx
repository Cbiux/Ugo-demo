"use client"

import { useState, useEffect } from "react"
import { CreateTokenModal } from "@/components/modals"
import {
  LayoutDashboard,
  QrCode,
  Plus,
  User,
  Search,
  Bell,
  Settings,
  Utensils,
  Bus,
  BookOpen,
  CreditCard,
  Trash2,
  Edit,
  Moon,
  Sun,
  Copy,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { ugoColors, getThemeColors } from "@/lib/colors"
import { useTheme } from "@/contexts/theme-context"

export default function AdminApp() {
  const { isDark, toggleTheme } = useTheme()
  const colors = getThemeColors(isDark)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [showCreateTokenModal, setShowCreateTokenModal] = useState(false)
  const [selectedTokenType, setSelectedTokenType] = useState<any>(null)
  const [scannerActive, setScannerActive] = useState(false)
  const [lastScan, setLastScan] = useState<any>(null)

  const [formData, setFormData] = useState({
    tokenName: "",
    tokenAmount: "",
    adminEmail: "admin@ugo.edu",
    adminInstitution: "Universidad Nacional",
    searchUser: "",
    isTransferable: true,
    hasExpiry: false,
    expiryDate: "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Simulate QR scanner
  useEffect(() => {
    if (scannerActive) {
      const timer = setTimeout(() => {
        const mockScan = {
          user: "María García",
          token: "Comida",
          amount: 1,
          timestamp: new Date().toLocaleTimeString(),
          status: "valid",
        }
        setLastScan(mockScan)
        setScannerActive(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [scannerActive])

  const sidebarItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "scanner", icon: QrCode, label: "Escanear QR" },
    { id: "tokens", icon: Plus, label: "Crear Tokens" },
    { id: "profile", icon: User, label: "Perfil" },
  ]

  const tokenTypes = [
    { id: 1, name: "Comida", icon: Utensils, color: ugoColors.red, active: 150, total: 200 },
    { id: 2, name: "Transporte", icon: Bus, color: ugoColors.orange, active: 80, total: 100 },
    { id: 3, name: "Biblioteca", icon: BookOpen, color: ugoColors.blue, active: 45, total: 50 },
    { id: 4, name: "Acceso", icon: CreditCard, color: ugoColors.green, active: 120, total: 150 },
  ]

  const recentActivity = [
    { id: 1, action: "Token usado", user: "Juan Pérez", token: "Comida", time: "10:30 AM" },
    { id: 2, action: "Tokens creados", user: "Sistema", token: "Transporte", time: "09:15 AM" },
    { id: 3, action: "Token usado", user: "María García", token: "Biblioteca", time: "08:45 AM" },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copiado al portapapeles")
  }

  if (selectedTokenType) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
        <div className="shadow-sm p-6 border-b" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSelectedTokenType(null)}
                className="mr-4 hover:opacity-70"
                style={{ color: colors.text }}
              >
                ← Volver
              </button>
              <selectedTokenType.icon size={24} style={{ color: selectedTokenType.color }} className="mr-3" />
              <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
                Configurar {selectedTokenType.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: colors.surface }}>
              <h2 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Configuración del Token
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Nombre del Token
                  </label>
                  <input
                    type="text"
                    value={formData.tokenName || selectedTokenType.name}
                    onChange={(e) => handleInputChange("tokenName", e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Cantidad a crear
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    value={formData.tokenAmount}
                    onChange={(e) => handleInputChange("tokenAmount", e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: colors.text }}>
                    ¿Es transferible?
                  </span>
                  <button
                    onClick={() => handleInputChange("isTransferable", !formData.isTransferable)}
                    className={`w-12 h-6 rounded-full ${formData.isTransferable ? "bg-green-500" : "bg-gray-300"} relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        formData.isTransferable ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: colors.text }}>
                    ¿Tiene vencimiento?
                  </span>
                  <button
                    onClick={() => handleInputChange("hasExpiry", !formData.hasExpiry)}
                    className={`w-12 h-6 rounded-full ${formData.hasExpiry ? "bg-green-500" : "bg-gray-300"} relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        formData.hasExpiry ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                {formData.hasExpiry && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                      Fecha de vencimiento
                    </label>
                    <input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      style={{
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: colors.surface }}>
              <h2 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Usuarios Destinatarios
              </h2>
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Buscar usuario o wallet..."
                    value={formData.searchUser}
                    onChange={(e) => handleInputChange("searchUser", e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  />
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <Search size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {["Juan Pérez", "María García", "Carlos López", "Ana Martínez", "Luis Rodríguez"].map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded"
                    style={{ borderColor: colors.border }}
                  >
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      <span className="text-sm" style={{ color: colors.text }}>
                        {user}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                      ID: 202400{index + 1}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t" style={{ borderColor: colors.border }}>
                <button
                  onClick={() => alert("Tokens creados y distribuidos exitosamente")}
                  className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90"
                  style={{ backgroundColor: selectedTokenType.color }}
                >
                  Crear y Distribuir Tokens
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
                Dashboard Administrativo
              </h1>
              <p style={{ color: colors.textSecondary }}>Gestiona tokens y monitorea la actividad del sistema</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {tokenTypes.map((token) => {
                const Icon = token.icon
                return (
                  <div
                    key={token.id}
                    className="p-6 rounded-lg shadow-sm border-l-4"
                    style={{
                      backgroundColor: colors.surface,
                      borderLeftColor: token.color,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon size={24} style={{ color: token.color }} />
                      <span className="text-sm" style={{ color: colors.textSecondary }}>
                        {token.name}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold" style={{ color: colors.text }}>
                        {token.active}
                      </p>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        de {token.total} activos
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: colors.surface }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                  Actividad Reciente
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: colors.bg }}
                    >
                      <div>
                        <p className="font-medium text-sm" style={{ color: colors.text }}>
                          {activity.action}
                        </p>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
                          {activity.user} - {activity.token}
                        </p>
                      </div>
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: colors.surface }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                  Estadísticas del Día
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span style={{ color: colors.textSecondary }}>Tokens usados</span>
                    <span className="font-bold text-xl" style={{ color: colors.text }}>
                      47
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: colors.textSecondary }}>Usuarios activos</span>
                    <span className="font-bold text-xl" style={{ color: colors.text }}>
                      23
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: colors.textSecondary }}>Tokens creados</span>
                    <span className="font-bold text-xl" style={{ color: colors.text }}>
                      100
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "scanner":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6" style={{ color: colors.text }}>
              Escanear QR
            </h1>

            <div className="max-w-2xl mx-auto">
              <div className="p-8 rounded-lg shadow-sm text-center" style={{ backgroundColor: colors.surface }}>
                <div
                  className={`w-64 h-64 rounded-lg mx-auto mb-6 flex items-center justify-center relative ${
                    scannerActive ? "animate-pulse" : ""
                  }`}
                  style={{ backgroundColor: colors.bg }}
                >
                  <QrCode size={120} className="text-gray-400" />
                  {scannerActive && (
                    <div className="absolute inset-0 border-2 border-blue-500 rounded-lg animate-pulse">
                      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
                      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
                    </div>
                  )}
                </div>

                <h2 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
                  {scannerActive ? "Escaneando..." : "Listo para escanear"}
                </h2>
                <p className="mb-6" style={{ color: colors.textSecondary }}>
                  {scannerActive ? "Procesando código QR..." : "Apunta la cámara hacia el código QR del estudiante"}
                </p>

                <button
                  onClick={() => setScannerActive(!scannerActive)}
                  disabled={scannerActive}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 mb-6"
                >
                  {scannerActive ? (
                    <>
                      <Clock size={16} className="inline mr-2" />
                      Escaneando...
                    </>
                  ) : (
                    "Iniciar Escáner"
                  )}
                </button>

                {lastScan && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.bg }}>
                    <div className="flex items-center justify-center mb-2">
                      {lastScan.status === "valid" ? (
                        <CheckCircle size={24} className="text-green-500 mr-2" />
                      ) : (
                        <XCircle size={24} className="text-red-500 mr-2" />
                      )}
                      <h3 className="font-semibold" style={{ color: colors.text }}>
                        {lastScan.status === "valid" ? "Validación Exitosa" : "Token Inválido"}
                      </h3>
                    </div>
                    <div className="text-left space-y-1">
                      <p>
                        <span style={{ color: colors.textSecondary }}>Usuario:</span>{" "}
                        <span style={{ color: colors.text }}>{lastScan.user}</span>
                      </p>
                      <p>
                        <span style={{ color: colors.textSecondary }}>Token:</span>{" "}
                        <span style={{ color: colors.text }}>{lastScan.token}</span>
                      </p>
                      <p>
                        <span style={{ color: colors.textSecondary }}>Cantidad:</span>{" "}
                        <span style={{ color: colors.text }}>{lastScan.amount}</span>
                      </p>
                      <p>
                        <span style={{ color: colors.textSecondary }}>Hora:</span>{" "}
                        <span style={{ color: colors.text }}>{lastScan.timestamp}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case "tokens":
        return (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
                Gestión de Tokens
              </h1>
              <button
                onClick={() => setShowCreateTokenModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Nuevo Tipo de Token
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tokenTypes.map((token) => {
                const Icon = token.icon
                return (
                  <div
                    key={token.id}
                    className="p-6 rounded-lg shadow-sm border-2 hover:shadow-md transition-shadow"
                    style={{ backgroundColor: colors.surface }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Icon size={24} style={{ color: token.color }} className="mr-3" />
                        <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                          {token.name}
                        </h3>
                      </div>
                      <div className="flex space-x-2">
                        <button className="hover:opacity-70" style={{ color: colors.textSecondary }}>
                          <Edit size={16} />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Activos:</span>
                        <span className="font-semibold" style={{ color: colors.text }}>
                          {token.active}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Total:</span>
                        <span className="font-semibold" style={{ color: colors.text }}>
                          {token.total}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: colors.textSecondary }}>Usados:</span>
                        <span className="font-semibold" style={{ color: colors.text }}>
                          {token.total - token.active}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedTokenType(token)}
                      className="w-full py-2 text-white rounded-lg font-semibold hover:opacity-90"
                      style={{ backgroundColor: token.color }}
                    >
                      Configurar
                    </button>
                  </div>
                )
              })}
            </div>

            <CreateTokenModal isOpen={showCreateTokenModal} onClose={() => setShowCreateTokenModal(false)} />
          </div>
        )

      case "profile":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6" style={{ color: colors.text }}>
              Perfil de Administrador
            </h1>

            <div className="max-w-2xl">
              <div className="p-6 rounded-lg shadow-sm mb-6" style={{ backgroundColor: colors.surface }}>
                <div className="flex items-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mr-6"
                    style={{ backgroundColor: colors.bg }}
                  >
                    <User size={40} style={{ color: colors.textSecondary }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>
                      Admin UGO
                    </h2>
                    <p style={{ color: colors.textSecondary }}>Administrador del Sistema</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.adminEmail}
                      onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      style={{
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                      Institución
                    </label>
                    <input
                      type="text"
                      value={formData.adminInstitution}
                      onChange={(e) => handleInputChange("adminInstitution", e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      style={{
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                      Wallet Address
                    </label>
                    <div
                      className="flex items-center justify-between p-2 rounded border"
                      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                    >
                      <span className="text-sm font-mono" style={{ color: colors.text }}>
                        GADM...A7X9
                      </span>
                      <button onClick={() => copyToClipboard("GADMA7X9ADMIN")} className="text-blue-500">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                      Último acceso
                    </label>
                    <input
                      type="text"
                      value="Hoy, 09:30 AM"
                      className="w-full p-2 border rounded-lg"
                      style={{
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                      readOnly
                    />
                  </div>
                </div>

                {/* QR Code Section */}
                <div
                  className="p-4 rounded-lg border mb-6 text-center"
                  style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                >
                  <h3 className="font-semibold mb-4" style={{ color: colors.text }}>
                    Mi Código QR Administrativo
                  </h3>
                  <div
                    className="w-32 h-32 rounded-lg mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: colors.surface }}
                  >
                    <QrCode size={80} className="text-gray-400" />
                  </div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Código de identificación administrativa
                  </p>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: colors.border }}>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-3">
                    Guardar Cambios
                  </button>
                  <button
                    className="px-6 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
                    style={{ borderColor: colors.border, color: colors.text }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.bg }}>
      {/* Sidebar */}
      <div className="w-64 shadow-sm" style={{ backgroundColor: colors.surface }}>
        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: colors.border }}>
          <img src="/ugo-logo-new.png" alt="UGO Admin" className="h-10" />
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "text-white" : "hover:opacity-70"
                  }`}
                  style={{
                    backgroundColor: isActive ? ugoColors.primary : "transparent",
                    color: isActive ? "white" : colors.text,
                  }}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header
          className="shadow-sm p-4 border-b"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold" style={{ color: colors.text }}>
                Panel de Administración UGO
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:opacity-70" style={{ color: colors.text }}>
                <Bell size={20} />
              </button>
              <button className="hover:opacity-70" style={{ color: colors.text }}>
                <Settings size={20} />
              </button>
              <button onClick={toggleTheme} className="p-2 rounded-lg hover:opacity-70" style={{ color: colors.text }}>
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">{renderContent()}</main>
      </div>
    </div>
  )
}
