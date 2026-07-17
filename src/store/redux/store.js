import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './moviesSlice'

// Konfigurasi Redux Store
const store = configureStore({
  reducer: {
    movies: moviesReducer,  // Reducer movies terdaftar di sini
  },
})

export default store