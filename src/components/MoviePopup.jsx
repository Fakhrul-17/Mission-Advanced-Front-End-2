import { useState, useEffect } from 'react'

function MoviePopup({
  data,
  onClose,
  enableCrud,
  onToggleWatched,
  onSetRating,
  onDelete,
  onAddToWatchlist,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    if (!isMenuOpen) return
    function handleClickOutside() {
      setIsMenuOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  if (!data) return null

  const {
    url,
    title,
    isSeries,
    episode,
    episodeCount,
    duration = '2j 33m',
    progress = 0,
    rating = '4.5',
    year = '2024',
    genres = ['Misteri', 'Kriminal', 'Fantasi'],
    description = 'Sebuah cerita yang memikat dengan karakter mendalam dan plot twist yang tidak terduga. Tonton kisah lengkapnya hanya di Chill.',
    cast = ['Aktor 1', 'Aktor 2', 'Aktor 3'],
    episodes,
    isWatched,
    userRating,
  } = data

  // Generate episode list dummy kalau tidak ada di data
  const episodeList = episodes || (isSeries
    ? Array.from({ length: 8 }, (_, i) => ({
        number: i + 1,
        title: `Episode ${i + 1}`,
        duration: `${30 + (i % 3) * 5} menit`,
        thumbnail: url,
        description: 'Cerita lanjutan yang seru dan penuh kejutan.',
      }))
    : [])

  const hasMenu = enableCrud || onAddToWatchlist

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 md:pt-20 px-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[400px] md:max-w-[520px] rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl shadow-black/80 ring-1 ring-white/10 animate-card-expand-popup mb-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Menu (⋮) */}
        {hasMenu && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
            className="absolute top-3 right-14 z-30 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white text-lg hover:bg-black/90 active:scale-95 transition-all ring-1 ring-white/10"
            title="Menu"
          >
            ⋮
          </button>
        )}

        {/* Dropdown menu */}
        {isMenuOpen && hasMenu && (
          <div
            className="absolute top-14 right-3 z-40 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-1 min-w-[200px] animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {enableCrud ? (
              <>
                <button
                  onClick={() => {
                    onToggleWatched(data.id)
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2.5"
                >
                  <span className="text-base">{isWatched ? '🔄' : '✓'}</span>
                  <span>{isWatched ? 'Belum Ditonton' : 'Tandai Sudah Ditonton'}</span>
                </button>

                {onSetRating && (
                  <button
                    onClick={() => {
                      onSetRating(data)
                      setIsMenuOpen(false)
                      onClose()
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2.5"
                  >
                    <span className="text-base">⭐</span>
                    <span>{userRating > 0 ? 'Ubah Rating' : 'Beri Rating'}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onDelete(data)
                    setIsMenuOpen(false)
                    onClose()
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2.5"
                >
                  <span className="text-base">🗑️</span>
                  <span>Hapus dari Daftar</span>
                </button>
              </>
            ) : (
              onAddToWatchlist && (
                <button
                  onClick={() => {
                    onAddToWatchlist(data)
                    setIsMenuOpen(false)
                    onClose()
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2.5"
                >
                  <span className="text-base">➕</span>
                  <span>Tambah ke Daftar</span>
                </button>
              )
            )}
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/90 transition-colors ring-1 ring-white/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* POSTER */}
        <div className="relative">
          <div
            className="w-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${url}')`,
              aspectRatio: '16/9',
            }}
          />

          {/* Badge series/film */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md text-[10px] md:text-xs font-bold ${
              isSeries ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
            }`}>
              {isSeries ? '📺 SERIES' : '🎬 FILM'}
            </span>

            {isWatched && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold shadow-md">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Ditonton</span>
              </span>
            )}
          </div>

          {/* Gradient fade bawah */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-900 to-transparent" />
        </div>

        {/* INFO */}
        <div className="p-4 md:p-5 flex flex-col gap-3 md:gap-4 -mt-2 relative">

          {/* Tombol baris */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all shadow-lg">
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              <button className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-transparent border-[1.5px] border-white/80 text-white flex items-center justify-center hover:border-white hover:bg-white/10 active:scale-95 transition-all">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>

            {/* Tombol Mute/Unmute - Interaktif */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center active:scale-95 transition-all duration-300 ${
              isMuted
                ? 'bg-white/5 border-[1.5px] border-white/30 text-white/70 hover:bg-white/10 hover:border-white/50 hover:text-white'
                : 'bg-indigo-600 border-[1.5px] border-indigo-500 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20'
            }`}
            aria-label={isMuted ? 'Aktifkan suara' : 'Matikan suara'}
            title={isMuted ? 'Aktifkan suara' : 'Matikan suara'}
          >
            {isMuted ? (
              /* Icon MUTED - speaker dengan X (suara mati) */
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l4 4m0-4l-4 4" />
              </svg>
            ) : (
              /* Icon UNMUTED - speaker dengan gelombang (suara nyala) */
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9" />
              </svg>
            )}
            </button>
          </div>

          {/* Judul + Rating */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {title && (
                <h2 className="text-white text-lg md:text-xl font-bold leading-tight">
                  {title}
                </h2>
              )}
              {isSeries && episode && (
                <p className="text-white/60 text-xs md:text-sm font-medium italic mt-1">
                  "{episode}"
                </p>
              )}
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 text-white text-xs md:text-sm font-semibold">
                <span className="text-yellow-400">⭐</span>
                <span>{rating}</span>
              </div>

              {userRating > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-500/90 text-black text-xs font-bold">
                  <span>★</span>
                  <span>{userRating}</span>
                </div>
              )}
            </div>
          </div>

          {/* Info Meta: Year + Duration/Episodes */}
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-medium">
              {year}
            </span>
            <span className="text-white/70">•</span>
            <span className="text-white/80 font-medium">
              {isSeries ? `${episodeCount || episodeList.length} Episode` : duration}
            </span>
            <span className="text-white/70">•</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-medium">
              13+
            </span>
          </div>

          {/* Progress bar - hanya tampil kalau sudah pernah ditonton */}
          {progress > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[11px] md:text-xs text-white/70 font-medium whitespace-nowrap tabular-nums">
                {progress}%
              </span>
            </div>
          )}

          {/* Synopsis */}
          <div>
            <h3 className="text-white text-xs md:text-sm font-bold uppercase tracking-wider mb-2">
              Sinopsis
            </h3>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Genre tags */}
          <div>
            <h3 className="text-white text-xs md:text-sm font-bold uppercase tracking-wider mb-2">
              Genre
            </h3>
            <div className="flex flex-wrap items-center gap-1.5">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] md:text-xs font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Cast */}
          {cast && cast.length > 0 && (
            <div>
              <h3 className="text-white text-xs md:text-sm font-bold uppercase tracking-wider mb-2">
                Pemeran
              </h3>
              <p className="text-white/80 text-xs md:text-sm">
                {cast.join(', ')}
              </p>
            </div>
          )}

          {/* SECTION KHUSUS BERDASARKAN TYPE */}
          {isSeries ? (
            /* SERIES: Episode List */
            <div className="mt-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white text-sm md:text-base font-bold">
                  Episode
                </h3>
                <span className="text-white/60 text-xs">
                  Season 1
                </span>
              </div>

              <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 no-scrollbar">
                {episodeList.map((ep) => (
                  <div
                    key={ep.number}
                    className="flex gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 md:w-24 aspect-video rounded-md overflow-hidden shrink-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${ep.thumbnail || url}')` }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-white text-xs md:text-sm font-semibold truncate">
                          {ep.number}. {ep.title}
                        </h4>
                        <span className="text-white/60 text-[10px] md:text-xs shrink-0">
                          {ep.duration}
                        </span>
                      </div>
                      <p className="text-white/60 text-[10px] md:text-xs mt-1 line-clamp-2">
                        {ep.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* FILM: Info Detail Tambahan */
            <div className="mt-2 pt-3 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                <div>
                  <p className="text-white/50 mb-1">Durasi</p>
                  <p className="text-white font-medium">{duration}</p>
                </div>
                <div>
                  <p className="text-white/50 mb-1">Tahun Rilis</p>
                  <p className="text-white font-medium">{year}</p>
                </div>
                <div>
                  <p className="text-white/50 mb-1">Rating</p>
                  <p className="text-white font-medium flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    {rating}/5
                  </p>
                </div>
                <div>
                  <p className="text-white/50 mb-1">Kategori</p>
                  <p className="text-white font-medium">13+</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default MoviePopup