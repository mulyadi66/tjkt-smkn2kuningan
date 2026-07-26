import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if key is valid Supabase anon key format (starts with eyJ)
const isValidSupabaseKey = (key) => {
  return key && key.startsWith('eyJ') && key.length > 100
}

const isConfigured = supabaseUrl && supabaseAnonKey && 
                     supabaseUrl.includes('supabase.co') && 
                     isValidSupabaseKey(supabaseAnonKey)

if (!isConfigured) {
  console.warn('⚠️ Supabase tidak terkonfigurasi atau key tidak valid. Menggunakan Demo Mode.')
  console.warn('Untuk menggunakan Supabase, pastikan VITE_SUPABASE_ANON_KEY format: eyJ...')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return isConfigured
}
