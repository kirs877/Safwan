// دوال مساعدة مشتركة للتطبيق

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ar-IQ').format(price) + ' د.ع'
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ar-IQ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('ar-IQ', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const generateOrderId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 5)
}

export const getTableStatus = (tableNumber: number, orders: any[]): 'free' | 'occupied' => {
  const hasOrder = orders.some(order => 
    order.table_number === tableNumber && 
    order.status === 'pending'
  )
  return hasOrder ? 'occupied' : 'free'
}

export const calculateOrderTotal = (items: any[]): number => {
  return items.reduce((total, item) => total + (item.item_price * item.quantity), 0)
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+964|0)?[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const getCategoryName = (category: string): string => {
  switch (category) {
    case 'hot_drinks':
      return 'مشروبات ساخنة'
    case 'cold_drinks':
      return 'مشروبات باردة'
    case 'shisha':
      return 'أراكيل'
    default:
      return category
  }
}

export const getStatusName = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'قيد الانتظار'
    case 'completed':
      return 'مكتمل'
    case 'paid':
      return 'مدفوع'
    case 'confirmed':
      return 'مؤكد'
    case 'cancelled':
      return 'ملغي'
    default:
      return status
  }
}