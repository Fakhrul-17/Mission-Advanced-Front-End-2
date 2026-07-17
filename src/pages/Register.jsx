import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../components/Logo'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e?.preventDefault()
    if (username === '' || password === '' || confirm === '') {
      alert('Semua field harus diisi!')
      return
    }
    if (password !== confirm) {
      alert('Password tidak sama!')
      return
    }
    alert('Berhasil daftar!')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-auth-cinema bg-cover bg-center px-4 py-10">
      <div className="w-full max-w-[400px] p-8 md:p-10 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-card animate-fade-up">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Logo variant="auth" />
        </div>

        <h1 className="text-center text-2xl font-semibold text-white">Daftar</h1>
        <p className="text-center text-sm text-chill-muted mt-1 mb-7">
          Selamat datang
        </p>

        {/* Form */}
        <div className="space-y-4">
          <Field
            label="Username"
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Field
            label="Kata Sandi"
            type="password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Field
            label="Konfirmasi Kata Sandi"
            type="password"
            placeholder="Masukkan ulang sandi"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onEnter={handleRegister}
          />
        </div>

        {/* Link ke login */}
        <p className="mt-4 text-xs text-chill-muted">
          Sudah punya akun?{' '}
          <Link to="/" className="text-white font-semibold hover:underline">
            Masuk
          </Link>
        </p>

        <button
          onClick={handleRegister}
          className="w-full mt-6 py-3 rounded-full bg-white text-black font-semibold transition-all hover:bg-gray-200 active:scale-[0.98]"
        >
          Daftar
        </button>

        <Divider />

        <GoogleButton text="Daftar dengan Google" />
      </div>
    </div>
  )
}

/* ─── Reused subcomponents (same as Login) ─── */

function Field({ label, type, placeholder, value, onChange, onEnter }) {
  return (
    <div>
      <label className="block text-sm text-chill-muted mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 outline-none focus:border-white/40 transition-colors"
      />
    </div>
  )
}

function Divider() {
  return (
    <div className="flex items-center my-5">
      <div className="flex-1 h-px bg-white/10" />
      <span className="px-3 text-xs text-chill-muted">atau</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  )
}

function GoogleButton({ text }) {
  return (
    <button className="w-full py-3 rounded-full bg-transparent border border-white/20 text-white text-sm font-medium flex items-center justify-center gap-3 transition-all hover:bg-white/5">
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
        <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05" />
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z" fill="#EA4335" />
      </svg>
      {text}
    </button>
  )
}

export default Register
