import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FilmPickerModal from '../components/FilmPickerModal'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import RatingModal from '../components/RatingModal'
import MoviePopup from '../components/MoviePopup'
import useMoviesRedux from '../hooks/useMoviesRedux'

function DaftarSaya() {
  // Ambil state & handler dari Redux (perubahan untuk Mission)
  const {
    wishlist,
    addToWishlist,
    toggleWatched,
    setRating,
    deleteFromWishlist,
  } = useMoviesRedux()

  const [showPicker, setShowPicker] = useState(false)
  const [hapusData, setHapusData] = useState(null)
  const [ratingFilm, setRatingFilm] = useState(null)
  const [popupData, setPopupData] = useState(null)

  function handleTambah() {
    setShowPicker(true)
  }

  function handlePilih(film) {
    addToWishlist(film)
    setShowPicker(false)
  }

  function handleHapus() {
    deleteFromWishlist(hapusData.id)
    setHapusData(null)
  }

  function handleTonton(film) {
    setPopupData(film)
  }

  return (
    <div className="min-h-screen bg-chill-bg">
      <Header />

      <main className="pt-20 md:pt-24 pb-10 px-4 md:px-10 max-w-7xl mx-auto">

        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium mb-4 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Kembali ke Beranda
        </Link>

        <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Daftar Saya
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {wishlist.length} film/series dalam wishlist kamu
            </p>
          </div>

          <button
            onClick={handleTambah}
            className="px-5 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 active:scale-95 transition-transform shadow-md"
          >
            + Tambah ke Wishlist
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-lg">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-white text-lg font-semibold mb-2">
              Wishlist Kamu Masih Kosong
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Klik tombol di bawah untuk menambahkan film
            </p>
            <button
              onClick={handleTambah}
              className="px-5 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-all"
            >
              + Tambah Film Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wishlist.map((film) => (
              <FilmCard
                key={`wishlist-${film.id}`}
                film={film}
                onOpen={() => handleTonton(film)}
                onToggleWatched={() => toggleWatched(film.id)}
                onSetRating={() => setRatingFilm(film)}
                onDelete={() => setHapusData(film)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {popupData && (
        <MoviePopup
          data={popupData}
          onClose={() => setPopupData(null)}
          enableCrud={true}
          onToggleWatched={toggleWatched}
          onSetRating={(film) => setRatingFilm(film)}
          onDelete={(film) => setHapusData(film)}
        />
      )}

      {showPicker && (
        <FilmPickerModal
          existingList={wishlist}
          onSelect={handlePilih}
          onClose={() => setShowPicker(false)}
        />
      )}

      {ratingFilm && (
        <RatingModal
          film={ratingFilm}
          onRate={(rating) => setRating(ratingFilm.id, rating)}
          onClose={() => setRatingFilm(null)}
        />
      )}

      {hapusData && (
        <ConfirmDeleteModal
          film={hapusData}
          onConfirm={handleHapus}
          onCancel={() => setHapusData(null)}
        />
      )}
    </div>
  )
}

function FilmCard({ film, onOpen, onToggleWatched, onSetRating, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return
    function handleClickOutside() {
      setIsMenuOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  return (
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">

      <div
        className="relative aspect-[2/3] cursor-pointer overflow-hidden"
        onClick={onOpen}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${film.url}')` }}
        />

        <span className="absolute top-2 left-2 z-10 px-2 py-1 rounded bg-blue-600 text-white text-[10px] font-semibold">
          {film.isSeries ? 'Series' : 'Film'}
        </span>

        {film.isWatched && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-semibold shadow-md">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Ditonton</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
            <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsMenuOpen(!isMenuOpen)
        }}
        className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white text-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-95 shadow-md"
        title="Menu"
      >
        ⋮
      </button>

      {isMenuOpen && (
        <div
          className="absolute top-11 right-2 z-30 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-1 min-w-[200px] animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              onToggleWatched()
              setIsMenuOpen(false)
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2.5"
          >
            <span className="text-base">{film.isWatched ? '🔄' : '✓'}</span>
            <span>{film.isWatched ? 'Belum Ditonton' : 'Tandai Sudah Ditonton'}</span>
          </button>

          <button
            onClick={() => {
              onSetRating()
              setIsMenuOpen(false)
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2.5"
          >
            <span className="text-base">⭐</span>
            <span>{film.userRating > 0 ? 'Ubah Rating' : 'Beri Rating'}</span>
          </button>

          <button
            onClick={() => {
              onDelete()
              setIsMenuOpen(false)
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2.5"
          >
            <span className="text-base">🗑️</span>
            <span>Hapus dari Daftar</span>
          </button>
        </div>
      )}

      {/* Info bawah */}
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-white text-sm font-semibold truncate flex-1">
            {film.title}
          </h3>
          {film.rating && (
            <div className="flex items-center gap-0.5 text-xs text-white shrink-0">
              <span className="text-yellow-400">⭐</span>
              <span>{film.rating}</span>
            </div>
          )}
        </div>
        <p className="text-gray-400 text-xs mt-1 truncate">
          {film.duration || film.episodeCount}
        </p>
        <p className="text-gray-500 text-xs mt-1 truncate">
          {film.genres?.join(' • ')}
        </p>

        {/* User Rating display */}
        {film.userRating > 0 && (
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-white/5">
            <span className="text-gray-400 text-[10px]">Rating saya:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={`star-${film.id}-${star}`}
                  className={star <= film.userRating ? 'text-yellow-400 text-xs' : 'text-gray-700 text-xs'}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DaftarSaya