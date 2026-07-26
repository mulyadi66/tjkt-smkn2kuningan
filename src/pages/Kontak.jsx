import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'

export default function Kontak() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    subjek: '',
    pesan: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ nama: '', email: '', telepon: '', subjek: '', pesan: '' })
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative container-custom mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Kontak Kami
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut tentang jurusan TJKT
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info + Map */}
            <div className="space-y-8">
              <SectionTitle
                subtitle="Informasi Kontak"
                title="Hubungi Kami"
                center={false}
              />
              
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: 'Alamat',
                    content: 'Jl. Raya Sukamulya No.77, Sukamulya, Kec. Cigugur, Kabupaten Kuningan, Jawa Barat 45552',
                    sub: 'SMK Negeri 2 Kuningan'
                  },
                  {
                    icon: Phone,
                    title: 'Telepon',
                    content: '(0232) 872930',
                    sub: 'Senin - Jumat, 06:30 - 15:00'
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    content: 'tjkt@smkn2kuningan.sch.id',
                    sub: 'response@smkn2kuningan.sch.id'
                  },
                  {
                    icon: Clock,
                    title: 'Jam Operasional',
                    content: 'Senin - Jumat',
                    sub: '06:30 - 15:00 WIB'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-slate-800 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.content}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 h-64">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.8211551862632!2d108.45882467454172!3d-6.979647368346872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f15d835804117%3A0xe06ca6e3e0f233dc!2sSMK%20Negeri%202%20Kuningan!5e1!3m2!1sid!2sid!4v1785046954188!5m2!1sid!2sid" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Lokasi SMK Negeri 2 Kuningan"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <h2 className="font-heading text-2xl font-bold text-slate-800 mb-6">
                  Kirim Pesan
                </h2>
                
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 text-sm font-medium">
                      Pesan berhasil dikirim! Kami akan segera merespons.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200 text-sm"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200 text-sm"
                        placeholder="Masukkan email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Telepon
                      </label>
                      <input
                        type="tel"
                        name="telepon"
                        value={formData.telepon}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200 text-sm"
                        placeholder="Masukkan nomor telepon"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Subjek *
                      </label>
                      <select
                        name="subjek"
                        value={formData.subjek}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200 text-sm bg-white"
                      >
                        <option value="">Pilih Subjek</option>
                        <option value="pendaftaran">Pendaftaran Siswa Baru</option>
                        <option value="informasi">Informasi Jurusan</option>
                        <option value="kerjasama">Kerjasama</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Pesan *
                    </label>
                    <textarea
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all duration-200 text-sm resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto btn-primary inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
