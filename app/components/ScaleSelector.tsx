'use client'

interface ScaleSelectorProps {
  value: number | undefined
  onChange: (value: number) => void
}

export default function ScaleSelector({ value, onChange }: ScaleSelectorProps) {
  return (
    <div className="flex flex-col items-center space-y-6 px-4">
      <div className="flex items-center justify-between w-full max-w-sm">
        <span className="text-xs sm:text-sm text-gray-600 text-center leading-tight">
          Totally<br className="sm:hidden" /> Disagree
        </span>
        <span className="text-xs sm:text-sm text-gray-600 text-center leading-tight">
          Totally<br className="sm:hidden" /> Agree
        </span>
      </div>
      <div className="grid grid-cols-7 gap-2 sm:gap-4 w-full max-w-sm">
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 text-sm sm:text-lg font-semibold transition-colors touch-manipulation ${
              value === num
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50 active:bg-blue-100'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="text-xs text-gray-500 text-center mt-2">
        Tap a number to select your response
      </div>
    </div>
  )
}