export const profilData = {
  nama: "Teknik Jaringan Komputer dan Telekomunikasi",
  singkatan: "TJKT",
  sekolah: "SMK Negeri 2 Kuningan",
  visi: "Menjadi program keahlian yang unggul dalam bidang jaringan komputer dan telekomunikasi, menghasilkan lulusan yang kompeten, berkarakter, dan siap bersaing di era digital global.",
  misi: [
    "Menyelenggarakan pendidikan dan pelatihan bidang jaringan komputer dan telekomunikasi yang berkualitas dan sesuai kebutuhan industri",
    "Mengembangkan potensi siswa melalui kegiatan ekstrakurikuler dan kompetisi di bidang teknologi informasi",
    "Membangun karakter siswa yang profesional, disiplin, dan beretika dalam bekerja",
    "Menjalin kerjasama dengan dunia industri untuk meningkatkan kompetensi lulusan",
    "Menyediakan sarana dan prasarana pembelajaran yang memadai dan terkini"
  ],
  tujuan: [
    "Menghasilkan lulusan yang kompeten di bidang jaringan komputer dan telekomunikasi",
    "Mempersiapkan siswa menghadapi dunia kerja atau melanjutkan pendidikan ke jenjang lebih tinggi",
    "Mengembangkan keterampilan teknis sesuai standar kompetensi nasional dan internasional",
    "Membentuk tenaga kerja tingkat menengah yang profesional dan siap pakai"
  ],
  berdiri: 2015,
  sejarah: "Jurusan Teknik Jaringan Komputer dan Telekomunikasi (TJKT) SMK Negeri 2 Kuningan didirikan pada tahun 2015 untuk menjawab kebutuhan industri akan tenaga kerja terampil di bidang jaringan komputer dan telekomunikasi. Sejak berdirinya, jurusan ini terus berkomitmen untuk menghasilkan lulusan yang kompeten dan siap bersaing di dunia kerja.",
  sarana: [
    "Laboratorium Jaringan Komputer",
    "Laboratorium Server & Cloud",
    "Laboratorium Telekomunikasi",
    "StudioProduksi Konten Digital",
    "Ruang Praktik Mikroelektronika",
    "Perpustakaan Digital"
  ]
};

export const kompetensiData = [
  {
    id: 1,
    nama: "Jaringan Komputer",
    deskripsi: "Mempelajari konfigurasi, instalasi, dan administrasi jaringan komputer lokal (LAN) hingga jaringan luas (WAN).",
    mataPelajaran: [
      "Konfigurasi Jaringan Lokal (LAN)",
      "Instalasi dan Administrasi Server",
      "Keamanan Jaringan (Network Security)",
      "Routing dan Switching",
      "Cloud Computing",
      "Virtualisasi Server"
    ],
    sertifikasi: ["Cisco CCNA", "MikroTik MTCNA", "CompTIA Network+"],
    icon: "Network"
  },
  {
    id: 2,
    nama: "Telekomunikasi",
    deskripsi: "Mempelajari sistem dan teknologi komunikasi data, transmisi sinyal, serta perancangan jaringan telekomunikasi.",
    mataPelajaran: [
      "Sistem Telekomunikasi",
      "Transmisi Data dan Sinyal",
      "Fiber Optik",
      "Wireless Communication",
      "Jaringan Seluler (4G/5G)",
      "IoT (Internet of Things)"
    ],
    sertifikasi: ["MikroTik MTCWE", "Huawei HCIA"],
    icon: "Radio"
  },
  {
    id: 3,
    nama: "Pengembangan Web & Aplikasi",
    deskripsi: "Mempelajari pengembangan website dan aplikasi berbasis web untuk kebutuhan bisnis dan organisasi.",
    mataPelajaran: [
      "HTML, CSS, JavaScript",
      "Framework Frontend (React, Vue)",
      "Backend Development (Node.js, PHP)",
      "Database Management (MySQL, MongoDB)",
      "UI/UX Design",
      "Mobile App Development"
    ],
    sertifikasi: ["Google Mobile Web Specialist", "AWS Cloud Practitioner"],
    icon: "Globe"
  },
  {
    id: 4,
    nama: "Keamanan Siber",
    deskripsi: "Mempelajari teknik pertahanan dan pelindungan sistem informasi dari ancaman siber.",
    mataPelajaran: [
      "Ethical Hacking",
      "Digital Forensics",
      "Security Operations Center (SOC)",
      "Vulnerability Assessment",
      "Incident Response",
      "Compliance & Governance"
    ],
    sertifikasi: ["CompTIA Security+", "Certified Ethical Hacker (CEH)"],
    icon: "Shield"
  }
];

export const guruData = [
  {
    id: 1,
    nama: "Drs. H. Asep Saepudin, M.Pd",
    nip: "197405212003121004",
    jabatan: "Kepala Program Keahlian",
    mataPelajaran: "Kepemimpinan & Manajemen",
    foto: null
  },
  {
    id: 2,
    nama: "Rina Mulyani, S.Kom",
    nip: "198503152010122005",
    jabatan: "Wakil Kepala Program Keahlian",
    mataPelajaran: "Jaringan Komputer",
    foto: null
  },
  {
    id: 3,
    nama: "Ahmad Fauzi, S.T",
    nip: "198807122015041003",
    jabatan: "Guru Produktif",
    mataPelajaran: "Routing & Switching",
    foto: null
  },
  {
    id: 4,
    nama: "Siti Nurhaliza, S.Kom",
    nip: "199002202018012006",
    jabatan: "Guru Produktif",
    mataPelajaran: "Pengembangan Web",
    foto: null
  },
  {
    id: 5,
    nama: "Budi Santoso, S.T",
    nip: "198611052014061002",
    jabatan: "Guru Produktif",
    mataPelajaran: "Keamanan Jaringan",
    foto: null
  },
  {
    id: 6,
    nama: "Maya Kartika, S.Kom",
    nip: "199206182020122004",
    jabatan: "Guru Produktif",
    mataPelajaran: "Telekomunikasi",
    foto: null
  },
  {
    id: 7,
    nama: "Dedi Kuswanto, S.T",
    nip: "198704232015061001",
    jabatan: "Guru Produktif",
    mataPelajaran: "Cloud Computing",
    foto: null
  },
  {
    id: 8,
    nama: "Ratna Sari, S.Kom",
    nip: "199108102019032005",
    jabatan: "Guru Produktif",
    mataPelajaran: "Database & Backend",
    foto: null
  }
];

export const beritaData = [
  {
    id: 1,
    judul: "Siswa TJKT Juara 1 Lomba Jaringan Tingkat Provinsi",
    tanggal: "2026-07-20",
    kategori: "Prestasi",
    excerpt: "Tim TJKT SMKN 2 Kuningan berhasil meraih juara 1 dalam kompetisi konfigurasi jaringan tingkat Jawa Barat.",
    konten: "Dalam kompetisi yang diadakan di Bandung, tim TJKT yang terdiri dari 3 siswa berhasil menunjukkan kemampuan terbaik mereka dalam mengkonfigurasi jaringan kompleks...",
    gambar: null
  },
  {
    id: 2,
    judul: "Kunjungan Industri ke Telkom Bandung",
    tanggal: "2026-07-15",
    kategori: "Kegiatan",
    excerpt: "Siswa kelas XI TJKT melakukan kunjungan industri ke PT Telkom Indonesia Regional Jawa Barat.",
    konten: "Kunjungan ini bertujuan untuk memberikan pengalaman langsung kepada siswa tentang dunia kerja di industri telekomunikasi...",
    gambar: null
  },
  {
    id: 3,
    judul: "Workshop Cyber Security bersama Expert",
    tanggal: "2026-07-10",
    kategori: "Kegiatan",
    excerpt: "Jurusan TJKT mengadakan workshop keamanan siber dengan narasumber dari Certified Ethical Hacker.",
    konten: "Workshop ini diikuti oleh 50 siswa TJKT dan memberikan pengetahuan praktis tentang ethical hacking dan pertahanan siber...",
    gambar: null
  },
  {
    id: 4,
    judul: "Ujian Kompetensi Keahlian (UKK) TJKT 2026",
    tanggal: "2026-07-05",
    kategori: "Akademik",
    excerpt: "Sebanyak 120 siswa kelas XII TJKT mengikuti Ujian Kompetensi Keahlian tahun 2026.",
    konten: "UKK tahun ini menguji kemampuan siswa dalam konfigurasi jaringan, pengembangan web, dan keamanan siber...",
    gambar: null
  },
  {
    id: 5,
    judul: "Penandatanganan MoU dengan Cisco Networking Academy",
    tanggal: "2026-06-28",
    kategori: "Kerjasama",
    excerpt: "SMKN 2 Kuningan resmi menjadi bagian dari Cisco Networking Academy untuk program TJKT.",
    konten: "MoU ini memungkinkan siswa TJKT untuk mengakses kurikulum Cisco dan mendapatkan sertifikasi CCNA...",
    gambar: null
  },
  {
    id: 6,
    judul: "Class Meeting TJKT - Turnamen E-Sport",
    tanggal: "2026-06-20",
    kategori: "Kegiatan",
    excerpt: "Kegiatan class meeting jurusan TJKT mengadakan turnamen e-sport antar kelas.",
    konten: "Kegiatan ini selain sebagai refreshing juga melatih kerja sama tim dan sportivitas siswa...",
    gambar: null
  }
];

export const galeriData = [
  { id: 1, judul: "Praktikum Jaringan", kategori: "Lab", gambar: null },
  { id: 2, judul: "Kunjungan Industri Telkom", kategori: "Kegiatan", gambar: null },
  { id: 3, judul: "Workshop Cyber Security", kategori: "Workshop", gambar: null },
  { id: 4, judul: "Lomba Jaringan Provinsi", kategori: "Lomba", gambar: null },
  { id: 5, judul: "Class Meeting E-Sport", kategori: "Kegiatan", gambar: null },
  { id: 6, judul: "Praktikum Server", kategori: "Lab", gambar: null },
  { id: 7, judul: "Upacara Hari Sumpah Pemuda", kkategori: "Upacara", gambar: null },
  { id: 8, judul: "Sertifikasi MikroTik", kategori: "Sertifikasi", gambar: null },
  { id: 9, judul: "Field Trip Fiber Optik", kategori: "Kegiatan", gambar: null },
  { id: 10, judul: "Presentasi Proyek Akhir", kategori: "Akademik", gambar: null },
  { id: 11, judul: "Training Cloud Computing", kategori: "Workshop", gambar: null },
  { id: 12, judul: "Pameran Karya Siswa", kkategori: "Pameran", gambar: null }
];

export const statistikData = [
  { label: "Siswa Aktif", value: 360, suffix: "+" },
  { label: "Guru Produktif", value: 12, suffix: "" },
  { label: "Lulusan/Tahun", value: 120, suffix: "+" },
  { label: "Tingkat Kerja", value: 85, suffix: "%" }
];

export const navLinks = [
  { name: "Beranda", path: "/" },
  { name: "Profil", path: "/profil" },
  { name: "Kompetensi", path: "/kompetensi" },
  { name: "Mata Pelajaran", path: "https://materi.tjkt-smkn2kuningan.my.id/" },
  { name: "Guru", path: "/guru" },
  { name: "Berita", path: "/berita" },
  { name: "Galeri", path: "/galeri" },
  { name: "Kontak", path: "/kontak" }
];
