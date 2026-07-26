import { useState, useEffect } from 'react'
import { Users, Newspaper, Image, TrendingUp } from 'lucide-react'
import { guruService, beritaService, galeriService } from '../../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    guru: 0,
    berita: 0,
    galeri: 0,
    published: 0
  })
  const [recentBerita, setRecentBerita] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    const [guruRes, beritaRes, galeriRes] = await Promise.all([
      guruService.getAll(),
      beritaService.getAll(),
      galeriService.getAll()
    ])

    setStats({
      guru: guruRes.data?.length || 0,
      berita: beritaRes.data?.length || 0,
      galeri: galeriRes.data?.length || 0,
      published: beritaRes.data?.filter(b => b.published)?.length || 0
    })

    setRecentBerita(beritaRes.data?.slice(0, 5) || [])
    setLoading(false)
  }

  const statCards = [
    { label: 'Total Guru', value: stats.guru, icon: Users, color: 'bg-primary-500' },
    { label: 'Total Berita', value: stats.berita, icon: Newspaper, color: 'bg-accent-500' },
    { label: 'Berita Publish', value: stats.published, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Total Galeri', value: stats.galeri, icon: Image, color: 'bg-energetic-500' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Selamat datang di panel admin TJKT</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Berita */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-heading font-bold text-slate-800">Berita Terbaru</h2>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex gap-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentBerita.length > 0 ? (
            <div className="space-y-4">
              {recentBerita.map((berita) => (
                <div key={berita.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-800 truncate">{berita.judul}</p>
                    <p className="text-sm text-slate-500">{berita.kategori}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    berita.published 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {berita.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">Belum ada berita</p>
          )}
        </div>
      </div>
    </div>
  )
}
