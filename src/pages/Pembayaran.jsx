import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Pembayaran() {
  const location = useLocation()
  const navigate = useNavigate()

  const paketDefault = {
    name: 'Individual',
    price: 49000,
    priceLabel: 'Rp49,990/bulan',
    accounts: '1 Akun',
    features: [
      'Tidak ada iklan',
      'Kualitas 720p',
      'Download konten pilihan',
    ],
  }

  const paket = location.state?.paket || paketDefault

  const [selectedPayment, setSelectedPayment] = useState('kartu')
  const [voucherCode, setVoucherCode] = useState('')
  const [voucherApplied, setVoucherApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const biayaAdmin = 3000
  const totalPembayaran = paket.price + biayaAdmin - discount

  function handleApplyVoucher() {
    if (!voucherCode.trim()) {
      alert('Masukkan kode voucher terlebih dahulu')
      return
    }

    if (voucherCode.toUpperCase() === 'CHILL50') {
      setDiscount(5000)
      setVoucherApplied(true)
      alert('🎉 Voucher berhasil digunakan! Diskon Rp5,000')
    } else if (voucherCode.toUpperCase() === 'NEWUSER') {
      setDiscount(10000)
      setVoucherApplied(true)
      alert('🎉 Voucher berhasil digunakan! Diskon Rp10,000')
    } else {
      alert('❌ Kode voucher tidak valid')
    }
  }

  function handleRemoveVoucher() {
    setVoucherCode('')
    setDiscount(0)
    setVoucherApplied(false)
  }

  function handleBayar() {
    if (!selectedPayment) {
      alert('Pilih metode pembayaran terlebih dahulu')
      return
    }
    setShowSuccessModal(true)
  }

  function handleSuccessClose() {
    setShowSuccessModal(false)
    navigate('/home')
  }

  function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID').format(number)
  }

  return (
    <div className="min-h-screen bg-chill-bg flex flex-col">
      <Header />

      <main className="flex-1 pt-20 md:pt-24 pb-10 px-4 md:px-10 max-w-7xl mx-auto w-full">

        {/* ========== TOMBOL BACK ========== */}
        <button
          onClick={() => navigate('/berlangganan')}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm md:text-base font-medium mb-4 md:mb-6 transition-colors group"
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Kembali ke Paket Langganan</span>
        </button>

        {/* Judul */}
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-6 md:mb-10">
          Ringkasan Pembayaran
        </h1>

        {/* Grid Layout: Card Paket + Form Pembayaran */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

          {/* KIRI - Card Paket */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-5 md:p-6 shadow-xl">

              <div className="inline-block px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-sm font-semibold mb-4">
                {paket.name}
              </div>

              <p className="text-white text-sm md:text-base mb-1">
                Mulai dari {paket.priceLabel}
              </p>
              <p className="text-white/80 text-sm mb-5">
                {paket.accounts}
              </p>

              <div className="space-y-3 mb-6">
                {paket.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-white text-sm">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-white/20 mb-6" />

              <button
                onClick={handleBayar}
                className="w-full px-5 py-3 rounded-full bg-white text-indigo-700 font-bold text-sm md:text-base hover:bg-gray-100 active:scale-95 transition-all shadow-lg"
              >
                Langganan
              </button>

              <p className="text-white/70 text-xs text-center mt-3">
                Syarat dan Ketentuan Berlaku
              </p>
            </div>
          </div>

          {/* KANAN - Form Pembayaran */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">

            {/* METODE PEMBAYARAN */}
            <div>
              <h2 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4">
                Metode Pembayaran
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

                <button
                  onClick={() => setSelectedPayment('kartu')}
                  className={`flex items-center gap-3 px-4 py-3.5 md:py-4 rounded-xl border-2 transition-all ${
                    selectedPayment === 'kartu'
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-white/15 bg-transparent hover:border-white/30'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedPayment === 'kartu' ? 'border-indigo-500' : 'border-white/40'
                  }`}>
                    {selectedPayment === 'kartu' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-8 h-5 rounded bg-white flex items-center justify-center">
                      <span className="text-[7px] font-black text-blue-700">VISA</span>
                    </div>
                    <div className="w-8 h-5 rounded bg-white flex items-center justify-center relative">
                      <div className="flex">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 -ml-1" />
                      </div>
                    </div>
                    <div className="w-8 h-5 rounded bg-white flex items-center justify-center">
                      <span className="text-[6px] font-black text-blue-800">JCB</span>
                    </div>
                    <div className="w-8 h-5 rounded bg-blue-600 flex items-center justify-center">
                      <span className="text-[5px] font-black text-white">AMEX</span>
                    </div>
                  </div>

                  <span className="text-white text-sm md:text-base font-medium">
                    Kartu Debit/Kredit
                  </span>
                </button>

                <button
                  onClick={() => setSelectedPayment('bca')}
                  className={`flex items-center gap-3 px-4 py-3.5 md:py-4 rounded-xl border-2 transition-all ${
                    selectedPayment === 'bca'
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-white/15 bg-transparent hover:border-white/30'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedPayment === 'bca' ? 'border-indigo-500' : 'border-white/40'
                  }`}>
                    {selectedPayment === 'bca' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    )}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <span className="text-[8px] font-black text-white">BCA</span>
                  </div>

                  <span className="text-white text-sm md:text-base font-medium">
                    BCA Virtual Account
                  </span>
                </button>
              </div>
            </div>

            {/* KODE VOUCHER */}
            <div>
              <h2 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4">
                Kode Voucher <span className="text-white/50 text-sm font-normal">(Jika ada)</span>
              </h2>

              <div className="flex gap-2 md:gap-3">
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  disabled={voucherApplied}
                  placeholder="Masukkan kode voucher"
                  className="flex-1 px-4 py-3 md:py-3.5 rounded-xl bg-transparent border-2 border-white/15 text-white text-sm md:text-base placeholder:text-white/40 focus:outline-none focus:border-indigo-500 disabled:opacity-50 transition-colors"
                />

                {voucherApplied ? (
                  <button
                    onClick={handleRemoveVoucher}
                    className="px-5 md:px-8 py-3 md:py-3.5 rounded-xl bg-red-500/20 border-2 border-red-500/50 text-red-400 text-sm md:text-base font-semibold hover:bg-red-500/30 active:scale-95 transition-all"
                  >
                    Hapus
                  </button>
                ) : (
                  <button
                    onClick={handleApplyVoucher}
                    className="px-5 md:px-8 py-3 md:py-3.5 rounded-xl bg-white/10 border-2 border-white/15 text-white text-sm md:text-base font-semibold hover:bg-white/20 active:scale-95 transition-all"
                  >
                    Gunakan
                  </button>
                )}
              </div>

              {!voucherApplied && (
                <p className="text-white/40 text-xs mt-2">
                  Coba: <span className="text-indigo-400 font-mono">CHILL50</span> atau <span className="text-indigo-400 font-mono">NEWUSER</span>
                </p>
              )}

              {voucherApplied && (
                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-400 text-xs md:text-sm font-medium">
                    Voucher berhasil digunakan - Diskon Rp{formatRupiah(discount)}
                  </span>
                </div>
              )}
            </div>

            {/* RINGKASAN TRANSAKSI */}
            <div>
              <h2 className="text-white text-base md:text-lg font-semibold mb-3 md:mb-4">
                Ringkasan Transaksi
              </h2>

              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between items-center py-1">
                  <span className="text-white/80 text-sm md:text-base">
                    Paket Premium {paket.name}
                  </span>
                  <span className="text-white text-sm md:text-base font-medium">
                    Rp{formatRupiah(paket.price)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-white/80 text-sm md:text-base">
                    Biaya Admin
                  </span>
                  <span className="text-white text-sm md:text-base font-medium">
                    Rp{formatRupiah(biayaAdmin)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-green-400 text-sm md:text-base">
                      Diskon Voucher
                    </span>
                    <span className="text-green-400 text-sm md:text-base font-medium">
                      -Rp{formatRupiah(discount)}
                    </span>
                  </div>
                )}

                <div className="h-px bg-white/10 my-2 md:my-3" />

                <div className="flex justify-between items-center py-1">
                  <span className="text-white text-base md:text-lg font-bold">
                    Total Pembayaran
                  </span>
                  <span className="text-white text-lg md:text-2xl font-bold">
                    Rp{formatRupiah(totalPembayaran)}
                  </span>
                </div>
              </div>
            </div>

            {/* TOMBOL BAYAR */}
            <div>
              <button
                onClick={handleBayar}
                className="w-full md:w-auto px-8 md:px-12 py-3 md:py-3.5 rounded-full bg-indigo-600 text-white font-bold text-sm md:text-base hover:bg-indigo-700 active:scale-95 transition-all shadow-lg"
              >
                Bayar
              </button>

              <p className="text-white/40 text-xs md:text-sm mt-3">
                Dengan menekan tombol bayar, Anda menyetujui{' '}
                <Link to="/berlangganan" className="text-indigo-400 hover:underline">
                  Syarat & Ketentuan
                </Link>{' '}
                yang berlaku.
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      {/* MODAL SUKSES PEMBAYARAN */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">

            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 md:mb-5">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h3 className="text-white text-xl md:text-2xl font-bold text-center mb-2">
              Pembayaran Berhasil! 🎉
            </h3>
            <p className="text-white/70 text-sm md:text-base text-center mb-5 md:mb-6">
              Selamat datang di CHILL Premium!<br />
              Nikmati semua konten Anda dengan Paket <span className="text-indigo-400 font-semibold">{paket.name}</span>.
            </p>

            <div className="bg-white/5 rounded-xl p-4 mb-5 md:mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60 text-xs md:text-sm">Total Dibayar</span>
                <span className="text-white font-bold text-sm md:text-base">
                  Rp{formatRupiah(totalPembayaran)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/60 text-xs md:text-sm">Metode</span>
                <span className="text-white text-xs md:text-sm">
                  {selectedPayment === 'kartu' ? 'Kartu Debit/Kredit' : 'BCA Virtual Account'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-xs md:text-sm">Status</span>
                <span className="text-green-400 text-xs md:text-sm font-medium flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  Berhasil
                </span>
              </div>
            </div>

            <button
              onClick={handleSuccessClose}
              className="w-full px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm md:text-base hover:bg-indigo-700 active:scale-95 transition-all shadow-lg"
            >
              Mulai Menonton
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pembayaran