import { Network, Radio, Globe, Shield, ChevronRight, Award, BookOpen, Wrench } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import { kompetensiData } from '../data/siteData'

export default function Kompetensi() {
  const icons = { Network, Radio, Globe, Shield }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container-custom mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Kompetensi Keahlian
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Empat program keahlian unggulan yang membentuk profesional muda
          </p>
        </div>
      </section>

      {/* Kompetensi Detail */}
      <section className="section-padding">
        <div className="container-custom mx-auto space-y-16">
          {kompetensiData.map((item, index) => {
            const Icon = icons[item.icon] || Network
            const isEven = index % 2 === 0
            return (
              <div key={item.id} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:direction-rtl' : ''}`}>
                <div className={isEven ? '' : 'lg:order-2'}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <span className="text-sm text-primary-600 font-medium">Program Keahlian {index + 1}</span>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-800">
                        {item.nama}
                      </h2>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    {item.deskripsi}
                  </p>
                  
                  {/* Mata Pelajaran */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-primary-600" />
                      <h3 className="font-heading font-semibold text-slate-800">Mata Pelajaran Utama</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {item.mataPelajaran.map((mapel, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                          <ChevronRight className="w-4 h-4 text-primary-500 flex-shrink-0" />
                          {mapel}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sertifikasi */}
                  <div className="bg-accent-50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-accent-600" />
                      <h3 className="font-heading font-semibold text-slate-800">Sertifikasi</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.sertifikasi.map((sert, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-accent-700 border border-accent-200">
                          {sert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className={`${isEven ? '' : 'lg:order-1'}`}>
                  <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 md:p-12">
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-6">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-slate-800 text-center mb-4">
                        {item.nama}
                      </h3>
                      <div className="space-y-3">
                        {item.mataPelajaran.slice(0, 3).map((mapel, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                              <Wrench className="w-4 h-4 text-primary-600" />
                            </div>
                            <span className="text-sm text-slate-600">{mapel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Prospek Karir */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom mx-auto">
          <SectionTitle
            subtitle="Masa Depan"
            title="Prospek Karir Lulusan"
            description="Berbagai peluang karir yang terbuka bagi lulusan TJKT."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Network Engineer',
                description: 'Merancang, mengkonfigurasi, dan memelihara jaringan komputer perusahaan.',
                icon: Network
              },
              {
                title: 'System Administrator',
                description: 'Mengelola dan memelihara server serta infrastruktur TI.',
                icon: Shield
              },
              {
                title: 'Web Developer',
                description: 'Mengembangkan aplikasi web dan mobile untuk kebutuhan bisnis.',
                icon: Globe
              },
              {
                title: 'Telecom Specialist',
                description: 'Mengelola sistem telekomunikasi dan jaringan seluler.',
                icon: Radio
              },
              {
                title: 'Cyber Security Analyst',
                description: 'Melindungi sistem informasi dari ancaman siber.',
                icon: Shield
              },
              {
                title: 'Cloud Engineer',
                description: 'Mengelola infrastruktur cloud dan layanan komputasi awan.',
                icon: Globe
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 card-hover">
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-heading font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
