import { Utensils, Bus, BookOpen, CreditCard } from 'lucide-react'
import { ugoColors } from '@/src/lib/colors'

export const TOKEN_TYPES = [
  { id: 1, name: "Comida", icon: Utensils, color: ugoColors.red, active: 150, total: 200 },
  { id: 2, name: "Transporte", icon: Bus, color: ugoColors.orange, active: 80, total: 100 },
  { id: 3, name: "Biblioteca", icon: BookOpen, color: ugoColors.blue, active: 45, total: 50 },
  { id: 4, name: "Acceso", icon: CreditCard, color: ugoColors.green, active: 120, total: 150 },
] as const

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: "Tokens recibidos", message: "15 tokens de comida agregados", time: "2h", read: false },
  { id: 2, title: "Token usado", message: "Token de transporte consumido", time: "4h", read: true },
  { id: 3, title: "Recordatorio", message: "Tokens de biblioteca por vencer", time: "1d", read: false },
] as const

export const MOCK_ACTIVITIES = [
  { id: 1, action: "Token usado", user: "Juan Pérez", token: "Comida", time: "10:30 AM" },
  { id: 2, action: "Tokens creados", user: "Sistema", token: "Transporte", time: "09:15 AM" },
  { id: 3, action: "Token usado", user: "María García", token: "Biblioteca", time: "08:45 AM" },
] as const