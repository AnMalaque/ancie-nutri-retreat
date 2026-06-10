'use client'

import { useState, useEffect, useRef } from 'react'

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
  fat_level?: string
  protein_level?: string
  category?: string
}

interface FoodSearchProps {
  onAddFood: (food: FoodItem, grams: number, type: FoodType) => void
}

const FOOD_TYPES: { value: FoodType; label: string; icon: string; color: string }[] = [
  { value: 'rice', label: 'Rice & Starches', icon: '🍚', color: 'bg-amber-100 border-amber-400 text-amber-800' },
  { value: 'meat', label: 'Meat & Protein', icon: '🥩', color: 'bg-red-100 border-red-400 text-red-800' },
  { value: 'vegetable', label: 'Vegetables', icon: '🥦', color: 'bg-green-100 border-green-400 text-green-800' },
  { value: 'milk', label: 'Milk & Dairy', icon: '🥛', color: 'bg-blue-100 border-blue-400 text-blue-800' },
  { value: 'fruit', label: 'Fruits', icon: '🍎', color: 'bg-purple-100 border-purple-400 text-purple-800' },
]

const MEAT_FILTERS = [
  { value: '', label: 'All fat levels' },
  { value: 'low', label: '🟢 Low Fat (41 kcal/exchange)' },
  { value: 'medium', label: '🟡 Medium Fat (86 kcal/exchange)' },
  { value: 'high', label: '🔴 High Fat (122 kcal/exchange)' },
]

const RICE_FILTERS = [
  { value: '', label: 'All types' },
  { value: 'low', label: 'Rice A – Low Protein (92 kcal)' },
  { value: 'medium', label: 'Rice B – Medium Protein (100 kcal)' },
  { value: 'high', label: 'Rice C – High Protein (108 kcal)' },
]

const MILK_FILTERS = [
  { value: '', label: 'All types' },
  { value: 'whole', label: 'Whole (170 kcal/exchange)' },
  { value: 'low_fat', label: 'Low Fat (125 kcal/exchange)' },
  { value: 'non_fat', label: 'Non-Fat / Skim (80 kcal/exchange)' },
]

export default function FoodSearch({ onAddFood }: FoodSearchProps) {
  const [selectedType, setSelectedType] = useState<FoodType>('rice')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [grams, setGrams] = useState('')
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchFoods = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ type: selectedType })
      if (search) params.set('search', search)
      if (filter) {
        if (selectedType === 'meat') params.set('fat_level', filter)
        if (selectedType === 'rice') params.set('protein_level', filter)
        if (selectedType === 'milk') params.set('category', filter)
      }
      const res = await fetch(`/api/foods?${params}`)
      const json = await res.json()
      setFoods(json.data || [])
    } catch {
      setFoods([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchDebounce.current) clearTimeout(searchDebounce.current)
    searchDebounce.current = setTimeout(() => { fetchFoods() }, 300)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, search, filter])

  useEffect(() => {
    setSelectedFood(null)
    setFilter('')
    setSearch('')
  }, [selectedType])

  const handleAdd = () => {
    if (!selectedFood || !grams || parseFloat(grams) <= 0) return
    onAddFood(selectedFood, parseFloat(grams), selectedType)
    setSelectedFood(null)
    setGrams('')
  }

  const baseWeight = selectedFood?.weight_g || selectedFood?.amount_ml || 0
  const gramsNum = parseFloat(grams) || 0
  const ratio = baseWeight > 0 ? gramsNum / baseWeight : 0
  const previewCal = ratio * (selectedFood?.calories || 0)
  const previewCarbs = ratio * (selectedFood?.carbohydrate_g || 0)
  const previewProt = ratio * (selectedFood?.protein_g || 0)
  const previewFat = ratio * (selectedFood?.fat_g || 0)

  return (
    <div className="cozy-panel">
      <h2 className="text-retreat-text font-cozy text-lg font-bold mb-4 flex items-center gap-2">
        🌿 Add Food to Log
      </h2>

      {/* Food type selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {FOOD_TYPES.map((ft) => (
          <button
            key={ft.value}
            onClick={() => setSelectedType(ft.value)}
            className={`cozy-badge cursor-pointer transition-all ${
              selectedType === ft.value
                ? 'bg-retreat-green text-retreat-surface border-retreat-green shadow-cozy'
                : 'bg-retreat-panel text-retreat-textMuted border-retreat-border hover:border-retreat-green'
            }`}
            style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '20px', border: '2px solid' }}
          >
            {ft.icon} {ft.label}
          </button>
        ))}
      </div>

      {/* Sub-filter */}
      {(selectedType === 'meat' || selectedType === 'rice' || selectedType === 'milk') && (
        <div className="mb-3">
          <select
            className="cozy-input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {(selectedType === 'meat' ? MEAT_FILTERS : selectedType === 'rice' ? RICE_FILTERS : MILK_FILTERS).map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Search */}
      <div className="mb-3 relative">
        <input
          type="text"
          className="cozy-input pl-9"
          placeholder="Search by Filipino or English name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-retreat-textLight text-sm">🔍</span>
      </div>

      {/* Food list */}
      <div className="max-h-52 overflow-y-auto rounded-cozy border-2 border-retreat-border mb-4"
           style={{ background: '#EFE3C0' }}>
        {loading ? (
          <div className="p-4 text-center text-retreat-textMuted text-sm">
            <span className="animate-pulse">Loading foods... 🌱</span>
          </div>
        ) : foods.length === 0 ? (
          <div className="p-4 text-center text-retreat-textMuted text-sm">
            No foods found. Try a different search! 🍂
          </div>
        ) : (
          foods.map((food) => (
            <button
              key={food.id}
              onClick={() => {
                setSelectedFood(food)
                setGrams(String(food.weight_g || food.amount_ml || ''))
              }}
              className={`w-full text-left px-3 py-2 border-b border-retreat-borderLight transition-all ${
                selectedFood?.id === food.id
                  ? 'bg-retreat-green text-white'
                  : 'hover:bg-retreat-panel text-retreat-text'
              }`}
              style={{ borderBottom: '1px solid #DEC88A' }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-semibold text-sm block">{food.english_name}</span>
                  <span className={`text-xs ${selectedFood?.id === food.id ? 'text-green-100' : 'text-retreat-textMuted'}`}>
                    {food.filipino_name}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold block ${selectedFood?.id === food.id ? 'text-yellow-200' : 'text-retreat-amber'}`}>
                    {food.calories} kcal
                  </span>
                  <span className={`text-xs ${selectedFood?.id === food.id ? 'text-green-200' : 'text-retreat-textLight'}`}>
                    per {food.weight_g || food.amount_ml}{food.amount_ml ? 'ml' : 'g'}
                  </span>
                </div>
              </div>
              {food.household_measure && (
                <span className={`text-xs ${selectedFood?.id === food.id ? 'text-green-100' : 'text-retreat-textLight'}`}>
                  ≈ {food.household_measure}
                </span>
              )}
            </button>
          ))
        )}
      </div>

      {/* Gram input + preview */}
      {selectedFood && (
        <div className="bg-retreat-amberBg border-2 border-retreat-borderLight rounded-cozy p-3 mb-3">
          <p className="text-retreat-text font-semibold text-sm mb-2">
            📝 {selectedFood.english_name}
          </p>
          <div className="flex gap-2 items-center mb-2">
            <label className="text-retreat-textMuted text-sm whitespace-nowrap">
              {selectedType === 'milk' ? 'Amount (ml):' : 'Grams (g):'}
            </label>
            <input
              type="number"
              className="cozy-input"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              min="0"
              step="1"
              placeholder={`e.g. ${baseWeight}`}
              style={{ maxWidth: '120px' }}
            />
            <span className="text-retreat-textMuted text-xs">
              (1 exchange = {baseWeight}{selectedType === 'milk' ? 'ml' : 'g'})
            </span>
          </div>
          {gramsNum > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[
                { label: 'Carbs', val: previewCarbs, unit: 'g', color: 'text-amber-700' },
                { label: 'Protein', val: previewProt, unit: 'g', color: 'text-blue-700' },
                { label: 'Fat', val: previewFat, unit: 'g', color: 'text-red-700' },
                { label: 'Calories', val: previewCal, unit: 'kcal', color: 'text-retreat-green font-bold' },
              ].map((n) => (
                <div key={n.label} className="bg-white rounded-cozy p-2 text-center border border-retreat-borderLight">
                  <div className={`text-sm font-bold ${n.color}`}>{n.val.toFixed(1)}<span className="text-xs font-normal">{n.unit}</span></div>
                  <div className="text-xs text-retreat-textMuted">{n.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <button
        className="cozy-btn w-full"
        onClick={handleAdd}
        disabled={!selectedFood || !grams || parseFloat(grams) <= 0}
        style={{ opacity: (!selectedFood || !grams || parseFloat(grams) <= 0) ? 0.5 : 1 }}
      >
        ✨ Add to Log
      </button>
    </div>
  )
}
