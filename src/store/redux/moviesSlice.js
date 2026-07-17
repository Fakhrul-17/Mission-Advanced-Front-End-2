import { createSlice } from '@reduxjs/toolkit'

// Initial State - state awal berupa array kosong
const initialState = {
  wishlist: [],    // Array untuk menyimpan data dari API
  loading: false,  // Status loading saat fetch
  error: null,     // Pesan error kalau ada
}

// Reducer untuk Data API
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // SET DATA - dipakai setelah get data dari API
    setMovies: (state, action) => {
      state.wishlist = action.payload
      state.loading = false
      state.error = null
    },

    // LOADING - saat proses fetch
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    // ERROR - saat fetch gagal
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },

    // ADD - tambah film baru ke wishlist
    addMovie: (state, action) => {
      state.wishlist.push(action.payload)
    },

    // UPDATE - update data film (toggle watched, set rating, dll)
    updateMovie: (state, action) => {
      const index = state.wishlist.findIndex(
        (film) => film.id === action.payload.id
      )
      if (index !== -1) {
        state.wishlist[index] = action.payload
      }
    },

    // DELETE - hapus film dari wishlist
    deleteMovie: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (film) => film.id !== action.payload
      )
    },
  },
})

// Export actions untuk dipakai di component
export const {
  setMovies,
  setLoading,
  setError,
  addMovie,
  updateMovie,
  deleteMovie,
} = moviesSlice.actions

// Export reducer untuk didaftarkan di store
export default moviesSlice.reducer