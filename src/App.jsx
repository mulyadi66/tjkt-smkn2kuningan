import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profil from './pages/Profil'
import Kompetensi from './pages/Kompetensi'
import Guru from './pages/Guru'
import Berita from './pages/Berita'
import Galeri from './pages/Galeri'
import Kontak from './pages/Kontak'

// Admin Pages
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import AdminGuru from './pages/admin/AdminGuru'
import AdminBerita from './pages/admin/AdminBerita'
import AdminGaleri from './pages/admin/AdminGaleri'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/kompetensi" element={<Kompetensi />} />
                    <Route path="/guru" element={<Guru />} />
                    <Route path="/berita" element={<Berita />} />
                    <Route path="/galeri" element={<Galeri />} />
                    <Route path="/kontak" element={<Kontak />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="guru" element={<AdminGuru />} />
            <Route path="berita" element={<AdminBerita />} />
            <Route path="galeri" element={<AdminGaleri />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
