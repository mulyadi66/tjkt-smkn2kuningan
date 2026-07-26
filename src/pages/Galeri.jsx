import { useState, useEffect } from 'react'
import { Image, X } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { galeriService } from '../services/api'
import { getGoogleDriveImageUrl } from '../utils/helpers'

export default function Galeri() {
  const [galeriList, setGaleriList] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    loadGaleri()
  }, [])

  const loadGaleri = async () => {
    setLoading(true)
    const { data } = await galeriService.getAll()
    setGaleriList(data || [])
    setLoading(false)
  }

  const categories = ['Semua', ...new Set(galeriList.map(item => item.kategori).filter(Boolean))]

  const filteredGaleri = selectedCategory === 'Semua'
    ? galeriList
    : galeriList.filter(item => item.kategori === selectedCategory)

  const getGradient = (index) => {
    const gradients = [
      'from-primary-400 to-accent-500',
      'from-accent-400 to-primary-500',
      'from-energetic-400 to-primary-500',
      'from-primary-500 to-energetic-500',
      'from-accent-500 to-primary-400',
      'from-primary-400 to-energetic-400',
    ]
    return gradients[index % gradients.length]
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container-custom mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Galeri
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Dokumentasi kegiatan dan momen berharga jurusan TJKT
          </p>
        </div>
      </section>

      {/* Filter */}
      {!loading && galeriList.length > 0 && (
        <section className="py-8 bg-slate-50 sticky top-20 z-40">
          <div className="container-custom mx-auto px-4 md:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                      : 'bg-white text-slate-600 hover:bg-primary-50 hover:text-primary-600 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square bg-slate-200 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : filteredGaleri.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGaleri.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="group cursor-pointer"
                >
                  <div className={`aspect-square bg-gradient-to-br ${getGradient(index)} rounded-2xl overflow-hidden relative`}>
                    {item.gambar_url ? (
                      <img src={getGoogleDriveImageUrl(item.gambar_url)} alt={item.judul} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image className="w-12 h-12 text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                        </div>
                      </>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white font-medium">
                        {item.kategori || 'Lainnya'}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-slate-800">
                        Lihat Detail
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Image className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Belum ada foto di galeri</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedImage.gambar_url ? (
              <img 
                src={getGoogleDriveImageUrl(selectedImage.gambar_url)} 
                alt={selectedImage.judul} 
                className="w-full rounded-2xl"
                onError={(e) => { e.target.src = '' }}
              />
            ) : (
              <div className={`aspect-video bg-gradient-to-br ${getGradient(0)} rounded-2xl flex items-center justify-center`}>
                <Image className="w-24 h-24 text-white/40" />
              </div>
            )}
            <div className="mt-4 text-center">
              <h3 className="font-heading font-bold text-white text-xl">{selectedImage.judul}</h3>
              <p className="text-white/60 mt-1">{selectedImage.kategori}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
