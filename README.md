# CHILL — React + Tailwind CSS

Streaming UI bertema bioskop (pure black + putih) yang dibangun dengan **React + Tailwind**.
Logo CHILL berupa **SVG inline** (ikon clapperboard 🎬), jadi tidak perlu file gambar terpisah.

## Stack

- **Vite** – build tool yang cepat
- **React 18** – library UI
- **React Router v6** – routing antar halaman
- **Tailwind CSS 3** – utility-first styling

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Build untuk production
npm run build
```

Buka `http://localhost:5173` di browser.

## Struktur Project

```
chill-react/
└── src/
    ├── components/
    │   ├── Logo.jsx            # 🎬 Ikon clapperboard SVG + "CHILL"
    │   ├── Header.jsx          # Navbar (auto-solid saat scroll) + dropdown
    │   ├── Hero.jsx            # Banner "Duty After School"
    │   ├── MovieSection.jsx    # Row carousel poster (with hover overlay)
    │   ├── Footer.jsx          # Footer
    │   └── ProtectedRoute.jsx  # Guard halaman home
    ├── pages/
    │   ├── Login.jsx           # Halaman masuk
    │   ├── Register.jsx        # Halaman daftar
    │   └── Home.jsx            # Halaman utama
    ├── data/
    │   └── movies.js           # Data poster film
    ├── App.jsx                 # Routing
    ├── main.jsx                # Entry point
    └── index.css               # Tailwind + custom utilities
```

## Routing

| Path | Halaman | Akses |
|------|---------|-------|
| `/` | Login | Publik |
| `/register` | Register | Publik |
| `/home` | Home | Hanya jika sudah login |

## Highlight Design

| Elemen | Detail |
|---|---|
| **Logo** | SVG clapperboard inline (komponen `<Logo />`) — bisa diatur ukurannya: `<Logo size={32} />` |
| **Tema** | Pure black `#0a0a0a` background, tombol pill putih, ring tipis di poster |
| **Auth pages** | Card hitam glassmorphism di atas backdrop bioskop, tombol Google dengan ikon resmi |
| **Header** | Transparan di atas, jadi solid + blur saat scroll (`scrolled` state) |
| **Hero** | Backdrop gradient overlay + badge "Series Original" + meta rating/tahun/age-rating |
| **Movie cards** | Hover: scale + overlay play button + nomor peringkat untuk 10 film teratas |
| **Animasi** | `animate-fade-up` untuk entrance card login/dropdown |

## Custom Warna di Tailwind

```js
'chill-bg':     '#0a0a0a'  // background utama
'chill-card':   '#1a1a1a'  // surface
'chill-border': '#2a2a2a'  // border halus
'chill-muted':  '#9ca3af'  // teks sekunder
```

Ubah di `tailwind.config.js`.

## Catatan

- **Login**: validasi sederhana — username/password apa saja yang tidak kosong akan diterima. State tersimpan di `localStorage` (sama seperti versi HTML asli).
- **Hero backdrop**: pakai poster TMDB. Ganti URL di `src/components/Hero.jsx` kalau mau judul/gambar lain.
- **Responsive**: sudah support mobile (breakpoint `md:` di semua komponen).
