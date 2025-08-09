export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

export const showCopySuccess = () => {
  // In a real app, you'd use a toast library
  alert("Copiado al portapapeles")
}