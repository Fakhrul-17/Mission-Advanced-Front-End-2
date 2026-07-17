import { Navigate } from 'react-router-dom'

// Komponen untuk melindungi halaman home agar hanya bisa diakses
// jika user sudah login 
function ProtectedRoute({ children }) {
  const isLogin = localStorage.getItem('login')

  if (!isLogin) {
    alert('Silakan login dulu!')
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
