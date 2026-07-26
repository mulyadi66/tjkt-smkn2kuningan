import { useState, useEffect } from 'react'
import { User, Briefcase, BookOpen } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { guruService } from '../services/api'
import { getGoogleDriveImageUrl } from '../utils/helpers'

export default function Guru() {
  const [guruList, setGuruList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGuru()
  }, [])

  const loadGuru = async () => {
    setLoading(true)
    const { data } = await guruService.getAll()
    setGuruList(data || [])
    setLoading(false)
  }

  const getInitials = (name) => {
    return name.split(' ').filter(n => n.length > 2).slice(0, 2).map(n => n[0]).join('')
  }

  const getColorClass = (index) => {
    const colors = [
      'from-primary-500 to-primary-600',
      'from-accent-500 to-accent-600',
      'from-energetic-500 to-energetic-600',
      'from-primary-400 to-accent-500',
      'from-primary-600 to-accent-600',
      'from-accent-400 to-primary-500',
      'from-energetic-400 to-primary-500',
      'from-primary-500 to-energetic-500'
    ]
    return colors[index % colors.length]
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container-custom mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Guru & Staf
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Tim pengajar profesional yang berpengalaman di bidangnya
          </p>
        </div>
      </section>

      {/* Guru List */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <SectionTitle
            subtitle="Tim Pengajar"
            title="Guru Produktif TJKT"
            description="Para guru yang berdedikasi dalam membentuk generasi muda profesional di bidang teknologi."
          />
          
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
                  <div className="w-24 h-24 bg-slate-200 rounded-2xl mx-auto mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : guruList.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guruList.map((guru, index) => (
                <div key={guru.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-hover text-center group">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getColorClass(index)} flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-105`}>
                      {guru.foto_url ? (
                        <img src={getGoogleDriveImageUrl(guru.foto_url)} alt={guru.nama} className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        <span className="text-2xl font-bold text-white">{getInitials(guru.nama)}</span>
                      )}
                    </div>
                    {guru.jabatan && guru.jabatan.includes('Kepala') && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-energetic-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">★</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="font-heading font-bold text-slate-800 mb-1 text-sm">
                    {guru.nama}
                  </h3>
                  <p className="text-primary-600 text-xs font-medium mb-3">
                    {guru.jabatan || '-'}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                    <BookOpen className="w-3 h-3" />
                    <span>{guru.mata_pelajaran || '-'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Belum ada data guru</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: User,
                value: `${guruList.length}+`,
                label: 'Guru Produktif',
                description: 'Guru berpengalaman di bidangnya'
              },
              {
                icon: Briefcase,
                value: '50+',
                label: 'Tahun Pengalaman',
                description: 'Total pengalaman mengajar'
              },
              {
                icon: BookOpen,
                value: '100%',
                label: 'Bersertifikat',
                description: 'Guru dengan sertifikasi internasional'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center card-hover">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-primary-600" />
                </div>
                <p className="font-heading text-3xl font-bold gradient-text mb-2">{item.value}</p>
                <h3 className="font-heading font-semibold text-slate-800 mb-1">{item.label}</h3>
                <p className="text-slate-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
