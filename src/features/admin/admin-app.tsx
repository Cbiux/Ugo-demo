"use client"

import { useState, useEffect, useRef } from "react"
import { CreateTokenModal } from "@/src/components/modals/modals"
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
  Edit,
  Moon,
  Sun,
  Copy,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { ugoColors, getThemeColors } from "@/src/lib/colors"
import { useTheme } from "@/src/contexts/theme-context"

export default function AdminApp() {
  const { isDark, toggleTheme } = useTheme()
  const colors = getThemeColors(isDark)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [showCreateTokenModal, setShowCreateTokenModal] = useState(false)
  const [selectedTokenType, setSelectedTokenType] = useState<any>(null)
  const [scannerActive, setScannerActive] = useState(false)
  const [lastScan, setLastScan] = useState<any>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<{[key: string]: {selected: boolean, tokens: number}}>({
    "Juan Pérez": { selected: true, tokens: 5 },
    "María García": { selected: true, tokens: 3 },
    "Carlos López": { selected: true, tokens: 2 },
    "Ana Martínez": { selected: true, tokens: 4 },
    "Luis Rodríguez": { selected: true, tokens: 1 }
  })
  const [isProfileEditing, setIsProfileEditing] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const [formData, setFormData] = useState({
    tokenName: "",
    tokenAmount: "",
    tokenColor: ugoColors.blue,
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

  const handleUserToggle = (userName: string) => {
    setSelectedUsers(prev => ({
      ...prev,
      [userName]: {
        ...prev[userName],
        selected: !prev[userName].selected
      }
    }))
  }

  const handleUserTokensChange = (userName: string, tokens: number) => {
    setSelectedUsers(prev => ({
      ...prev,
      [userName]: {
        ...prev[userName],
        tokens: Math.max(1, tokens)
      }
    }))
  }

  const getSelectedUsersCount = () => {
    return Object.values(selectedUsers).filter(user => user.selected).length
  }

  const getTotalTokensToDistribute = () => {
    return Object.values(selectedUsers)
      .filter(user => user.selected)
      .reduce((sum, user) => sum + user.tokens, 0)
  }

  const addNewToken = (tokenData: any) => {
    const maxId = Math.max(...tokenTypes.map(token => token.id), 0)
    const newToken = {
      id: maxId + 1,
      name: tokenData.name,
      icon: CreditCard, // Default icon for new tokens
      color: tokenData.color,
      active: parseInt(tokenData.amount) || 0,
      total: parseInt(tokenData.amount) || 0
    }
    
    // Debug: Log current tokens and new token
    console.log('Current tokens:', tokenTypes.map(t => ({ id: t.id, name: t.name })))
    console.log('Adding new token:', { id: newToken.id, name: newToken.name })
    
    setTokenTypes(prev => [...prev, newToken])
  }

  const updateTokenAmount = (tokenId: number, additionalAmount: number) => {
    setTokenTypes(prev => prev.map(token => 
      token.id === tokenId 
        ? { 
            ...token, 
            active: token.active + additionalAmount,
            total: token.total + additionalAmount
          }
        : token
    ))
  }


  // Simulate QR scanner with realistic data
  useEffect(() => {
    if (scannerActive) {
      const timer = setTimeout(() => {
        // Array de personas simuladas con datos completos
        const mockStudents = [
          {
            user: "María Elena García Rodríguez",
            studentId: "20210156789",
            accountStatus: "Activa",
            walletAddress: "0x742d35Cc6798C42c4CdC8f3A9B2f",
            photo: "/assets/images/placeholder-user.jpg",
            lastActivity: "Hace 5 minutos",
            token: "Comida",
            amount: 1,
            tokenBalance: {
              comida: 15,
              transporte: 8,
              biblioteca: 3,
              acceso: 2
            },
            totalTokensUsed: 45,
            status: "valid",
            scanId: Math.floor(Math.random() * 10000),
          },
          {
            user: "Carlos Alberto Mendoza Silva",
            studentId: "20190234567",
            accountStatus: "Activa",
            walletAddress: "0xa9B3d28Fc8912A5e7C6B9D4e",
            photo: "/assets/images/placeholder-user.jpg",
            lastActivity: "Hace 12 minutos",
            token: "Transporte",
            amount: 2,
            tokenBalance: {
              comida: 12,
              transporte: 20,
              biblioteca: 5,
              acceso: 1
            },
            totalTokensUsed: 78,
            status: "valid",
            scanId: Math.floor(Math.random() * 10000),
          },
          {
            user: "Ana Sofia Herrera López",
            studentId: "20220987654",
            accountStatus: "Activa",
            walletAddress: "0x1f8E4B7a2C5d9F3e8A2B5C7a",
            photo: "/assets/images/placeholder-user.jpg",
            lastActivity: "Hace 2 minutos",
            token: "Biblioteca",
            amount: 1,
            tokenBalance: {
              comida: 8,
              transporte: 6,
              biblioteca: 25,
              acceso: 4
            },
            totalTokensUsed: 32,
            status: "valid",
            scanId: Math.floor(Math.random() * 10000),
          },
          {
            user: "Diego Fernando Ruiz Castro",
            studentId: "20180345678",
            accountStatus: "Activa",
            walletAddress: "0x3c7F2eB8a1D6C9f4E5A32B8c",
            photo: "/assets/images/placeholder-user.jpg",
            lastActivity: "Hace 18 minutos",
            token: "Acceso",
            amount: 1,
            tokenBalance: {
              comida: 10,
              transporte: 15,
              biblioteca: 8,
              acceso: 12
            },
            totalTokensUsed: 89,
            status: "valid",
            scanId: Math.floor(Math.random() * 10000),
          },
          {
            user: "Lucía Patricia Vega Moreno",
            studentId: "20210876543",
            accountStatus: "Suspendida",
            walletAddress: "0x8e2D1a9C4f7B6e3A5D8F4E9a",
            photo: "/assets/images/placeholder-user.jpg",
            lastActivity: "Hace 3 días",
            token: "Comida",
            amount: 1,
            tokenBalance: {
              comida: 0,
              transporte: 2,
              biblioteca: 1,
              acceso: 0
            },
            totalTokensUsed: 15,
            status: "invalid",
            scanId: Math.floor(Math.random() * 10000),
          },
          {
            user: "Roberto Alejandro Jiménez Torres",
            studentId: "20200456789",
            accountStatus: "Activa",
            walletAddress: "0x5b9A3d2E8f1C7a4B6e9D7F2c",
            photo: "/assets/images/placeholder-user.jpg",
            lastActivity: "Hace 8 minutos",
            token: "Transporte",
            amount: 3,
            tokenBalance: {
              comida: 18,
              transporte: 25,
              biblioteca: 12,
              acceso: 8
            },
            totalTokensUsed: 156,
            status: "valid",
            scanId: Math.floor(Math.random() * 10000),
          }
        ];

        // Seleccionar una persona aleatoria
        const randomStudent = mockStudents[Math.floor(Math.random() * mockStudents.length)];
        
        // Agregar timestamp actual
        const mockScan = {
          ...randomStudent,
          timestamp: new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
          }),
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

  const [tokenTypes, setTokenTypes] = useState([
    { id: 1, name: "Comida", icon: Utensils, color: ugoColors.red, active: 150, total: 200 },
    { id: 2, name: "Transporte", icon: Bus, color: ugoColors.orange, active: 80, total: 100 },
    { id: 3, name: "Biblioteca", icon: BookOpen, color: ugoColors.blue, active: 45, total: 50 },
    { id: 4, name: "Acceso", icon: CreditCard, color: ugoColors.green, active: 120, total: 150 },
  ])

  const recentActivity = [
    { id: 1, action: "Token usado", user: "Juan Pérez", token: "Comida", time: "10:30 AM" },
    { id: 2, action: "Tokens creados", user: "Sistema", token: "Transporte", time: "09:15 AM" },
    { id: 3, action: "Token usado", user: "María García", token: "Biblioteca", time: "08:45 AM" },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleSectionChange = async (newSection: string) => {
    if (newSection === activeSection) return
    
    setIsLoading(true)
    const sectionNames = {
      dashboard: 'Panel Principal',
      scanner: 'Escáner QR', 
      tokens: 'Gestión de Tokens',
      profile: 'Perfil de Administrador'
    }
    setLoadingMessage(`Cargando ${sectionNames[newSection as keyof typeof sectionNames]}...`)
    
    await new Promise(resolve => setTimeout(resolve, 1300))
    
    setActiveSection(newSection)
    setIsLoading(false)
    setLoadingMessage(null)
  }

  const handleTokenAction = async (action: string, tokenName: string) => {
    setIsLoading(true)
    const actions = {
      'configure': `Configurando ${tokenName}...`,
      'create': 'Creando nuevo token...',
      'edit': `Cargando configuración de ${tokenName}...`,
      'delete': `Eliminando ${tokenName}...`
    }
    setLoadingMessage(actions[action as keyof typeof actions] || 'Procesando...')
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (action === 'configure' || action === 'edit') {
      const token = tokenTypes.find(t => t.name === tokenName)
      if (token) {
        // Clear form first for edit mode
        setFormData(prev => ({
          ...prev,
          tokenName: "",
          tokenAmount: "",
          searchUser: ""
        }))
        setSelectedTokenType(token)
      }
    }
    
    setIsLoading(false)
    setLoadingMessage(null)
  }

  // Componente de loading para admin
  const AdminLoadingOverlay = ({ message }: { message: string }) => (
    <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: colors.bg + 'DD' }}>
      <div className="text-center p-8 rounded-2xl shadow-2xl border" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
        {/* Admin logo animation */}
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto relative">
            {/* Multiple spinning rings */}
            <div 
              className="absolute inset-0 border-4 border-transparent rounded-full animate-spin" 
              style={{ 
                borderTopColor: ugoColors.primary,
                borderRightColor: ugoColors.blue,
                animationDuration: '1.2s'
              }}
            ></div>
            <div 
              className="absolute inset-1 border-3 border-transparent rounded-full animate-spin" 
              style={{ 
                borderBottomColor: ugoColors.green,
                borderLeftColor: ugoColors.orange,
                animationDuration: '1.8s',
                animationDirection: 'reverse'
              }}
            ></div>
            <div 
              className="absolute inset-2 border-2 border-transparent rounded-full animate-spin" 
              style={{ 
                borderTopColor: ugoColors.red,
                animationDuration: '2.4s'
              }}
            ></div>
            {/* Logo container */}
            <div className="absolute inset-3 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: colors.bg }}>
              <img src="/assets/images/ugo-logo-new.png" alt="UGO" className="w-6 h-6" />
            </div>
          </div>
          {/* Double ripple effect */}
          <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full animate-ping opacity-20" style={{ backgroundColor: ugoColors.primary, animationDelay: '0s' }}></div>
          <div className="absolute inset-0 w-16 h-16 mx-auto rounded-full animate-ping opacity-10" style={{ backgroundColor: ugoColors.blue, animationDelay: '0.5s' }}></div>
        </div>
        
        {/* Loading bars */}
        <div className="flex justify-center space-x-1 mb-4">
          <div className="w-1 h-8 rounded-full animate-bounce" style={{ backgroundColor: ugoColors.primary, animationDelay: '0ms' }}></div>
          <div className="w-1 h-6 rounded-full animate-bounce" style={{ backgroundColor: ugoColors.blue, animationDelay: '100ms' }}></div>
          <div className="w-1 h-4 rounded-full animate-bounce" style={{ backgroundColor: ugoColors.green, animationDelay: '200ms' }}></div>
          <div className="w-1 h-6 rounded-full animate-bounce" style={{ backgroundColor: ugoColors.orange, animationDelay: '300ms' }}></div>
          <div className="w-1 h-8 rounded-full animate-bounce" style={{ backgroundColor: ugoColors.red, animationDelay: '400ms' }}></div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Administración UGO</h3>
        <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>{message}</p>
      </div>
    </div>
  )

  // Token Configuration Component (unified but simplified)
  const TokenConfigView = ({ token, isNewToken = false }: { token: any, isNewToken?: boolean }) => {
    
    return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <div className="shadow-sm p-6 border-b" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => {
                setSelectedTokenType(null)
                setShowCreateTokenModal(false)
                if (successMessage) setSuccessMessage(null)
              }}
              className="mr-4 hover:opacity-70"
              style={{ color: colors.text }}
            >
              ← Volver
            </button>
            {!isNewToken && token && <token.icon size={24} style={{ color: token.color }} className="mr-3" />}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
                {isNewToken ? "Crear Nuevo Token" : `Configurar ${token?.name}`}
              </h1>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                {isNewToken ? "Crear y distribuir tokens a usuarios específicos" : "Aumentar y distribuir tokens existentes"}
              </p>
            </div>
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
                  Nombre del Token {isNewToken && "*"}
                </label>
                <input
                  type="text"
                  value={isNewToken ? (formData.tokenName || "") : (token?.name || "")}
                  onChange={(e) => isNewToken ? handleInputChange("tokenName", e.target.value) : undefined}
                  placeholder={isNewToken ? "Ej: Comida, Transporte, Biblioteca" : ""}
                  disabled={!isNewToken}
                  className={`w-full p-3 border rounded-lg ${!isNewToken ? 'disabled:bg-gray-100 disabled:text-gray-600' : ''}`}
                  style={{
                    backgroundColor: isNewToken ? colors.bg : colors.surface,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                  {isNewToken ? "Total a Mintear *" : "Aumentar Cantidad de Tokens *"}
                </label>
                <input
                  type="number"
                  placeholder={isNewToken ? "100" : "Cantidad a agregar"}
                  value={formData.tokenAmount || ""}
                  onChange={(e) => handleInputChange("tokenAmount", e.target.value)}
                  min="1"
                  className="w-full p-3 border rounded-lg"
                  style={{
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
                {!isNewToken && token && (
                  <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                    Actualmente: {token.active} de {token.total} tokens disponibles
                  </p>
                )}
              </div>

              {isNewToken && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                      Color del Token
                    </label>
                    <div className="flex space-x-2">
                      {[ugoColors.red, ugoColors.orange, ugoColors.blue, ugoColors.green].map((color) => (
                        <button
                          key={color}
                          onClick={() => handleInputChange("tokenColor", color)}
                          className={`w-10 h-10 rounded-full border-3 transition-all ${
                            (formData.tokenColor || ugoColors.blue) === color ? "border-gray-800 scale-110" : "border-gray-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2">
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

                  <div className="flex items-center justify-between py-2">
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
                        className="w-full p-3 border rounded-lg"
                        style={{
                          backgroundColor: colors.bg,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: colors.surface }}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
              Usuarios Destinatarios {isNewToken && "*"}
            </h2>
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Buscar usuario por nombre o ID..."
                  value={formData.searchUser || ""}
                  onChange={(e) => handleInputChange("searchUser", e.target.value)}
                  className="flex-1 p-3 border rounded-lg"
                  style={{
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
                <button 
                  onClick={() => {
                    if (formData.searchUser?.trim()) {
                      setSuccessMessage(`Buscando usuario: "${formData.searchUser}"`)
                      setTimeout(() => setSuccessMessage(null), 3000)
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  title="Buscar usuario"
                >
                  <Search size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {[
                { name: "Juan Pérez", id: "20240001" },
                { name: "María García", id: "20240002" },
                { name: "Carlos López", id: "20240003" },
                { name: "Ana Martínez", id: "20240004" },
                { name: "Luis Rodríguez", id: "20240005" }
              ].map((user, index) => {
                const userState = selectedUsers[user.name]
                const isSelected = userState?.selected || false
                const tokenColor = isNewToken ? (formData.tokenColor || ugoColors.blue) : (token?.color || ugoColors.blue)
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 border rounded hover:bg-opacity-50 transition-all ${
                      isSelected ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    style={{ 
                      borderColor: isSelected ? (tokenColor || colors.border) : colors.border,
                      backgroundColor: isSelected ? (isDark ? tokenColor + '20' : tokenColor + '10') : 'transparent'
                    }}
                  >
                    <div className="flex items-center flex-1">
                      <input 
                        type="checkbox" 
                        className="mr-3 w-4 h-4" 
                        checked={isSelected}
                        onChange={() => handleUserToggle(user.name)}
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium" style={{ color: colors.text }}>
                          {user.name}
                        </span>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>
                          ID: {user.id}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex items-center ml-4">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={userState?.tokens || 1}
                          onChange={(e) => handleUserTokensChange(user.name, parseInt(e.target.value) || 1)}
                          className="w-16 p-1 border rounded text-center text-sm"
                          style={{
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                            color: colors.text,
                          }}
                        />
                        <span className="ml-2 text-xs" style={{ color: colors.textSecondary }}>tokens</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Resumen de distribución */}
            <div className={`mt-4 p-3 rounded-lg border ${getSelectedUsersCount() > 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-sm ${getSelectedUsersCount() > 0 ? 'text-blue-700' : 'text-gray-600'}`}>
                <strong>{getSelectedUsersCount()}</strong> usuarios seleccionados
              </p>
              <p className={`text-sm ${getSelectedUsersCount() > 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                Total a distribuir: <strong>{getTotalTokensToDistribute()}</strong> tokens
              </p>
            </div>

            {/* Mensaje de éxito */}
            {successMessage && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-green-700 font-medium">{successMessage}</p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t" style={{ borderColor: colors.border }}>
              <button
                onClick={async () => {
                  if (isNewToken && (!formData.tokenName || !formData.tokenAmount)) {
                    setSuccessMessage("Por favor completa todos los campos requeridos")
                    setTimeout(() => setSuccessMessage(null), 3000)
                    return
                  }
                  if (!isNewToken && !formData.tokenAmount) {
                    setSuccessMessage("Por favor ingresa la cantidad de tokens a agregar")
                    setTimeout(() => setSuccessMessage(null), 3000)
                    return
                  }
                  if (getSelectedUsersCount() === 0) {
                    setSuccessMessage("Por favor selecciona al menos un usuario")
                    setTimeout(() => setSuccessMessage(null), 3000)
                    return
                  }

                  setIsLoading(true)
                  setSuccessMessage(null)
                  
                  if (isNewToken) {
                    setLoadingMessage('Creando token y distribuyendo...')
                    await new Promise(resolve => setTimeout(resolve, 2500))
                    
                    // Create new token
                    const tokenData = {
                      name: formData.tokenName,
                      color: formData.tokenColor || ugoColors.blue,
                      amount: formData.tokenAmount
                    }
                    addNewToken(tokenData)
                    
                    setSuccessMessage(`Token "${formData.tokenName}" creado y ${getTotalTokensToDistribute()} tokens distribuidos a ${getSelectedUsersCount()} usuarios`)
                    
                    // Reset form
                    setFormData(prev => ({
                      ...prev,
                      tokenName: "",
                      tokenAmount: "",
                      tokenColor: ugoColors.blue,
                      searchUser: ""
                    }))
                  } else {
                    setLoadingMessage('Aumentando tokens y distribuyendo...')
                    await new Promise(resolve => setTimeout(resolve, 2500))
                    
                    // Update existing token amount
                    const additionalAmount = parseInt(formData.tokenAmount) || 0
                    updateTokenAmount(token.id, additionalAmount)
                    
                    setSuccessMessage(`${additionalAmount} tokens agregados al suministro. ${getTotalTokensToDistribute()} tokens distribuidos a ${getSelectedUsersCount()} usuarios`)
                    
                    // Reset amount field
                    setFormData(prev => ({
                      ...prev,
                      tokenAmount: "",
                      searchUser: ""
                    }))
                  }
                  
                  setIsLoading(false)
                  setLoadingMessage(null)
                  
                  // Auto-hide success message after 5 seconds
                  setTimeout(() => {
                    setSuccessMessage(null)
                  }, 5000)
                }}
                disabled={getSelectedUsersCount() === 0 || (isNewToken && (!formData.tokenName || !formData.tokenAmount)) || (!isNewToken && !formData.tokenAmount)}
                className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: isNewToken ? (formData.tokenColor || ugoColors.blue) : (token?.color || ugoColors.blue) }}
              >
                {isNewToken ? "Crear y Distribuir Tokens" : `Aumentar y Distribuir (+${formData.tokenAmount || 0})`}
                {getSelectedUsersCount() > 0 && ` a ${getSelectedUsersCount()} usuarios`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  if (showCreateTokenModal) {
    return <TokenConfigView token={null} isNewToken={true} />
  }

  if (selectedTokenType) {
    return <TokenConfigView token={selectedTokenType} isNewToken={false} />
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
          <div className="p-6" style={{ backgroundColor: colors.bg }}>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
                Escáner QR
              </h1>
              <p style={{ color: colors.textSecondary }}>Validación de tokens estudiantiles</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Panel Izquierdo - Scanner */}
              <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: colors.surface }}>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-3" style={{ color: colors.text }}>
                    {scannerActive ? "🔍 Escaneando..." : "📱 Listo para escanear"}
                  </h2>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {scannerActive ? "Procesando código QR..." : "Coloca el código QR frente al escáner"}
                  </p>
                </div>

                {/* Scanner Area */}
                <div className="flex flex-col items-center justify-center mb-6">
                  <div
                    className={`w-80 h-80 rounded-2xl flex items-center justify-center relative border-4 transition-all duration-300 ${
                      scannerActive ? "border-blue-500 shadow-lg shadow-blue-200" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: colors.bg }}
                  >
                    <QrCode size={160} className={scannerActive ? "text-blue-500" : "text-gray-400"} />
                    {scannerActive && (
                      <>
                        {/* Scanning line */}
                        <div className="absolute inset-x-6 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-ping"
                             style={{ top: '45%' }}></div>
                        {/* Corner brackets */}
                        <div className="absolute top-3 left-3 w-8 h-8 border-t-3 border-l-3 border-green-400 rounded-tl-lg animate-pulse"></div>
                        <div className="absolute top-3 right-3 w-8 h-8 border-t-3 border-r-3 border-green-400 rounded-tr-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-3 border-l-3 border-green-400 rounded-bl-lg animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-3 border-r-3 border-green-400 rounded-br-lg animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      </>
                    )}
                  </div>

                  {/* Scanning status debajo del QR */}
                  {scannerActive && (
                    <div className="mt-6 flex items-center">
                      <div className="flex space-x-2 mr-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-blue-500 font-semibold text-lg">Procesando...</span>
                    </div>
                  )}
                </div>

                {/* Control Button */}
                <div className="text-center">
                  <button
                    onClick={() => setScannerActive(!scannerActive)}
                    disabled={scannerActive}
                    className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg"
                  >
                    {scannerActive ? (
                      <>
                        <Clock size={20} className="inline mr-3" />
                        Escaneando...
                      </>
                    ) : (
                      <>
                        <QrCode size={20} className="inline mr-3" />
                        Iniciar Escáner
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Panel Derecho - Información del Usuario */}
              <div className="p-6 rounded-lg shadow-sm overflow-y-auto max-h-[80vh]" style={{ backgroundColor: colors.surface }}>
                {!lastScan ? (
                  /* Estado inicial */
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-6xl mb-4">👤</div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
                      Información del Estudiante
                    </h3>
                    <p className="text-sm max-w-sm" style={{ color: colors.textSecondary }}>
                      Los datos del estudiante aparecerán aquí después de escanear su código QR
                    </p>
                  </div>
                ) : (
                  /* Información del usuario escaneado */
                  <div className="space-y-4">
                    {/* Status Header */}
                    <div className={`p-4 rounded-lg border-2 ${
                      lastScan.status === "valid" ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'
                    }`} style={{ backgroundColor: isDark ? (lastScan.status === "valid" ? '#065f4620' : '#dc262620') : undefined }}>
                      <div className="flex items-center">
                        {lastScan.status === "valid" ? (
                          <CheckCircle size={24} className="text-green-600 mr-3" />
                        ) : (
                          <XCircle size={24} className="text-red-600 mr-3" />
                        )}
                        <div>
                          <h3 className="font-bold text-lg" style={{ color: lastScan.status === "valid" ? '#059669' : '#DC2626' }}>
                            {lastScan.status === "valid" ? "✅ Token Válido" : "❌ Token Inválido"}
                          </h3>
                          <p className="text-sm opacity-75">
                            Scan #{lastScan.scanId} - {lastScan.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* User Profile */}
                    <div className="p-6 rounded-xl border-2 shadow-lg" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
                      <div className="flex items-start mb-6">
                        <div className="w-20 h-20 mr-6 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                          <img 
                            src={lastScan.photo} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center text-2xl font-bold text-blue-600" style={{ display: 'none' }}>
                            {lastScan.user.charAt(0)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xl font-bold mb-3" style={{ color: colors.text }}>
                            {lastScan.user}
                          </h4>
                          <div className="flex items-center mb-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                              ID: {lastScan.studentId}
                            </span>
                          </div>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${
                            lastScan.accountStatus === 'Activa' 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-red-100 text-red-800 border border-red-200'
                          }`}>
                            {lastScan.accountStatus === 'Activa' ? 'Cuenta Activa' : 'Cuenta Suspendida'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Wallet & Activity */}
                      <div className="grid grid-cols-1 gap-4 text-sm border-t-2 pt-4" style={{ borderColor: colors.border }}>
                        <div className="p-3 rounded-lg border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                          <div className="flex justify-between items-center">
                            <span className="font-medium" style={{ color: colors.textSecondary }}>
                              Wallet:
                            </span>
                            <span 
                              className="font-mono text-xs px-3 py-1 rounded-md border break-all" 
                              style={{ 
                                backgroundColor: colors.surface, 
                                color: colors.text,
                                borderColor: colors.border,
                                maxWidth: '200px'
                              }}
                            >
                              {lastScan.walletAddress}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                          <div className="flex justify-between items-center">
                            <span className="font-medium" style={{ color: colors.textSecondary }}>
                              Última actividad:
                            </span>
                            <span className="font-medium" style={{ color: colors.text }}>
                              {lastScan.lastActivity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="p-5 rounded-xl border-2 shadow-md" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
                      <h5 className="font-bold text-lg mb-4" style={{ color: colors.text }}>
                        Transacción Solicitada
                      </h5>
                      <div className="flex items-center justify-center p-4 rounded-lg" style={{ backgroundColor: colors.bg }}>
                        <div className="flex items-center">
                          <div className="flex items-center px-4 py-2 rounded-full text-white text-lg font-bold shadow-lg mr-4" 
                                style={{ backgroundColor: 
                                  lastScan.token === 'Comida' ? ugoColors.red :
                                  lastScan.token === 'Transporte' ? ugoColors.orange :
                                  lastScan.token === 'Biblioteca' ? ugoColors.blue : ugoColors.green
                                }}>
                            {lastScan.token}
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold" style={{ color: colors.text }}>
                              ×{lastScan.amount}
                            </div>
                            <div className="text-sm" style={{ color: colors.textSecondary }}>
                              tokens
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Token Balance */}
                    <div className="p-5 rounded-xl border-2 shadow-md" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
                      <h5 className="font-bold text-lg mb-4" style={{ color: colors.text }}>
                        Balance de Tokens
                      </h5>
                      <div className="grid grid-cols-2 gap-3">
                        {lastScan.tokenBalance && Object.entries(lastScan.tokenBalance).map(([tokenType, amount]) => {
                          const tokenInfo = {
                            comida: { name: 'Comida', color: ugoColors.red },
                            transporte: { name: 'Transporte', color: ugoColors.orange },
                            biblioteca: { name: 'Biblioteca', color: ugoColors.blue },
                            acceso: { name: 'Acceso', color: ugoColors.green }
                          }[tokenType] || { name: tokenType, color: '#666' }
                          
                          return (
                            <div key={tokenType} className="flex items-center p-3 rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow" 
                                 style={{ backgroundColor: colors.bg, borderColor: tokenInfo.color + '20' }}>
                              <div className="w-4 h-4 mr-3 rounded-full shadow-sm" style={{ backgroundColor: tokenInfo.color }}>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xl font-bold mb-1" style={{ color: tokenInfo.color }}>
                                  {amount as number}
                                </div>
                                <div className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                                  {tokenInfo.name}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      
                      {/* Stats Summary */}
                      <div className="mt-6 p-4 rounded-lg border-t-4 border-blue-500" style={{ backgroundColor: colors.bg }}>
                        <div className="text-center">
                          <div className="text-sm font-medium mb-2" style={{ color: colors.textSecondary }}>
                            Histórico de Uso
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-3xl font-bold text-blue-600 mr-2">
                              {lastScan.totalTokensUsed}
                            </div>
                            <div className="text-sm" style={{ color: colors.textSecondary }}>
                              tokens<br/>utilizados
                            </div>
                          </div>
                          <div className="text-xs mt-2 opacity-75" style={{ color: colors.textSecondary }}>
                            Total acumulado desde el registro
                          </div>
                        </div>
                      </div>
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
                onClick={() => {
                  // Clear form for new token creation
                  setFormData(prev => ({
                    ...prev,
                    tokenName: "",
                    tokenAmount: "",
                    tokenColor: ugoColors.blue,
                    searchUser: ""
                  }))
                  setShowCreateTokenModal(true)
                }}
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
                        <button 
                          onClick={() => handleTokenAction('edit', token.name)}
                          className="hover:opacity-70" 
                          style={{ color: colors.textSecondary }}
                          title="Editar configuración"
                        >
                          <Edit size={16} />
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
                      onClick={() => handleTokenAction('configure', token.name)}
                      className="w-full py-2 text-white rounded-lg font-semibold hover:opacity-90"
                      style={{ backgroundColor: token.color }}
                    >
                      Configurar
                    </button>
                  </div>
                )
              })}
            </div>

          </div>
        )

      case "profile":
        return (
          <div className="p-6 min-h-full" style={{ backgroundColor: colors.bg }}>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
                Perfil de Administrador
              </h1>
              <div className="flex items-center space-x-2">
                {!isProfileEditing ? (
                  <button
                    onClick={() => setIsProfileEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
                  >
                    <Edit size={16} className="mr-2" />
                    Editar Perfil
                  </button>
                ) : (
                  <>
                    <button
                      onClick={async () => {
                        setIsLoading(true)
                        setLoadingMessage('Guardando cambios del perfil...')
                        await new Promise(resolve => setTimeout(resolve, 1500))
                        setIsLoading(false)
                        setLoadingMessage(null)
                        setIsProfileEditing(false)
                        setProfileSaved(true)
                        setTimeout(() => setProfileSaved(false), 3000)
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileEditing(false)
                        setProfileSaved(false)
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>

            {profileSaved && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-green-700 font-medium">Perfil actualizado correctamente</p>
                </div>
              </div>
            )}

            <div className="max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información Personal */}
                <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: colors.surface }}>
                  <h2 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>
                    Información Personal
                  </h2>
                  
                  <div className="flex items-center mb-6">
                    <div className="relative mr-6">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center border-4"
                        style={{ backgroundColor: colors.bg, borderColor: ugoColors.primary }}
                      >
                        <User size={40} style={{ color: colors.textSecondary }} />
                      </div>
                      {isProfileEditing && (
                        <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 shadow-md">
                          <Edit size={14} />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-1" style={{ color: colors.text }}>
                        Admin UGO
                      </h3>
                      <p className="mb-2" style={{ color: colors.textSecondary }}>Administrador del Sistema</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        En línea
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                        Email Administrativo
                      </label>
                      <input
                        type="email"
                        value={formData.adminEmail}
                        onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                        disabled={!isProfileEditing}
                        className={`w-full p-3 border rounded-lg ${!isProfileEditing ? 'bg-gray-50' : ''}`}
                        style={{
                          backgroundColor: isProfileEditing ? colors.bg : colors.surface,
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
                        disabled={!isProfileEditing}
                        className={`w-full p-3 border rounded-lg ${!isProfileEditing ? 'bg-gray-50' : ''}`}
                        style={{
                          backgroundColor: isProfileEditing ? colors.bg : colors.surface,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                        Último acceso
                      </label>
                      <div className="flex items-center p-3 border rounded-lg" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                        <Clock size={16} className="mr-2" style={{ color: colors.textSecondary }} />
                        <span className="text-sm font-medium" style={{ color: colors.text }}>
                          Hoy, 09:30 AM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seguridad y Acceso */}
                <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: colors.surface }}>
                  <h2 className="text-xl font-semibold mb-6" style={{ color: colors.text }}>
                    Seguridad y Acceso
                  </h2>

                  {/* Wallet Address */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                      Wallet Address Administrativo
                    </label>
                    <div
                      className="flex items-center justify-between p-3 rounded-lg border"
                      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                    >
                      <span className="text-sm font-mono flex-1" style={{ color: colors.text }}>
                        GADM1A9E8F2C5B4D3A7X9
                      </span>
                      <button 
                        onClick={() => {
                          copyToClipboard("GADM1A9E8F2C5B4D3A7X9")
                          setSuccessMessage("Wallet address copiado al portapapeles")
                          setTimeout(() => setSuccessMessage(null), 2000)
                        }}
                        className="ml-2 p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Copiar wallet address"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div
                    className="p-6 rounded-lg border text-center mb-6"
                    style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                  >
                    <h3 className="font-semibold mb-4" style={{ color: colors.text }}>
                      Código QR Administrativo
                    </h3>
                    <div className="relative inline-block">
                      <div
                        className="w-32 h-32 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-inner border-2"
                        style={{ backgroundColor: colors.surface, borderColor: ugoColors.primary }}
                      >
                        <QrCode size={80} style={{ color: colors.text }} />
                      </div>
                      {/* QR corners */}
                      <div className="absolute top-1 left-1 w-4 h-4 border-l-2 border-t-2 border-blue-500 rounded-tl"></div>
                      <div className="absolute top-1 right-1 w-4 h-4 border-r-2 border-t-2 border-blue-500 rounded-tr"></div>
                      <div className="absolute bottom-5 left-1 w-4 h-4 border-l-2 border-b-2 border-blue-500 rounded-bl"></div>
                      <div className="absolute bottom-5 right-1 w-4 h-4 border-r-2 border-b-2 border-blue-500 rounded-br"></div>
                    </div>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      Código de identificación administrativa
                    </p>
                  </div>

                  {/* Security Actions */}
                  <div className="space-y-3">
                    <button 
                      onClick={() => {
                        setSuccessMessage("Token de acceso regenerado exitosamente")
                        setTimeout(() => setSuccessMessage(null), 3000)
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      Regenerar Token de Acceso
                    </button>
                    <button 
                      onClick={() => {
                        setSuccessMessage("Contraseña actualizada correctamente")
                        setTimeout(() => setSuccessMessage(null), 3000)
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      Cambiar Contraseña
                    </button>
                  </div>
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
    <div className="w-full flex min-h-screen" style={{ backgroundColor: colors.bg }}>
      {/* Sidebar */}
      <div 
        className={`${sidebarCollapsed ? 'w-16' : 'w-64'} shadow-sm transition-all duration-300 flex flex-col`} 
        style={{ backgroundColor: colors.surface, minHeight: '100vh' }}
      >
        <div className={`${sidebarCollapsed ? 'p-2' : 'p-6'} border-b flex items-center justify-center transition-all duration-300`} style={{ borderColor: colors.border }}>
          {!sidebarCollapsed ? (
            <img src="/assets/images/ugo-logo-new.png" alt="UGO Admin" className="h-12 transition-all duration-300" />
          ) : (
            <img src="/assets/images/ugo-logo-new.png" alt="UGO Admin" className="h-6 transition-all duration-300" />
          )}
        </div>

        <nav className="p-4 flex-1" style={{ backgroundColor: colors.surface }}>
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-4'} py-3 rounded-lg transition-all duration-300 ${
                    isActive ? "text-white" : "hover:opacity-70"
                  }`}
                  style={{
                    backgroundColor: isActive ? ugoColors.primary : "transparent",
                    color: isActive ? "white" : colors.text,
                  }}
                  title={sidebarCollapsed ? item.label : ''}
                >
                  <Icon size={20} className={sidebarCollapsed ? '' : 'mr-3'} />
                  {!sidebarCollapsed && (
                    <span className="transition-opacity duration-300">{item.label}</span>
                  )}
                </button>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header
          className="shadow-sm p-2 border-b"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ color: colors.text }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold" style={{ color: colors.text }}>
                Panel de Administración UGO
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg transition-colors" 
                  style={{ color: colors.text }}
                  title="Notificaciones"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? colors.bg : '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Bell size={20} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                </button>

                {/* Notifications Popup */}
                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowNotifications(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-2 w-80 rounded-lg shadow-xl border z-50" style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
                    <div className="p-4 border-b" style={{ borderColor: colors.border }}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg" style={{ color: colors.text }}>Notificaciones</h3>
                        <button 
                          onClick={() => setShowNotifications(false)}
                          className="p-1 rounded-full transition-colors"
                          style={{ ':hover': { backgroundColor: isDark ? colors.bg : '#f3f4f6' } }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? colors.bg : '#f3f4f6'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          <svg className="w-4 h-4" style={{ color: colors.textSecondary }} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[
                        { id: 1, title: "Nuevo escaneo QR", message: "María García escaneó token de comida", time: "Hace 2 min", unread: true },
                        { id: 2, title: "Token creado", message: "500 tokens de transporte agregados al sistema", time: "Hace 15 min", unread: true },
                        { id: 3, title: "Usuario registrado", message: "Juan Pérez se registró en el sistema", time: "Hace 1 hora", unread: true },
                        { id: 4, title: "Sistema actualizado", message: "Nueva versión 2.1.0 instalada correctamente", time: "Hace 2 horas", unread: false },
                        { id: 5, title: "Backup completado", message: "Respaldo automático realizado exitosamente", time: "Hace 6 horas", unread: false },
                      ].map((notif) => (
                        <div 
                          key={notif.id} 
                          className="p-4 border-b transition-colors cursor-pointer"
                          style={{ 
                            borderColor: colors.border,
                            backgroundColor: notif.unread ? (isDark ? '#1e3a8a20' : '#dbeafe') : 'transparent',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? colors.bg : '#f9fafb'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notif.unread ? (isDark ? '#1e3a8a20' : '#dbeafe') : 'transparent'}
                        >
                          <div className="flex items-start">
                            {notif.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm" style={{ color: colors.text }}>{notif.title}</p>
                              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>{notif.message}</p>
                              <p className="text-xs mt-2" style={{ color: colors.textSecondary }}>{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t text-center" style={{ borderColor: colors.border }}>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-sm font-medium hover:opacity-80 transition-opacity"
                        style={{ color: '#3b82f6' }}
                      >
                        Ver todas las notificaciones
                      </button>
                    </div>
                  </div>
                  </>
                )}
              </div>
              
              <button 
                onClick={() => handleSectionChange('profile')}
                className="p-2 rounded-lg transition-colors" 
                style={{ color: colors.text }}
                title="Ir a Perfil"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? colors.bg : '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Settings size={20} />
              </button>
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-lg transition-colors" 
                style={{ color: colors.text }}
                title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? colors.bg : '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden relative">
          {renderContent()}
          {isLoading && loadingMessage && (
            <AdminLoadingOverlay message={loadingMessage} />
          )}
        </main>
      </div>
    </div>
  )
}
