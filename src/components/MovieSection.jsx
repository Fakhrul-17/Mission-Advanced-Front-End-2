import { useState, useEffect, useRef } from 'react'
import MoviePopup from './MoviePopup'

function MovieSection({
  title,
  movies,
  enableCrud = false,
  sectionBadge,
  onAdd,
  onToggleWatched,
  onSetRating,
  onDeleteFilm,
  onAddToWatchlist,
}) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [popupData, setPopupData] = useState(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollRef = useRef(null)
  const scrollTimerRef = useRef(null)

  const isContinueWatching = title === 'Melanjutkan Tonton Film'

  function updateScrollState() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  function handleScroll() {
    updateScrollState()
    setIsScrolling(true)

    clearTimeout(scrollTimerRef.current)
    scrollTimerRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 1500)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return

    el.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScrollState)
      clearTimeout(scrollTimerRef.current)
    }
  }, [movies])

  function scroll(direction) {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <section className="py-5 md:py-10 px-4 md:px-10 relative group/section">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base md:text-xl font-semibold text-white">
            {title}
          </h2>

          {enableCrud && onAdd && (
            <button
              onClick={onAdd}
              className="px-4 py-2 rounded bg-white text-black text-sm font-semibold hover:bg-gray-200"
            >
              + Tambah Film
            </button>
          )}
        </div>

        <div className="relative">
          {/* Tombol scroll KIRI - smart */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-opacity duration-300 active:scale-95 shadow-lg backdrop-blur-sm ${
              canScrollLeft
                ? (isScrolling
                    ? 'opacity-100'
                    : 'opacity-0 group-hover/section:opacity-100')
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll kiri"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Tombol scroll KANAN - smart */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-opacity duration-300 active:scale-95 shadow-lg backdrop-blur-sm ${
              canScrollRight
                ? (isScrolling
                    ? 'opacity-100'
                    : 'opacity-0 group-hover/section:opacity-100')
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll kanan"
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {enableCrud && movies.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded">
              <div className="text-4xl mb-3">🎬</div>
              <p className="text-gray-400 text-sm">
                Belum ada film. Tambahkan di halaman Daftar Saya.
              </p>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-3 no-scrollbar items-start scroll-smooth"
              style={{
                paddingTop: '50px',
                paddingBottom: '50px',
                marginTop: '-50px',
                marginBottom: '-50px',
                overflowY: 'visible',
              }}
            >
              {movies.map((item, i) => {
                const data = typeof item === 'string' ? { url: item } : item
                const isActive = activeIndex === i

                return (
                  <MovieCardWrapper
                    key={`${title}-${data.id || i}`}
                    data={data}
                    isActive={isActive}
                    isContinueWatching={isContinueWatching}
                    enableCrud={enableCrud}
                    sectionBadge={sectionBadge}
                    onClick={() => setActiveIndex(i)}
                    onClose={() => setActiveIndex(null)}
                    onOpenPopup={() => setPopupData(data)}
                    onToggleWatched={onToggleWatched}
                    onSetRating={onSetRating}
                    onDeleteFilm={onDeleteFilm}
                    onAddToWatchlist={onAddToWatchlist}
                  />
                )
              })}
            </div>
          )}
        </div>
      </section>

      {popupData && (
        <MoviePopup
          data={popupData}
          onClose={() => setPopupData(null)}
          enableCrud={enableCrud}
          onToggleWatched={onToggleWatched}
          onSetRating={onSetRating}
          onDelete={onDeleteFilm}
          onAddToWatchlist={onAddToWatchlist}
        />
      )}
    </>
  )
}

/* Icon Play SVG */
function PlayIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={`${className} text-black ml-0.5`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

/* DROPDOWN MENU */
function DropdownMenu({ enableCrud, data, onToggleWatched, onSetRating, onDelete, onAdd, onClose }) {
  return (
    <div
      className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-1 min-w-[200px] animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      {enableCrud ? (
        <>
          <button
            onClick={() => {
              onToggleWatched(data.id)
              onClose()
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2.5"
          >
            <span className="text-base">{data.isWatched ? '🔄' : '✓'}</span>
            <span>{data.isWatched ? 'Belum Ditonton' : 'Tandai Sudah Ditonton'}</span>
          </button>

          {onSetRating && (
            <button
              onClick={() => {
                onSetRating(data)
                onClose()
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2.5"
            >
              <span className="text-base">⭐</span>
              <span>{data.userRating > 0 ? 'Ubah Rating' : 'Beri Rating'}</span>
            </button>
          )}

          <button
            onClick={() => {
              onDelete(data)
              onClose()
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2.5"
          >
            <span className="text-base">🗑️</span>
            <span>Hapus dari Daftar</span>
          </button>
        </>
      ) : (
        onAdd && (
          <button
            onClick={() => {
              onAdd(data)
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
  )
}

function MenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white text-lg flex items-center justify-center active:scale-95 shadow-md transition-all"
      title="Menu"
    >
      ⋮
    </button>
  )
}

function MovieCardWrapper({
  data,
  isActive,
  isContinueWatching,
  enableCrud,
  sectionBadge,
  onClick,
  onClose,
  onOpenPopup,
  onToggleWatched,
  onSetRating,
  onDeleteFilm,
  onAddToWatchlist,
}) {
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
    <div className="relative shrink-0 group/card">

      <div
        className={`group relative cursor-pointer ${isActive ? 'opacity-0 pointer-events-none' : ''}`}
        onClick={!isActive ? onClick : undefined}
      >
        {isContinueWatching ? (
          <ContinueWatchingCard data={data} sectionBadge={sectionBadge} />
        ) : (
          <PortraitCard data={data} sectionBadge={sectionBadge} />
        )}
      </div>

      {!isActive && (enableCrud || onAddToWatchlist) && (
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover/card:opacity-100 transition-opacity">
          <MenuButton
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
          />
        </div>
      )}

      {isMenuOpen && (
        <div className="absolute top-11 right-2 z-30">
          <DropdownMenu
            enableCrud={enableCrud}
            data={data}
            onToggleWatched={onToggleWatched}
            onSetRating={onSetRating}
            onDelete={onDeleteFilm}
            onAdd={onAddToWatchlist}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      )}

      {isActive && (
        isContinueWatching ? (
          <ExpandedCard
            data={data}
            onClose={onClose}
            onOpenPopup={onOpenPopup}
            enableCrud={enableCrud}
            onToggleWatched={onToggleWatched}
            onSetRating={onSetRating}
            onDeleteFilm={onDeleteFilm}
            onAddToWatchlist={onAddToWatchlist}
          />
        ) : (
          <ExpandedTopCard
            data={data}
            onClose={onClose}
            onOpenPopup={onOpenPopup}
            enableCrud={enableCrud}
            onToggleWatched={onToggleWatched}
            onSetRating={onSetRating}
            onDeleteFilm={onDeleteFilm}
            onAddToWatchlist={onAddToWatchlist}
          />
        )
      )}
    </div>
  )
}

function PortraitCard({ data, sectionBadge }) {
  const { url, badge, isWatched, userRating } = data

  return (
    <div className="relative w-[140px] h-[210px] md:w-[170px] md:h-[255px] rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url('${url}')` }}
      />

      {/* SECTION BADGE - notifikasi di pojok kiri atas */}
      {sectionBadge && (
        <span className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[9px] md:text-[10px] font-bold shadow-lg z-10 ${sectionBadge.bgColor} ${sectionBadge.textColor}`}>
          {sectionBadge.label}
        </span>
      )}

      {/* Fallback: badge lama dari data (kalau ada) */}
      {badge && !sectionBadge && (
        <span className="absolute top-2 left-2 px-2 py-1 rounded bg-blue-600 text-white text-[10px] font-semibold z-10">
          {badge}
        </span>
      )}

      {userRating > 0 && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-0.5 px-2 py-1 rounded-full bg-yellow-500/90 backdrop-blur-sm text-black text-[10px] font-bold shadow-md">
          <span>★</span>
          <span>{userRating}</span>
        </div>
      )}

      {isWatched && (
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
          <PlayIcon />
        </div>
      </div>
    </div>
  )
}

function ContinueWatchingCard({ data, sectionBadge }) {
  const { url, title = 'Untitled', rating = '4.5', isWatched, userRating } = data

  return (
    <div className="relative w-[210px] h-[125px] md:w-[270px] md:h-[160px] rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url('${url}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

      {/* SECTION BADGE */}
      {sectionBadge && (
        <span className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[9px] md:text-[10px] font-bold shadow-lg z-10 ${sectionBadge.bgColor} ${sectionBadge.textColor}`}>
          {sectionBadge.label}
        </span>
      )}

      {isWatched && (
        <div className={`absolute z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-semibold shadow-md left-2 ${sectionBadge ? 'top-10' : 'top-2'}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Ditonton</span>
        </div>
      )}

      {userRating > 0 && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-0.5 px-2 py-1 rounded-full bg-yellow-500/90 backdrop-blur-sm text-black text-[10px] font-bold shadow-md">
          <span>★</span>
          <span>{userRating}</span>
        </div>
      )}

      <div className="absolute bottom-2 left-3 right-14">
        <h3 className="text-white text-sm font-semibold truncate">{title}</h3>
      </div>

      <div className="absolute bottom-2 right-3 flex items-center gap-1 text-xs text-white">
        <span className="text-yellow-400">⭐</span>
        <span>{rating}</span>
      </div>

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
          <PlayIcon />
        </div>
      </div>
    </div>
  )
}

function ExpandedCard({
  data,
  onClose,
  onOpenPopup,
  enableCrud,
  onToggleWatched,
  onSetRating,
  onDeleteFilm,
  onAddToWatchlist,
}) {
  const {
    url,
    isSeries,
    episode,
    duration = '2j 33m',
    progress = 0,
    genres = ['Misteri', 'Kriminal', 'Fantasi'],
  } = data

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
    <div className="absolute top-1/2 left-1/2 z-50 w-[230px] h-[215px] md:w-[280px] md:h-[260px] rounded-lg overflow-hidden bg-gray-900 shadow-xl flex flex-col animate-card-expand">
      <div className="relative" style={{ height: '52%' }}>
        <div
          className="w-full h-full bg-cover bg-top"
          style={{ backgroundImage: `url('${url}')` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
        {(enableCrud || onAddToWatchlist) && (
          <MenuButton
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
          />
        )}

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white text-sm flex items-center justify-center active:scale-95 transition-all"
        >
          ✕
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-11 right-2 z-30">
          <DropdownMenu
            enableCrud={enableCrud}
            data={data}
            onToggleWatched={onToggleWatched}
            onSetRating={onSetRating}
            onDelete={onDeleteFilm}
            onAdd={onAddToWatchlist}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
              <PlayIcon className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-white text-white flex items-center justify-center hover:bg-white/10 transition-colors">✓</button>
          </div>
          <button
            onClick={onOpenPopup}
            className="w-8 h-8 rounded-full border border-white/60 text-white flex items-center justify-center hover:border-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Lihat detail"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {isSeries && episode && (
          <h3 className="text-white text-sm font-semibold italic text-center">"{episode}"</h3>
        )}

        {/* Progress bar - hanya tampil kalau sudah pernah ditonton */}
        <div className="flex items-center gap-2">
          {progress > 0 ? (
            <>
              <div className="flex-1 h-1 rounded-full bg-white/15 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-xs text-gray-400">{duration}</span>
            </>
          ) : (
            <span className="text-xs text-gray-400 font-medium">{duration}</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1 text-xs text-gray-400">
          {genres.map((genre, i) => (
            <span key={`${data.id}-genre-${genre}`}>
              {i > 0 && ' • '}
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExpandedTopCard({
  data,
  onClose,
  onOpenPopup,
  enableCrud,
  onToggleWatched,
  onSetRating,
  onDeleteFilm,
  onAddToWatchlist,
}) {
  const {
    url,
    ageRating = '13+',
    isSeries,
    duration = '2j 33m',
    episodeCount,
    genres = ['Misteri', 'Kriminal', 'Fantasi'],
  } = data

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
    <div className="absolute top-1/2 left-1/2 z-50 w-[230px] h-[215px] md:w-[280px] md:h-[260px] rounded-lg overflow-hidden bg-gray-900 shadow-xl flex flex-col animate-card-expand">
      <div className="relative" style={{ height: '52%' }}>
        <div
          className="w-full h-full bg-cover bg-top"
          style={{ backgroundImage: `url('${url}')` }}
        />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5">
        {(enableCrud || onAddToWatchlist) && (
          <MenuButton
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
          />
        )}

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white text-sm flex items-center justify-center active:scale-95 transition-all"
        >
          ✕
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-11 right-2 z-30">
          <DropdownMenu
            enableCrud={enableCrud}
            data={data}
            onToggleWatched={onToggleWatched}
            onSetRating={onSetRating}
            onDelete={onDeleteFilm}
            onAdd={onAddToWatchlist}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      )}

      <div className="flex-1 p-3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
              <PlayIcon className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border border-white text-white flex items-center justify-center hover:bg-white/10 transition-colors">✓</button>
          </div>
          <button
            onClick={onOpenPopup}
            className="w-8 h-8 rounded-full border border-white/60 text-white flex items-center justify-center hover:border-white hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Lihat detail"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-white/15 text-white text-[10px] font-semibold border border-white/30">
            {ageRating}
          </span>
          <span className="text-xs text-gray-300 font-medium">
            {isSeries ? episodeCount : duration}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1 text-xs text-gray-400">
          {genres.map((genre, i) => (
            <span key={`${data.id}-genre-${genre}`}>
              {i > 0 && ' • '}
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieSection