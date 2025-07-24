import { createClient } from '@supabase/supabase-js'

// معلومات مشروع Supabase - يرجى تحديثها بمعلومات مشروعك الصحيحة
const supabaseUrl = 'https://olqptpoqnpmcznraitqv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9scXB0cG9xbnBtY3pucmFpdHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MzU0MzEsImV4cCI6MjAyNTUxMTQzMX0.placeholder'

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ملاحظة: 
// 1. قم بتحديث supabaseUrl بالرابط الصحيح لمشروعك
// 2. قم بتحديث supabaseAnonKey بالمفتاح الصحيح
// 3. يمكن العثور على هذه المعلومات في Settings > API في لوحة تحكم Supabase