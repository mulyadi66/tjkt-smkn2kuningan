import { useState, useRef } from 'react'
import { Upload, X, Image, Link as LinkIcon, AlertCircle, Check } from 'lucide-react'
import { storageService } from '../services/api'
import { getGoogleDriveImageUrl, isGoogleDriveUrl } from '../utils/helpers'

export default function ImageUpload({ 
  value = '', 
  onChange, 
  bucket = 'images',
  folder = 'uploads',
  label = 'Gambar',
  required = false,
  accept = 'image/*'
}) {
  const [mode, setMode] = useState(value?.startsWith('http') ? 'url' : (value ? 'upload' : 'upload'))
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(value || '')
  const fileInputRef = useRef(null)

  const handleFileSelect = async (file) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('File harus berupa gambar')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran gambar maksimal 5MB')
      return
    }

    setError('')
    setUploading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { url, error: uploadError } = await storageService.uploadFile(bucket, file, fileName)

    if (uploadError) {
      setError('Gagal mengupload gambar')
      setUploading(false)
      return
    }

    setPreviewUrl(url)
    onChange(url)
    setUploading(false)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInputChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await handleFileSelect(e.target.files[0])
    }
  }

  const handleUrlChange = (url) => {
    const convertedUrl = url ? getGoogleDriveImageUrl(url) : ''
    setPreviewUrl(convertedUrl)
    onChange(convertedUrl)
  }

  const handleRemove = () => {
    setPreviewUrl('')
    onChange('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && '*'}
      </label>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            mode === 'upload'
              ? 'bg-primary-100 text-primary-700'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Upload className="w-3 h-3 inline mr-1" />
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            mode === 'url'
              ? 'bg-primary-100 text-primary-700'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <LinkIcon className="w-3 h-3 inline mr-1" />
          URL Gambar
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <p className="text-red-700 text-xs">{error}</p>
        </div>
      )}

      {/* Upload Mode */}
      {mode === 'upload' && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-slate-200 hover:border-primary-400 hover:bg-slate-50'
          } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-3"></div>
              <p className="text-sm text-slate-600">Mengupload gambar...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-10 h-10 text-slate-400 mb-3" />
              <p className="text-sm font-medium text-slate-700 mb-1">
                Klik atau seret gambar ke sini
              </p>
              <p className="text-xs text-slate-500">
                JPG, PNG, WebP (Maks. 5MB)
              </p>
            </div>
          )}
        </div>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <div>
          <input
            type="url"
            value={value}
            onChange={(e) => handleUrlChange(e.target.value)}
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
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="mt-4 relative">
          <p className="text-sm font-medium text-slate-700 mb-2">Preview:</p>
          <div className="relative inline-block">
            <img
              src={getGoogleDriveImageUrl(previewUrl)}
              alt="Preview"
              className="w-full h-48 object-cover rounded-xl"
              onError={(e) => {
                e.target.src = ''
                e.target.alt = 'Gagal memuat gambar'
              }}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {isGoogleDriveUrl(previewUrl) && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <Check className="w-3 h-3" />
              URL Google Drive terdeteksi & dikonversi
            </p>
          )}
        </div>
      )}
    </div>
  )
}
