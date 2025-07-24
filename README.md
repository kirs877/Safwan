# كافي صفوان - Safwan Cafe Management System

نظام إدارة متكامل لكافي صفوان مع واجهة باللغة العربية وقاعدة بيانات Supabase.

## الميزات الرئيسية

### 🏠 الصفحة الرئيسية
- ترحيب بالزوار وعرض معلومات الكافي
- عرض القائمة مع الأسعار بالدينار العراقي
- قسم التواصل مع معلومات الكافي
- تصميم متجاوب وجميل

### 🪑 صفحة الطاولات
- عرض 50 طاولة مع حالة كل طاولة
- نظام طلبات متكامل مع:
  - إضافة وإزالة المنتجات
  - حفظ الطلبات
  - دفع الطلبات
  - مسح الطلبات (محمي برمز سري: `@@@`)

### 👨‍💼 صفحة الإدارة
- دخول محمي بكلمة مرور: `Safwan123@@@`
- إدارة القائمة:
  - تعديل الأسعار
  - إضافة وحذف المنتجات
  - تعديل تفاصيل المنتجات
- تقارير يومية:
  - إجمالي الإيرادات
  - عدد الطلبات
  - الأصناف الأكثر طلباً
- عرض جميع الطلبات وحالاتها

### 📅 صفحة حجز الطاولات
- نموذج حجز متكامل
- اختيار التاريخ والوقت
- تحديد عدد الأشخاص
- رسالة تأكيد تلقائية

## التقنيات المستخدمة

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Database**: Supabase
- **Build Tool**: Vite

## إعداد المشروع

### 1. تثبيت التبعيات
```bash
npm install
```

### 2. إعداد قاعدة البيانات

قم بإنشاء الجداول التالية في Supabase:

#### جدول menu_items
```sql
CREATE TABLE menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('hot_drinks', 'cold_drinks', 'shisha')),
  emoji TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### جدول orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_number INTEGER NOT NULL,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### جدول reservations
```sql
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. تحديث إعدادات Supabase

قم بتحديث ملف `src/lib/supabase.ts` بمعلومات مشروعك:
- Supabase URL
- Anon Key

### 4. تشغيل المشروع

```bash
npm run dev
```

## كلمات المرور

- **صفحة الإدارة**: `Safwan123@@@`
- **مسح الطلبات**: `@@@`

## هيكل المشروع

```
src/
├── components/          # مكونات قابلة لإعادة الاستخدام
├── pages/              # صفحات التطبيق
│   ├── HomePage.tsx    # الصفحة الرئيسية
│   ├── TablesPage.tsx  # صفحة الطاولات
│   ├── AdminPage.tsx   # صفحة الإدارة
│   └── ReservationPage.tsx # صفحة الحجز
├── lib/                # إعدادات المكتبات
│   └── supabase.ts     # إعداد Supabase
├── types/              # أنواع TypeScript
│   └── index.ts        # تعريفات الأنواع
├── App.tsx             # التطبيق الرئيسي
├── main.tsx           # نقطة الدخول
└── index.css          # ملف CSS الرئيسي
```

## المساهمة

لأي اقتراحات أو تحسينات، يرجى فتح issue أو pull request.

## الترخيص

هذا المشروع مخصص لكافي صفوان ومحمي بحقوق الطبع والنشر.