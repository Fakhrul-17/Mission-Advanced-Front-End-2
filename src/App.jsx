import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import DaftarSaya from './pages/DaftarSaya'
import Profil from './pages/Profil'
import Berlangganan from './pages/Berlangganan'
import ProtectedRoute from './components/ProtectedRoute'
import useMoviesRedux from './hooks/useMoviesRedux'
import Pembayaran from './pages/Pembayaran'

function App() {
  // Pakai custom hook - semua logic Redux ada di dalamnya
  const { loading, error, fetchWishlist } = useMoviesRedux()

  // Fetch data pertama kali
  useEffect(() => {
    fetchWishlist()
  }, [])

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-chill-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold">Memuat Chill...</p>
        </div>
      </div>
    )
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="min-h-screen bg-chill-bg flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-white text-2xl font-bold mb-2">Oops! Ada Masalah</h1>
          <p className="text-white/70 mb-6">{error}</p>
          <button
            onClick={fetchWishlist}
            className="px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            🔄 Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/film"
        element={
          <ProtectedRoute>
            <Home filterType="film" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/series"
        element={
          <ProtectedRoute>
            <Home filterType="series" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/daftar-saya"
        element={
          <ProtectedRoute>
            <DaftarSaya />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profil"
        element={
          <ProtectedRoute>
            <Profil />
          </ProtectedRoute>
        }
      />

      <Route
        path="/berlangganan"
        element={
          <ProtectedRoute>
            <Berlangganan />
          </ProtectedRoute>
        }
      />

      <Route
  path="/pembayaran"
  element={
    <ProtectedRoute>
      <Pembayaran />
    </ProtectedRoute>
  }
/>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App