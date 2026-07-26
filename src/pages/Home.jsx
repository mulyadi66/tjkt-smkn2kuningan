import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Network, Radio, Globe, Shield, Award, Users, BookOpen, ChevronRight, Star, Zap, Target, Newspaper } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import StatCard from '../components/StatCard'
import { getGoogleDriveImageUrl } from '../utils/helpers'
import { kompetensiData } from '../data/siteData'
import { guruService, beritaService } from '../services/api'

export default function Home() {
  const [stats, setStats] = useState({ guru: 0, berita: 0 })
  const [recentBerita, setRecentBerita] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const [guruRes, beritaRes] = await Promise.all([
      guruService.getAll(),
      beritaService.getPublished()
    ])
    setStats({
      guru: guruRes.data?.length || 0,
      berita: beritaRes.data?.length || 0
    })
    setRecentBerita(beritaRes.data?.slice(0, 3) || [])
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-hero">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative container-custom mx-auto px-4 md:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <img src="/tjkt.jpeg" alt="TJKT" className="w-6 h-6 rounded-md object-cover" />
                <span>Jurusan Unggulan Teknologi</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Teknik Jaringan Komputer & Telekomunikasi
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Persiapkan masa depanmu di bidang jaringan komputer dan telekomunikasi. 
                Belajar langsung dari guru profesional dengan fasilitas laboratorium modern.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/profil"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg"
                >
                  Selengkapnya
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/kontak"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
                      <Network className="w-12 h-12 text-accent-300 mb-3" />
                      <span className="text-sm font-medium text-center">Jaringan</span>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
                      <Radio className="w-12 h-12 text-accent-300 mb-3" />
                      <span className="text-sm font-medium text-center">Telekomunikasi</span>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
                      <Globe className="w-12 h-12 text-accent-300 mb-3" />
                      <span className="text-sm font-medium text-center">Web Dev</span>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
                      <Shield className="w-12 h-12 text-accent-300 mb-3" />
                      <span className="text-sm font-medium text-center">Security</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value={stats.guru} label="Guru Produktif" suffix="+" />
            <StatCard value={360} label="Siswa Aktif" suffix="+" />
            <StatCard value={stats.berita} label="Berita" suffix="" />
            <StatCard value={85} label="Tingkat Kerja" suffix="%" />
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                subtitle="Tentang Kami"
                title="Membentuk Profesional Muda di Bidang IT"
                description="Jurusan TJKT SMK Negeri 2 Kuningan berkomitmen menghasilkan lulusan yang kompeten dan siap bersaing di dunia kerja."
                center={false}
              />
              <p className="text-slate-600 mb-6 leading-relaxed">
                Dengan kurikulum yang selalu diperbarui sesuai kebutuhan industri, siswa kami mendapatkan 
                pendidikan terbaik dalam jaringan komputer, telekomunikasi, dan keamanan siber.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: Award, text: 'Sertifikasi Internasional' },
                  { icon: Users, text: 'Guru Berpengalaman' },
                  { icon: BookOpen, text: 'Kurikulum Terbaru' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-slate-700">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/profil"
                className="btn-primary inline-flex items-center gap-2"
              >
                Selengkapnya
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-4">
                  {kompetensiData.map((item) => {
                    const icons = { Network, Radio, Globe, Shield }
                    const Icon = icons[item.icon] || Network
                    return (
                      <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm card-hover">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <h3 className="font-heading font-semibold text-slate-800 mb-2 text-sm">
                          {item.nama}
                        </h3>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kompetensi Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom mx-auto">
          <SectionTitle
            subtitle="Program Keahlian"
            title="Kompetensi Keahlian TJKT"
            description="Empat program keahlian unggulan yang siap membentuk profesional muda di bidang teknologi."
          />
          <div className="grid md:grid-cols-2 gap-8">
            {kompetensiData.map((item) => {
              const icons = { Network, Radio, Globe, Shield }
              const Icon = icons[item.icon] || Network
              return (
                <div key={item.id} className="bg-white rounded-2xl p-8 shadow-sm card-hover border border-slate-100">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-slate-800 mb-2">
                        {item.nama}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    {item.mataPelajaran.slice(0, 4).map((mapel, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <ChevronRight className="w-4 h-4 text-primary-500" />
                        {mapel}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.sertifikasi.map((sert, idx) => (
                      <span key={idx} className="px-3 py-1 bg-accent-50 text-accent-700 rounded-full text-xs font-medium">
                        {sert}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <SectionTitle
            subtitle="Keunggulan"
            title="Mengapa Pilih TJKT?"
            description="Berbagai keunggulan yang membuat jurusan kami menjadi pilihan terbaik."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Sertifikasi Internasional',
                description: 'Kesempatan mendapatkan sertifikasi Cisco, MikroTik, dan CompTIA yang diakui dunia.'
              },
              {
                icon: Target,
                title: 'Kurikulum Industri',
                description: 'Kurikulum yang dirancang berdasarkan kebutuhan nyata industri teknologi informasi.'
              },
              {
                icon: Users,
                title: 'Guru Profesional',
                description: 'Tim pengajar berpengalaman dengan sertifikasi internasional di bidangnya.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 card-hover">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Berita Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom mx-auto">
          <SectionTitle
            subtitle="Berita Terbaru"
            title="Kegiatan & Prestasi"
            description="Informasi terkini seputar kegiatan dan prestasi jurusan TJKT."
          />
          {recentBerita.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {recentBerita.map((item) => (
                <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-slate-100">
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-accent-500 relative overflow-hidden">
                    {item.gambar_url ? (
                      <img src={getGoogleDriveImageUrl(item.gambar_url)} alt={item.judul} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Newspaper className="w-12 h-12 text-white/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                      <span>{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span>·</span>
                      <span className="text-primary-600 font-medium">{item.kategori}</span>
                    </div>
                    <h3 className="font-heading font-bold text-slate-800 mb-3 line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                      {item.excerpt || item.konten?.substring(0, 100) + '...'}
                    </p>
                    <Link to="/berita" className="text-primary-600 font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all duration-200">
                      Baca Selengkapnya
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Belum ada berita terbaru</p>
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/berita" className="btn-secondary inline-flex items-center gap-2">
              Lihat Semua Berita
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-hero"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container-custom mx-auto px-4 md:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Menjadi Profesional Muda?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Bergabunglah dengan TJKT SMK Negeri 2 Kuningan dan mulai karirmu di bidang teknologi informasi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/kontak"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg"
            >
              Hubungi Kami
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/profil"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
