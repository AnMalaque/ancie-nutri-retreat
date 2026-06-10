'use client'

type FoodType = 'meat' | 'rice' | 'vegetable' | 'milk' | 'fruit'

export interface LogEntry {
  id: string
  food_type: FoodType
  food_name: string
  filipino_name: string
  grams: number
  base_weight: number
  carbohydrate_g: number
  protein_g: number
  fat_g: number
  calories: number
  unit: string
}

const TYPE_CONFIG: Record<FoodType, { emoji: string; color: string; label: string }> = {
  rice: { emoji: '🍚', color: '#D4860A', label: 'Rice' },
  meat: { emoji: '🥩', color: '#C0392B', label: 'Meat' },
  vegetable: { emoji: '🥦', color: '#4A7C59', label: 'Vegetable' },
  milk: { emoji: '🥛', color: '#2471A3', label: 'Milk' },
  fruit: { emoji: '🍎', color: '#6C3483', label: 'Fruit' },
}

interface FoodLogProps {
  entries: LogEntry[]
  onRemove: (id: string) => void
}

export default function FoodLog({ entries, onRemove }: FoodLogProps) {
  if (entries.length === 0) {
    return (
      <div className="cozy-panel text-center py-10">
        <div className="text-5xl mb-3">🌾</div>
        <p className="text-retreat-textMuted font-cozy text-sm">Your food log is empty.</p>
        <p className="text-retreat-textLight text-xs mt-1">Add foods to track your nutrition!</p>
      </div>
    )
  }

  return (
    <div className="cozy-panel">
      <h2 className="text-retreat-text font-cozy text-lg font-bold mb-4 flex items-center gap-2">
        📋 Food Log
        <span className="text-xs font-normal text-retreat-textMuted ml-1 bg-retreat-panel px-2 py-0.5 rounded-full border border-retreat-borderLight">
          {entries.length} item{entries.length !== 1 ? 's' : ''}
        </span>
      </h2>
      <div className="space-y-2">
        {entries.map((entry) => {
          const cfg = TYPE_CONFIG[entry.food_type]
          const exchanges = entry.grams / entry.base_weight
          return (
            <div
              key={entry.id}
              className="flex items-start gap-3 rounded-cozy p-3 border border-retreat-borderLight hover:border-retreat-border transition-all"
              style={{ background: '#EFE3C0' }}
            >
              <span className="text-2xl mt-0.5">{cfg.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-retreat-text text-sm">{entry.food_name}</span>
                  <span
                    className="cozy-badge text-xs"
                    style={{
                      background: `${cfg.color}18`,
                      borderColor: `${cfg.color}50`,
                      color: cfg.color,
                      padding: '2px 8px',
                      borderRadius: '10px',
                      border: '1.5px solid',
                    }}
                  >
                    {cfg.label}
                  </span>
                </div>
                <div className="text-xs text-retreat-textMuted mt-0.5">{entry.filipino_name}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-xs">
                  <span className="text-retreat-textMuted">
                    {entry.grams}{entry.unit} ({exchanges.toFixed(2)} exchange{exchanges !== 1 ? 's' : ''})
                  </span>
                  <span className="text-amber-700">C: {entry.carbohydrate_g.toFixed(1)}g</span>
                  <span className="text-blue-700">P: {entry.protein_g.toFixed(1)}g</span>
                  <span className="text-red-700">F: {entry.fat_g.toFixed(1)}g</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-bold text-retreat-green text-sm">{Math.round(entry.calories)}</div>
                <div className="text-xs text-retreat-textMuted">kcal</div>
                <button
                  onClick={() => onRemove(entry.id)}
                  className="mt-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                  title="Remove entry"
                >
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
