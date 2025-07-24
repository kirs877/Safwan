import { Link } from 'react-router-dom'
import { Coffee, Users, Calendar, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 to-coffee-100">
      {/* Header */}
      <header className="bg-coffee-800 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">☕ كافي صفوان ☕</h1>
          <p className="text-center mt-2 text-coffee-200">مرحباً بكم في عالم النكهات الهادئة</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="card max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-coffee-800 mb-6">
              مرحبًا بكم في كافي صفوان
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              اكتشف عالم النكهات الهادئة في قلب المدينة. نقدم لكم تجربة فريدة تجمع بين القهوة المختصة، 
              المشروبات المنعشة، أجواء راقية، وأرقى أنواع الأراكيل. استرخِ، وذُق الفرق.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tables" className="btn-primary flex items-center justify-center gap-2">
                <Users size={20} />
                صفحة الطاولات
              </Link>
              <Link to="/admin" className="btn-secondary flex items-center justify-center gap-2">
                <Coffee size={20} />
                صفحة الإدارة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-coffee-800 mb-12">قائمة المشروبات</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Hot Drinks */}
            <div className="card">
              <h3 className="text-2xl font-bold text-coffee-700 mb-4 text-center">مشروبات ساخنة</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>☕ قهوة عربية</span>
                  <span className="text-coffee-600 font-bold">8,000 د.ع</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>☕ إسبريسو مزدوج</span>
                  <span className="text-coffee-600 font-bold">10,000 د.ع</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>☕ لاتيه بالفانيلا</span>
                  <span className="text-coffee-600 font-bold">12,000 د.ع</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🍵 شاي أعشاب طبيعي</span>
                  <span className="text-coffee-600 font-bold">6,000 د.ع</span>
                </li>
              </ul>
            </div>

            {/* Cold Drinks */}
            <div className="card">
              <h3 className="text-2xl font-bold text-coffee-700 mb-4 text-center">مشروبات باردة</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>🧊 آيس لاتيه كراميل</span>
                  <span className="text-coffee-600 font-bold">14,000 د.ع</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🍫 فرابتشينو شوكولا</span>
                  <span className="text-coffee-600 font-bold">16,000 د.ع</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🌿 موهيتو كلاسيك</span>
                  <span className="text-coffee-600 font-bold">12,000 د.ع</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🍊 عصير برتقال فريش</span>
                  <span className="text-coffee-600 font-bold">8,000 د.ع</span>
                </li>
              </ul>
            </div>

            {/* Shisha */}
            <div className="card">
              <h3 className="text-2xl font-bold text-coffee-700 mb-4 text-center">قائمة الأراكيل 🔥</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span>🍎 تفاح أحمر</span>
                  <span className="text-coffee-600 font-bold">25,000 د.ع</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🍋🌿 ليمون نعناع</span>
                  <span className="text-coffee-600 font-bold">25,000 د.ع</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🌿 تين إنجليزي</span>
                  <span className="text-coffee-600 font-bold">30,000 د.ع</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>🍇 عنب مع نعناع</span>
                  <span className="text-coffee-600 font-bold">28,000 د.ع</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>✨ معسل خاص</span>
                  <span className="text-coffee-600 font-bold">35,000 د.ع</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-16 px-4 bg-coffee-50">
        <div className="container mx-auto">
          <div className="card max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-coffee-800 mb-6">حجز طاولة</h2>
            <p className="text-gray-700 mb-6">احجز مكانك المفضل بسهولة عبر الموقع</p>
            <Link to="/reservation" className="btn-primary inline-flex items-center gap-2">
              <Calendar size={20} />
              احجز الآن
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-coffee-800 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">موقعنا / تواصل معنا</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <MapPin size={24} className="text-coffee-300" />
                <div>
                  <h3 className="font-bold mb-1">العنوان</h3>
                  <p className="text-coffee-200">شارع الرشيد، بغداد، العراق</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Phone size={24} className="text-coffee-300" />
                <div>
                  <h3 className="font-bold mb-1">رقم الهاتف</h3>
                  <p className="text-coffee-200" dir="ltr">+964 770 123 4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Mail size={24} className="text-coffee-300" />
                <div>
                  <h3 className="font-bold mb-1">البريد الإلكتروني</h3>
                  <p className="text-coffee-200" dir="ltr">info@safwancafe.com</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">تابعونا على</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-coffee-700 p-3 rounded-full hover:bg-coffee-600 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="bg-coffee-700 p-3 rounded-full hover:bg-coffee-600 transition-colors">
                  <Facebook size={24} />
                </a>
              </div>
              
              {/* Google Maps Placeholder */}
              <div className="mt-6 bg-coffee-700 h-48 rounded-lg flex items-center justify-center">
                <p className="text-coffee-200">خرائط جوجل (سيتم دمجها لاحقاً)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-coffee-900 text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-coffee-300">© 2024 كافي صفوان. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage