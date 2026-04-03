# 📋 AUDIT & ANALISIS LENGKAP PROJECT: FundUnity

**Nama Project:** FundUnity - Platform Donasi & Transparansi Keuangan  
**Status:** Development/Active  
**Tech Stack:** React 19 + TypeScript + Vite + Tailwind CSS  
**Backend:** Express + PostgreSQL (Vercel)  

---

## 🎯 Ringkasan Eksekutif

**FundUnity** adalah platform manajemen donasi dan fundraising yang dirancang untuk organisasi sosial, NGO, dan himpunan mahasiswa. Platform ini memiliki **dua layer utama**:

1. **PUBLIC LANDING PAGE** - Interface untuk publik/calon donatur/relawan
2. **ADMIN DASHBOARD** - Interface untuk staff organisasi mengelola campaign, keuangan, dan partnership

---

## 📊 ARSITEKTUR APLIKASI

```
FundUnity Platform
│
├── PUBLIC LAYER (Landing Page)
│   ├── Hero Section
│   ├── Program Showcase
│   ├── About Us
│   ├── Focus Areas
│   ├── Transparansi Keuangan
│   ├── Partner Info
│   ├── FAQ
│   ├── Donasi/Payment Gateway
│   ├── Volunteer Registration
│   └── Contact Section
│
└── ADMIN LAYER (Dashboard)
    ├── Authentication (Login/Logout)
    ├── Dashboard Overview
    ├── Campaign Management
    ├── Finance Transparency
    ├── Stakeholder Database
    ├── Website Content Management
    ├── Settings & Configuration
    └── Messaging & Notifications
```

---

## 🔐 ALUR AUTENTIKASI (Authentication Flow)

```
START
  │
  ├─→ User buka website
  │    ├─ Jika di Landing: Akses publik (no auth needed)
  │    └─ Jika ke Admin: Redirect ke /login
  │
  ├─→ LOGIN SCREEN (/login)
  │    ├─ Input: Email & Password
  │    ├─ API Call: POST /v1/content/login
  │    ├─ Response: JWT Token + User Data
  │    ├─ Save: localStorage (token + user)
  │    └─ Set: axios default header Authorization
  │
  ├─→ AUTHENTICATED STATE
  │    ├─ AuthContext provides: user, isAuthenticated, token
  │    ├─ PrivateRoute wrapper protects admin routes
  │    └─ Sidebar + Header visible
  │
  └─→ LOGOUT (/logout)
       ├─ Clear localStorage
       ├─ Clear axios headers
       └─ Redirect to /login
```

**Context: AuthContext.tsx**
- State: `user`, `token`, `loading`, `error`, `isAuthenticated`
- Methods: `login()`, `logout()`, `clearError()`
- Storage: localStorage (token + user)
- API: `POST /v1/content/login`

---

## 🏠 PUBLIC LANDING PAGE (/landing/*)

### Komponen Landing Page:

| Component | Path | Purpose |
|-----------|------|---------|
| **Hero** | `/landing/*` | Banner utama dengan CTA (Donate/About) |
| **LandingAboutUs** | `/landing/about` | Profil organisasi, visi, misi |
| **LandingFocusAreas** | `/landing/focusareas` | Area fokus/program utama organisasi |
| **HotCampaigns** | `/landing/programs` | Showcase campaign/donasi aktif |
| **TransparansiLanding** | `/landing/transparansi` | Ringkasan keuangan publik |
| **Partners** | `/landing/partners` | Daftar mitra korporat |
| **LandingFaqs** | `/landing/faq` | Pertanyaan umum |
| **VolunteerCTA** | `/landing/*` | Call-to-action untuk volunteer |
| **ContactSection** | `/landing/*` | Formulir kontak |
| **DonationPage** | `/landing/donate/:id` | **Flow donasi lengkap** (lihat detail di bawah) |
| **VolunteerRegistration** | `/landing/volunteer` | Form registrasi volunteer |

### 📍 Public Route Structure:
```
/landing/
├── / (Home - semua sections dalam 1 page)
├── /about
├── /focusareas
├── /programs (Hot Campaigns)
├── /transparansi
├── /partners
├── /faq
├── /donate/:id (Donation Flow - Multi-step)
├── /volunteer (Volunteer Registration)
└── /contact
```

---

## 💰 DONATION FLOW (Detail Step-by-Step)

```
STEP 1: PILIH JUMLAH
├─ Display: Preset amounts (10K, 50K, 100K, 500K rupiah)
├─ Option: Custom amount input
├─ Action: Next button → Save to localStorage
└─ Resume: Jika ada pending donation, user bisa resume

     ↓

STEP 2: DONOR INFO
├─ Input Fields:
│  ├─ Nama Donatur
│  ├─ Email
│  └─ (Optional) Nomor Telepon
├─ Action: Next → Tambah ke localStorage
└─ Can: Edit previous step

     ↓

STEP 3: PILIH METODE PEMBAYARAN
├─ Options:
│  ├─ Transfer Bank (BCA, Mandiri, etc.)
│  ├─ QRIS/e-Wallet
│  ├─ Credit Card
│  └─ Manual Transfer
├─ Display: Bank details & payment instructions
├─ Generate: Transaction ID
└─ Action: Proceed to payment

     ↓

STEP 4: VERIFIKASI PEMBAYARAN
├─ Display: Payment confirmation UI
├─ Timeframe: 15 menit countdown untuk transfer
├─ Polling: System check status pembayaran
├─ Messages:
│  ├─ Waiting (kuning/pending)
│  ├─ Success (hijau)
│  └─ Failed (merah)
└─ Next: Thank you page / Confirmation email

     ↓

FINAL: TERIMA KASIH
├─ Display: Donation summary
├─ Actions:
│  ├─ Print receipt
│  ├─ Share di social media
│  └─ Return ke homepage
└─ Email: Konfirmasi dikirim ke donor
```

**Key Features:**
- ✅ Resume pending donation (localStorage)
- ✅ Multiple payment methods
- ✅ Real-time payment verification
- ✅ Countdown timer
- ✅ Manual transfer support

---

## 🔑 ADMIN DASHBOARD ROUTES

```
PROTECTED ROUTES (require authentication):
├── /home
│   └─ Dashboard Overview (statistics, charts)
│
├── /campaign
│   └─ Campaign Management (CRUD campaigns)
│   ├─ View all active/completed campaigns
│   ├─ Add new campaign
│   ├─ Edit campaign details
│   └─ Track collected vs target
│
├── /keuangantransparansi
│   └─ Finance & Transparency
│   ├─ Tab 1: Pemasukan (Income tracking)
│   │   ├─ List semua donor transactions
│   │   ├─ Filter by status (success/pending/failed)
│   │   ├─ Search by donor name/category
│   │   └─ CRUD operations
│   └─ Tab 2: Penyaluran (Distribution report)
│       ├─ Program-by-program breakdown
│       ├─ Income vs Spent vs Remaining
│       ├─ Recipient count
│       └─ Period tracking
│
├── /databasestakeholder
│   └─ Stakeholder Management
│   ├─ Tab 1: Donatur (Donor database)
│   │   ├─ View all donors
│   │   ├─ Total donation tracking
│   │   ├─ Last donation date
│   │   └─ Contact info
│   ├─ Tab 2: Penerima (Beneficiaries)
│   │   ├─ Recipients list
│   │   ├─ Program associated
│   │   ├─ Value & Location
│   │   └─ Management
│   └─ Tab 3: Relawan (Volunteers)
│       ├─ Volunteer database
│       ├─ Category/skill tracking
│       ├─ Contact info
│       └─ Registration date
│
├── /aboutus
│   └─ Organization Profile Management
│   ├─ Tab 1: Umum (General info)
│   │   ├─ Vision & Mission
│   │   ├─ Organization description
│   │   └─ Images/media
│   └─ Tab 2: Struktur (Structure/hierarchy)
│       ├─ Leadership positions
│       ├─ Staff database
│       ├─ Photos & credentials
│       └─ Roles
│
├── /focusareas
│   └─ Focus Areas/Program Categories
│   ├─ Add/Edit focus areas
│   ├─ Icon selection
│   ├─ Description management
│   └─ Display order
│
├── /imageslider
│   └─ Banner Slider Management
│   ├─ Upload banner images
│   ├─ Set order
│   ├─ Edit/Delete UI
│   └─ Preview
│
├── /partners
│   └─ Partners Management
│   ├─ Partner list
│   ├─ Logo management
│   ├─ Partner info (name, link)
│   └─ CRUD operations
│
├── /faqs
│   └─ FAQ Management
│   ├─ Question & Answer pairs
│   ├─ Add/Edit/Delete Q&A
│   ├─ Category tagging
│   └─ Order management
│
├── /messages
│   └─ Inbox/Messages
│   ├─ View incoming messages
│   ├─ From: Website contact form + email
│   ├─ Status: Read/Unread
│   ├─ Actions: Reply, Mark read, Delete
│   └─ Date filtering
│
├── /notifications
│   └─ Activity Log & Notifications
│   ├─ System activities
│   ├─ Program updates
│   ├─ Partner changes
│   ├─ Security alerts
│   ├─ Filter by type
│   └─ Timeline view
│
└── /settings
    └─ Account & System Settings
    ├─ Tab 1: Profil
    │   ├─ Admin name/display
    │   ├─ Email management
    │   └─ Profile photo upload
    ├─ Tab 2: Identitas Website
    │   ├─ Organization name
    │   ├─ Short name
    │   ├─ Tagline
    │   ├─ Contact info (email, phone)
    │   ├─ Social media links
    │   ├─ Address
    │   └─ Logo upload
    ├─ Tab 3: Pembayaran
    │   ├─ Bank account details
    │   ├─ Account holder name
    │   ├─ QRIS management
    │   └─ Payment method configuration
    ├─ Tab 4: SEO & Pemeliharaan
    │   ├─ Meta description
    │   ├─ Maintenance mode toggle
    │   └─ Copyright info
    └─ Tab 5: Keamanan
        ├─ Password change
        ├─ Two-factor auth (optional)
        └─ Session management
```

---

## 📱 COMPONENT BREAKDOWN

### Public Components (Landing):
```
Landing/
├── Hero.jsx                    → Banner dengan CTA
├── Header.jsx                  → Navigation bar (public)
├── Footer.jsx                  → Footer
├── LandingAboutUs.jsx         → About section
├── LandingFocusAreas.jsx      → Focus areas showcase
├── HotCampaigns.jsx            → Active campaigns
├── TransparansiLanding.jsx    → Finance summary
├── Partners.jsx                → Partner logos
├── LandingFaqs.jsx            → FAQ section
├── DonationPage.jsx            → Multi-step donation flow
├── VolunteerRegistration.jsx  → Volunteer form
├── VolunteerCTA.jsx            → CTA for volunteering
├── ContactSection.jsx          → Contact form
├── ImpactStats.jsx             → Statistics display
├── Gallery.jsx                 → Image gallery
├── Programs.jsx                → Detailed programs list
├── ErrorBoundary.jsx           → Error handling
└── ImageSlider.jsx             → Image carousel
```

### Admin Components:
```
AdminComponents/
├── Home.tsx                     → Dashboard with stats & charts
├── Campaign.tsx                 → Campaign manager
├── KeuanganTransparansi.tsx    → Finance tracker
├── DatabaseStakeholder.tsx     → Stakeholder DB
├── AboutUs.tsx                  → Organization profile editor
├── FocusAreas.tsx               → Focus areas manager
├── ImageSlider.tsx              → Banner slider editor
├── Partners.tsx                 → Partners manager
├── Faqs.tsx                     → FAQ manager
├── Messages.tsx                 → Inbox
├── Notifications.tsx            → Activity log
├── Settings.tsx                 → Account & system settings
├── Notifications.tsx            → System notifications
└── Login.tsx                    → Auth screen
```

### Layout Components:
```
Layout/
├── Header.tsx                   → Admin header
├── Sidebar.tsx                  → Navigation sidebar (collapsible)
├── Layout.tsx                   → Main layout wrapper
└── LandingLayout.tsx            → Landing page wrapper
```

### Core:
```
App.tsx                          → Main router & layout controller
App.css                          → Global styles
index.css                        → Index styles
contexts/
  └── AuthContext.tsx            → Authentication context
services/
  └── authService.ts             → Auth API calls
utils/
  ├── api.ts                     → Axios setup
  ├── authToken.ts               → Token management
  └── axiousConfig.ts            → Axios interceptors
```

---

## 🎨 SIDEBAR MENU ITEMS (Admin)

| Icon | Label | Path | Purpose |
|------|-------|------|---------|
| 🏠 | Dashboard | `/home` | Overview & stats |
| 📢 | Campaign | `/campaign` | Fundraising campaigns |
| 📊 | Keuangan | `/keuangantransparansi` | Finance tracking |
| 👥 | Relasi | `/databasestakeholder` | Stakeholder database |
| ✉️ | Kotak Masuk | `/messages` | Messages/inbox |
| 👤 | Profil Lembaga | `/aboutus` | Organization profile |
| 🎯 | Fokus Area | `/focusareas` | Program categories |
| 🖼️ | Banner Slider | `/imageslider` | Homepage banners |
| 🤝 | Mitra Kami | `/partners` | Partner management |
| 💬 | Tanya Jawab | `/faqs` | FAQ management |
| ⚙️ | Akun & Sistem | `/settings` | Settings & config |

---

## 📊 DATA FLOW & STATE MANAGEMENT

### Global State:
```
AuthContext
├── user: User object
├── token: JWT token
├── isAuthenticated: boolean
├── loading: boolean
├── error: string | null
└── Methods: login(), logout(), clearError()
```

### Component-Level States:
- **Home**: Filter selections, chart data
- **Campaign**: Modal open/close, search, filter tabs
- **KeuanganTransparansi**: Master tab (pemasukan/penyaluran), filter tabs, search
- **Messages**: Read/Unread status, modal state, search
- **Settings**: Multiple form states (profil, identitas, pembayaran, seo, keamanan)

### Local Storage Items:
```
localStorage
├── token                  → JWT auth token
├── user                   → User object (JSON)
├── authToken             → Alternative token storage
├── userData              → Alternative user storage
└── pendingDonation       → Saved donation draft (on landing)
```

---

## 🔗 API ENDPOINTS USED

```
Backend: https://backendd-fundunity.vercel.app

Authentication:
POST   /v1/content/login          → Login user

(Other endpoints implied but not directly visible in code)
```

---

## 🎯 KEY FEATURES MATRIX

| Feature | Location | Type | Status |
|---------|----------|------|--------|
| **Multi-step Donation** | Landing/DonationPage | Public | ✅ Active |
| **Campaign CRUD** | /campaign | Admin | ✅ Active |
| **Finance Tracking** | /keuangantransparansi | Admin | ✅ Active |
| **Stakeholder DB** | /databasestakeholder | Admin | ✅ Active |
| **Organization Profile** | /aboutus | Admin | ✅ Active |
| **Content Management** | /imageslider, /partners, /faqs | Admin | ✅ Active |
| **Messaging System** | /messages | Admin | ✅ Active |
| **Activity Notifications** | /notifications | Admin | ✅ Active |
| **Account Settings** | /settings | Admin | ✅ Active |
| **Payment Gateway** | DonationPage | Public | ✅ Integrated |
| **Volunteer Registration** | Landing/VolunteerRegistration | Public | ✅ Active |
| **Responsive Design** | All | Both | ✅ Tailwind CSS |
| **Dark Mode** | (Not implemented) | Both | ❌ Not found |
| **2FA** | Settings (mentioned) | Admin | ⚠️ Optional |

---

## 🛠️ TECH STACK DETAILS

### Frontend:
```
- React 19.0.0
- TypeScript 5.7
- Vite 6.2.0
- React Router DOM 7.6.0
- React Icons (react-icons 5.6.0, fontawesome)
- Tailwind CSS 4.0.9
- Recharts 3.8.0 (Charts & graphs)
- Axios 1.9.0 (HTTP client)
- Lucide React (Icons)
```

### Backend:
```
- Express 4.21.2
- PostgreSQL (pg 8.13.3)
- JWT (jsonwebtoken 9.0.2)
- Bcrypt (bcryptjs 3.0.2)
```

### Tools/DevTools:
```
- ESLint 9.21.0
- TypeScript ESLint
- Vercel (deployment)
```

---

## 🔄 APPLICATION FLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                     FUNDUNITY PLATFORM                          │
└─────────────────────────────────────────────────────────────────┘

                            START
                              ↓
                    ┌──────────────────┐
                    │ Landing Page     │
                    │ (Public)         │
                    └──────────────────┘
                              ↓
                    ┌──────────────────────────────┐
                    │ Choose Action:               │
                    ├─ View Programs              │
                    ├─ Donate                     │
                    ├─ Volunteer                  │
                    ├─ Contact/Message           │
                    └─ Login (If Staff)          │
                              ↓
        ┌─────────────────────┴─────────────────────┐
        ↓                                           ↓
   ┌───────────┐                           ┌──────────────┐
   │ DONATION  │                           │ LOGIN        │
   │ FLOW      │                           │ (Admin)      │
   └───────────┘                           └──────────────┘
        ↓                                        ↓
   [Step 1]                          ┌──────────────────────┐
   Amount                             │ ADMIN DASHBOARD      │
        ↓                             └──────────────────────┘
   [Step 2]                                   ↓
   Donor Info                     ┌──────────────────────────┐
        ↓                         │ Dashboard Overview       │
   [Step 3]                       │ (Stats, Charts)          │
   Payment Method                 └──────────────────────────┘
        ↓                                   ↓
   [Step 4]                       ┌──────────────────────────┐
   Verify Payment                 │ Content Management       │
        ↓                         │ - Campaign              │
   [Final]                        │ - Finance               │
   Thank You                      │ - Stakeholders          │
        ↓                         │ - Profile               │
   Email Confirmation             │ - Settings              │
        ↓                         └──────────────────────────┘
   ┌──────────────┐                        ↓
   │ Payment      │                Term: Logout
   │ Processed    │                        ↓
   │ ✓            │               ┌──────────────┐
   └──────────────┘               │ Return Login │
                                  └──────────────┘
```

---

## ⚖️ SECURITY & AUTH CONSIDERATIONS

✅ **Implemented:**
- JWT authentication
- Password hashing (bcryptjs)
- Token storage in localStorage
- Axios authorization headers
- 401 error handling (redirect to login)
- PrivateRoute component wrapper
- Protected routes structure

⚠️ **Recommendations:**
- Implement 2FA (Settings has option for it)
- HTTPS enforcement
- CORS configuration
- Rate limiting on API calls
- Refresh token rotation
- Secure password requirements validation

---

## 📈 MOCK DATA SOURCES

```
Campaign.tsx        → MOCK_CAMPAIGNS (3 campaigns)
AboutUs.tsx         → mockAboutUsData + mockStrukturData
FocusAreas.tsx      → MOCK_FOCUS_AREAS (4 areas)
Messages.tsx        → MOCK_MESSAGES (4 messages)
KeuanganTransparansi.tsx → MOCK_INCOMES + MOCK_LAPORAN
DatabaseStakeholder.tsx → MOCK_DONATUR + MOCK_PENERIMA + MOCK_RELAWAN
Home.tsx            → chartData (6 months)
```

---

## 🎯 DEPLOYMENT INFO

**Vercel Configuration:**
```json
{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/node" }
  ]
}
```

**Backend Base URL:** `https://backendd-fundunity.vercel.app`

**Proxy Configuration (dev):**
```
/v1 → https://backendd-fundunity.vercel.app
```

---

## 📋 SUMMARY TABLE: ALL ROUTES

| Route | Type | Auth Required | Purpose |
|-------|------|---------------|---------|
| `/landing/*` | Public | No | All landing pages |
| `/login` | Public | No | Authentication |
| `/logout` | Public | Yes | Logout |
| `/home` | Protected | Yes | Dashboard |
| `/campaign` | Protected | Yes | Campaign mgmt |
| `/keuangantransparansi` | Protected | Yes | Finance |
| `/databasestakeholder` | Protected | Yes | Stakeholders |
| `/aboutus` | Protected | Yes | Organization |
| `/focusareas` | Protected | Yes | Focus areas |
| `/imageslider` | Protected | Yes | Banners |
| `/partners` | Protected | Yes | Partners |
| `/faqs` | Protected | Yes | FAQ |
| `/messages` | Protected | Yes | Inbox |
| `/notifications` | Protected | Yes | Activity log |
| `/settings` | Protected | Yes | Account & system |
| `/` | Protected | Yes | Redirects to `/home` |

---

## 🏆 KESIMPULAN

**FundUnity** adalah aplikasi **full-stack yang well-structured** dengan clear separation antara public interface dan admin dashboard. Key strengths:

✅ **Strengths:**
- Clean routing structure
- Proper authentication flow
- Comprehensive admin features
- Good UI/UX with Tailwind CSS
- Mock data untuk development
- Multi-step donation flow
- Financial transparency features
- Stakeholder management

⚠️ **Areas for Improvement:**
- Actual API integration (currently mostly mock data)
- 2FA implementation
- Email service integration (EmailJS is imported)
- Real payment gateway integration
- Error handling enhancements
- Loading states optimization
- Analytics/reporting features
- Audit logging for admin actions

---

**Last Updated:** April 3, 2026  
**Analyzed By:** GitHub Copilot  
**Version:** Project Analysis v1.0

