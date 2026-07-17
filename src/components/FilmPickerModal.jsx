import { melanjutkanTonton, topRating, filmTrending, rilisBaru } from '../data/movies'

function FilmPickerModal({ existingList = [], onSelect, onClose }) {

  // Gabungkan semua film dari semua section
  const semuaFilm = [
    ...melanjutkanTonton,
    ...topRating,
    ...filmTrending,
    ...rilisBaru,
  ]

  // Filter: cuma tampilkan film yang BELUM ada di existingList (cegah duplikat)
  const tersedia = semuaFilm.filter((film) => {
    return !existingList.find((w) => w.title === film.title)
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/80 overflow-y-auto p-3 md:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-gray-900 rounded-lg p-4 md:p-6 my-auto"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header modal */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-white text-lg md:text-xl font-bold">
              Pilih Film
            </h2>
            <p className="text-gray-400 text-xs md:text-sm mt-1">
              Klik film untuk tambah ke wishlist
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white text-xl w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-95 transition-transform"
          >
            ✕
          </button>
        </div>

        {/* Empty state - semua film sudah di wishlist */}
        {tersedia.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-white font-semibold mb-1">Semua film sudah di wishlist!</p>
            <p className="text-gray-400 text-sm">Tidak ada film tersedia untuk ditambahkan.</p>
          </div>
        ) : (
          // Grid film yang bisa dipilih
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[60vh] overflow-y-auto">
            {tersedia.map((film, i) => (
              <button
                key={film.id || i}
                onClick={() => onSelect(film)}
                className="group relative bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-white active:scale-95 transition-all text-left"
              >
                {/* Poster */}
                <div className="relative aspect-[2/3]">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${film.url}')` }}
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold">
                      +
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-2">
                  <h3 className="text-white text-xs font-semibold truncate">
                    {film.title}
                  </h3>
                  <p className="text-gray-400 text-[10px] truncate mt-0.5">
                    {film.isSeries ? 'Series' : 'Film'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default FilmPickerModal