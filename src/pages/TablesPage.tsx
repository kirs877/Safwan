import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Plus, Minus, Save, CreditCard, Trash2 } from 'lucide-react'
import { MenuItem, Order, OrderItem } from '../types'
import { supabase } from '../lib/supabase'

const TablesPage = () => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null)
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')

  // Initialize menu items
  const defaultMenuItems: MenuItem[] = [
    // Hot Drinks
    { id: '1', name: 'قهوة عربية', price: 8000, category: 'hot_drinks', emoji: '☕' },
    { id: '2', name: 'إسبريسو مزدوج', price: 10000, category: 'hot_drinks', emoji: '☕' },
    { id: '3', name: 'لاتيه بالفانيلا', price: 12000, category: 'hot_drinks', emoji: '☕' },
    { id: '4', name: 'شاي أعشاب طبيعي', price: 6000, category: 'hot_drinks', emoji: '🍵' },
    
    // Cold Drinks
    { id: '5', name: 'آيس لاتيه كراميل', price: 14000, category: 'cold_drinks', emoji: '🧊' },
    { id: '6', name: 'فرابتشينو شوكولا', price: 16000, category: 'cold_drinks', emoji: '🍫' },
    { id: '7', name: 'موهيتو كلاسيك', price: 12000, category: 'cold_drinks', emoji: '🌿' },
    { id: '8', name: 'عصير برتقال فريش', price: 8000, category: 'cold_drinks', emoji: '🍊' },
    
    // Shisha
    { id: '9', name: 'تفاح أحمر', price: 25000, category: 'shisha', emoji: '🍎' },
    { id: '10', name: 'ليمون نعناع', price: 25000, category: 'shisha', emoji: '🍋🌿' },
    { id: '11', name: 'تين إنجليزي', price: 30000, category: 'shisha', emoji: '🌿' },
    { id: '12', name: 'عنب مع نعناع', price: 28000, category: 'shisha', emoji: '🍇' },
    { id: '13', name: 'معسل خاص', price: 35000, category: 'shisha', emoji: '✨' },
  ]

  useEffect(() => {
    loadMenuItems()
    loadOrders()
  }, [])

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
      
      if (error) {
        console.log('Using default menu items')
        setMenuItems(defaultMenuItems)
      } else {
        setMenuItems(data || defaultMenuItems)
      }
    } catch (error) {
      console.log('Using default menu items')
      setMenuItems(defaultMenuItems)
    }
  }

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending')
      
      if (!error && data) {
        setOrders(data)
      }
    } catch (error) {
      console.log('Could not load orders')
    }
  }

  const addToOrder = (menuItem: MenuItem) => {
    const existingItem = currentOrder.find(item => item.menu_item_id === menuItem.id)
    
    if (existingItem) {
      setCurrentOrder(currentOrder.map(item =>
        item.menu_item_id === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCurrentOrder([...currentOrder, {
        menu_item_id: menuItem.id,
        quantity: 1,
        item_name: menuItem.name,
        item_price: menuItem.price
      }])
    }
  }

  const removeFromOrder = (menuItemId: string) => {
    const existingItem = currentOrder.find(item => item.menu_item_id === menuItemId)
    
    if (existingItem && existingItem.quantity > 1) {
      setCurrentOrder(currentOrder.map(item =>
        item.menu_item_id === menuItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ))
    } else {
      setCurrentOrder(currentOrder.filter(item => item.menu_item_id !== menuItemId))
    }
  }

  const saveOrder = async () => {
    if (!selectedTable || currentOrder.length === 0) return

    const total = currentOrder.reduce((sum, item) => sum + (item.item_price * item.quantity), 0)
    
    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          table_number: selectedTable,
          items: currentOrder,
          total: total,
          status: 'pending'
        })
      
      if (!error) {
        alert('تم حفظ الطلب بنجاح!')
        setCurrentOrder([])
        loadOrders()
      }
    } catch (error) {
      alert('حدث خطأ في حفظ الطلب')
    }
  }

  const payOrder = async () => {
    if (!selectedTable) return

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('table_number', selectedTable)
        .eq('status', 'pending')
      
      if (!error) {
        alert('تم الدفع بنجاح! تم تصفير الطاولة.')
        setCurrentOrder([])
        setSelectedTable(null)
        loadOrders()
      }
    } catch (error) {
      alert('حدث خطأ في عملية الدفع')
    }
  }

  const deleteOrder = async () => {
    if (deletePassword !== '@@@' || !selectedTable) {
      alert('كلمة المرور خاطئة!')
      return
    }

    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('table_number', selectedTable)
        .eq('status', 'pending')
      
      if (!error) {
        alert('تم مسح الطلب بنجاح!')
        setCurrentOrder([])
        setSelectedTable(null)
        setShowDeleteModal(false)
        setDeletePassword('')
        loadOrders()
      }
    } catch (error) {
      alert('حدث خطأ في مسح الطلب')
    }
  }

  const getTableOrder = (tableNumber: number) => {
    return orders.find(order => order.table_number === tableNumber)
  }

  const getTotalAmount = () => {
    return currentOrder.reduce((sum, item) => sum + (item.item_price * item.quantity), 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-IQ').format(price) + ' د.ع'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-coffee-800 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">صفحة الطاولات</h1>
          <Link to="/" className="btn-secondary flex items-center gap-2">
            <ArrowRight size={20} />
            العودة للرئيسية
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tables Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-coffee-800 mb-6">الطاولات (50 طاولة)</h2>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              {Array.from({ length: 50 }, (_, i) => i + 1).map(tableNumber => {
                const tableOrder = getTableOrder(tableNumber)
                const isOccupied = !!tableOrder
                const isSelected = selectedTable === tableNumber
                
                return (
                  <button
                    key={tableNumber}
                    onClick={() => setSelectedTable(tableNumber)}
                    className={`
                      table-item h-16 flex items-center justify-center font-bold text-lg
                      ${isOccupied ? 'occupied' : ''}
                      ${isSelected ? 'ring-2 ring-coffee-600' : ''}
                    `}
                  >
                    {tableNumber}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Order Panel */}
          <div className="space-y-6">
            {selectedTable && (
              <>
                <div className="card">
                  <h3 className="text-xl font-bold text-coffee-800 mb-4">
                    طاولة رقم {selectedTable}
                  </h3>
                  
                  {/* Current Order Display */}
                  {currentOrder.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-bold mb-3">الطلب الحالي:</h4>
                      <div className="space-y-2">
                        {currentOrder.map(item => (
                          <div key={item.menu_item_id} className="flex justify-between items-center text-sm">
                            <span>{item.item_name} x{item.quantity}</span>
                            <span className="font-bold">{formatPrice(item.item_price * item.quantity)}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 font-bold">
                          المجموع: {formatPrice(getTotalAmount())}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={saveOrder}
                      disabled={currentOrder.length === 0}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save size={20} />
                      اطلب الآن
                    </button>
                    
                    <button
                      onClick={payOrder}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center gap-2"
                    >
                      <CreditCard size={20} />
                      دفع
                    </button>
                    
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="btn-danger w-full flex items-center justify-center gap-2"
                    >
                      <Trash2 size={20} />
                      مسح الطلب
                    </button>
                  </div>
                </div>

                {/* Menu */}
                <div className="card">
                  <h3 className="text-xl font-bold text-coffee-800 mb-4">القائمة</h3>
                  
                  {/* Hot Drinks */}
                  <div className="mb-6">
                    <h4 className="font-bold text-coffee-700 mb-3">مشروبات ساخنة</h4>
                    <div className="space-y-2">
                      {menuItems.filter(item => item.category === 'hot_drinks').map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1">
                            <span className="text-sm">{item.emoji} {item.name}</span>
                            <div className="text-xs text-gray-600">{formatPrice(item.price)}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromOrder(item.id)}
                              className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {currentOrder.find(orderItem => orderItem.menu_item_id === item.id)?.quantity || 0}
                            </span>
                            <button
                              onClick={() => addToOrder(item)}
                              className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cold Drinks */}
                  <div className="mb-6">
                    <h4 className="font-bold text-coffee-700 mb-3">مشروبات باردة</h4>
                    <div className="space-y-2">
                      {menuItems.filter(item => item.category === 'cold_drinks').map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1">
                            <span className="text-sm">{item.emoji} {item.name}</span>
                            <div className="text-xs text-gray-600">{formatPrice(item.price)}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromOrder(item.id)}
                              className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {currentOrder.find(orderItem => orderItem.menu_item_id === item.id)?.quantity || 0}
                            </span>
                            <button
                              onClick={() => addToOrder(item)}
                              className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shisha */}
                  <div>
                    <h4 className="font-bold text-coffee-700 mb-3">أراكيل 🔥</h4>
                    <div className="space-y-2">
                      {menuItems.filter(item => item.category === 'shisha').map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex-1">
                            <span className="text-sm">{item.emoji} {item.name}</span>
                            <div className="text-xs text-gray-600">{formatPrice(item.price)}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromOrder(item.id)}
                              className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {currentOrder.find(orderItem => orderItem.menu_item_id === item.id)?.quantity || 0}
                            </span>
                            <button
                              onClick={() => addToOrder(item)}
                              className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {!selectedTable && (
              <div className="card text-center text-gray-500">
                اختر طاولة لعرض قائمة الطلبات
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Order Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">تأكيد مسح الطلب</h3>
            <p className="mb-4">أدخل الرمز السري لمسح الطلب:</p>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="أدخل الرمز السري"
            />
            <div className="flex gap-3">
              <button
                onClick={deleteOrder}
                className="btn-danger flex-1"
              >
                مسح الطلب
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeletePassword('')
                }}
                className="btn-secondary flex-1"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TablesPage