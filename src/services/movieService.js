import api from './api'

// Endpoint resource di MockAPI
const ENDPOINT = '/movies'

// READ - Ambil semua film
export async function getMovies() {
  try {
    const response = await api.get(ENDPOINT)
    return response.data
  } catch (error) {
    console.error('Gagal mengambil daftar film:', error.message)
    throw error
  }
}

// READ - Ambil film berdasarkan ID
export async function getMovieById(id) {
  try {
    const response = await api.get(`${ENDPOINT}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Gagal mengambil film ID ${id}:`, error.message)
    throw error
  }
}

// CREATE - Tambah film baru
export async function addMovie(filmBaru) {
  try {
    const response = await api.post(ENDPOINT, filmBaru)
    return response.data
  } catch (error) {
    console.error('Gagal menambah film:', error.message)
    throw error
  }
}

// UPDATE - Update film (untuk toggleWatched & setRating)
export async function updateMovie(id, dataBaru) {
  try {
    const response = await api.put(`${ENDPOINT}/${id}`, dataBaru)
    return response.data
  } catch (error) {
    console.error(`Gagal update film ID ${id}:`, error.message)
    throw error
  }
}

// DELETE - Hapus film
export async function deleteMovie(id) {
  try {
    const response = await api.delete(`${ENDPOINT}/${id}`)
    return response.data
  } catch (error) {
    console.error(`Gagal hapus film ID ${id}:`, error.message)
    throw error
  }
}