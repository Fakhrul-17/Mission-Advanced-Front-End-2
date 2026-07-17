import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import MovieSection from '../components/MovieSection'
import Footer from '../components/Footer'
import { topRating } from '../data/movies'
import useMoviesRedux from '../hooks/useMoviesRedux'

function Home({ filterType = 'all' }) {
  // Ambil semua state & handler dari Redux
  const {
    wishlist,
    addToWishlist,
    toggleWatched,
    setRating,
    deleteFromWishlist,
  } = useMoviesRedux()

  const [ratingModal, setRatingModal] = useState(null)

  function handleOpenRating(film) {
    setRatingModal(film)
  }

  function handleDeleteConfirm(film) {
    if (confirm(`Hapus "${film.title}" dari daftar?`)) {
      deleteFromWishlist(film.id)
    }
  }

  // Filter berdasarkan tipe (film/series)
  function filterByType(data) {
    if (filterType === 'film') return data.filter((item) => !item.isSeries)
    if (filterType === 'series') return data.filter((item) => item.isSeries)
    return data
  }

  const filteredMelanjutkanTonton = filterByType(wishlist)
  const filteredTopRating = filterByType(topRating)

  return (
    <div className="min-h-screen bg-chill-bg">
      <Header />

      <Hero filterType={filterType} />

      <main className="pb-10">

        {/* Melanjutkan Tonton - Data dari Redux */}
        {filteredMelanjutkanTonton.length > 0 && (
          <MovieSection
            title="Melanjutkan Tonton Film"
            movies={filteredMelanjutkanTonton}
            enableCrud={true}
            onToggleWatched={toggleWatched}
            onSetRating={handleOpenRating}
            onDeleteFilm={handleDeleteConfirm}
          />
        )}

        {/* Top Rating - Data statis */}
        <MovieSection
          title="Top Rating Film dan Series Hari Ini"
          movies={filteredTopRating}
          sectionBadge={{
            label: '🏆 TOP RATED',
            bgColor: 'bg-blue-600',
            textColor: 'text-white',
          }}
          onAddToWatchlist={addToWishlist}
        />

        {/* Film Trending - Pakai data yang sama dengan variasi */}
        <MovieSection
          title="Film Trending"
          movies={filteredTopRating}
          sectionBadge={{
            label: '🔥 TRENDING',
            bgColor: 'bg-red-600',
            textColor: 'text-white',
          }}
          onAddToWatchlist={addToWishlist}
        />

        {/* Persembahan Chill */}
        <MovieSection
          title="Persembahan Chill"
          movies={filteredTopRating}
          sectionBadge={{
            label: '👑 PREMIUM',
            bgColor: 'bg-gradient-to-r from-yellow-400 to-amber-500',
            textColor: 'text-black',
          }}
          onAddToWatchlist={addToWishlist}
        />

        {/* Rilis Baru */}
        <MovieSection
          title="Rilis Baru"
          movies={filteredTopRating}
          sectionBadge={{
            label: '✨ BARU',
            bgColor: 'bg-purple-600',
            textColor: 'text-white',
          }}
          onAddToWatchlist={addToWishlist}
        />
      </main>

      <Footer />

      {/* Rating Modal */}
      {ratingModal && (
        <RatingModal
          film={ratingModal}
          onClose={() => setRatingModal(null)}
          onSubmit={(rating) => {
            setRating(ratingModal.id, rating)
            setRatingModal(null)
          }}
        />
      )}
    </div>
  )
}

/* Modal untuk beri rating */
function RatingModal({ film, onClose, onSubmit }) {
  const [selectedRating, setSelectedRating] = useState(film.userRating || 0)

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-zinc-900 shadow-2xl ring-1 ring-white/10 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/90 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">⭐</div>
          <h2 className="text-white text-xl font-bold mb-1">Beri Rating</h2>
          <p className="text-white/60 text-sm">"{film.title}"</p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedRating(star)}
              className={`text-4xl transition-all ${
                selectedRating >= star
                  ? 'text-yellow-400 scale-110'
                  : 'text-white/20 hover:text-white/40'
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-2.5 rounded-lg bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => onSubmit(selectedRating)}
            disabled={selectedRating === 0}
            className="flex-1 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home