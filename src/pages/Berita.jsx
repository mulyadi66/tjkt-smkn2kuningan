import { useState, useEffect } from 'react'
import { Calendar, Tag, ArrowRight, Clock, Newspaper } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { beritaService } from '../services/api'
import { getGoogleDriveImageUrl } from '../utils/helpers'

export default function Berita() {
  const [beritaList, setBeritaList] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Semua')

  useEffect(() => {
    loadBerita()
  }, [])

  const loadBerita = async () => {
    setLoading(true)
    const { data, error } = await beritaService.getPublished()
    console.log('Berita loaded:', data, error)
    setBeritaList(data || [])
    setLoading(false)
  }

  const categories = ['Semua', ...new Set(beritaList.map(item => item.kategori).filter(Boolean))]
  
  const filteredBerita = selectedCategory === 'Semua' 
    ? beritaList 
    : beritaList.filter(item => item.kategori === selectedCategory)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container-custom mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Berita & Kegiatan
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan dan prestasi jurusan TJKT
          </p>
        </div>
      </section>

      {/* Filter */}
      {!loading && beritaList.length > 0 && (
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

      {/* Berita List */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
                  <div className="h-48 bg-slate-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-slate-200 rounded w-1/4 mb-3"></div>
                    <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBerita.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBerita.map((item) => (
                <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 card-hover group">
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-accent-500 relative overflow-hidden">
                    {item.gambar_url ? (
                      <img src={getGoogleDriveImageUrl(item.gambar_url)} alt={item.judul} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Newspaper className="w-12 h-12 text-white/40" />
                        </div>
                      </>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-700">
                        {item.kategori}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>5 min</span>
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                      {item.judul}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                      {item.excerpt || item.konten?.substring(0, 150) + '...'}
                    </p>
                    <button className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all duration-200">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Belum ada berita</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
