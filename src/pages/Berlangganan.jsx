import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Berlangganan() {
  const navigate = useNavigate()

  function handleLangganan(paket) {
    // Navigate ke halaman Pembayaran dengan data paket
    navigate('/pembayaran', { state: { paket } })
  }

  return (
    <div className="min-h-screen bg-chill-bg">
      <Header />

      <main className="pt-20 md:pt-24 pb-10">

        {/* SECTION 1: Kenapa Harus Berlangganan? */}
        <section className="px-4 md:px-10 py-12 md:py-20 max-w-6xl mx-auto">
          <h1 className="text-white text-2xl md:text-4xl font-bold text-center mb-10 md:mb-16">
            Kenapa Harus Berlangganan?
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {/* Row 1 */}
            <FeatureItem
              icon={<DownloadIcon />}
              title="Download Konten Pilihan"
            />
            <FeatureItem
              icon={<NoAdsIcon />}
              title="Tidak Ada Iklan"
            />
            <FeatureItem
              icon={<TontonIcon />}
              title="Tonton Semua Konten"
            />

            {/* Row 2 */}
            <FeatureItem
              icon={<Quality4KIcon />}
              title="Kualitas Maksimal Sampai Dengan 4K"
            />
            <FeatureItem
              icon={<DeviceIcon />}
              title="Tonton di Tv, Tablet, Mobile, dan Laptop"
            />
            <FeatureItem
              icon={<SubtitleIcon />}
              title="Subtitle Untuk Konten Pilihan"
            />
          </div>
        </section>

        {/* SECTION 2: Pilih Paketmu */}
        <section className="px-4 md:px-10 py-12 md:py-20 bg-zinc-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-white text-2xl md:text-4xl font-bold mb-3">
                Pilih Paketmu
              </h2>
              <p className="text-white/70 text-sm md:text-base">
                Temukan paket sesuai kebutuhanmu!
              </p>
            </div>

            {/* Grid 3 Paket */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">

              {/* Paket 1: Individual */}
              <PaketCard
                nama="Individual"
                harga="Rp49,990"
                akun="1 Akun"
                fitur={[
                  'Tidak ada iklan',
                  'Kualitas 720p',
                  'Download konten pilihan',
                ]}
                onLangganan={() =>
                  handleLangganan({
                    name: 'Individual',
                    price: 49000,
                    priceLabel: 'Rp49,990/bulan',
                    accounts: '1 Akun',
                    features: [
                      'Tidak ada iklan',
                      'Kualitas 720p',
                      'Download konten pilihan',
                    ],
                  })
                }
              />

              {/* Paket 2: Berdua */}
              <PaketCard
                nama="Berdua"
                harga="Rp79,990"
                akun="2 Akun"
                fitur={[
                  'Tidak ada iklan',
                  'Kualitas 1080p',
                  'Download konten pilihan',
                ]}
                onLangganan={() =>
                  handleLangganan({
                    name: 'Berdua',
                    price: 79000,
                    priceLabel: 'Rp79,990/bulan',
                    accounts: '2 Akun',
                    features: [
                      'Tidak ada iklan',
                      'Kualitas 1080p',
                      'Download konten pilihan',
                    ],
                  })
                }
              />

              {/* Paket 3: Keluarga */}
              <PaketCard
                nama="Keluarga"
                harga="Rp159,990"
                akun="5-7 Akun"
                fitur={[
                  'Tidak ada iklan',
                  'Kualitas 4K',
                  'Download konten pilihan',
                ]}
                onLangganan={() =>
                  handleLangganan({
                    name: 'Keluarga',
                    price: 159000,
                    priceLabel: 'Rp159,990/bulan',
                    accounts: '5-7 Akun',
                    features: [
                      'Tidak ada iklan',
                      'Kualitas 4K',
                      'Download konten pilihan',
                    ],
                  })
                }
              />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

/* Component: Feature Item */
function FeatureItem({ icon, title }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 text-white">
        {icon}
      </div>
      <p className="text-white text-sm md:text-base font-medium leading-tight max-w-[200px]">
        {title}
      </p>
    </div>
  )
}

/* Component: Paket Card */
function PaketCard({ nama, harga, akun, fitur, onLangganan }) {
  return (
    <div className="bg-indigo-600 rounded-2xl p-6 md:p-7 flex flex-col shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">

      {/* Badge Nama Paket */}
      <div className="mb-6">
        <span className="inline-block px-5 py-2 rounded-full bg-zinc-800 text-white text-sm font-semibold">
          {nama}
        </span>
      </div>

      {/* Harga & Akun */}
      <div className="mb-6">
        <p className="text-white text-sm mb-1">
          Mulai dari <span className="font-semibold">{harga}</span>/bulan
        </p>
        <p className="text-white text-sm">
          {akun}
        </p>
      </div>

      {/* Fitur */}
      <div className="mb-6 space-y-3 flex-1">
        {fitur.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-white text-sm">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/20 mb-4" />

      {/* Tombol Langganan */}
      <button
        onClick={onLangganan}
        className="w-full py-3 rounded-full bg-white text-indigo-600 font-bold text-sm hover:bg-gray-100 active:scale-95 transition-all shadow-lg mb-2"
      >
        Langganan
      </button>

      {/* Syarat & Ketentuan */}
      <p className="text-white/80 text-xs text-center">
        Syarat dan Ketentuan Berlaku
      </p>
    </div>
  )
}

/* ICONS - Custom SVG Icons */

function DownloadIcon() {
  return (
    <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

function NoAdsIcon() {
  return (
    <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      {/* Text ADS */}
      <text x="3" y="15" fontSize="10" fontWeight="bold" fill="currentColor" stroke="none">ADS</text>
      {/* Diagonal line through */}
      <line x1="2" y1="20" x2="22" y2="4" strokeWidth="2" />
    </svg>
  )
}

function TontonIcon() {
  return (
    <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      {/* Film reel */}
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

function Quality4KIcon() {
  return (
    <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <text x="7" y="16" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">4K</text>
    </svg>
  )
}

function DeviceIcon() {
  return (
    <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      {/* Tablet */}
      <rect x="4" y="4" width="12" height="16" rx="1" />
      {/* Phone */}
      <rect x="16" y="10" width="4" height="10" rx="0.5" />
    </svg>
  )
}

function SubtitleIcon() {
  return (
    <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      {/* Chat bubble */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 4V5z" />
      {/* Subtitle lines */}
      <line x1="7" y1="9" x2="13" y2="9" strokeWidth="2" />
      <line x1="7" y1="12" x2="17" y2="12" strokeWidth="2" />
    </svg>
  )
}

export default Berlangganan