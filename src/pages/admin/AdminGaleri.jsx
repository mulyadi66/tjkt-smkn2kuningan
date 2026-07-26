import { useState, useEffect } from 'react'
import { Plus, Trash2, X, Image, AlertCircle, Upload } from 'lucide-react'
import { galeriService } from '../../services/api'
import { getGoogleDriveImageUrl, isGoogleDriveUrl } from '../../utils/helpers'

export default function AdminGaleri() {
  const [galeriList, setGaleriList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    gambar_url: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadGaleri()
  }, [])

  const loadGaleri = async () => {
    setLoading(true)
    const { data } = await galeriService.getAll()
    setGaleriList(data || [])
    setLoading(false)
  }

  const openModal = () => {
    setFormData({ judul: '', kategori: '', gambar_url: '' })
    setError('')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setFormData({ judul: '', kategori: '', gambar_url: '' })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.judul.trim()) {
      setError('Judul harus diisi')
      return
    }

    if (!formData.gambar_url.trim()) {
      setError('URL gambar harus diisi')
      return
    }

    // Auto-convert Google Drive URL before saving
    const convertedUrl = getGoogleDriveImageUrl(formData.gambar_url.trim())

    const { error: createError } = await galeriService.create({
      ...formData,
      gambar_url: convertedUrl
    })
    if (createError) {
      setError('Gagal menambahkan foto')
      return
    }

    setSuccess('Berhasil menambahkan foto')
    closeModal()
    loadGaleri()
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus foto ini?')) return

    const { error } = await galeriService.delete(id)
    if (!error) {
      setSuccess('Berhasil menghapus foto')
      loadGaleri()
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const kategoriOptions = ['Lab', 'Kegiatan', 'Workshop', 'Lomba', 'Upacara', 'Sertifikasi', 'Pameran', 'Lainnya']

  const getGradient = (index) => {
    const gradients = [
      'from-primary-400 to-accent-500',
      'from-accent-400 to-primary-500',
      'from-energetic-400 to-primary-500',
      'from-primary-500 to-energetic-500',
    ]
    return gradients[index % gradients.length]
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-800">Kelola Galeri</h1>
          <p className="text-slate-500 mt-1">{galeriList.length} foto terdaftar</p>
        </div>
        <button
          onClick={openModal}
          className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Foto
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <p className="text-green-700 text-sm font-medium">{success}</p>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square bg-slate-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : galeriList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galeriList.map((galeri, index) => (
            <div key={galeri.id} className="group relative">
              <div className={`aspect-square bg-gradient-to-br ${getGradient(index)} rounded-2xl overflow-hidden`}>
                {galeri.gambar_url ? (
                  <img src={getGoogleDriveImageUrl(galeri.gambar_url)} alt={galeri.judul} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-12 h-12 text-white/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(galeri.id)}
                    className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-medium text-slate-800 text-sm truncate">{galeri.judul}</p>
                <p className="text-xs text-slate-500">{galeri.kategori}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
          <Image className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Belum ada foto di galeri</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="font-heading text-xl font-bold text-slate-800">Tambah Foto</h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Judul *</label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200"
                  placeholder="Masukkan judul foto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kategori</label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200 bg-white"
                >
                  <option value="">Pilih Kategori</option>
                  {kategoriOptions.map((kat) => (
                    <option key={kat} value={kat}>{kat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">URL Gambar *</label>
                <input
                  type="url"
                  value={formData.gambar_url}
                  onChange={(e) => setFormData({ ...formData, gambar_url: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200"
                  placeholder="https://drive.google.com/file/d/FILE_ID/view"
                />
                <div className="mt-2 p-3 bg-blue-50 rounded-xl">
                  <p className="text-xs text-blue-700 font-medium mb-1">Cara menggunakan Google Drive:</p>
                  <ol className="text-xs text-blue-600 space-y-1 list-decimal list-inside">
                    <li>Upload gambar ke Google Drive</li>
                    <li>Klik kanan → Share → Copy link</li>
                    <li>Paste link di atas (otomatis dikonversi)</li>
                  </ol>
                </div>
              </div>

              {/* Preview */}
              {formData.gambar_url && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">Preview:</p>
                  <img 
                    src={getGoogleDriveImageUrl(formData.gambar_url)} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-xl"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  {isGoogleDriveUrl(formData.gambar_url) && (
                    <p className="text-xs text-green-600 mt-1">✓ URL Google Drive terdeteksi</p>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
