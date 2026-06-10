-- ============================================================
-- NUTRI RETREAT - Food Exchange Database Schema
-- Based on Filipino Food Exchange Lists (FEL)
-- Macronutrient multipliers: Carbs x4 kcal, Protein x4 kcal, Fat x9 kcal
-- ============================================================

-- MEAT EXCHANGE TABLE (List V)
-- Low Fat: 8g protein, 1g fat, 41 kcal per exchange
-- Medium Fat: 8g protein, 6g fat, 86 kcal per exchange
-- High Fat: 8g protein, 10g fat, 122 kcal per exchange
CREATE TABLE IF NOT EXISTS meat_foods (
  id SERIAL PRIMARY KEY,
  filipino_name TEXT NOT NULL,
  english_name TEXT NOT NULL,
  category TEXT NOT NULL,         -- 'beef', 'pork', 'chicken', 'fish', 'variety', 'egg', 'nuts', 'processed', 'other'
  subcategory TEXT,               -- 'lean', 'variety', 'internal_organ', etc.
  fat_level TEXT NOT NULL CHECK (fat_level IN ('low', 'medium', 'high')),
  weight_g NUMERIC NOT NULL,      -- EP/Cooked weight in grams (one exchange)
  household_measure TEXT,
  dimension TEXT,
  protein_g NUMERIC NOT NULL DEFAULT 8,
  fat_g NUMERIC NOT NULL,         -- 1 for low, 6 for medium, 10 for high
  calories NUMERIC NOT NULL,      -- 41 for low, 86 for medium, 122 for high
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RICE EXCHANGE TABLE (List IV)
-- Rice A Low Protein: 23g carbs, 0g protein, 92 kcal
-- Rice B Medium Protein: 23g carbs, 2g protein, 100 kcal
-- Rice C High Protein: 23g carbs, 4g protein, 108 kcal
CREATE TABLE IF NOT EXISTS rice_foods (
  id SERIAL PRIMARY KEY,
  filipino_name TEXT NOT NULL,
  english_name TEXT NOT NULL,
  category TEXT NOT NULL,         -- 'rice_and_products', 'corn', 'noodles', 'rootcrop', 'bakery', 'others'
  subcategory TEXT,
  protein_level TEXT NOT NULL CHECK (protein_level IN ('low', 'medium', 'high')),
  weight_g NUMERIC NOT NULL,      -- EP weight in grams
  household_measure TEXT,
  dimension TEXT,
  carbohydrate_g NUMERIC NOT NULL DEFAULT 23,
  protein_g NUMERIC NOT NULL,     -- 0 for A, 2 for B, 4 for C
  fat_g NUMERIC NOT NULL DEFAULT 0,
  calories NUMERIC NOT NULL,      -- 92 for A, 100 for B, 108 for C
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- VEGETABLE EXCHANGE TABLE (List I)
-- 3g carbs, 1g protein, 0g fat, 16 kcal per exchange
CREATE TABLE IF NOT EXISTS vegetable_foods (
  id SERIAL PRIMARY KEY,
  filipino_name TEXT NOT NULL,
  english_name TEXT NOT NULL,
  category TEXT NOT NULL,         -- 'fresh', 'processed'
  weight_g NUMERIC,               -- EP weight (some fresh veggies have no fixed weight)
  household_measure TEXT,
  carbohydrate_g NUMERIC NOT NULL DEFAULT 3,
  protein_g NUMERIC NOT NULL DEFAULT 1,
  fat_g NUMERIC NOT NULL DEFAULT 0,
  calories NUMERIC NOT NULL DEFAULT 16,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MILK EXCHANGE TABLE (List III)
-- Whole: 12g carbs, 8g protein, 10g fat, 170 kcal
-- Low Fat: 12g carbs, 8g protein, 5g fat, 125 kcal
-- Non-Fat/Skim: 12g carbs, 8g protein, 0g fat, 80 kcal
CREATE TABLE IF NOT EXISTS milk_foods (
  id SERIAL PRIMARY KEY,
  filipino_name TEXT NOT NULL,
  english_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('whole', 'low_fat', 'non_fat')),
  amount_ml NUMERIC NOT NULL,
  household_measure TEXT,
  carbohydrate_g NUMERIC NOT NULL DEFAULT 12,
  protein_g NUMERIC NOT NULL DEFAULT 8,
  fat_g NUMERIC NOT NULL,         -- 10 whole, 5 low fat, 0 non-fat
  calories NUMERIC NOT NULL,      -- 170 whole, 125 low fat, 80 non-fat
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FRUIT EXCHANGE TABLE (List II)
-- 10g carbs, 0g protein, 0g fat, 40 kcal per exchange
CREATE TABLE IF NOT EXISTS fruit_foods (
  id SERIAL PRIMARY KEY,
  filipino_name TEXT NOT NULL,
  english_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'fresh',  -- 'fresh', 'dried', 'juice', 'canned'
  weight_g NUMERIC,
  household_measure TEXT,
  dimension TEXT,
  carbohydrate_g NUMERIC NOT NULL DEFAULT 10,
  protein_g NUMERIC NOT NULL DEFAULT 0,
  fat_g NUMERIC NOT NULL DEFAULT 0,
  calories NUMERIC NOT NULL DEFAULT 40,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SEED DATA - 3 entries per category/subcategory
-- ============================================================

-- MEAT: Low Fat (8g protein, 1g fat, 41 kcal)
INSERT INTO meat_foods (filipino_name, english_name, category, subcategory, fat_level, weight_g, household_measure, dimension, protein_g, fat_g, calories) VALUES
('Kenchi', 'Shank (Beef)', 'beef', 'lean', 'low', 35, '1 slice, mbs', '5 × 3.5 × 2 cm', 8, 1, 41),
('Loman', 'Tenderloin (Pork)', 'pork', 'lean', 'low', 35, '1 slice, mbs', '5 × 3.5 × 2 cm', 8, 1, 41),
('Laman (Manok)', 'Chicken White Meat', 'chicken', 'lean', 'low', 30, '1 slice', '5 × 3 × 1.5 cm', 8, 1, 41);

-- MEAT: Medium Fat (8g protein, 6g fat, 86 kcal)
INSERT INTO meat_foods (filipino_name, english_name, category, subcategory, fat_level, weight_g, household_measure, dimension, protein_g, fat_g, calories) VALUES
('Paypay, laman', 'Chuck, lean (Beef)', 'beef', 'medium', 'medium', 35, '1 slice, mbs', '5 × 3.5 × 2 cm', 8, 6, 86),
('Binti (Manok)', 'Chicken Leg/Drumstick', 'chicken', 'medium', 'medium', 35, '1 pc', '11 × 4 cm', 8, 6, 86),
('Bangus, tinapa', 'Milkfish, smoked', 'fish', 'processed', 'medium', 30, '1 slice', NULL, 8, 6, 86);

-- MEAT: High Fat (8g protein, 10g fat, 122 kcal)
INSERT INTO meat_foods (filipino_name, english_name, category, subcategory, fat_level, weight_g, household_measure, dimension, protein_g, fat_g, calories) VALUES
('Camto', 'Beef Flank', 'beef', 'high_fat', 'high', 35, '1 slice, mbs', '5 × 3.5 × 2 cm', 8, 10, 122),
('Liempo, malaman', 'Pork Belly, less fat', 'pork', 'high_fat', 'high', 35, '1 slice', '6.5 × 3.5 × 1 cm', 8, 10, 122),
('Balut', 'Duck egg, fertilized', 'egg', 'high_fat', 'high', 65, '1 pc', '5.5 × 4.5 cm', 8, 10, 122);

-- RICE: Low Protein / Rice A (23g carbs, 0g protein, 92 kcal)
INSERT INTO rice_foods (filipino_name, english_name, category, subcategory, protein_level, weight_g, household_measure, carbohydrate_g, protein_g, fat_g, calories) VALUES
('Bigas, maputi, sinaing', 'Rice, well-milled, boiled', 'rice_and_products', 'plain_rice', 'low', 80, '½ cup', 23, 0, 0, 92),
('Bihon', 'Rice Noodles', 'noodles', 'noodles', 'low', 100, '1 cup', 23, 0, 0, 92),
('Gabi', 'Taro', 'rootcrop', 'rootcrop', 'low', 100, '¾ cup, cubed', 23, 0, 0, 92);

-- RICE: Medium Protein / Rice B (23g carbs, 2g protein, 100 kcal)
INSERT INTO rice_foods (filipino_name, english_name, category, subcategory, protein_level, weight_g, household_measure, carbohydrate_g, protein_g, fat_g, calories) VALUES
('Pinawa, sinaing', 'Brown rice, boiled', 'rice_and_products', 'plain_rice', 'medium', 80, '½ cup', 23, 2, 0, 100),
('Puto, puti', 'Rice cake, puto white', 'rice_and_products', 'rice_cake', 'medium', 50, '1 slice / 3-4 pcs', 23, 2, 0, 100),
('Patatas', 'Potato', 'rootcrop', 'rootcrop', 'medium', 170, '1 pc or 1¼ cup cubed', 23, 2, 0, 100);

-- RICE: High Protein / Rice C (23g carbs, 4g protein, 108 kcal)
INSERT INTO rice_foods (filipino_name, english_name, category, subcategory, protein_level, weight_g, household_measure, carbohydrate_g, protein_g, fat_g, calories) VALUES
('Tinapay, trigo', 'Bread, wheat', 'bakery', 'bread', 'high', 40, '1½ pcs', 23, 4, 0, 108),
('Pasta (enriched)', 'Pasta, enriched/unenriched', 'noodles', 'pasta', 'high', 70, '½ cup', 23, 4, 0, 108),
('Quinoa', 'Quinoa', 'others', 'grain', 'high', 95, '1 cup', 23, 4, 0, 108);

-- VEGETABLES (3g carbs, 1g protein, 0g fat, 16 kcal)
INSERT INTO vegetable_foods (filipino_name, english_name, category, weight_g, household_measure, carbohydrate_g, protein_g, fat_g, calories) VALUES
('Karot', 'Carrot', 'fresh', NULL, 'as desired', 3, 1, 0, 16),
('Broccoli', 'Broccoli', 'fresh', NULL, 'as desired', 3, 1, 0, 16),
('Ampalaya, dahon', 'Bittermelon/gourd, leaves', 'fresh', NULL, 'as desired', 3, 1, 0, 16),
('Kabuti, sariwa', 'Mushroom, fresh', 'fresh', NULL, 'as desired', 3, 1, 0, 16),
('Asparagus, de lata', 'Asparagus, canned', 'processed', 100, '1 cup', 3, 1, 0, 16),
('Kamatis, de lata', 'Tomato, canned', 'processed', 50, '3 Tbsp', 3, 1, 0, 16);

-- MILK: Whole (12g carbs, 8g protein, 10g fat, 170 kcal)
INSERT INTO milk_foods (filipino_name, english_name, category, amount_ml, household_measure, carbohydrate_g, protein_g, fat_g, calories) VALUES
('Gatas, baka', 'Milk, cow (whole)', 'whole', 250, '1 cup', 12, 8, 10, 170),
('Gatas, kambing', 'Milk, goat', 'whole', 250, '1 cup', 12, 8, 10, 170),
('Gatas, pulbos, full cream', 'Milk powder, full cream', 'whole', 35, '5 Tbsp, level', 12, 8, 10, 170);

-- MILK: Low Fat (12g carbs, 8g protein, 5g fat, 125 kcal)
INSERT INTO milk_foods (filipino_name, english_name, category, amount_ml, household_measure, carbohydrate_g, protein_g, fat_g, calories) VALUES
('Gatas, low fat', 'Milk, low fat', 'low_fat', 250, '1 cup', 12, 8, 5, 125),
('Yogurt', 'Yogurt', 'low_fat', 150, '½ cup', 12, 8, 5, 125);

-- MILK: Non-Fat/Skim (12g carbs, 8g protein, 0g fat, 80 kcal)
INSERT INTO milk_foods (filipino_name, english_name, category, amount_ml, household_measure, carbohydrate_g, protein_g, fat_g, calories) VALUES
('Gatas, skim', 'Milk, skim', 'non_fat', 250, '1 cup', 12, 8, 0, 80),
('Gatas, pulbos, skim', 'Milk powder, skim', 'non_fat', 25, '4 Tbsp, level', 12, 8, 0, 80),
('Yogurt, plain, skim', 'Yogurt, plain, skim', 'non_fat', 150, '½ cup', 12, 8, 0, 80);

-- FRUITS (10g carbs, 0g protein, 0g fat, 40 kcal)
INSERT INTO fruit_foods (filipino_name, english_name, category, weight_g, household_measure, carbohydrate_g, protein_g, fat_g, calories) VALUES
('Saging, lakatan', 'Banana, lakatan', 'fresh', 100, '1 pc medium', 10, 0, 0, 40),
('Mangga, hinog', 'Mango, ripe', 'fresh', 60, '½ pc small', 10, 0, 0, 40),
('Papaya, hinog', 'Papaya, ripe', 'fresh', 100, '1 slice', 10, 0, 0, 40),
('Mansanas', 'Apple', 'fresh', 80, '1 pc small', 10, 0, 0, 40),
('Dalanghita', 'Orange/Mandarin', 'fresh', 110, '1 pc medium', 10, 0, 0, 40),
('Ubas', 'Grapes', 'fresh', 80, '¾ cup', 10, 0, 0, 40);

-- ============================================================
-- Enable Row Level Security (optional for public read access)
-- ============================================================
ALTER TABLE meat_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE rice_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE vegetable_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE milk_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE fruit_foods ENABLE ROW LEVEL SECURITY;

-- Allow public read access (no auth required for reading food data)
CREATE POLICY "Allow public read on meat_foods" ON meat_foods FOR SELECT USING (true);
CREATE POLICY "Allow public read on rice_foods" ON rice_foods FOR SELECT USING (true);
CREATE POLICY "Allow public read on vegetable_foods" ON vegetable_foods FOR SELECT USING (true);
CREATE POLICY "Allow public read on milk_foods" ON milk_foods FOR SELECT USING (true);
CREATE POLICY "Allow public read on fruit_foods" ON fruit_foods FOR SELECT USING (true);
