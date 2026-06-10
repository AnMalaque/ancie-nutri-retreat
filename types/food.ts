export type FatCategory = 'low' | 'medium' | 'high'
export type ProteinCategory = 'low' | 'medium' | 'high'
export type MilkCategory = 'whole' | 'low_fat' | 'non_fat'

export interface MeatFood {
  id: number
  filipino_name: string
  english_name: string
  category: string
  subcategory: string
  fat_level: FatCategory
  weight_g: number
  household_measure: string
  protein_g: number
  fat_g: number
  calories: number
}

export interface RiceFood {
  id: number
  filipino_name: string
  english_name: string
  category: string
  subcategory: string
  protein_level: ProteinCategory
  weight_g: number
  household_measure: string
  carbohydrate_g: number
  protein_g: number
  calories: number
}

export interface VegetableFood {
  id: number
  filipino_name: string
  english_name: string
  category: string
  weight_g: number
  household_measure: string
  carbohydrate_g: number
  protein_g: number
  calories: number
}

export interface MilkFood {
  id: number
  filipino_name: string
  english_name: string
  category: MilkCategory
  amount_ml: number
  household_measure: string
  carbohydrate_g: number
  protein_g: number
  fat_g: number
  calories: number
}

export interface FruitFood {
  id: number
  filipino_name: string
  english_name: string
  weight_g: number
  household_measure: string
  carbohydrate_g: number
  calories: number
}

export interface FoodEntry {
  food_type: 'meat' | 'rice' | 'vegetable' | 'milk' | 'fruit'
  food_id: number
  food_name: string
  grams: number
  base_weight_g: number
  carbohydrate_g: number
  protein_g: number
  fat_g: number
  calories: number
  calculated_calories: number
}

export type AnyFood = MeatFood | RiceFood | VegetableFood | MilkFood | FruitFood
