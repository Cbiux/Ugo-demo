"use client"

import { useState } from "react"
import { X, QrCode, Send, Plus, Scan, Copy } from "lucide-react"
import { ugoColors, getThemeColors } from "@/src/lib/colors"
import { useTheme } from "@/src/contexts/theme-context"
import type { ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title: string
}

function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-60 rounded-[2rem]" onClick={onClose} />
      <div className="relative w-full max-w-xs max-h-[85%] overflow-y-auto rounded-xl shadow-xl" style={{ backgroundColor: colors.surface }}>
        <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: colors.border }}>
          <h2 className="text-base font-semibold" style={{ color: colors.text }}>
            {title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  )
}

export function TransferModal({
  isOpen,
  onClose,
  tokenName,
  tokenColor,
}: {
  isOpen: boolean
  onClose: () => void
  tokenName: string
  tokenColor: string
}) {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const [transferMethod, setTransferMethod] = useState<"wallet" | "qr">("wallet")
  const [walletAddress, setWalletAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanSuccess, setScanSuccess] = useState(false)

  const handleScanQR = async () => {
    setIsScanning(true)
    
    // Simulate QR scanning delay
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsScanning(false)
    setScanSuccess(true)
    setWalletAddress("GCDF...7H9K") // Simulate scanned address
    
    // Show scan success for 1 second
    setTimeout(() => {
      setScanSuccess(false)
    }, 1000)
  }

  const handleTransfer = async () => {
    setIsTransferring(true)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsTransferring(false)
    setTransferSuccess(true)
    
    // Show success for 2 seconds then close
    setTimeout(() => {
      setTransferSuccess(false)
      setWalletAddress("")
      setAmount("")
      setScanSuccess(false)
      setIsScanning(false)
      onClose()
    }, 2000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Transferir ${tokenName}`}>
      {transferSuccess ? (
        // Success Animation
        <div className="text-center py-8">
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            {/* Success ripple effect */}
            <div className="absolute inset-0 w-20 h-20 mx-auto bg-green-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <h3 className="text-xl font-bold text-green-600 mb-2">¡Transferencia Exitosa!</h3>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            {amount} tokens de {tokenName} enviados
          </p>
        </div>
      ) : isTransferring ? (
        // Loading Animation
        <div className="text-center py-8">
          <div className="relative mb-6">
            {/* Token flying animation */}
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div 
                className="absolute inset-0 border-4 border-transparent rounded-full animate-spin" 
                style={{ borderTopColor: tokenColor }}
              ></div>
              <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{ backgroundColor: tokenColor }}>
                <Send size={20} className="text-white animate-pulse" />
              </div>
            </div>
            {/* Sending dots animation */}
            <div className="flex justify-center space-x-1 mb-4">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: tokenColor, animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: tokenColor, animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: tokenColor, animationDelay: '300ms' }}></div>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Enviando tokens...</h3>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Procesando transferencia de {amount} tokens
          </p>
        </div>
      ) : isScanning ? (
        // QR Scanning Animation
        <div className="text-center py-8">
          <div className="relative mb-6">
            {/* Camera viewfinder */}
            <div className="w-48 h-48 mx-auto relative border-2 border-gray-300 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              {/* Scanning line animation */}
              <div className="absolute inset-x-0 h-0.5 bg-green-400 shadow-lg animate-pulse"
                   style={{ 
                     animation: 'scan 2s linear infinite',
                     top: '20%'
                   }}></div>
              
              {/* QR corners */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-4 border-t-4 border-blue-500"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-r-4 border-t-4 border-blue-500"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-4 border-b-4 border-blue-500"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-4 border-b-4 border-blue-500"></div>
              
              {/* Mock QR code pattern */}
              <div className="absolute inset-8 grid grid-cols-8 gap-1">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.6 ? 'bg-black' : 'bg-transparent'} animate-pulse`}
                       style={{ animationDelay: `${i * 50}ms` }}></div>
                ))}
              </div>
              
              {/* Center focus square */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-green-400 rounded-lg animate-pulse shadow-lg"></div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-1 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          
          <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Escaneando código QR...</h3>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Apunta la cámara hacia el código QR del destinatario
          </p>
        </div>
      ) : scanSuccess ? (
        // QR Scan Success
        <div className="text-center py-8">
          <div className="relative mb-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <QrCode size={24} className="text-white animate-bounce" />
              </div>
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto bg-green-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <h3 className="text-lg font-bold text-green-600 mb-2">¡QR Escaneado!</h3>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            Dirección detectada: {walletAddress}
          </p>
        </div>
      ) : (
        // Transfer Form
        <div className="space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setTransferMethod("wallet")}
            className={`flex-1 py-2 px-4 rounded-lg border ${
              transferMethod === "wallet" ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            style={{
              backgroundColor:
                transferMethod === "wallet" ? (isDark ? ugoColors.blue + "20" : "#EBF8FF") : colors.surface,
              borderColor: transferMethod === "wallet" ? ugoColors.blue : colors.border,
            }}
          >
            Wallet Address
          </button>
          <button
            onClick={() => setTransferMethod("qr")}
            className={`flex-1 py-2 px-4 rounded-lg border ${
              transferMethod === "qr" ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            style={{
              backgroundColor: transferMethod === "qr" ? (isDark ? ugoColors.blue + "20" : "#EBF8FF") : colors.surface,
              borderColor: transferMethod === "qr" ? ugoColors.blue : colors.border,
            }}
          >
            <QrCode size={16} className="mx-auto" />
          </button>
        </div>

        {transferMethod === "wallet" ? (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
              Dirección de Wallet
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="GCKF...X7Y2"
              className="w-full p-2 border rounded-lg"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              }}
            />
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={handleScanQR}
              disabled={isScanning || scanSuccess}
              className="w-32 h-32 bg-gray-100 hover:bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <Scan size={48} className="text-gray-400" />
            </button>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {scanSuccess ? "QR escaneado correctamente" : "Toca para escanear código QR"}
            </p>
            {scanSuccess && walletAddress && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700">Destinatario:</p>
                <p className="font-mono text-sm text-green-800">{walletAddress}</p>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
            Cantidad de tokens
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1"
            className="w-full p-2 border rounded-lg"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            }}
          />
        </div>

          <button
            onClick={handleTransfer}
            disabled={
              !amount || 
              isTransferring || 
              isScanning ||
              (transferMethod === "wallet" && !walletAddress) || 
              (transferMethod === "qr" && !walletAddress)
            }
            className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
            style={{ backgroundColor: tokenColor }}
          >
            <Send size={16} className="inline mr-2" />
            {isTransferring ? "Enviando..." : 
             isScanning ? "Escaneando..." : 
             (transferMethod === "qr" && !walletAddress) ? "Escanea QR primero" :
             "Transferir Tokens"}
          </button>
        </div>
      )}
    </Modal>
  )
}

export function ReceiveModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const [copied, setCopied] = useState(false)
  
  const walletAddress = "GCKFX7Y2EXAMPLE" // Same as profile
  const displayAddress = "GCKF...X7Y2"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Fallback silencioso para navegadores que no soportan clipboard API
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Recibir Tokens">
      <div className="text-center space-y-3">
        {/* QR Code Display */}
        <div className="relative flex justify-center">
          <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center shadow-inner relative">
            <QrCode size={100} className="text-gray-800" />
            {/* QR Code corners */}
            <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-blue-500 rounded-tl"></div>
            <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-blue-500 rounded-tr"></div>
            <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-blue-500 rounded-bl"></div>
            <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-blue-500 rounded-br"></div>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="space-y-2">
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: colors.text }}>
              Tu dirección de wallet
            </p>
            <div 
              className="flex items-center justify-between p-2 rounded-lg border transition-colors"
              style={{ 
                backgroundColor: colors.bg, 
                borderColor: copied ? '#10B981' : colors.border 
              }}
            >
              <span className="text-xs font-mono flex-1 text-left" style={{ color: colors.text }}>
                {displayAddress}
              </span>
              <button 
                onClick={handleCopy}
                className={`ml-2 p-1 rounded transition-colors ${
                  copied ? 'text-green-600 bg-green-100' : 'text-blue-500 hover:bg-blue-50'
                }`}
              >
                {copied ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 mt-1 animate-fade-in">
                ¡Copiada!
              </p>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
          <h4 className="font-semibold text-blue-800 mb-1 text-xs">¿Cómo recibir?</h4>
          <div className="text-left space-y-0.5 text-xs text-blue-700">
            <p>• Muestra este QR</p>
            <p>• Comparte tu wallet</p>
          </div>
        </div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm"
        >
          Cerrar
        </button>

        {/* Profile Info */}
        <div className="flex items-center justify-center space-x-2 pt-1 border-t" style={{ borderColor: colors.border }}>
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600">JP</span>
          </div>
          <div className="text-left">
            <p className="font-medium text-xs" style={{ color: colors.text }}>Juan Pérez</p>
            <p className="text-xs" style={{ color: colors.textSecondary }}>ID: 2024001234</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

interface User {
  id: string
  name: string
  studentId: string
  tokens?: number
}

export function CreateTokenModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { isDark } = useTheme()
  const colors = getThemeColors(isDark)
  const [tokenData, setTokenData] = useState({
    name: "",
    totalSupply: "",
    transferable: true,
    hasExpiry: false,
    expiryDate: "",
    color: ugoColors.blue,
  })
  
  const [searchUser, setSearchUser] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const tokenColors = [ugoColors.red, ugoColors.orange, ugoColors.blue, ugoColors.green]
  
  // Mock users data
  const mockUsers: User[] = [
    { id: "1", name: "María Elena García Rodríguez", studentId: "20210156789" },
    { id: "2", name: "Carlos Alberto Mendoza Silva", studentId: "20190234567" },
    { id: "3", name: "Ana Sofia Herrera López", studentId: "20220987654" },
    { id: "4", name: "Diego Fernando Ruiz Castro", studentId: "20180345678" },
    { id: "5", name: "Lucía Patricia Vega Moreno", studentId: "20210876543" },
    { id: "6", name: "Roberto Alejandro Jiménez Torres", studentId: "20200456789" },
    { id: "7", name: "Elena Sofía Ramírez Cruz", studentId: "20211234567" },
    { id: "8", name: "Miguel Ángel Torres Pérez", studentId: "20191876543" }
  ]
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.studentId.includes(searchUser)
  )

  const handleUserToggle = (user: User) => {
    setSelectedUsers(prev => {
      const exists = prev.find(u => u.id === user.id)
      if (exists) {
        return prev.filter(u => u.id !== user.id)
      } else {
        return [...prev, { ...user, tokens: 1 }]
      }
    })
  }
  
  const handleUserTokenChange = (userId: string, tokens: number) => {
    setSelectedUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, tokens } : user
      )
    )
  }

  const handleCreate = async () => {
    if (!tokenData.name || !tokenData.totalSupply || selectedUsers.length === 0) {
      alert("Por favor completa todos los campos requeridos")
      return
    }
    
    setIsCreating(true)
    
    // Simulate creation process
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    setIsCreating(false)
    setShowSuccess(true)
    
    // Show success for 2 seconds then close
    setTimeout(() => {
      setShowSuccess(false)
      setTokenData({
        name: "",
        totalSupply: "",
        transferable: true,
        hasExpiry: false,
        expiryDate: "",
        color: ugoColors.blue,
      })
      setSelectedUsers([])
      setSearchUser("")
      onClose()
    }, 2500)
  }
  
  const getTotalTokensToDistribute = () => selectedUsers.reduce((sum, user) => sum + (user.tokens || 0), 0)

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-60" onClick={onClose} />
      <div className="relative w-full max-w-4xl mx-4 rounded-xl shadow-xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: colors.surface }}>
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: colors.border }}>
          <h2 className="text-xl font-semibold" style={{ color: colors.text }}>
            Crear Nuevo Token
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        {showSuccess ? (
          // Success Animation
          <div className="text-center py-12">
            <div className="relative mb-6">
              <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-10 h-10 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-500 rounded-full animate-ping opacity-20"></div>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">¡Token Creado Exitosamente!</h3>
            <p className="text-lg" style={{ color: colors.textSecondary }}>
              {getTotalTokensToDistribute()} tokens de "{tokenData.name}" distribuidos a {selectedUsers.length} usuarios
            </p>
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-700">Los tokens han sido minteados y distribuidos automáticamente</p>
            </div>
          </div>
        ) : isCreating ? (
          // Creating Animation
          <div className="text-center py-12">
            <div className="relative mb-6">
              <div className="w-24 h-24 mx-auto relative">
                <div 
                  className="absolute inset-0 border-4 border-transparent rounded-full animate-spin" 
                  style={{ 
                    borderTopColor: tokenData.color,
                    borderRightColor: tokenData.color,
                    animationDuration: '1.2s'
                  }}
                ></div>
                <div 
                  className="absolute inset-2 border-3 border-transparent rounded-full animate-spin" 
                  style={{ 
                    borderBottomColor: tokenData.color,
                    borderLeftColor: tokenData.color,
                    animationDuration: '1.8s',
                    animationDirection: 'reverse'
                  }}
                ></div>
                <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{ backgroundColor: tokenData.color }}>
                  <Plus size={24} className="text-white animate-pulse" />
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>Creando tokens...</h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Minteando {getTotalTokensToDistribute()} tokens y distribuyendo a {selectedUsers.length} usuarios
            </p>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: tokenData.color, animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: tokenData.color, animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: tokenData.color, animationDelay: '300ms' }}></div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Token Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Configuración del Token</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Nombre del Token *
                  </label>
                  <input
                    type="text"
                    value={tokenData.name}
                    onChange={(e) => setTokenData({ ...tokenData, name: e.target.value })}
                    placeholder="Ej: Comida, Transporte, Biblioteca"
                    className="w-full p-3 border rounded-lg"
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Total a Mintear *
                  </label>
                  <input
                    type="number"
                    value={tokenData.totalSupply}
                    onChange={(e) => setTokenData({ ...tokenData, totalSupply: e.target.value })}
                    placeholder="100"
                    className="w-full p-3 border rounded-lg"
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  />
                  <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>Total de tokens que se crearán</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                    Color del Token
                  </label>
                  <div className="flex space-x-2">
                    {tokenColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setTokenData({ ...tokenData, color })}
                        className={`w-10 h-10 rounded-full border-3 transition-all ${
                          tokenData.color === color ? "border-gray-800 scale-110" : "border-gray-300 hover:scale-105"
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
                    onClick={() => setTokenData({ ...tokenData, transferable: !tokenData.transferable })}
                    className={`w-12 h-6 rounded-full ${tokenData.transferable ? "bg-green-500" : "bg-gray-300"} relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        tokenData.transferable ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium" style={{ color: colors.text }}>
                    ¿Tiene vencimiento?
                  </span>
                  <button
                    onClick={() => setTokenData({ ...tokenData, hasExpiry: !tokenData.hasExpiry })}
                    className={`w-12 h-6 rounded-full ${tokenData.hasExpiry ? "bg-green-500" : "bg-gray-300"} relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        tokenData.hasExpiry ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                {tokenData.hasExpiry && (
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                      Fecha de vencimiento
                    </label>
                    <input
                      type="date"
                      value={tokenData.expiryDate}
                      onChange={(e) => setTokenData({ ...tokenData, expiryDate: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                      style={{
                        backgroundColor: colors.bg,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                    />
                  </div>
                )}
              </div>
              
              {/* Right Column - User Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>Usuarios Destinatarios *</h3>
                
                <div>
                  <input
                    type="text"
                    placeholder="Buscar usuario por nombre o ID..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      color: colors.text,
                    }}
                  />
                </div>
                
                <div className="max-h-64 overflow-y-auto border rounded-lg" style={{ borderColor: colors.border }}>
                  {filteredUsers.map((user) => {
                    const isSelected = selectedUsers.some(u => u.id === user.id)
                    const selectedUser = selectedUsers.find(u => u.id === user.id)
                    return (
                      <div
                        key={user.id}
                        className={`p-3 border-b hover:bg-opacity-50 ${
                          isSelected ? 'bg-blue-50' : ''
                        }`}
                        style={{ 
                          borderColor: colors.border,
                          backgroundColor: isSelected ? (isDark ? tokenData.color + '20' : tokenData.color + '10') : 'transparent'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center flex-1">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleUserToggle(user)}
                              className="mr-3 w-4 h-4"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm" style={{ color: colors.text }}>
                                {user.name}
                              </p>
                              <p className="text-xs" style={{ color: colors.textSecondary }}>
                                ID: {user.studentId}
                              </p>
                            </div>
                          </div>
                          
                          {isSelected && (
                            <div className="flex items-center ml-4">
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={selectedUser?.tokens || 1}
                                onChange={(e) => handleUserTokenChange(user.id, parseInt(e.target.value) || 1)}
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
                      </div>
                    )
                  })}
                </div>
                
                {selectedUsers.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>{selectedUsers.length}</strong> usuarios seleccionados
                    </p>
                    <p className="text-sm text-blue-600">
                      Total a distribuir: <strong>{getTotalTokensToDistribute()}</strong> tokens
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t flex justify-end space-x-3" style={{ borderColor: colors.border }}>
              <button
                onClick={onClose}
                className="px-6 py-3 border rounded-lg font-medium hover:bg-opacity-50"
                style={{
                  borderColor: colors.border,
                  color: colors.text
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                disabled={!tokenData.name || !tokenData.totalSupply || selectedUsers.length === 0}
                className="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
                style={{ backgroundColor: tokenData.color }}
              >
                <Plus size={16} className="inline mr-2" />
                Crear y Distribuir Tokens
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
