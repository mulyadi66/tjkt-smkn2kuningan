import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Newspaper, Save, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { beritaService } from '../../services/api'
import { getGoogleDriveImageUrl } from '../../utils/helpers'
import ImageUpload from '../../components/ImageUpload'

export default function AdminBerita() {
  const [beritaList, setBeritaList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBerita, setEditingBerita] = useState(null)
  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    excerpt: '',
    konten: '',
    gambar_url: '',
    published: false
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadBerita()
  }, [])

  const loadBerita = async () => {
    setLoading(true)
    const { data } = await beritaService.getAll()
    setBeritaList(data || [])
    setLoading(false)
  }

  const openModal = (berita = null) => {
    if (berita) {
      setEditingBerita(berita)
      setFormData({
        judul: berita.judul,
        kategori: berita.kategori || '',
        excerpt: berita.excerpt || '',
        konten: berita.konten || '',
        gambar_url: berita.gambar_url || '',
        published: berita.published || false
      })
    } else {
      setEditingBerita(null)
      setFormData({ judul: '', kategori: '', excerpt: '', konten: '', gambar_url: '', published: false })
    }
    setError('')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingBerita(null)
    setFormData({ judul: '', kategori: '', excerpt: '', konten: '', gambar_url: '', published: false })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.judul.trim()) {
      setError('Judul harus diisi')
      return
    }

    // Auto-convert Google Drive URL before saving
    const convertedData = {
      ...formData,
      gambar_url: formData.gambar_url ? getGoogleDriveImageUrl(formData.gambar_url.trim()) : ''
    }

    if (editingBerita) {
      const { error: updateError } = await beritaService.update(editingBerita.id, convertedData)
      if (updateError) {
        setError('Gagal mengupdate berita')
        return
      }
      setSuccess('Berhasil mengupdate berita')
    } else {
      const { error: createError } = await beritaService.create(convertedData)
      if (createError) {
        setError('Gagal menambahkan berita')
        return
      }
      setSuccess('Berhasil menambahkan berita')
    }

    closeModal()
    loadBerita()
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return

    const { error } = await beritaService.delete(id)
    if (!error) {
      setSuccess('Berhasil menghapus berita')
      loadBerita()
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const togglePublish = async (berita) => {
    await beritaService.update(berita.id, { published: !berita.published })
    loadBerita()
  }

  const kategoriOptions = ['Prestasi', 'Kegiatan', 'Akademik', 'Kerjasama', 'Info', 'Pengumuman']

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-800">Kelola Berita</h1>
          <p className="text-slate-500 mt-1">{beritaList.length} berita terdaftar</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Berita
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

      {/* Berita Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-500 mt-4">Memuat data...</p>
          </div>
        ) : beritaList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Judul</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 hidden md:table-cell">Kategori</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {beritaList.map((berita) => (
                  <tr key={berita.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {berita.gambar_url ? (
                            <img src={getGoogleDriveImageUrl(berita.gambar_url)} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Newspaper className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 truncate max-w-xs">{berita.judul}</p>
                          <p className="text-xs text-slate-500 truncate max-w-xs">{berita.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
                        {berita.kategori || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <button
                        onClick={() => togglePublish(berita)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          berita.published 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {berita.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(berita)}
                          className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(berita.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Belum ada data berita</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="font-heading text-xl font-bold text-slate-800">
                {editingBerita ? 'Edit Berita' : 'Tambah Berita'}
              </h2>
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
                  placeholder="Masukkan judul berita"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, published: !formData.published })}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      formData.published
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    {formData.published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    {formData.published ? 'Published' : 'Draft'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ringkasan</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200 resize-none"
                  placeholder="Ringkasan singkat berita"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Konten</label>
                <textarea
                  value={formData.konten}
                  onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200 resize-none"
                  placeholder="Tulis konten berita di sini..."
                />
              </div>

              <ImageUpload
                value={formData.gambar_url}
                onChange={(url) => setFormData({ ...formData, gambar_url: url })}
                bucket="berita"
                folder="images"
                label="Gambar Berita"
              />

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
                  <Save className="w-5 h-5" />
                  {editingBerita ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
