"use client"

import { useState } from "react"
import { X, QrCode, Send, Plus, Scan, Copy } from "lucide-react"
import { ugoColors, getThemeColors } from "@/lib/colors"
import { useTheme } from "@/contexts/theme-context"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4 rounded-lg shadow-xl" style={{ backgroundColor: colors.surface }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: colors.border }}>
          <h2 className="text-lg font-semibold" style={{ color: colors.text }}>
            {title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
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

  const handleTransfer = () => {
    // Simulate transfer
    alert(`Transferencia exitosa: ${amount} tokens de ${tokenName}`)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Transferir ${tokenName}`}>
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
            <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Scan size={48} className="text-gray-400" />
            </div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Escanea el código QR del destinatario
            </p>
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
          disabled={!amount || (transferMethod === "wallet" && !walletAddress)}
          className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: tokenColor }}
        >
          <Send size={16} className="inline mr-2" />
          Transferir Tokens
        </button>
      </div>
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Recibir Tokens">
      <div className="text-center space-y-4">
        <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
          <QrCode size={120} className="text-gray-400" />
        </div>
        <div>
          <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
            Tu dirección de wallet:
          </p>
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded border">
            <span className="text-sm font-mono" style={{ color: colors.text }}>
              GCKF...X7Y2
            </span>
            <button className="text-blue-500">
              <Copy size={16} />
            </button>
          </div>
        </div>
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          Comparte este código QR o tu dirección de wallet para recibir tokens
        </p>
      </div>
    </Modal>
  )
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
    symbol: "",
    amount: "",
    transferable: true,
    hasExpiry: false,
    expiryDate: "",
    color: ugoColors.blue,
  })

  const tokenColors = [ugoColors.red, ugoColors.orange, ugoColors.blue, ugoColors.green]

  const handleCreate = () => {
    alert(`Token "${tokenData.name}" creado exitosamente`)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Nuevo Token">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
            Nombre del Token
          </label>
          <input
            type="text"
            value={tokenData.name}
            onChange={(e) => setTokenData({ ...tokenData, name: e.target.value })}
            placeholder="Ej: Almuerzo"
            className="w-full p-2 border rounded-lg"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
            Cantidad inicial
          </label>
          <input
            type="number"
            value={tokenData.amount}
            onChange={(e) => setTokenData({ ...tokenData, amount: e.target.value })}
            placeholder="100"
            className="w-full p-2 border rounded-lg"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.text,
            }}
          />
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
                className={`w-8 h-8 rounded-full border-2 ${
                  tokenData.color === color ? "border-gray-800" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
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

        <div className="flex items-center justify-between">
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
              className="w-full p-2 border rounded-lg"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              }}
            />
          </div>
        )}

        <button
          onClick={handleCreate}
          disabled={!tokenData.name || !tokenData.amount}
          className="w-full py-3 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: tokenData.color }}
        >
          <Plus size={16} className="inline mr-2" />
          Crear Token
        </button>
      </div>
    </Modal>
  )
}
