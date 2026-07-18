import { useState, useEffect } from 'react'

const banners = [
  {
    id: 1,
    title: 'Stranger Things',
    description: 'Di kota kecil Hawkins tahun 1980-an, sekelompok anak menghadapi kekuatan supernatural dan eksperimen pemerintah rahasia saat mencari teman mereka yang hilang di dunia paralel.',
    bgImage: 'https://image.tmdb.org/t/p/original/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    ageRating: '13+',
    isSeries: true,
  },
  {
    id: 2,
    title: 'The Batman',
    description: 'Di tahun kedua memerangi kejahatan, Batman mengungkap korupsi di Gotham City yang terkait dengan keluarganya sendiri saat berhadapan dengan pembunuh berantai Riddler.',
    bgImage: 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    ageRating: '17+',
    isSeries: false,
  },
  {
  id: 3,
  title: 'All of Us Are Dead',
  description: 'Sebuah SMA menjadi tempat wabah zombie dimulai. Para siswa yang terperangkap harus berjuang untuk keluar hidup-hidup atau berubah menjadi salah satu dari mereka yang terinfeksi. Perjuangan yang mendebarkan untuk bertahan hidup di tengah kepungan mayat hidup.',
  bgImage: 'https://image.tmdb.org/t/p/original/rGxdrXVOjMuFtgpczaKcU2AkYb1.jpg',
  ageRating: '17+',
  isSeries: true,
},
  {
    id: 4,
    title: 'Avengers: Endgame',
    description: 'Setelah peristiwa dahsyat Infinity War, Avengers yang tersisa berkumpul untuk membalikkan tindakan Thanos dan memulihkan keseimbangan di alam semesta.',
    bgImage: 'https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    ageRating: '13+',
    isSeries: false,
  },
  {
    id: 5,
    title: 'Squid Game',
    description: 'Ratusan pemain yang terlilit hutang menerima undangan misterius untuk bermain game anak-anak. Hadiahnya menggiurkan, tapi taruhannya adalah nyawa mereka sendiri.',
    bgImage: 'https://image.tmdb.org/t/p/original/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    ageRating: '17+',
    isSeries: true,
  },
  {
    id: 6,
    title: 'John Wick: Chapter 4',
    description: 'John Wick mencari cara untuk mengalahkan High Table. Sebelum bisa mendapatkan kebebasan, ia harus menghadapi musuh baru dengan aliansi kuat di seluruh dunia.',
    bgImage: 'https://image.tmdb.org/t/p/original/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
    ageRating: '17+',
    isSeries: false,
  },
]

function Hero({ filterType = 'all' }) {
  const filteredBanners = banners.filter((banner) => {
    if (filterType === 'film') return !banner.isSeries
    if (filterType === 'series') return banner.isSeries
    return true
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    setCurrentIndex(0)
  }, [filterType])

  useEffect(() => {
    if (isPaused) return
    if (filteredBanners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredBanners.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, filteredBanners.length])

  function nextBanner() {
    setCurrentIndex((prev) => (prev + 1) % filteredBanners.length)
  }

  function prevBanner() {
    setCurrentIndex((prev) => (prev - 1 + filteredBanners.length) % filteredBanners.length)
  }

  if (filteredBanners.length === 0) return null

  const currentBanner = filteredBanners[currentIndex]

  return (
    <section
      className="relative w-full overflow-hidden group bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Container - LANDSCAPE ratio untuk semua device (seperti Netflix mobile) */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/8] lg:aspect-[16/7] xl:aspect-[21/9]">

        {/* Background slides */}
        {filteredBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* GAMBAR - object-cover memastikan full frame terisi */}
            <img
              src={banner.bgImage}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 20%' }}
            />

            {/* Gradient overlay - kuat di bawah, transparan di atas */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          </div>
        ))}

        {/* Tombol navigasi kiri-kanan */}
        {filteredBanners.length > 1 && (
          <>
            <button
              onClick={prevBanner}
              className="absolute left-2 sm:left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 sm:opacity-0 sm:group-hover:opacity-100 transition-all active:scale-95 shadow-lg ring-1 ring-white/10"
              aria-label="Banner sebelumnya"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextBanner}
              className="absolute right-2 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 sm:opacity-0 sm:group-hover:opacity-100 transition-all active:scale-95 shadow-lg ring-1 ring-white/10"
              aria-label="Banner berikutnya"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* KONTEN */}
        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 md:pl-16 md:pr-6 lg:pl-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10">

          {/* Group 1: Judul + Deskripsi */}
          <div className="max-w-full sm:max-w-xl md:max-w-2xl mb-3 sm:mb-4 md:mb-6 animate-fade-up">
            <h1
              key={`title-${currentIndex}`}
              className="text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight text-white animate-fade-in drop-shadow-2xl"
            >
              {currentBanner.title}
            </h1>

            <p
              key={`desc-${currentIndex}`}
              className="text-[11px] sm:text-sm md:text-base lg:text-base text-white/90 line-clamp-2 sm:line-clamp-3 max-w-full sm:max-w-md md:max-w-lg animate-fade-in leading-relaxed"
            >
              {currentBanner.description}
            </p>
          </div>

          {/* Group 2: Tombol - Selalu Horizontal, tidak wrap di mobile */}
          <div
            key={`btns-${currentIndex}`}
            className="flex items-center gap-1.5 sm:gap-3 animate-fade-in"
          >
            <button className="px-3 sm:px-6 md:px-8 py-1.5 sm:py-2.5 md:py-3 rounded-full bg-indigo-600 text-white font-semibold text-[11px] sm:text-sm md:text-base hover:bg-indigo-700 active:scale-95 transition-all shadow-lg whitespace-nowrap">
              Mulai
            </button>

            <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 md:px-8 py-1.5 sm:py-2.5 md:py-3 rounded-full bg-white/5 border border-white/30 text-white font-semibold text-[11px] sm:text-sm md:text-base hover:bg-white/15 active:scale-95 transition-all backdrop-blur-md whitespace-nowrap">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Selengkapnya
            </button>

            <span className="flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border-2 border-white/40 text-white font-semibold text-[9px] sm:text-xs md:text-sm shrink-0">
              {currentBanner.ageRating}
            </span>

            {/* Tombol Mute - Pindah ke sini di mobile (sejajar dengan tombol lain) */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="sm:hidden ml-auto w-7 h-7 rounded-full border-2 border-white/40 hover:border-white/70 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white flex items-center justify-center active:scale-95 transition-all shrink-0"
              aria-label={isMuted ? 'Aktifkan suara' : 'Matikan suara'}
            >
              {isMuted ? (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l4 4m0-4l-4 4" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Tombol Mute - Untuk Tablet & Desktop (di pojok kanan bawah) */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="hidden sm:flex absolute bottom-6 md:bottom-8 lg:bottom-10 right-6 md:right-10 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-white/40 hover:border-white/70 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white items-center justify-center active:scale-95 transition-all"
          aria-label={isMuted ? 'Aktifkan suara' : 'Matikan suara'}
        >
          {isMuted ? (
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l4 4m0-4l-4 4" />
            </svg>
          ) : (
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9" />
            </svg>
          )}
        </button>

      </div>
    </section>
  )
}

export default Hero