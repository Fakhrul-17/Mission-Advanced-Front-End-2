function ConfirmDeleteModal({ film, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-sm bg-gray-900 rounded-lg p-5">
        <h3 className="text-white text-lg font-bold mb-2">Hapus Film?</h3>
        <p className="text-gray-400 text-sm mb-5">
          Yakin mau hapus "{film.title}"?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded bg-gray-700 text-white hover:bg-gray-600 active:scale-95 transition-transform font-medium"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-transform font-semibold"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal