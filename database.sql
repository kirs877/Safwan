-- إنشاء جدول عناصر القائمة
CREATE TABLE menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('hot_drinks', 'cold_drinks', 'shisha')),
  emoji TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الطلبات
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_number INTEGER NOT NULL,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'paid')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول الحجوزات
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

-- إدراج البيانات الأولية لعناصر القائمة
INSERT INTO menu_items (id, name, price, category, emoji) VALUES
-- المشروبات الساخنة
('1', 'قهوة عربية', 8000, 'hot_drinks', '☕'),
('2', 'إسبريسو مزدوج', 10000, 'hot_drinks', '☕'),
('3', 'لاتيه بالفانيلا', 12000, 'hot_drinks', '☕'),
('4', 'شاي أعشاب طبيعي', 6000, 'hot_drinks', '🍵'),

-- المشروبات الباردة
('5', 'آيس لاتيه كراميل', 14000, 'cold_drinks', '🧊'),
('6', 'فرابتشينو شوكولا', 16000, 'cold_drinks', '🍫'),
('7', 'موهيتو كلاسيك', 12000, 'cold_drinks', '🌿'),
('8', 'عصير برتقال فريش', 8000, 'cold_drinks', '🍊'),

-- الأراكيل
('9', 'تفاح أحمر', 25000, 'shisha', '🍎'),
('10', 'ليمون نعناع', 25000, 'shisha', '🍋🌿'),
('11', 'تين إنجليزي', 30000, 'shisha', '🌿'),
('12', 'عنب مع نعناع', 28000, 'shisha', '🍇'),
('13', 'معسل خاص', 35000, 'shisha', '✨');

-- إعداد Row Level Security (RLS)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان - السماح للجميع بالقراءة والكتابة (للتطوير)
-- في البيئة الإنتاجية، يجب تعديل هذه السياسات لتكون أكثر تقييداً

-- سياسات menu_items
CREATE POLICY "Enable read access for all users" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON menu_items FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON menu_items FOR DELETE USING (true);

-- سياسات orders
CREATE POLICY "Enable read access for all users" ON orders FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON orders FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON orders FOR DELETE USING (true);

-- سياسات reservations
CREATE POLICY "Enable read access for all users" ON reservations FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON reservations FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON reservations FOR DELETE USING (true);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX idx_orders_table_number ON orders(table_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_reservations_date ON reservations(date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_menu_items_category ON menu_items(category);