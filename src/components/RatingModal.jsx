import { useState } from 'react'

function RatingModal({ film, onRate, onClose }) {
  const [hoveredRating, setHoveredRating] = useState(0)
  const currentRating = film.userRating || 0
  const displayRating = hoveredRating || currentRating

  const labels = {
    0: 'Klik bintang untuk memberi rating',
    1: 'Sangat buruk 😞',
    2: 'Buruk 😐',
    3: 'Biasa saja 🙂',
    4: 'Bagus 😊',
    5: 'Sangat bagus 🤩',
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg p-6 max-w-sm w-full shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-white text-lg font-bold">Beri Rating</h2>
            <p className="text-gray-400 text-sm mt-1 line-clamp-1">{film.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white text-xl w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
          >
            ✕
          </button>
        </div>

        {/* Bintang interaktif */}
        <div className="flex justify-center gap-2 py-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => {
                onRate(star)
                onClose()
              }}
              className="text-5xl transition-transform hover:scale-125 active:scale-110"
            >
              <span className={star <= displayRating ? 'text-yellow-400' : 'text-gray-700'}>
                ★
              </span>
            </button>
          ))}
        </div>

        {/* Label */}
        <p className="text-center text-gray-300 text-sm mb-4 min-h-[20px]">
          {labels[displayRating]}
        </p>

        {/* Reset rating */}
        {currentRating > 0 && (
          <button
            onClick={() => {
              onRate(0)
              onClose()
            }}
            className="w-full py-2 text-red-400 text-sm hover:bg-red-500/10 rounded transition-colors"
          >
            Hapus rating saya
          </button>
        )}
      </div>
    </div>
  )
}

export default RatingModal