import { useDispatch, useSelector } from 'react-redux'
import {
  setMovies,
  setLoading,
  setError,
  addMovie as addMovieAction,
  updateMovie as updateMovieAction,
  deleteMovie as deleteMovieAction,
} from '../store/redux/moviesSlice'
import {
  getMovies,
  addMovie as addMovieAPI,
  updateMovie as updateMovieAPI,
  deleteMovie as deleteMovieAPI,
} from '../services/movieService'

/**
 * Custom Hook: useMoviesRedux
 * Combine Redux state + API calls
 * Component bisa langsung pakai tanpa props drilling
 */
function useMoviesRedux() {
  const dispatch = useDispatch()

  // READ state dari Redux
  const { wishlist, loading, error } = useSelector((state) => state.movies)

  // FETCH data awal
  async function fetchWishlist() {
    try {
      dispatch(setLoading(true))
      const data = await getMovies()
      dispatch(setMovies(data))
    } catch (err) {
      console.error('Error fetching wishlist:', err)
      dispatch(setError('Gagal memuat data dari server'))
    }
  }

  // ADD - tambah film
  async function addToWishlist(film) {
    const sudahAda = wishlist.find((f) => f.title === film.title)
    if (sudahAda) {
      alert(`"${film.title}" sudah ada di daftar!`)
      return
    }

    try {
      const filmBaru = { ...film, isWatched: false, userRating: 0 }
      delete filmBaru.id

      const filmDariApi = await addMovieAPI(filmBaru)
      dispatch(addMovieAction(filmDariApi))
      alert(`"${film.title}" berhasil ditambahkan!`)
    } catch (err) {
      console.error('Error adding film:', err)
      alert('Gagal menambah film')
    }
  }

  // UPDATE - toggle watched
  async function toggleWatched(id) {
    if (!id) return
    try {
      const film = wishlist.find((f) => f.id === id)
      if (!film) return

      const updatedData = { ...film, isWatched: !film.isWatched }
      const filmDariApi = await updateMovieAPI(id, updatedData)
      dispatch(updateMovieAction(filmDariApi))
    } catch (err) {
      console.error('Error toggle watched:', err)
      alert('Gagal update status tonton')
    }
  }

  // UPDATE - set rating
  async function setRating(id, rating) {
    if (!id) return
    try {
      const film = wishlist.find((f) => f.id === id)
      if (!film) return

      const updatedData = { ...film, userRating: rating }
      const filmDariApi = await updateMovieAPI(id, updatedData)
      dispatch(updateMovieAction(filmDariApi))
    } catch (err) {
      console.error('Error set rating:', err)
      alert('Gagal memberi rating')
    }
  }

  // DELETE - hapus film
  async function deleteFromWishlist(id) {
    if (!id) return
    try {
      await deleteMovieAPI(id)
      dispatch(deleteMovieAction(id))
    } catch (err) {
      console.error('Error deleting film:', err)
      alert('Gagal menghapus film')
    }
  }

  return {
    wishlist,
    loading,
    error,
    fetchWishlist,
    addToWishlist,
    toggleWatched,
    setRating,
    deleteFromWishlist,
  }
}

export default useMoviesRedux