# دليل نشر كافي صفوان على Vercel

## 🚀 خطوات النشر

### 1. رفع المشروع على GitHub

```bash
# تهيئة Git (إذا لم يكن مهيأ)
git init

# إضافة جميع الملفات
git add .

# الحفظ الأول
git commit -m "مشروع كافي صفوان - النسخة الأولى"

# ربط مع GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/safwan-cafe.git

# رفع على GitHub
git push -u origin main
```

### 2. إعداد Vercel

1. **اذهب إلى**: [vercel.com](https://vercel.com)
2. **سجل دخول** بحساب GitHub
3. **اضغط**: "New Project"
4. **اختر**: مستودع safwan-cafe
5. **اضغط**: "Import"

### 3. إعدادات البناء في Vercel

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 18.x
```

### 4. متغيرات البيئة

في Vercel Dashboard > Settings > Environment Variables:

```
Name: VITE_SUPABASE_URL
Value: https://olqptpoqnpmcznraitqv.supabase.co

Name: VITE_SUPABASE_ANON_KEY
Value: [ضع هنا المفتاح الصحيح من Supabase]
```

### 5. نشر المشروع

1. **اضغط**: "Deploy"
2. **انتظر**: حتى ينتهي البناء
3. **احصل على**: رابط المشروع

## 🔧 إصلاح المشاكل الشائعة

### مشكلة: خطأ في البناء
```bash
# تأكد من أن المشروع يبنى محلياً
npm run build

# إذا كان هناك خطأ، اصلحه ثم ارفع التحديث
git add .
git commit -m "إصلاح أخطاء البناء"
git push
```

### مشكلة: الصفحات لا تعمل (404)
- تأكد من وجود ملف `vercel.json`
- تأكد من إعدادات التوجيه (rewrites)

### مشكلة: قاعدة البيانات لا تعمل
- تأكد من إعداد متغيرات البيئة في Vercel
- تأكد من صحة مفاتيح Supabase

## 📱 اختبار المشروع

بعد النشر، اختبر:
- ✅ الصفحة الرئيسية
- ✅ صفحة الطاولات
- ✅ صفحة الإدارة (كلمة المرور: Safwan123@@@)
- ✅ صفحة الحجز
- ✅ عمل قاعدة البيانات

## 🔄 تحديث المشروع

لإضافة تحديثات جديدة:

```bash
# إضافة التغييرات
git add .

# حفظ التغييرات
git commit -m "تحديث المشروع"

# رفع التحديث
git push

# Vercel سيقوم بالنشر تلقائياً
```

## 🌐 رابط المشروع

بعد النشر، ستحصل على رابط مثل:
```
https://safwan-cafe-your-username.vercel.app
```

---

## 📞 الدعم

إذا واجهت مشاكل:
1. تحقق من build logs في Vercel
2. تأكد من إعدادات Supabase
3. راجع console في المتصفح للأخطاء