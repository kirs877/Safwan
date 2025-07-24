import { createClient } from '@supabase/supabase-js'

// معلومات مشروع Supabase - تقرأ من متغيرات البيئة أو القيم الافتراضية
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://olqptpoqnpmcznraitqv.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9scXB0cG9xbnBtY3pucmFpdHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MzU0MzEsImV4cCI6MjAyNTUxMTQzMX0.placeholder'

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ملاحظة: 
// 1. قم بتحديث supabaseUrl بالرابط الصحيح لمشروعك
// 2. قم بتحديث supabaseAnonKey بالمفتاح الصحيح
// 3. يمكن العثور على هذه المعلومات في Settings > API في لوحة تحكم Supabase