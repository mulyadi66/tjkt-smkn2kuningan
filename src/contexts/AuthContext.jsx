import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../config/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured())

  useEffect(() => {
    // Always check demo user first
    const demoUser = localStorage.getItem('demoUser')
    if (demoUser) {
      setUser(JSON.parse(demoUser))
      setIsDemoMode(true)
      setLoading(false)
      return
    }

    if (!isSupabaseConfigured()) {
      setLoading(false)
      return
    }

    // Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsDemoMode(false)
      setLoading(false)
    }).catch((err) => {
      console.error('Supabase session error:', err)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsDemoMode(false)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    // Always try demo mode first if Supabase is not configured
    if (!isSupabaseConfigured()) {
      // Demo mode - allow demo credentials
      if (email === 'admin@smkn2kuningan.sch.id' && password === 'admin123') {
        const demoUser = { id: 'demo-admin', email, role: 'admin' }
        setUser(demoUser)
        setIsDemoMode(true)
        localStorage.setItem('demoUser', JSON.stringify(demoUser))
        return { error: null }
      }
      return { error: { message: 'Email atau password salah. Gunakan demo credentials.' } }
    }

    // Try Supabase auth
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        // If Supabase fails, suggest demo mode
        console.error('Supabase auth error:', error.message)
        return { error: { message: `${error.message}. Atau gunakan demo: admin@smkn2kuningan.sch.id / admin123` } }
      }
      
      setIsDemoMode(false)
      return { error: null }
    } catch (err) {
      console.error('Auth error:', err)
      return { error: { message: 'Gagal terhubung ke server. Gunakan demo mode.' } }
    }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured() || isDemoMode) {
      setUser(null)
      setIsDemoMode(true)
      localStorage.removeItem('demoUser')
      return
    }
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isDemoMode }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
