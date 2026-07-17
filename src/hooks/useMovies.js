import { useState, useEffect } from 'react'
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from '../services/movieService'

function useMovies() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // FETCH DATA AWAL - jalan sekali saat hook dipakai
  useEffect(() => {
    fetchWishlist()
  }, [])

  // READ - Ambil semua film
  async function fetchWishlist() {
    try {
      setLoading(true)
      setError(null)
      const data = await getMovies()
      setWishlist(data)
    } catch (err) {
      console.error('Error fetching wishlist:', err)
      setError('Gagal memuat data dari server')
    } finally {
      setLoading(false)
    }
  }

  // CREATE - Tambah film
  async function addToWishlist(film) {
    const sudahAda = wishlist.find((f) => f.title === film.title)
    if (sudahAda) {
      alert(`"${film.title}" sudah ada di daftar!`)
      return
    }

    try {
      const filmBaru = { ...film, isWatched: false, userRating: 0 }
      delete filmBaru.id

      const filmDariApi = await addMovie(filmBaru)
      setWishlist([...wishlist, filmDariApi])
      alert(`"${film.title}" berhasil ditambahkan!`)
    } catch (err) {
      console.error('Error adding film:', err)
      alert('Gagal menambah film. Silakan coba lagi.')
    }
  }

  // UPDATE - Toggle isWatched
  async function toggleWatched(id) {
    if (!id) return
    try {
      const film = wishlist.find((f) => f.id === id)
      if (!film) return

      const updatedData = { ...film, isWatched: !film.isWatched }
      const filmDariApi = await updateMovie(id, updatedData)

      const baru = wishlist.map((f) => (f.id === id ? filmDariApi : f))
      setWishlist(baru)
    } catch (err) {
      console.error('Error toggle watched:', err)
      alert('Gagal update status tonton')
    }
  }

  // UPDATE - Set rating user
  async function setRating(id, rating) {
    if (!id) return
    try {
      const film = wishlist.find((f) => f.id === id)
      if (!film) return

      const updatedData = { ...film, userRating: rating }
      const filmDariApi = await updateMovie(id, updatedData)

      const baru = wishlist.map((f) => (f.id === id ? filmDariApi : f))
      setWishlist(baru)
    } catch (err) {
      console.error('Error set rating:', err)
      alert('Gagal memberi rating')
    }
  }

  // DELETE - Hapus film
  async function deleteFromWishlist(id) {
    if (!id) return
    try {
      await deleteMovie(id)
      const baru = wishlist.filter((f) => f.id !== id)
      setWishlist(baru)
    } catch (err) {
      console.error('Error deleting film:', err)
      alert('Gagal menghapus film')
    }
  }

  // Return state + handlers
  return {
    wishlist,
    loading,
    error,
    addToWishlist,
    toggleWatched,
    setRating,
    deleteFromWishlist,
    refetch: fetchWishlist,
  }
}

export default useMovies