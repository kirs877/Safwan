export interface MenuItem {
  id: string
  name: string
  price: number
  category: 'hot_drinks' | 'cold_drinks' | 'shisha'
  description?: string
  emoji?: string
}

export interface Order {
  id: string
  table_number: number
  items: OrderItem[]
  total: number
  status: 'pending' | 'completed' | 'paid'
  created_at: string
  updated_at: string
}

export interface OrderItem {
  menu_item_id: string
  quantity: number
  item_name: string
  item_price: number
}

export interface Table {
  number: number
  is_occupied: boolean
  current_order?: Order
}

export interface Reservation {
  id: string
  date: string
  time: string
  guests: number
  name: string
  contact: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}