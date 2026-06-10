'use client'

import { useState, useCallback } from 'react'
import FoodSearch from '@/components/FoodSearch'
import FoodLog, { LogEntry } from '@/components/FoodLog'
import MacroSummary from '@/components/MacroSummary'

type FoodType = 'meat' | 'rice' | 'vegetable' | 'milk' | 'fruit'

interface FoodItem {
  id: number
  filipino_name: string
  english_name: string
  weight_g?: number
  amount_ml?: number
  household_measure?: string
  carbohydrate_g?: number
  protein_g?: number
  fat_g?: number
  calories: number
}

export default function Home() {
  const [entries, setEntries] = useState<LogEntry[]>([])

  const handleAddFood = useCallback((food: FoodItem, grams: number, type: FoodType) => {
    const baseWeight = food.weight_g || food.amount_ml || 1
    const ratio = grams / baseWeight
    const carbG = (food.carbohydrate_g || 0) * ratio
    const protG = (food.protein_g || 0) * ratio
    const fatG = (food.fat_g || 0) * ratio
    const totalCal = (carbG * 4) + (protG * 4) + (fatG * 9)

    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random()}`,
      food_type: type,
      food_name: food.english_name,
      filipino_name: food.filipino_name,
      grams,
      base_weight: baseWeight,
      carbohydrate_g: carbG,
      protein_g: protG,
      fat_g: fatG,
      calories: totalCal,
      unit: type === 'milk' ? 'ml' : 'g',
    }
    setEntries((prev) => [...prev, entry])
  }, [])

  const handleRemove = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const handleClear = () => {
    if (confirm('Clear all food entries?')) setEntries([])
  }

  const totals = entries.reduce(
    (acc, e) => ({
      carbs: acc.carbs + e.carbohydrate_g,
      protein: acc.protein + e.protein_g,
      fat: acc.fat + e.fat_g,
      calories: acc.calories + e.calories,
    }),
    { carbs: 0, protein: 0, fat: 0, calories: 0 }
  )

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Trebuchet MS', system-ui, sans-serif" }}>
      <header className="cozy-header px-4 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌿</div>
            <div>
              <h1 className="text-retreat-surface font-cozy text-lg font-bold tracking-wide">
                Nutri Retreat
              </h1>
              <p className="text-retreat-borderLight text-xs">Filipino Food Exchange Tracker</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-retreat-surface font-bold text-xl">
                {Math.round(totals.calories)}
              </div>
              <div className="text-retreat-borderLight text-xs">kcal today</div>
            </div>
            {entries.length > 0 && (
              <button
                onClick={handleClear}
                className="cozy-btn cozy-btn-danger text-xs px-3 py-2"
                style={{ fontSize: '11px' }}
              >
                🗑 Clear
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="text-center py-3 px-4" style={{ background: '#EFE3C0', borderBottom: '2px solid #C8A96E' }}>
        <p className="text-retreat-textMuted text-xs">
          🌾 Based on the Filipino Food Exchange Lists (FEL) &nbsp;·&nbsp; Carbs × 4 &nbsp;·&nbsp; Protein × 4 &nbsp;·&nbsp; Fat × 9 &nbsp;=&nbsp; kcal
        </p>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <FoodSearch onAddFood={handleAddFood} />
            <FoodLog entries={entries} onRemove={handleRemove} />
          </div>
          <div className="space-y-5">
            <MacroSummary totals={totals} />
            <div className="cozy-panel">
              <h3 className="text-retreat-text font-cozy text-sm font-bold mb-3 flex items-center gap-1">
                📖 Exchange Reference
              </h3>
              <div className="space-y-1.5 text-xs">
                {[
                  { emoji: '🥦', label: 'Vegetable', info: '3C · 1P · 0F = 16 kcal' },
                  { emoji: '🍎', label: 'Fruit', info: '10C · 0P · 0F = 40 kcal' },
                  { emoji: '🍚', label: 'Rice A (Low Prot)', info: '23C · 0P · 0F = 92 kcal' },
                  { emoji: '🍚', label: 'Rice B (Med Prot)', info: '23C · 2P · 0F = 100 kcal' },
                  { emoji: '🍚', label: 'Rice C (High Prot)', info: '23C · 4P · 0F = 108 kcal' },
                  { emoji: '🥛', label: 'Milk (Whole)', info: '12C · 8P · 10F = 170 kcal' },
                  { emoji: '🥛', label: 'Milk (Low Fat)', info: '12C · 8P · 5F = 125 kcal' },
                  { emoji: '🥛', label: 'Milk (Skim)', info: '12C · 8P · 0F = 80 kcal' },
                  { emoji: '🥩', label: 'Meat (Low Fat)', info: '0C · 8P · 1F = 41 kcal' },
                  { emoji: '🥩', label: 'Meat (Med Fat)', info: '0C · 8P · 6F = 86 kcal' },
                  { emoji: '🥩', label: 'Meat (High Fat)', info: '0C · 8P · 10F = 122 kcal' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-retreat-textMuted rounded px-2 py-1 hover:bg-retreat-panel">
                    <span>{item.emoji} {item.label}</span>
                    <span className="font-mono text-retreat-text">{item.info}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-retreat-textLight text-center">C=carbs · P=protein · F=fat (grams)</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-5 text-retreat-textLight text-xs border-t-2 border-retreat-borderLight mt-4">
        <p>🌿 Nutri Retreat · Built with Filipino Food Exchange Lists</p>
        <p className="mt-1 text-retreat-textMuted">Energy calculated using the Atwater general factors</p>
      </footer>
    </div>
  )
}
