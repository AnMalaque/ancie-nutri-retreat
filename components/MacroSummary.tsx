'use client'

interface MacroTotals {
  carbs: number
  protein: number
  fat: number
  calories: number
}

interface MacroSummaryProps {
  totals: MacroTotals
}

export default function MacroSummary({ totals }: MacroSummaryProps) {
  const carbCal = totals.carbs * 4
  const protCal = totals.protein * 4
  const fatCal = totals.fat * 9
  const totalFromMacros = carbCal + protCal + fatCal

  const carbPct = totalFromMacros > 0 ? (carbCal / totalFromMacros) * 100 : 0
  const protPct = totalFromMacros > 0 ? (protCal / totalFromMacros) * 100 : 0
  const fatPct = totalFromMacros > 0 ? (fatCal / totalFromMacros) * 100 : 0

  return (
    <div className="cozy-panel">
      <h2 className="text-retreat-text font-cozy text-lg font-bold mb-4 flex items-center gap-2">
        🔥 Today&apos;s Totals
      </h2>

      {/* Big calorie number */}
      <div className="text-center mb-5 bg-retreat-panel rounded-cozy-lg p-4 border-2 border-retreat-border"
           style={{ boxShadow: 'inset 2px 2px 6px rgba(90,62,27,0.12)' }}>
        <div className="text-retreat-textMuted text-xs uppercase tracking-widest mb-1">Total Energy</div>
        <div className="text-retreat-text font-cozy" style={{ fontSize: '48px', fontWeight: 'bold', lineHeight: 1 }}>
          {Math.round(totals.calories)}
        </div>
        <div className="text-retreat-amber font-semibold text-sm mt-1">kcal</div>
      </div>

      {/* Macro bars */}
      <div className="space-y-3 mb-4">
        {[
          { label: 'Carbohydrates', grams: totals.carbs, kcal: carbCal, pct: carbPct, color: '#D4860A', bg: '#FEF3DC', emoji: '🌾' },
          { label: 'Protein', grams: totals.protein, kcal: protCal, pct: protPct, color: '#2471A3', bg: '#EBF5FB', emoji: '💪' },
          { label: 'Fat', grams: totals.fat, kcal: fatCal, pct: fatPct, color: '#C0392B', bg: '#FDECEA', emoji: '🧈' },
        ].map((macro) => (
          <div key={macro.label} className="rounded-cozy p-2" style={{ background: macro.bg, border: `1.5px solid ${macro.color}30` }}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-retreat-text text-sm font-semibold">{macro.emoji} {macro.label}</span>
              <div className="text-right">
                <span className="font-bold text-sm" style={{ color: macro.color }}>{macro.grams.toFixed(1)}g</span>
                <span className="text-retreat-textMuted text-xs ml-1">({Math.round(macro.kcal)} kcal)</span>
              </div>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden border" style={{ borderColor: `${macro.color}40` }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, macro.pct)}%`, background: macro.color }}
              />
            </div>
            <div className="text-xs mt-0.5" style={{ color: macro.color }}>{macro.pct.toFixed(0)}% of calories</div>
          </div>
        ))}
      </div>

      {/* Calorie formula breakdown */}
      <div className="rounded-cozy p-3 bg-retreat-panel border border-retreat-borderLight">
        <div className="text-retreat-textMuted text-xs mb-2 font-semibold uppercase tracking-wider">📐 Atwater Formula</div>
        <div className="space-y-1 text-xs text-retreat-textMuted font-body">
          <div className="flex justify-between">
            <span>Carbs: {totals.carbs.toFixed(1)}g × 4</span>
            <span className="text-amber-700 font-semibold">{carbCal.toFixed(0)} kcal</span>
          </div>
          <div className="flex justify-between">
            <span>Protein: {totals.protein.toFixed(1)}g × 4</span>
            <span className="text-blue-700 font-semibold">{protCal.toFixed(0)} kcal</span>
          </div>
          <div className="flex justify-between">
            <span>Fat: {totals.fat.toFixed(1)}g × 9</span>
            <span className="text-red-700 font-semibold">{fatCal.toFixed(0)} kcal</span>
          </div>
          <div className="border-t border-retreat-borderLight pt-1 flex justify-between font-bold text-retreat-text">
            <span>Total</span>
            <span>{totalFromMacros.toFixed(0)} kcal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
