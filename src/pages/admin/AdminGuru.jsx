import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, User, Save, AlertCircle } from 'lucide-react'
import { guruService } from '../../services/api'
import { getGoogleDriveImageUrl } from '../../utils/helpers'
import ImageUpload from '../../components/ImageUpload'

export default function AdminGuru() {
  const [guruList, setGuruList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingGuru, setEditingGuru] = useState(null)
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    jabatan: '',
    mata_pelajaran: '',
    foto_url: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadGuru()
  }, [])

  const loadGuru = async () => {
    setLoading(true)
    const { data } = await guruService.getAll()
    setGuruList(data || [])
    setLoading(false)
  }

  const openModal = (guru = null) => {
    if (guru) {
      setEditingGuru(guru)
      setFormData({
        nama: guru.nama,
        nip: guru.nip || '',
        jabatan: guru.jabatan || '',
        mata_pelajaran: guru.mata_pelajaran || '',
        foto_url: guru.foto_url || ''
      })
    } else {
      setEditingGuru(null)
      setFormData({ nama: '', nip: '', jabatan: '', mata_pelajaran: '', foto_url: '' })
    }
    setError('')
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingGuru(null)
    setFormData({ nama: '', nip: '', jabatan: '', mata_pelajaran: '', foto_url: '' })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.nama.trim()) {
      setError('Nama harus diisi')
      return
    }

    // Auto-convert Google Drive URL before saving
    const convertedData = {
      ...formData,
      foto_url: formData.foto_url ? getGoogleDriveImageUrl(formData.foto_url.trim()) : ''
    }

    if (editingGuru) {
      const { error: updateError } = await guruService.update(editingGuru.id, convertedData)
      if (updateError) {
        setError('Gagal mengupdate guru')
        return
      }
      setSuccess('Berhasil mengupdate guru')
    } else {
      const { error: createError } = await guruService.create(convertedData)
      if (createError) {
        setError('Gagal menambahkan guru')
        return
      }
      setSuccess('Berhasil menambahkan guru')
    }

    closeModal()
    loadGuru()
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus guru ini?')) return

    const { error } = await guruService.delete(id)
    if (!error) {
      setSuccess('Berhasil menghapus guru')
      loadGuru()
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const getInitials = (name) => {
    return name.split(' ').filter(n => n.length > 2).slice(0, 2).map(n => n[0]).join('')
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-800">Kelola Guru</h1>
          <p className="text-slate-500 mt-1">{guruList.length} guru terdaftar</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-200 inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Guru
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

      {/* Guru Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-500 mt-4">Memuat data...</p>
          </div>
        ) : guruList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Guru</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 hidden md:table-cell">NIP</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Jabatan</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600 hidden lg:table-cell">Mata Pelajaran</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {guruList.map((guru) => (
                  <tr key={guru.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {guru.foto_url ? (
                            <img src={getGoogleDriveImageUrl(guru.foto_url)} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-white font-semibold text-sm">{getInitials(guru.nama)}</span>
                          )}
                        </div>
                        <span className="font-medium text-slate-800">{guru.nama}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{guru.nip || '-'}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {guru.jabatan || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 hidden lg:table-cell">{guru.mata_pelajaran || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openModal(guru)}
                          className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(guru.id)}
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
            <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Belum ada data guru</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="font-heading text-xl font-bold text-slate-800">
                {editingGuru ? 'Edit Guru' : 'Tambah Guru'}
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200"
                  placeholder="Masukkan nama guru"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">NIP</label>
                <input
                  type="text"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200"
                  placeholder="Masukkan NIP"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Jabatan</label>
                <input
                  type="text"
                  value={formData.jabatan}
                  onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200"
                  placeholder="Contoh: Guru Produktif"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Mata Pelajaran</label>
                <input
                  type="text"
                  value={formData.mata_pelajaran}
                  onChange={(e) => setFormData({ ...formData, mata_pelajaran: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200"
                  placeholder="Contoh: Jaringan Komputer"
                />
              </div>

              <ImageUpload
                value={formData.foto_url}
                onChange={(url) => setFormData({ ...formData, foto_url: url })}
                bucket="guru"
                folder="photos"
                label="Foto Guru"
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
                  {editingGuru ? 'Update' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
