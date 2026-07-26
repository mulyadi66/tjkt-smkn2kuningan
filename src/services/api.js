import { supabase, isSupabaseConfigured } from '../config/supabase'

// Demo data for when Supabase is not configured
const demoData = {
  guru: [
    { id: '1', nama: 'Drs. H. Asep Saepudin, M.Pd', nip: '197405212003121004', jabatan: 'Kepala Program Keahlian', mata_pelajaran: 'Kepemimpinan & Manajemen', foto_url: null },
    { id: '2', nama: 'Rina Mulyani, S.Kom', nip: '198503152010122005', jabatan: 'Wakil Kepala Program Keahlian', mata_pelajaran: 'Jaringan Komputer', foto_url: null },
    { id: '3', nama: 'Ahmad Fauzi, S.T', nip: '198807122015041003', jabatan: 'Guru Produktif', mata_pelajaran: 'Routing & Switching', foto_url: null },
  ],
  berita: [
    { id: '1', judul: 'Siswa TJKT Juara 1 Lomba Jaringan Tingkat Provinsi', kategori: 'Prestasi', excerpt: 'Tim TJKT SMKN 2 Kuningan berhasil meraih juara 1 dalam kompetisi konfigurasi jaringan tingkat Jawa Barat.', konten: 'Dalam kompetisi yang diadakan di Bandung...', gambar_url: null, published: true },
    { id: '2', judul: 'Kunjungan Industri ke Telkom Bandung', kategori: 'Kegiatan', excerpt: 'Siswa kelas XI TJKT melakukan kunjungan industri ke PT Telkom Indonesia.', konten: 'Kunjungan ini bertujuan untuk...', gambar_url: null, published: true },
  ],
  galeri: [
    { id: '1', judul: 'Praktikum Jaringan', kategori: 'Lab', gambar_url: null },
    { id: '2', judul: 'Kunjungan Industri Telkom', kategori: 'Kegiatan', gambar_url: null },
    { id: '3', judul: 'Workshop Cyber Security', kategori: 'Workshop', gambar_url: null },
  ]
}

// Store demo data in memory
let localData = { ...demoData }

// Sort guru by jabatan priority
export function sortGuruByJabatan(list) {
  const priority = [
    'kepala program keahlian',
    'kepala lab tjkt',
    'guru produktif tjkt',
    'guru produktif',
  ]
  return [...list].sort((a, b) => {
    const aIdx = priority.findIndex(p => (a.jabatan || '').toLowerCase().includes(p))
    const bIdx = priority.findIndex(p => (b.jabatan || '').toLowerCase().includes(p))
    const aScore = aIdx === -1 ? 99 : aIdx
    const bScore = bIdx === -1 ? 99 : bIdx
    return aScore - bScore
  })
}

// ============ GURU SERVICES ============
export const guruService = {
  async getAll() {
    if (!isSupabaseConfigured()) {
      return { data: sortGuruByJabatan(localData.guru), error: null }
    }
    const { data, error } = await supabase
      .from('guru')
      .select('*')
      .order('created_at', { ascending: false })
    return { data: sortGuruByJabatan(data || []), error }
  },

  async getById(id) {
    if (!isSupabaseConfigured()) {
      const guru = localData.guru.find(g => g.id === id)
      return { data: guru || null, error: guru ? null : { message: 'Guru not found' } }
    }
    const { data, error } = await supabase
      .from('guru')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async create(guru) {
    if (!isSupabaseConfigured()) {
      const newGuru = { ...guru, id: String(Date.now()), created_at: new Date().toISOString() }
      localData.guru.unshift(newGuru)
      return { data: newGuru, error: null }
    }
    const { data, error } = await supabase
      .from('guru')
      .insert([guru])
      .select()
      .single()
    return { data, error }
  },

  async update(id, guru) {
    if (!isSupabaseConfigured()) {
      const index = localData.guru.findIndex(g => g.id === id)
      if (index !== -1) {
        localData.guru[index] = { ...localData.guru[index], ...guru }
        return { data: localData.guru[index], error: null }
      }
      return { data: null, error: { message: 'Guru not found' } }
    }
    const { data, error } = await supabase
      .from('guru')
      .update(guru)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async delete(id) {
    if (!isSupabaseConfigured()) {
      localData.guru = localData.guru.filter(g => g.id !== id)
      return { error: null }
    }
    const { error } = await supabase
      .from('guru')
      .delete()
      .eq('id', id)
    return { error }
  }
}

// ============ BERITA SERVICES ============
export const beritaService = {
  async getAll() {
    if (!isSupabaseConfigured()) {
      return { data: localData.berita, error: null }
    }
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getPublished() {
    if (!isSupabaseConfigured()) {
      return { data: localData.berita, error: null }
    }
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getById(id) {
    if (!isSupabaseConfigured()) {
      const berita = localData.berita.find(b => b.id === id)
      return { data: berita || null, error: berita ? null : { message: 'Berita not found' } }
    }
    const { data, error } = await supabase
      .from('berita')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  async create(berita) {
    if (!isSupabaseConfigured()) {
      const newBerita = { ...berita, id: String(Date.now()), created_at: new Date().toISOString() }
      localData.berita.unshift(newBerita)
      return { data: newBerita, error: null }
    }
    const { data, error } = await supabase
      .from('berita')
      .insert([berita])
      .select()
      .single()
    return { data, error }
  },

  async update(id, berita) {
    if (!isSupabaseConfigured()) {
      const index = localData.berita.findIndex(b => b.id === id)
      if (index !== -1) {
        localData.berita[index] = { ...localData.berita[index], ...berita }
        return { data: localData.berita[index], error: null }
      }
      return { data: null, error: { message: 'Berita not found' } }
    }
    const { data, error } = await supabase
      .from('berita')
      .update(berita)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  async delete(id) {
    if (!isSupabaseConfigured()) {
      localData.berita = localData.berita.filter(b => b.id !== id)
      return { error: null }
    }
    const { error } = await supabase
      .from('berita')
      .delete()
      .eq('id', id)
    return { error }
  }
}

// ============ GALERI SERVICES ============
export const galeriService = {
  async getAll() {
    if (!isSupabaseConfigured()) {
      return { data: localData.galeri, error: null }
    }
    const { data, error } = await supabase
      .from('galeri')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async create(galeri) {
    if (!isSupabaseConfigured()) {
      const newGaleri = { ...galeri, id: String(Date.now()), created_at: new Date().toISOString() }
      localData.galeri.unshift(newGaleri)
      return { data: newGaleri, error: null }
    }
    const { data, error } = await supabase
      .from('galeri')
      .insert([galeri])
      .select()
      .single()
    return { data, error }
  },

  async delete(id) {
    if (!isSupabaseConfigured()) {
      localData.galeri = localData.galeri.filter(g => g.id !== id)
      return { error: null }
    }
    const { error } = await supabase
      .from('galeri')
      .delete()
      .eq('id', id)
    return { error }
  }
}

// ============ STORAGE SERVICES ============
export const storageService = {
  async uploadFile(bucket, file, path) {
    if (!isSupabaseConfigured()) {
      // Return a demo URL for local mode
      return { data: { path: `demo/${path}` }, error: null, url: URL.createObjectURL(file) }
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (!error) {
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)
      return { data, error, url: publicUrl }
    }

    return { data, error, url: null }
  },

  async deleteFile(bucket, path) {
    if (!isSupabaseConfigured()) {
      return { error: null }
    }

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    return { error }
  },

  getPublicUrl(bucket, path) {
    if (!isSupabaseConfigured()) {
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return publicUrl
  }
}
