import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Edit, Trash2, Plus, Save, Eye, EyeOff } from 'lucide-react'
import { MenuItem, Order } from '../types'
import { supabase } from '../lib/supabase'

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    category: 'hot_drinks',
    emoji: ''
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [dailyReport, setDailyReport] = useState<{
    totalRevenue: number
    totalOrders: number
    topItems: { name: string; quantity: number; revenue: number }[]
  } | null>(null)

  const ADMIN_PASSWORD = 'Safwan123@@@'

  useEffect(() => {
    if (isAuthenticated) {
      loadMenuItems()
      loadOrders()
      generateDailyReport()
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('كلمة المرور خاطئة!')
    }
  }

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
      
      if (!error && data) {
        setMenuItems(data)
      }
    } catch (error) {
      console.log('Could not load menu items')
    }
  }

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        setOrders(data)
      }
    } catch (error) {
      console.log('Could not load orders')
    }
  }

  const generateDailyReport = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', today + 'T00:00:00')
        .lte('created_at', today + 'T23:59:59')
        .eq('status', 'paid')

      if (!error && data) {
        const totalRevenue = data.reduce((sum, order) => sum + order.total, 0)
        const totalOrders = data.length

        // Calculate top items
        const itemCounts: { [key: string]: { quantity: number; revenue: number; name: string } } = {}
        
        data.forEach(order => {
          order.items.forEach((item: any) => {
            if (!itemCounts[item.menu_item_id]) {
              itemCounts[item.menu_item_id] = {
                quantity: 0,
                revenue: 0,
                name: item.item_name
              }
            }
            itemCounts[item.menu_item_id].quantity += item.quantity
            itemCounts[item.menu_item_id].revenue += item.item_price * item.quantity
          })
        })

        const topItems = Object.values(itemCounts)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 5)

        setDailyReport({
          totalRevenue,
          totalOrders,
          topItems
        })
      }
    } catch (error) {
      console.log('Could not generate daily report')
    }
  }

  const saveMenuItem = async (item: MenuItem) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .upsert(item)
      
      if (!error) {
        alert('تم حفظ العنصر بنجاح!')
        setEditingItem(null)
        loadMenuItems()
      }
    } catch (error) {
      alert('حدث خطأ في حفظ العنصر')
    }
  }

  const deleteMenuItem = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      try {
        const { error } = await supabase
          .from('menu_items')
          .delete()
          .eq('id', id)
        
        if (!error) {
          alert('تم حذف العنصر بنجاح!')
          loadMenuItems()
        }
      } catch (error) {
        alert('حدث خطأ في حذف العنصر')
      }
    }
  }

  const addMenuItem = async () => {
    if (!newItem.name || !newItem.price) {
      alert('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    try {
      const { error } = await supabase
        .from('menu_items')
        .insert({
          id: Date.now().toString(),
          name: newItem.name,
          price: newItem.price,
          category: newItem.category,
          emoji: newItem.emoji
        })
      
      if (!error) {
        alert('تم إضافة العنصر بنجاح!')
        setNewItem({
          name: '',
          price: 0,
          category: 'hot_drinks',
          emoji: ''
        })
        setShowAddForm(false)
        loadMenuItems()
      }
    } catch (error) {
      alert('حدث خطأ في إضافة العنصر')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-IQ').format(price) + ' د.ع'
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-coffee-800 mb-6 text-center">دخول الإدارة</h2>
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full p-3 border rounded-lg pr-12"
                placeholder="أدخل كلمة المرور"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              onClick={handleLogin}
              className="btn-primary w-full"
            >
              دخول
            </button>
            <Link to="/" className="btn-secondary w-full text-center block">
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-coffee-800 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">صفحة الإدارة</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="btn-secondary"
            >
              تسجيل الخروج
            </button>
            <Link to="/" className="btn-secondary flex items-center gap-2">
              <ArrowRight size={20} />
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Daily Report */}
        {dailyReport && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center">
              <h3 className="text-lg font-bold text-coffee-800 mb-2">إجمالي الإيرادات اليومية</h3>
              <p className="text-3xl font-bold text-green-600">{formatPrice(dailyReport.totalRevenue)}</p>
            </div>
            <div className="card text-center">
              <h3 className="text-lg font-bold text-coffee-800 mb-2">عدد الطلبات اليومية</h3>
              <p className="text-3xl font-bold text-blue-600">{dailyReport.totalOrders}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-bold text-coffee-800 mb-3">الأصناف الأكثر طلباً</h3>
              <div className="space-y-2">
                {dailyReport.topItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-bold">{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Menu Management */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-coffee-800">إدارة القائمة</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={20} />
                إضافة عنصر جديد
              </button>
            </div>

            {/* Add New Item Form */}
            {showAddForm && (
              <div className="card mb-6">
                <h3 className="text-lg font-bold mb-4">إضافة عنصر جديد</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="اسم العنصر"
                  />
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                    className="w-full p-2 border rounded"
                    placeholder="السعر (بالدينار العراقي)"
                  />
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value as MenuItem['category'] })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="hot_drinks">مشروبات ساخنة</option>
                    <option value="cold_drinks">مشروبات باردة</option>
                    <option value="shisha">أراكيل</option>
                  </select>
                  <input
                    type="text"
                    value={newItem.emoji}
                    onChange={(e) => setNewItem({ ...newItem, emoji: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="رمز تعبيري (اختياري)"
                  />
                  <div className="flex gap-3">
                    <button onClick={addMenuItem} className="btn-primary flex-1">
                      إضافة
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="btn-secondary flex-1"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items List */}
            <div className="space-y-4">
              {['hot_drinks', 'cold_drinks', 'shisha'].map(category => (
                <div key={category} className="card">
                  <h3 className="text-lg font-bold text-coffee-700 mb-4">
                    {category === 'hot_drinks' ? 'مشروبات ساخنة' :
                     category === 'cold_drinks' ? 'مشروبات باردة' : 'أراكيل'}
                  </h3>
                  <div className="space-y-3">
                    {menuItems.filter(item => item.category === category).map(item => (
                      <div key={item.id}>
                        {editingItem?.id === item.id ? (
                          <div className="space-y-2 p-3 bg-gray-50 rounded">
                            <input
                              type="text"
                              value={editingItem.name}
                              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                              className="w-full p-2 border rounded text-sm"
                            />
                            <div className="flex gap-2">
                              <input
                                type="number"
                                value={editingItem.price}
                                onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                                className="flex-1 p-2 border rounded text-sm"
                                placeholder="السعر"
                              />
                              <input
                                type="text"
                                value={editingItem.emoji || ''}
                                onChange={(e) => setEditingItem({ ...editingItem, emoji: e.target.value })}
                                className="w-16 p-2 border rounded text-sm"
                                placeholder="🔥"
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => saveMenuItem(editingItem)}
                                className="flex-1 bg-green-600 text-white p-2 rounded text-sm flex items-center justify-center gap-1"
                              >
                                <Save size={16} />
                                حفظ
                              </button>
                              <button
                                onClick={() => setEditingItem(null)}
                                className="flex-1 bg-gray-500 text-white p-2 rounded text-sm"
                              >
                                إلغاء
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex-1">
                              <span className="font-medium">
                                {item.emoji} {item.name}
                              </span>
                              <div className="text-sm text-gray-600">
                                {formatPrice(item.price)}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingItem(item)}
                                className="bg-blue-600 text-white p-2 rounded text-sm"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => deleteMenuItem(item.id)}
                                className="bg-red-600 text-white p-2 rounded text-sm"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders Management */}
          <div>
            <h2 className="text-2xl font-bold text-coffee-800 mb-6">إدارة الطلبات</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {orders.map(order => (
                <div key={order.id} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold">طاولة رقم {order.table_number}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleString('ar-IQ')}
                      </p>
                    </div>
                    <div className="text-left">
                      <span className={`px-2 py-1 rounded text-sm ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status === 'pending' ? 'قيد الانتظار' :
                         order.status === 'completed' ? 'مكتمل' : 'مدفوع'}
                      </span>
                      <div className="font-bold text-lg mt-1">
                        {formatPrice(order.total)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.item_name} x{item.quantity}</span>
                        <span>{formatPrice(item.item_price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage