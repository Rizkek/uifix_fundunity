# 🌿 FundUnity - Social Impact & Crowdfunding Platform

Selamat datang di repositori **FundUnity**. Proyek ini adalah platform manajemen konten (CMS) dan Landing Page yang dirancang khusus untuk organisasi sosial, yayasan, atau gerakan komunitas yang mengutamakan transparansi dan engagement publik.

---

### 🎨 Filosofi Desain (UI/UX driven)
Proyek ini dibuat oleh seorang **UI/UX Designer** yang memilih untuk langsung menuangkan ide visual ke dalam baris kode (**Design-to-Code**) tanpa melalui proses prototyping di Figma secara mendalam. 

- **Asetetik Emerald**: Menggunakan palet warna hijau emerald (`emerald-500` ke atas) untuk memberikan kesan tenang, terpercaya, dan profesional.
- **Sistem Tipografi Bersih**: Meminimalkan penggunaan *font-bold* berlebihan untuk menjaga keterbacaan yang modern (clean look).
- **Interaksi Mikro**: Animasi transisi menggunakan Tailwind CSS dan Framer Motion (simulated) untuk pengalaman pengguna yang lebih hidup.

---

### 🚀 Fitur Utama (Core Modules)

#### 1. Panel Admin (Manajemen Dashboard)
Dashboard lengkap untuk administrator organisasi:
- **Statistik & Ringkasan**: Visualisasi tren donasi dan aktivitas terbaru.
- **Manajemen Campaign**: Pembuatan program galang dana, setting status (Aktif/Selesai), dan target dana.
- **Keuangan & Transparansi**: Pencatatan dana masuk dan laporan pengeluaran yang terhubung langsung ke tampilan publik.
- **Relasi (Stakeholders)**: Basis data donatur dan pendaftar **Relawan** yang masuk dari landing page.
- **Manajemen Halaman Utama**: Kendali penuh atas Banner Slider, Pilar Program (Focus Areas), Mitra Kami, dan FAQ secara terpisah.
- **Pengaturan & SEO**: Konfigurasi nama organisasi, logo, perbankan/QRIS, serta metadata SEO website.

#### 2. Landing Page (Portal Publik)
Halaman depan yang persuasif dan transparan:
- **Hero Dynamic**: Banner informatif dengan CTA yang jelas.
- **Pilar Pergerakan**: Visualisasi area fokus organisasi.
- **Hot Campaigns**: Daftar program mendesak yang membutuhkan bantuan.
- **Form Interaktif**: Pendaftaran relawan dan kotak pesan yang langsung terintegrasi ke inbox admin.
- **Download Laporan**: Fitur unduh laporan transparansi dengan UX progress bar.

---

### 🛠️ Tech Stack & Arsitektur
- **Frontend**: Vite + React + TypeScript.
- **Styling**: Tailwind CSS (Custom Utilities).
- **Icons**: Phosphor Icons (`react-icons/pi`) & Lucide React.
- **Routing**: React Router DOM (Private Route protection).

**Struktur Folder:**
- `src/components/Landing`: Komponen penyusun halaman publik.
- `src/components/` (Root components): Modul-modul utama Dashboard Admin.
- `src/layout/`: Komponen struktural seperti Sidebar dan Header Admin.
- `src/contexts/`: State management sederhana (Auth Context).

---

### 💻 Panduan Untuk Developer

#### 🔹 Frontend (FE Developers)
- Perhatikan penggunaan `noHeader` prop pada modul-modul di `src/components`. Prop ini digunakan agar modul bisa ditampilkan secara mandiri maupun disematkan dalam tabbed-manager tanpa double header.
- Gunakan standar `rounded-2xl` atau `rounded-3xl` untuk elemen kontainer utama agar konsisten dengan bahasa desain UI/UX.

#### 🔹 Backend (BE Developers)
Integrasi API yang dibutuhkan mencakup:
- **GET/POST /campaigns**: Manajemen data galang dana.
- **POST /messages**: Menyimpan pesan dari kontak landing page.
- **POST /volunteers**: Mengirim data relawan langsung ke database relawan di admin.
- **GET/PATCH /settings**: Konfigurasi global identitas organisasi dan mode pemeliharaan.
- **GET /finance**: Agregasi data transaksi untuk grafik dashboard.

---

### 🏃 Menjalankan Proyek
1. Clone repositori ini.
2. Jalankan `npm install` untuk mengunduh dependensi.
3. Gunakan `npm run dev` untuk menjalankan di server lokal.
4. (Opsional) Jalankan `npm run build` untuk melihat hasil optimasi produksi.

---

> [!TIP]
> **Catatan UI/UX**: Jika ingin menambahkan elemen baru, pastikan menggunakan warna aksen `emerald` dan grid sistem `max-w-[1600px]` untuk menjaga konsistensi visual dashboard yang luas namun tetap rapi.
