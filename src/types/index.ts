export interface Token {
  id: number
  name: string
  icon: any
  amount: number
  color: string
  total: number
  transferable: boolean
}

export interface Notification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
}

export interface User {
  id: string
  name: string
  email: string
  walletAddress: string
  role: 'student' | 'admin'
}

export interface Activity {
  id: number
  action: string
  user: string
  token: string
  time: string
}

export type TabType = "home" | "wallet" | "notifications" | "profile"
export type AdminSection = "dashboard" | "scanner" | "tokens" | "profile"