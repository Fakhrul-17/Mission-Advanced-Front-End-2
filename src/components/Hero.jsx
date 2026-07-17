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
    title: 'Duty After School',
    description: 'Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.',
    bgImage: 'https://image.tmdb.org/t/p/original/pTEFqAjLd5YTsMD6NSUxV6Dq7A6.jpg',
    ageRating: '18+',
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
      {/* Container - proporsi sesuai gambar asli */}
      <div className="relative w-full aspect-[16/7]">

        {/* Background slides */}
        {filteredBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* GAMBAR ASLI - Pakai <img> supaya bisa object-contain */}
            <img
              src={banner.bgImage}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 15%' }}
            />

            {/* Gradient overlay - lebih ringan supaya gambar jelas */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          </div>
        ))}

        {/* Tombol navigasi kiri-kanan */}
        {filteredBanners.length > 1 && (
          <>
            <button
              onClick={prevBanner}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-95 shadow-lg ring-1 ring-white/10"
              aria-label="Banner sebelumnya"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextBanner}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all active:scale-95 shadow-lg ring-1 ring-white/10"
              aria-label="Banner berikutnya"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* KONTEN */}
        <div className="absolute inset-0 flex flex-col justify-end pl-6 sm:pl-10 md:pl-16 lg:pl-20 pr-6 pb-6 md:pb-8">

          {/* Group 1: Judul + Deskripsi */}
          <div className="max-w-2xl mb-4 md:mb-6 animate-fade-up">
            <h1
              key={`title-${currentIndex}`}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight text-white animate-fade-in drop-shadow-2xl"
            >
              {currentBanner.title}
            </h1>

            <p
              key={`desc-${currentIndex}`}
              className="text-sm md:text-base text-white/90 line-clamp-3 max-w-lg animate-fade-in leading-relaxed"
            >
              {currentBanner.description}
            </p>
          </div>

          {/* Group 2: Tombol */}
          <div
            key={`btns-${currentIndex}`}
            className="flex items-center gap-3 animate-fade-in"
          >
            <button className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm md:text-base hover:bg-indigo-700 active:scale-95 transition-all shadow-lg">
              Mulai
            </button>

            <button className="flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-white/5 border border-white/30 text-white font-semibold text-sm md:text-base hover:bg-white/15 active:scale-95 transition-all backdrop-blur-md">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Selengkapnya
            </button>

            <span className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-white/40 text-white font-semibold text-xs md:text-sm">
              {currentBanner.ageRating}
            </span>
          </div>
        </div>

        {/* Tombol Mute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-6 md:bottom-8 right-6 md:right-10 z-20 w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-white/40 hover:border-white/70 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white flex items-center justify-center active:scale-95 transition-all"
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