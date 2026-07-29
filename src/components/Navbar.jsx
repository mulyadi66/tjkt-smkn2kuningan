import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/siteData'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const linkClass = (active = false) => {
    if (active) {
      return isScrolled
        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
        : 'bg-white/20 text-white'
    }
    return isScrolled
      ? 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'
      : 'text-white/90 hover:text-white hover:bg-white/10'
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-primary-600/5' 
        : 'bg-transparent'
    }`}>
      <div className="container-custom mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/tjkt.jpeg" 
              alt="Logo TJKT" 
              className={`w-10 h-10 rounded-xl object-cover transition-all duration-300 ${
                isScrolled ? '' : 'ring-2 ring-white/30'
              } group-hover:scale-110`}
            />
            <div className="hidden sm:block">
              <p className={`font-heading font-bold text-lg leading-tight transition-colors duration-300 ${
                isScrolled ? 'text-primary-700' : 'text-white'
              }`}>
                TJKT
              </p>
              <p className={`text-xs transition-colors duration-300 ${
                isScrolled ? 'text-slate-500' : 'text-white/80'
              }`}>
                SMK Negeri 2 Kuningan
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.path?.startsWith('http') ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    linkClass()
                  }`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    linkClass(location.pathname === link.path)
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/kontak"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isScrolled
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/30'
                  : 'bg-white text-primary-600 hover:bg-white/90'
              }`}
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
          <div className="container-custom mx-auto px-4 py-4">
            {navLinks.map((link) => (
              link.path?.startsWith('http') ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-all duration-200"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'bg-primary-600 text-white'
                      : 'text-slate-600 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
            <Link
              to="/kontak"
              className="block mt-4 px-4 py-3 bg-primary-600 text-white text-center rounded-xl font-semibold"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
