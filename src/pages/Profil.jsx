import { Target, Eye, BookOpen, Award, Users, Building2, ChevronRight } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { profilData } from '../data/siteData'

export default function Profil() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container-custom mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Profil Jurusan
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat Jurusan Teknik Jaringan Komputer dan Telekomunikasi
          </p>
        </div>
      </section>

      {/* Sejarah */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                subtitle="Sejarah"
                title="Tentang TJKT"
                center={false}
              />
              <p className="text-slate-600 leading-relaxed mb-6">
                {profilData.sejarah}
              </p>
              <p className="text-slate-600 leading-relaxed">
                Jurusan ini memiliki komitmen kuat untuk terus berinovasi dalam metode pembelajaran 
                dan pengembangan fasilitas, sehingga siswa selalu mendapatkan pengalaman belajar 
                terbaik yang relevan dengan perkembangan teknologi terkini.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 md:p-12">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-800">SMK Negeri 2 Kuningan</h3>
                    <p className="text-sm text-slate-500">Berdiri sejak 2003</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  Jurusan TJKT merupakan salah satu jurusan unggulan yang terus berkembang 
                  dan menghasilkan lulusan berkualitas tinggi di bidang teknologi informasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Eye className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-slate-800">Visi</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg">
                {profilData.visi}
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent-100 flex items-center justify-center">
                  <Target className="w-7 h-7 text-accent-600" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-slate-800">Misi</h2>
              </div>
              <ul className="space-y-4">
                {profilData.misi.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tujuan */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <SectionTitle
            subtitle="Tujuan"
            title="Tujuan Pendidikan"
            description="Target pencapaian yang ingin diraih oleh jurusan TJKT."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {profilData.tujuan.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 card-hover">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">{index + 1}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sarana & Prasarana */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom mx-auto">
          <SectionTitle
            subtitle="Fasilitas"
            title="Sarana & Prasarana"
            description="Fasilitas pembelajaran yang mendukung proses belajar mengajar."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {profilData.sarana.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-hover text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-slate-800">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
