import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

function Footer() {
  const navigate = useNavigate()
  const [modalType, setModalType] = useState(null)
  const [modalData, setModalData] = useState(null)

  // Handler klik menu - menentukan aksi berdasarkan label
  function handleMenuClick(label) {
    // 1. Menu utama - navigate ke halaman
    const routes = {
      'Beranda': '/home',
      'Film': '/film',
      'Series': '/series',
      'Daftar Saya': '/daftar-saya',
    }

    if (routes[label]) {
      navigate(routes[label])
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // 2. Genre - buka modal filter genre
    const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi']
    if (genres.includes(label)) {
      setModalType('genre')
      setModalData({ genre: label })
      return
    }

    // 3. Bantuan
    if (label === 'FAQ') {
      setModalType('faq')
      return
    }
    if (label === 'Kontak') {
      setModalType('kontak')
      return
    }
    if (label === 'Pusat Bantuan') {
      setModalType('bantuan')
      return
    }

    // 4. Legal
    if (label === 'Privasi') {
      setModalType('privasi')
      return
    }
    if (label === 'Syarat & Ketentuan') {
      setModalType('syarat')
      return
    }
  }

  return (
    <>
      <footer className="bg-black border-t border-white/5 mt-8 md:mt-10">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-8 md:py-12">

          {/* Top - logo + tagline */}
          <div className="flex flex-col items-center text-center mb-6 md:mb-10">
            <Logo variant="auth" />
            <p className="text-chill-muted text-xs md:text-sm mt-3 max-w-md px-4">
              Nikmati berbagai film dan series terbaik dengan kualitas premium.
            </p>
          </div>

          {/* MOBILE: accordion list */}
          <div className="md:hidden divide-y divide-white/5 border-y border-white/5">
            <FooterAccordion
              title="Menu"
              links={['Beranda', 'Film', 'Series', 'Daftar Saya']}
              onLinkClick={handleMenuClick}
            />
            <FooterAccordion
              title="Genre"
              links={['Action', 'Drama', 'Comedy', 'Sci-Fi']}
              onLinkClick={handleMenuClick}
            />
            <FooterAccordion
              title="Bantuan"
              links={['FAQ', 'Kontak', 'Pusat Bantuan']}
              onLinkClick={handleMenuClick}
            />
            <FooterAccordion
              title="Legal"
              links={['Privasi', 'Syarat & Ketentuan']}
              onLinkClick={handleMenuClick}
            />
          </div>

          {/* DESKTOP: grid 4 kolom */}
          <div className="hidden md:grid grid-cols-4 gap-8 mb-10">
            <FooterCol
              title="Menu"
              links={['Beranda', 'Film', 'Series', 'Daftar Saya']}
              onLinkClick={handleMenuClick}
            />
            <FooterCol
              title="Genre"
              links={['Action', 'Drama', 'Comedy', 'Sci-Fi']}
              onLinkClick={handleMenuClick}
            />
            <FooterCol
              title="Bantuan"
              links={['FAQ', 'Kontak', 'Pusat Bantuan']}
              onLinkClick={handleMenuClick}
            />
            <FooterCol
              title="Legal"
              links={['Privasi', 'Syarat & Ketentuan']}
              onLinkClick={handleMenuClick}
            />
          </div>

          {/* Bottom - copyright */}
          <div className="text-center pt-5 md:pt-6 md:border-t md:border-white/5 text-[11px] md:text-xs text-chill-muted mt-6 md:mt-0">
            <p>© 2026 CHILL. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {modalType && (
        <FooterModal type={modalType} data={modalData} onClose={() => {
          setModalType(null)
          setModalData(null)
        }} />
      )}
    </>
  )
}

/* Accordion item untuk mobile */
function FooterAccordion({ title, links, onLinkClick }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between py-4 text-white text-sm font-medium"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
            open ? 'rotate-90' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {open && (
        <div className="pb-3 pl-1 flex flex-col gap-2">
          {links.map((label) => (
            <button
              key={label}
              onClick={() => onLinkClick(label)}
              className="text-chill-muted hover:text-white text-sm transition-colors text-left"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* Grid column untuk desktop */
function FooterCol({ title, links, onLinkClick }) {
  return (
    <div className="flex flex-col">
      <h4 className="text-white mb-3 font-semibold text-sm">{title}</h4>
      {links.map((label) => (
        <button
          key={label}
          onClick={() => onLinkClick(label)}
          className="text-chill-muted hover:text-white my-1 text-sm transition-colors text-left"
        >
          {label}
        </button>
      ))}
    </div>
  )
}

/* ============================================
   MODAL - Konten adaptif berdasarkan type
   ============================================ */
function FooterModal({ type, data, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 shadow-2xl ring-1 ring-white/10 my-8 animate-card-expand-popup"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/90 transition-colors ring-1 ring-white/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content berdasarkan type */}
        {type === 'genre' && <GenreContent data={data} />}
        {type === 'faq' && <FAQContent />}
        {type === 'kontak' && <KontakContent />}
        {type === 'bantuan' && <BantuanContent />}
        {type === 'privasi' && <PrivasiContent />}
        {type === 'syarat' && <SyaratContent />}
      </div>
    </div>
  )
}

/* Modal: Genre */
function GenreContent({ data }) {
  const genreInfo = {
    'Action': {
      emoji: '💥',
      description: 'Film penuh aksi, ledakan, dan pertarungan yang bikin adrenalin naik.',
      contoh: ['John Wick: Chapter 4', 'The Batman', 'Avengers: Endgame'],
    },
    'Drama': {
      emoji: '🎭',
      description: 'Cerita emosional yang mengangkat kisah hidup dan hubungan manusia.',
      contoh: ['Breaking Bad', 'The Last of Us', 'Squid Game'],
    },
    'Comedy': {
      emoji: '😂',
      description: 'Film ringan penuh humor untuk hiburan yang menyenangkan.',
      contoh: ['Wednesday', 'The Super Mario Bros', 'Don\'t Look Up'],
    },
    'Sci-Fi': {
      emoji: '🚀',
      description: 'Fiksi ilmiah dengan teknologi canggih, alien, atau dunia paralel.',
      contoh: ['Stranger Things', 'Dune: Part Two', 'Avengers: Infinity War'],
    },
  }

  const info = genreInfo[data?.genre] || {}

  return (
    <div className="p-6 md:p-8">
      <div className="text-6xl mb-4 text-center">{info.emoji}</div>
      <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-2">
        Genre {data?.genre}
      </h2>
      <p className="text-white/70 text-sm md:text-base text-center mb-6">
        {info.description}
      </p>

      <div>
        <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">
          Rekomendasi Film & Series
        </h3>
        <div className="space-y-2">
          {info.contoh?.map((film) => (
            <div
              key={film}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span className="text-yellow-400">⭐</span>
              <span className="text-white text-sm">{film}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* Modal: FAQ */
function FAQContent() {
  const faqs = [
    {
      q: 'Apa itu CHILL?',
      a: 'CHILL adalah platform streaming film dan series Indonesia yang menawarkan berbagai konten berkualitas premium untuk kamu nikmati kapan saja.',
    },
    {
      q: 'Bagaimana cara berlangganan CHILL?',
      a: 'Kamu bisa mendaftar melalui halaman Register, pilih paket premium, dan mulai menonton unlimited film & series terbaik.',
    },
    {
      q: 'Apakah CHILL bisa diakses di semua device?',
      a: 'Ya! CHILL bisa diakses di HP, tablet, laptop, dan Smart TV. Interface responsive di semua ukuran layar.',
    },
    {
      q: 'Bagaimana cara menambahkan film ke Daftar Saya?',
      a: 'Klik menu ⋮ pada card film → pilih "Tambah ke Daftar". Film akan tersimpan di halaman Daftar Saya.',
    },
    {
      q: 'Apakah data saya aman?',
      a: 'Ya, kami menerapkan enkripsi standar industri untuk melindungi data pribadi kamu.',
    },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="text-6xl mb-4 text-center">❓</div>
      <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-2">
        Pertanyaan Umum (FAQ)
      </h2>
      <p className="text-white/70 text-sm md:text-base text-center mb-6">
        Jawaban dari pertanyaan yang sering ditanyakan
      </p>

      <div className="space-y-3">
        {faqs.map((item, i) => (
          <FAQItem key={i} question={item.q} answer={item.a} />
        ))}
      </div>
    </div>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-lg bg-white/5 border border-white/10 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-white text-sm md:text-base font-medium pr-3">{question}</span>
        <svg className={`w-5 h-5 text-white/70 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 text-white/70 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
}

/* Modal: Kontak */
function KontakContent() {
  return (
    <div className="p-6 md:p-8">
      <div className="text-6xl mb-4 text-center">📞</div>
      <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-2">
        Kontak Kami
      </h2>
      <p className="text-white/70 text-sm md:text-base text-center mb-6">
        Kami siap membantu kamu 24/7
      </p>

      <div className="space-y-3">
        <ContactItem icon="📧" title="Email" value="support@chill.id" />
        <ContactItem icon="📱" title="WhatsApp" value="+62 811-2345-6789" />
        <ContactItem icon="📞" title="Call Center" value="1500-CHILL (24457)" />
        <ContactItem icon="📍" title="Kantor Pusat" value="Jakarta Selatan, Indonesia" />
        <ContactItem icon="🕐" title="Jam Operasional" value="Senin - Minggu, 24 jam" />
      </div>
    </div>
  )
}

function ContactItem({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-white/50 text-xs">{title}</p>
        <p className="text-white text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

/* Modal: Pusat Bantuan */
function BantuanContent() {
  const bantuan = [
    { icon: '🎬', title: 'Cara Menonton Film', desc: 'Pilih film → klik tombol Mulai → nikmati' },
    { icon: '📝', title: 'Cara Tambah Film ke Daftar', desc: 'Klik menu ⋮ pada film → Tambah ke Daftar' },
    { icon: '⭐', title: 'Cara Beri Rating', desc: 'Klik menu ⋮ → Beri Rating → pilih bintang' },
    { icon: '🗑️', title: 'Cara Hapus dari Daftar', desc: 'Klik menu ⋮ → Hapus dari Daftar → konfirmasi' },
    { icon: '🔍', title: 'Cara Filter Film/Series', desc: 'Klik menu Film atau Series di header' },
    { icon: '👤', title: 'Cara Logout', desc: 'Klik profile → Keluar' },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="text-6xl mb-4 text-center">🎯</div>
      <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-2">
        Pusat Bantuan
      </h2>
      <p className="text-white/70 text-sm md:text-base text-center mb-6">
        Panduan menggunakan CHILL
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {bantuan.map((item, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-white/60 text-xs">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Modal: Privasi */
function PrivasiContent() {
  return (
    <div className="p-6 md:p-8">
      <div className="text-6xl mb-4 text-center">🔒</div>
      <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-4">
        Kebijakan Privasi
      </h2>

      <div className="space-y-4 text-white/70 text-sm leading-relaxed max-h-[400px] overflow-y-auto pr-2">
        <div>
          <h3 className="text-white font-semibold mb-2">1. Data yang Kami Kumpulkan</h3>
          <p>Kami mengumpulkan informasi seperti nama, email, dan preferensi tontonan kamu untuk memberikan pengalaman terbaik.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">2. Penggunaan Data</h3>
          <p>Data digunakan untuk personalisasi rekomendasi, meningkatkan layanan, dan komunikasi terkait akun kamu.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">3. Perlindungan Data</h3>
          <p>Kami menerapkan enkripsi standar industri dan protokol keamanan untuk melindungi data pribadi kamu dari akses yang tidak sah.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">4. Berbagi Informasi</h3>
          <p>Kami TIDAK menjual atau memberikan data pribadi kamu ke pihak ketiga tanpa persetujuan.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">5. Hak Kamu</h3>
          <p>Kamu bisa meminta akses, koreksi, atau penghapusan data pribadi kamu kapan saja melalui halaman Profil.</p>
        </div>
      </div>
    </div>
  )
}

/* Modal: Syarat & Ketentuan */
function SyaratContent() {
  return (
    <div className="p-6 md:p-8">
      <div className="text-6xl mb-4 text-center">📋</div>
      <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-4">
        Syarat & Ketentuan
      </h2>

      <div className="space-y-4 text-white/70 text-sm leading-relaxed max-h-[400px] overflow-y-auto pr-2">
        <div>
          <h3 className="text-white font-semibold mb-2">1. Ketentuan Umum</h3>
          <p>Dengan menggunakan CHILL, kamu menyetujui semua syarat dan ketentuan yang berlaku.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">2. Akun Pengguna</h3>
          <p>Kamu bertanggung jawab menjaga kerahasiaan akun kamu. CHILL tidak bertanggung jawab atas kerugian akibat penyalahgunaan akun.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">3. Konten & Hak Cipta</h3>
          <p>Semua film dan series di CHILL dilindungi hak cipta. Dilarang mengunduh, menyalin, atau menyebarkan konten tanpa izin.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">4. Layanan Premium</h3>
          <p>Fitur premium hanya tersedia bagi pelanggan berlangganan. Berlangganan dapat diperpanjang atau dibatalkan kapan saja.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">5. Perubahan Ketentuan</h3>
          <p>CHILL berhak mengubah syarat dan ketentuan sewaktu-waktu. Perubahan akan diberitahukan melalui email atau notifikasi.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">6. Kontak</h3>
          <p>Jika ada pertanyaan tentang syarat & ketentuan, hubungi support@chill.id</p>
        </div>
      </div>
    </div>
  )
}

export default Footer