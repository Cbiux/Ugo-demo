import { useState } from 'react'
import { Token } from '@/types'
import { ugoColors } from '@/lib/colors'
import { Utensils, Bus, BookOpen, CreditCard } from 'lucide-react'

export function useTokens() {
  const [tokens] = useState<Token[]>([
    { id: 1, name: "Comida", icon: Utensils, amount: 15, color: ugoColors.red, total: 30 },
    { id: 2, name: "Transporte", icon: Bus, amount: 8, color: ugoColors.orange, total: 20 },
    { id: 3, name: "Biblioteca", icon: BookOpen, amount: 5, color: ugoColors.blue, total: 10 },
    { id: 4, name: "Acceso", icon: CreditCard, amount: 12, color: ugoColors.green, total: 15 },
  ])

  const getTotalTokens = () => tokens.reduce((sum, token) => sum + token.amount, 0)
  
  const getUsedTokens = () => tokens.reduce((sum, token) => sum + (token.total - token.amount), 0)

  return {
    tokens,
    getTotalTokens,
    getUsedTokens
  }
}