import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useMoviesRedux from '../hooks/useMoviesRedux'

function Profil() {
  // Ambil wishlist dari Redux
  const { wishlist } = useMoviesRedux()

  const fileInputRef = useRef(null)

  // Data user dari localStorage
  const usernameStored = localStorage.getItem('user') || 'William'
  const [username, setUsername] = useState(usernameStored)
  const [email] = useState(localStorage.getItem('email') || 'william1990@gmail.com')
  const [password, setPassword] = useState('••••••••••••')
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)

  // Avatar state - ambil dari localStorage kalau ada
  const [avatar, setAvatar] = useState(
    localStorage.getItem('userAvatar') || null
  )

  function handleSimpan() {
    localStorage.setItem('user', username)
    if (avatar) {
      localStorage.setItem('userAvatar', avatar)
    }
    alert('Perubahan berhasil disimpan!')
    setIsEditingUsername(false)
    setIsEditingPassword(false)
  }

  // Handler upload foto
  function handleFileSelect(e) {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar (JPG, PNG, WEBP)')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatar(reader.result)
      localStorage.setItem('userAvatar', reader.result)
    }
    reader.readAsDataURL(file)
  }

  function triggerFileInput() {
    fileInputRef.current?.click()
  }

  function handleHapusFoto() {
    if (confirm('Hapus foto profil?')) {
      setAvatar(null)
      localStorage.removeItem('userAvatar')
    }
  }

  // Ambil 6 film pertama dari wishlist untuk preview
  const previewWishlist = wishlist.slice(0, 6)

  return (
    <div className="min-h-screen bg-chill-bg">
      <Header />

      <main className="pt-20 md:pt-24 pb-10 px-4 md:px-10 max-w-6xl mx-auto">

        {/* Judul */}
        <h1 className="text-white text-xl md:text-2xl font-bold mb-4 md:mb-6">
          Profil Saya
        </h1>

        {/* Grid: Info User + Subscription Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">

          {/* KIRI - Info Profil */}
          <div className="lg:col-span-2 space-y-4">

            {/* Header Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative shrink-0 group">
                <button
                  onClick={triggerFileInput}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-zinc-800 overflow-hidden ring-2 ring-white/10 hover:ring-indigo-500 transition-all relative"
                >
                  {avatar ? (
                    <img src={avatar} alt={username} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                      {username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={triggerFileInput}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800/80 border border-white/10 text-white text-xs font-medium hover:bg-zinc-700 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Ubah foto
                  </button>

                  {avatar && (
                    <button
                      onClick={handleHapusFoto}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
                      title="Hapus foto"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-white/60 text-xs">
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.5 16.5l-4-4 1.4-1.4 2.6 2.6 6.6-6.6L18.5 8.5l-8 8z" />
                  </svg>
                  <span>Member sejak 2018</span>
                </div>
              </div>
            </div>

            {/* Form Nama */}
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1.5 bg-chill-bg text-white/50 text-[10px] z-10">
                Nama Pengguna
              </label>
              <div className="flex items-center bg-zinc-800/50 border border-white/10 rounded-lg overflow-hidden focus-within:border-indigo-500/50 transition-colors">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isEditingUsername}
                  className="flex-1 bg-transparent px-4 py-3 text-white text-sm focus:outline-none disabled:cursor-not-allowed"
                />
                <button
                  onClick={() => setIsEditingUsername(!isEditingUsername)}
                  className="px-4 text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Email */}
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1.5 bg-chill-bg text-white/50 text-[10px] z-10">
                Email
              </label>
              <div className="bg-zinc-800/50 border border-white/10 rounded-lg">
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full bg-transparent px-4 py-3 text-white/70 text-sm focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* Form Password */}
            <div className="relative">
              <label className="absolute -top-2 left-3 px-1.5 bg-chill-bg text-white/50 text-[10px] z-10">
                Kata Sandi
              </label>
              <div className="flex items-center bg-zinc-800/50 border border-white/10 rounded-lg overflow-hidden focus-within:border-indigo-500/50 transition-colors">
                <input
                  type={isEditingPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isEditingPassword}
                  className="flex-1 bg-transparent px-4 py-3 text-white text-sm focus:outline-none disabled:cursor-not-allowed"
                />
                <button
                  onClick={() => setIsEditingPassword(!isEditingPassword)}
                  className="px-4 text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tombol Simpan */}
            <button
              onClick={handleSimpan}
              className="px-8 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg"
            >
              Simpan
            </button>
          </div>

          {/* KANAN - Subscription Card */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-4 md:p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl md:text-4xl shrink-0">📄</div>
                <div>
                  <h3 className="text-white font-semibold text-sm md:text-base mb-1">
                    Saat ini anda belum berlangganan
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                    Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan Kamu!
                  </p>
                </div>
              </div>

              <Link
                to="/berlangganan"
                className="block w-full mt-3 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-lg text-center"
              >
                Mulai Berlangganan
              </Link>
            </div>
          </div>
        </div>

        {/* SECTION - Daftar Saya Preview */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg md:text-xl font-bold">
              Daftar Saya
            </h2>
            <Link
              to="/daftar-saya"
              className="text-white/60 hover:text-white text-xs md:text-sm font-medium transition-colors"
            >
              Lihat Semua
            </Link>
          </div>

          {previewWishlist.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-lg">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-gray-400 text-sm">
                Belum ada film di daftar kamu
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
              {previewWishlist.map((film) => (
                <div
                  key={film.id}
                  className="group relative rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  <div className="absolute top-1.5 left-1.5 z-10">
                    <span className="px-1.5 py-0.5 rounded bg-yellow-500 text-black text-[8px] md:text-[10px] font-bold">
                      Episode Baru
                    </span>
                  </div>

                  <div className="aspect-[2/3] relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${film.url}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                        <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default Profil