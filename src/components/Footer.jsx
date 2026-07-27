import { Wifi, Mail, Phone, MapPin, Facebook, Instagram, Youtube, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container-custom mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="/tjkt.jpeg" 
                alt="Logo TJKT" 
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <p className="font-heading font-bold text-xl text-white">TJKT</p>
                <p className="text-sm text-slate-400">SMK Negeri 2 Kuningan</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Jurusan Teknik Jaringan Komputer dan Telekomunikasi yang menghasilkan lulusan kompeten di bidang teknologi informasi.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Menu Cepat</h3>
            <ul className="space-y-3">
              {[
                { name: 'Profil Jurusan', path: '/profil' },
                { name: 'Kompetensi Keahlian', path: '/kompetensi' },
                { name: 'Guru & Staf', path: '/guru' },
                { name: 'Berita', path: '/berita' },
                { name: 'Galeri', path: '/galeri' },
                { name: 'Kontak', path: '/kontak' }
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-slate-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Program Keahlian */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Program Keahlian</h3>
            <ul className="space-y-3">
              {[
                'Jaringan Komputer',
                'Telekomunikasi',
                'Pengembangan Web',
                'Keamanan Siber'
              ].map((item, index) => (
                <li key={index}>
                  <span className="flex items-center gap-2 text-slate-400 text-sm">
                    <ChevronRight className="w-4 h-4" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  Jl. Raya Sukamulya No.77, Sukamulya, Kec. Cigugur, Kab. Kuningan, Jawa Barat 45552
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">(0232) 872930</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">tjkt@smkn2-kng.sch.id</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-custom mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {currentYear} TJKT SMK Negeri 2 Kuningan. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-primary-400 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="text-slate-500 hover:text-primary-400 transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
