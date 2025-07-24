import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Clock, Users, Phone, Mail, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: '',
    time: '',
    guests: 1
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', '22:30', '23:00'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.contact || !formData.date || !formData.time) {
      alert('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('reservations')
        .insert({
          name: formData.name,
          contact: formData.contact,
          date: formData.date,
          time: formData.time,
          guests: formData.guests,
          status: 'pending'
        })

      if (!error) {
        setIsSuccess(true)
        setFormData({
          name: '',
          contact: '',
          date: '',
          time: '',
          guests: 1
        })
      } else {
        alert('حدث خطأ في إرسال طلب الحجز')
      }
    } catch (error) {
      alert('حدث خطأ في إرسال طلب الحجز')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Get today's date for minimum date validation
  const today = new Date().toISOString().split('T')[0]

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md w-full mx-4 text-center">
          <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-coffee-800 mb-4">تم إرسال طلب الحجز بنجاح!</h2>
          <p className="text-gray-700 mb-6">
            شكراً لك! تم استلام طلب حجزك وسنتواصل معك قريباً لتأكيد الحجز.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setIsSuccess(false)}
              className="btn-primary w-full"
            >
              حجز طاولة أخرى
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
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-coffee-100">
      {/* Header */}
      <header className="bg-coffee-800 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">حجز طاولة</h1>
          <Link to="/" className="btn-secondary flex items-center gap-2">
            <ArrowRight size={20} />
            العودة للرئيسية
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Intro Section */}
          <div className="card mb-8 text-center">
            <h2 className="text-3xl font-bold text-coffee-800 mb-4">احجز مكانك المفضل</h2>
            <p className="text-gray-700 leading-relaxed">
              استمتع بأجواء مميزة في كافي صفوان. احجز طاولتك مسبقاً لضمان مكانك المفضل 
              واستمتع بأفضل أنواع القهوة والمشروبات والأراكيل في أجواء هادئة ومريحة.
            </p>
          </div>

          {/* Reservation Form */}
          <div className="card">
            <h3 className="text-2xl font-bold text-coffee-800 mb-6">تفاصيل الحجز</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  placeholder="أدخل اسمك الكامل"
                  required
                />
              </div>

              {/* Contact Field */}
              <div>
                <label htmlFor="contact" className="block text-sm font-bold text-gray-700 mb-2">
                  رقم الهاتف أو البريد الإلكتروني *
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                  placeholder="رقم الهاتف أو البريد الإلكتروني"
                  required
                />
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-2">
                    <Calendar size={16} className="inline ml-1" />
                    التاريخ *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={today}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-bold text-gray-700 mb-2">
                    <Clock size={16} className="inline ml-1" />
                    الوقت *
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                    required
                  >
                    <option value="">اختر الوقت</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label htmlFor="guests" className="block text-sm font-bold text-gray-700 mb-2">
                  <Users size={16} className="inline ml-1" />
                  عدد الأشخاص
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'شخص' : 'أشخاص'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب الحجز'}
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="card">
              <h4 className="font-bold text-coffee-800 mb-3 flex items-center gap-2">
                <Phone size={20} />
                للاستفسارات
              </h4>
              <p className="text-gray-700 mb-2">يمكنكم التواصل معنا مباشرة:</p>
              <p className="text-coffee-600 font-bold" dir="ltr">+964 770 123 4567</p>
            </div>

            <div className="card">
              <h4 className="font-bold text-coffee-800 mb-3 flex items-center gap-2">
                <Mail size={20} />
                البريد الإلكتروني
              </h4>
              <p className="text-gray-700 mb-2">أو راسلونا على:</p>
              <p className="text-coffee-600 font-bold" dir="ltr">info@safwancafe.com</p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="card mt-6">
            <h4 className="font-bold text-coffee-800 mb-3 flex items-center gap-2">
              <Clock size={20} />
              ساعات العمل
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">الأحد - الخميس</p>
                <p className="text-gray-600">9:00 صباحاً - 11:30 مساءً</p>
              </div>
              <div>
                <p className="font-medium">الجمعة - السبت</p>
                <p className="text-gray-600">9:00 صباحاً - 12:00 منتصف الليل</p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="card mt-6 bg-coffee-50 border-coffee-200">
            <h4 className="font-bold text-coffee-800 mb-3">شروط الحجز:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• يرجى الوصول في الوقت المحدد للحجز</li>
              <li>• في حالة التأخير أكثر من 15 دقيقة، قد يتم إلغاء الحجز</li>
              <li>• لإلغاء الحجز، يرجى التواصل معنا قبل 4 ساعات على الأقل</li>
              <li>• الحجز خاضع للتوفر ويخضع لتأكيد الإدارة</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationPage