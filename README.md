# 📘 FundUnity - Platform Transparansi & Manajemen Donasi Digital

> **FundUnity** adalah platform B2B (Organization-to-Donor) yang memfasilitasi organisasi sosial, NGO, dan komunitas untuk mengelola kampanye donasi, relawan, dan transparansi keuangan secara terintegrasi dalam satu ekosistem digital.

**Status Proyek:** Phase 1 - MVP Frontend Complete | Phase 2 - Backend Integration (Express.js) | Phase 3 - Laravel Migration (Planned)  
**Last Updated:** April 2026  
**Environment:** Development  

---

## 📊 Executive Summary

### Konteks Bisnis
Organisasi sosial di Indonesia menghadapi permasalahan utama:
- **Kepercayaan Publik**: Donatur ragu karena kurangnya transparansi penggunaan dana
- **Fragmentasi Sistem**: Data tersebar di spreadsheet, email, dan aplikasi terpisah
- **Manual Heavy Processes**: Verification donasi, relawan, dan laporan masih manual

**FundUnity** mengatasi ini melalui:
- ✅ Dashboard transparansi real-time untuk donor
- ✅ Admin panel terintegrasi untuk staff organisasi  
- ✅ Multi-channel donation (bank transfer, e-wallet, QRIS)
- ✅ Automated reporting & audit trail

### Product Strategy
```
PHASE 1 (Current): Solid Frontend + Mock Backend
├── Target Users: Himpunan Mahasiswa, UMKM Sosial, NGO Lokal
├── MVP Features: Campaign, Finance Tracking, Stakeholder DB
└── Goals: User validation, UI/UX refinement

PHASE 2 (Q2 2026): Express.js Backend + Real Payment Gateway
├── Payment Integration: Midtrans, Doku, or iPay
├── Email/SMS Notifications: EmailJS + WhatsApp API
└── API Documentation & Rate Limiting

PHASE 3 (Q3 2026): Laravel Migration + Enterprise Features
├── Advanced Reporting: PDF generation, scheduled exports
├── Multi-organization Support: SaaS model
└── Advanced Security: 2FA, Audit Logs, Compliance
```

---

## 🏛️ Technical Architecture

### System Design Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     FUNDUNITY SYSTEM                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────┐                         ┌──────────────┐   │
│   │ FRONTEND     │                         │ BACKEND      │   │
│   │ (React 19)   │◄────HTTP/REST────►│ (Express.js)  │   │
│   │ Vite + TSX   │    via Axios       │  + PostgreSQL │   │
│   └──────────────┘                         └──────────────┘   │
│           │                                       │            │
│     ┌─────▼─────────────┐              ┌──────────▼────────┐  │
│     │ AuthContext       │              │ JWT Middleware    │  │
│     │ State Management  │              │ Route Protection  │  │
│     └───────────────────┘              └───────────────────┘  │
│                                                                 │
│   EXTERNAL INTEGRATIONS:                                       │
│   ├── Payment Gateway: Midtrans/Doku                          │
│   ├── Email: EmailJS (Gmail)                                  │
│   ├── Storage: Image uploads (Local/S3)                       │
│   └── Analytics: (Future) Mixpanel/GA                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Application Layers (CURRENT STATE)

**Frontend (React/Vite)** - 100% Implemented
```
src/
├── components/
│   ├── Landing/          [18 components] - Public facing pages
│   ├── Admin/             [11 components] - Dashboard feature modules
│   ├── Auth/              [Login.tsx, Logout.tsx]
│   └── Layout/            [Header, Sidebar, Layout wrappers]
├── contexts/
│   └── AuthContext.tsx    [Global auth state + JWT management]
├── services/
│   └── authService.ts     [API layer for authentication]
├── utils/
│   ├── api.ts             [Axios instance + interceptors]
│   ├── authToken.ts       [Token persistence helpers]
│   └── axiousConfig.ts    [Global axios configuration]
└── assets/                [Images, logos, design assets]

Key State Management: **AuthContext** (Redux alternative)
Key Styling: **Tailwind CSS** + **className-based** approach
Key HTTP Client: **Axios** with interceptors for auth
```

**Backend (Express.js - Current) → Laravel (Planned)**
```
Current Structure:
├── /v1/content/login      [POST] - Authentication endpoint
├── /v1/campaigns          [CRUD] - Campaign management
├── /v1/transactions       [CRUD] - Donation tracking
├── /v1/volunteers         [CRUD] - Volunteer database
├── /v1/settings           [GET/PUT] - Organization settings
└── /v1/reports            [GET] - Financial reports

Database: PostgreSQL on Vercel
Deployment: https://backendd-fundunity.vercel.app
```

---

## 🗄️ Database Schema & Entities

### Core Data Models (To Be Implemented)

```sql
-- Users/Staff Management
TABLE users
├── id (PK)
├── email (UNIQUE)
├── password_hash (bcrypt)
├── full_name
├── role (admin, finance_staff, campaign_manager)
├── organization_id (FK)
├── is_active
├── created_at, updated_at
└── last_login

-- Campaign/Program Management
TABLE campaigns
├── id (PK)
├── org_id (FK to organizations)
├── title
├── slug (URL-friendly identifier)
├── description (Rich text / markdown)
├── category (Education, Healthcare, Disaster, etc.)
├── target_amount (Rp)
├── current_amount (calculated from transactions)
├── status (draft, active, completed, suspended)
├── start_date, end_date
├── featured_image_url
├── created_by (FK to users)
├── created_at, updated_at
├── view_count (analytics)
└── completion_percentage (calculated)

-- Donation/Transaction Tracking
TABLE transactions
├── id (PK)
├── campaign_id (FK)
├── donor_id (nullable - can be anonymous)
├── amount (Rp)
├── payment_method (bank_transfer, e_wallet, qris, cash)
├── payment_proof_url (image)
├── status (pending, verified, failed, refunded)
├── transaction_date
├── verification_date
├── verified_by (FK to users)
├── notes
├── created_at, updated_at
└── CONSTRAINT: status transitions validated in application

-- Donor/Stakeholder Database
TABLE donors
├── id (PK)
├── name
├── email (UNIQUE)
├── phone
├── total_donated (Rp) - denormalized for performance
├── transaction_count
├── last_donation_date
├── is_anonymous
├── created_at

TABLE volunteers
├── id (PK)
├── name
├── email
├── phone
├── skills (JSON: [skill_1, skill_2, ...])
├── motivation_text
├── status (pending, approved, rejected, active, inactive)
├── approved_by (FK to users)
├── approved_date
├── created_at, updated_at

-- Organization Settings
TABLE organizations
├── id (PK)
├── name
├── slug (unique)
├── logo_url
├── website_url
├── description
├── contact_email
├── contact_phone
├── address
├── instagram_handle
├── bank_account_name
├── bank_account_number
├── bank_code (for automatic transfer)
├── qr_code_url
├── seo_meta_description
├── is_active
├── created_at, updated_at

-- Content Management (Landing Page)
TABLE landing_content
├── id (PK)
├── org_id (FK)
├── content_type (banner, testimonial, faq, focus_area, partner)
├── title
├── description
├── image_url
├── position (sort order)
├── is_active
├── created_at, updated_at

-- Financial Reports (Aggregated)
TABLE financial_reports
├── id (PK)
├── org_id (FK)
├── campaign_id (FK)
├── period_start, period_end
├── total_income
├── total_distributed
├── remaining_balance
├── beneficiary_count
├── report_url (PDF)
├── generated_by (FK to users)
├── generated_at
└── published_at (nullable - when made public)

-- Audit Logs (Security & Compliance)
TABLE audit_logs
├── id (PK)
├── user_id (FK)
├── action (create, update, delete, download_report)
├── entity_type (campaign, transaction, user, settings)
├── entity_id
├── changes (JSON diff)
├── ip_address
├── user_agent
├── created_at
└── CONSTRAINT: ordered index on (user_id, created_at)
```

### Indexes & Performance Considerations

```sql
-- Critical Indexes for Speed
CREATE INDEX idx_campaigns_org_status ON campaigns(org_id, status);
CREATE INDEX idx_transactions_campaign_status ON transactions(campaign_id, status);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_donors_total_donated ON donors(total_donated DESC);
CREATE INDEX idx_audit_logs_user_created ON audit_logs(user_id, created_at);

-- Rationale:
-- - campaigns: Fast filtering for dashboard
-- - transactions: Campaign detail page needs quick access
-- - donors: Leaderboard view on landing page
-- - audit_logs: Security audits query historical data
```

---

## 🔐 Authentication & Security Architecture

### JWT Token Flow

```
USER LOGIN
    ↓
frontend: POST /v1/content/login { email, password }
    ↓
backend: Verify credentials (bcrypt compare)
    ↓
backend: Generate JWT { iss: 'fundunity', sub: user_id, exp: +24h }
    ↓
frontend: Store token in localStorage (alternative: httpOnly cookie)
    ↓
frontend: Set axios default header: Authorization: Bearer <token>
    ↓
ALL SUBSEQUENT REQUESTS: Bearer token auto-attached via interceptor
    ↓
RESPONSE 401 → Logout & redirect to /login (interceptor behavior)
```

### Token Strategy Trade-offs

| Strategy | Token Store | Pros | Cons |
|----------|-------------|------|------|
| localStorage | Client-side | Simple, works on SPAs | Vulnerable to XSS |
| httpOnly Cookie | Server | Secure from XSS | Requires backend coordination |
| Hybrid (both) | Both | Best security + simplicity | Complexity |

**Current Decision**: localStorage (MVP phase, HTTPS enforced on production)  
**Future Upgrade**: Migrate to httpOnly + CSRF token + refresh token rotation

### Interceptor Chain (Axios)

```typescript
// Request Interceptor
if (token exists in localStorage) {
  add Authorization: Bearer <token> to headers
}

// Response Interceptor
if (status === 401) {
  clear localStorage token
  clear user data
  redirect to /login
}

if (status === 403) {
  show "Access Denied" error
  (do not logout - might be insufficient permissions)
}
```

---

## 🚦 User Flow Diagrams

### Public User (Donor/Volunteer) Flow
```
LANDING PAGE (/) 
├─ User can: View campaigns, press "Donate" button
├─ User can: View organization profile
└─ User can: Fill volunteer form or contact form

DONATE FLOW (Multi-step)
Step 1: Select Amount
├─ Preset buttons (10K, 50K, 100K, 500K)
├─ Custom amount input
└─ Save selection → Step 2

Step 2: Donor Information  
├─ Name, Email (required)
├─ Phone (optional)
├─ Save to localStorage → Step 3

Step 3: Payment Method
├─ Options: Bank transfer, QRIS, e-wallet
├─ Display: Bank account details
├─ Generate: Transaction ID
└─ Save → Step 4

Step 4: Verification  
├─ Show: Countdown timer (15 minutes)
├─ Poll: Check payment status (backend)
├─ On success: Show confirmation
├─ On timeout: Allow resume later
└─ Send: Confirmation email

THANK YOU PAGE
└─ Display donation summary, print receipt, share social
```

### Admin User (Staff) Flow
```
LOGIN (/login)
├─ Enter email + password
├─ Backend: Validate credentials
└─ Success: Set token → Redirect to /home

DASHBOARD (/home)
├─ View: Key metrics (total collected, active campaigns, volunteers)
├─ View: Chart with 6-month trend
└─ Navigate: To other admin modules

CAMPAIGN MANAGEMENT (/campaign)
├─ List: All campaigns (active, draft, completed)
├─ Actions: Create, edit, delete, view details
├─ Info: Target vs collected, deadline, status
└─ Logic: Calculate completion % = collected / target * 100

FINANCE TRANSPARENCY (/keuangantransparansi)
├─ Tab 1: Pemasukan (Income)
│   ├─ Filter: By status (success, pending, failed)
│   ├─ Search: By donor name or category
│   └─ Actions: Mark verified, delete, export
├─ Tab 2: Penyaluran (Distribution)
│   ├─ Show: Program breakdown (income, spent, remaining)
│   ├─ Show: Beneficiary count per program
│   └─ Generate: Reports for publication

STAKEHOLDER DATABASE (/databasestakeholder)
├─ Tab 1: Donors - View all, sort by total donation
├─ Tab 2: Beneficiaries - Map program recipients
├─ Tab 3: Volunteers - Track registrations, skills

CONTENT MANAGEMENT
├─ /aboutus: Edit organization profile + staff structure
├─ /focusareas: Manage program categories
├─ /imageslider: Upload/reorder homepage banners
├─ /partners: Manage partner logos & links
├─ /faqs: Create/edit FAQ pairs

MESSAGES (/messages)
├─ View: Incoming contact form submissions
├─ Filter: Read/Unread status
├─ Actions: Reply (future), mark read, delete

SETTINGS (/settings)
├─ Profile: Change name, email, photo
├─ Identity: Organization info (name, tagline, contacts)
├─ Payment: Bank details, QRIS setup
├─ SEO: Meta descriptions, maintenance mode
└─ Security: Password change

NOTIFICATIONS (/notifications)
└─ View: Activity log (system events, program updates, security alerts)
```

---

## 💾 API Endpoints Specification

### Authentication Module

```
POST /v1/content/login
Request:
{
  "email": "admin@fundunity.org",
  "password": "SecurePassword123"
}

Response (200 OK):
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "email": "admin@fundunity.org",
      "name": "Admin User",
      "role": "admin",
      "organization_id": 1
    }
  }
}

Error Response (401):
{
  "success": false,
  "message": "Invalid email or password",
  "error_code": "AUTH_INVALID_CREDENTIALS"
}
```

### Campaigns Module (To Implement)

```
GET /v1/campaigns?org_id=1&status=active
Response: List campaigns with pagination

POST /v1/campaigns
Request: {title, description, target_amount, ...}
Response: Created campaign object

PUT /v1/campaigns/:id
Request: Updated campaign fields
Response: Updated campaign

DELETE /v1/campaigns/:id
Response: {success: true, message: "Deleted"}
```

### Transactions Module (To Implement)

```
GET /v1/transactions?campaign_id=1&status=verified
Response: Transactions with donor info

POST /v1/transactions
Request: {campaign_id, donor_name, amount, payment_method, ...}
Response: Created transaction with status "pending"

PUT /v1/transactions/:id/verify
Request: {verified_by_user_id, notes}
Response: Updated transaction with status "verified"
```

---

## 📂 Project File Structure

```
uifix/ (Frontend - React/Vite)
├── src/
│   ├── components/
│   │   ├── Landing/
│   │   │   ├── Hero.jsx              [Banner + CTA]
│   │   │   ├── Header.jsx            [Navigation]
│   │   │   ├── Footer.jsx
│   │   │   ├── LandingAboutUs.jsx
│   │   │   ├── LandingFocusAreas.jsx
│   │   │   ├── HotCampaigns.jsx      [Campaign showcase]
│   │   │   ├── TransparansiLanding.jsx
│   │   │   ├── Partners.jsx
│   │   │   ├── LandingFaqs.jsx
│   │   │   ├── DonationPage.jsx     [Multi-step flow]
│   │   │   ├── VolunteerRegistration.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── [8 more utility components]
│   │   ├── Admin Dashboard/
│   │   │   ├── Home.tsx             [Dashboard overview]
│   │   │   ├── Campaign.tsx         [Campaign CRUD]
│   │   │   ├── KeuanganTransparansi.tsx  [Finance]
│   │   │   ├── DatabaseStakeholder.tsx   [Stakeholder DB]
│   │   │   ├── AboutUs.tsx          [Organization profile]
│   │   │   ├── FocusAreas.tsx      [Program categories]
│   │   │   ├── ImageSlider.tsx     [Banner manager]
│   │   │   ├── Partners.tsx        [Partner manager]
│   │   │   ├── Faqs.tsx            [FAQ manager]
│   │   │   ├── Messages.tsx        [Inbox]
│   │   │   ├── Notifications.tsx   [Activity log]
│   │   │   └── Settings.tsx        [Config]
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   └── Logout.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx          [Collapsible nav]
│   │       ├── Layout.tsx
│   │       └── LandingLayout.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx          [Global auth state + JWT]
│   ├── services/
│   │   └── authService.ts           [Auth API layer]
│   ├── utils/
│   │   ├── api.ts                   [Axios instance]
│   │   ├── authToken.ts             [Token helpers]
│   │   └── axiousConfig.ts          [Global config]
│   ├── assets/
│   │   ├── images/
│   │   ├── LandingAssets/
│   │   └── [Logo files]
│   ├── App.tsx                      [Main router]
│   ├── App.css
│   ├── index.css
│   ├── main.tsx                     [Entry point]
│   └── vite-env.d.ts
├── public/                          [Static assets]
├── package.json
├── vite.config.ts                   [Vite configuration]
├── tsconfig.json
├── tsconfig.app.json
├── tailwind.config.js
├── eslint.config.js
├── vercel.json                      [Deployment config]
└── README.md

Key Config Files:
├── vite.config.ts
│   └── Proxy setup: /v1 → https://backendd-fundunity.vercel.app
├── tailwind.config.js
│   └── Custom design tokens (emerald, orange, typography)
└── package.json
    └── Dependencies: React 19, Vite, Tailwind, Axios, Recharts
```

---

## 🔧 Development Setup & Environment

### Prerequisites
```bash
Node.js: v18+ (LTS recommended)
npm: v9+
Git: v2.34+
```

### Installation & First Run

```bash
# Clone repository
git clone https://github.com/your-org/fundunity-frontend.git
cd fundunity-frontend  # Navigate to uifix folder

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
VITE_API_URL=https://backendd-fundunity.vercel.app
VITE_APP_NAME=FundUnity
EOF

# Development server
npm run dev
# → Opens http://localhost:5173

# Build for production
npm run build
# → Output: dist/ folder

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment Variables

```bash
# .env.local (Development)
VITE_API_URL=https://backendd-fundunity.vercel.app
VITE_APP_NAME=FundUnity

# .env.production (Auto-detected by Vite)
VITE_API_URL=https://api-prod.fundunity.org
```

---

## 🚀 Deployment & DevOps

### Current Deployment Stack

```
Frontend (React/Vite)
├── Vercel (Current)
│   └── Auto-deploys on git push
│   └── Environment: vercel.json
│   └── Domain: uifix.vercel.app (staging) or custom domain
│
Backend (Express.js)
├── Vercel (Current)
│   └── Deployment: backendd-fundunity.vercel.app
│   └── Database: PostgreSQL (Vercel PostgreSQL)
│   └── Environment variables: Set in Vercel dashboard
```

### Build Process

```bash
# In CI/CD Pipeline (GitHub Actions - future setup)
npm install
npm run lint    # ESLint check
npm run build   # TypeScript compilation
# → Artifacts: dist/

# Vercel auto-detects and deploys dist/
```

### Monitoring & Logs

```
Vercel Dashboard → Deployments tab
├── View: Build logs, errors
├── View: Function/API execution logs
├── Rollback: Previous deployment if needed

Frontend Sentry/LogRocket (Optional future integration)
├── Track: JavaScript errors in production
├── Track: User sessions for debugging

Backend Logs (Express.js)
├── Access: Vercel dashboard → Functions logs
├── Format: JSON structured logs recommended
```

---

## 🐛 Known Issues & Technical Debt

### Current Phase Limitations

| Issue | Severity | Status | Timeline |
|-------|----------|--------|----------|
| All data is MOCK - No real backend POST/PUT/DELETE | CRITICAL | ⏳ In Progress | Phase 2 |
| No real payment gateway integration | CRITICAL | ⏳ Planned | Phase 2 |
| No email notifications (EmailJS imported but unused) | HIGH | ⏳ Planned | Phase 2 |
| No 2FA authentication | MEDIUM | ⏳ Planned | Phase 3 |
| No audit logging | MEDIUM | ⏳ Planned | Phase 2 |
| Limited mobile optimization (some components) | MEDIUM | 🔍 Review | Phase 2 |
| No dark mode support | LOW | 📋 Backlog | Phase 3 |
| Session timeout not implemented | MEDIUM | ⏳ Planned | Phase 2 |
| No file upload handling (images stored as URLs) | MEDIUM | ⏳ Planned | Phase 2 |

### Known Bugs

```
1. ✅ RESOLVED: AuthContext token sync on refresh
   - Issue: Token lost on page refresh if using localStorage
   - Solution: useEffect in AuthProvider loads from localStorage on mount

2. ⚠️ TO-FIX: Sidebar collapse animation glitch
   - Component: Sidebar.tsx
   - Issue: Transition jank when toggling sidebar
   - Workaround: Disable animation on lower-end devices

3. ⚠️ TO-FIX: Donation form resume from localStorage
   - Component: DonationPage.jsx  
   - Issue: XSS vulnerability if malicious data in localStorage
   - Fix: Validate & sanitize before displaying

4. ⚠️ TO-FIX: Recharts responsive on mobile
   - Component: Home.tsx (chart)
   - Issue: Chart width not fully responsive < 640px
   - Workaround: Horizontal scroll container (temporary)
```

### Technical Debt

```
PRIORITY: IMMEDIATE (Next Sprint)
─────────────────────────────────
- [ ] Replace all MOCK_DATA with real API calls
- [ ] Implement proper error handling (try-catch, user feedback)
- [ ] Add loading states to all data-fetching components
- [ ] Remove console.log statements in production

PRIORITY: HIGH (Next 2 Sprints)
────────────────────────────────
- [ ] Implement pagination for large data lists
- [ ] Add input validation on all forms
- [ ] Create reusable FormInput component (DRY)
- [ ] Extract hardcoded strings to i18n (future Indonesian localization)
- [ ] Add unit tests for critical functions (AuthContext, API calls)

PRIORITY: MEDIUM (Backlog)
──────────────────────────
- [ ] Implement React Query for data caching
- [ ] Add loading skeleton screens
- [ ] Optimize bundle size (analyze with vite-plugin-visualizer)
- [ ] Setup Storybook for component documentation
- [ ] Accessibility audit & fixes (a11y)
```

---

## 👥 Team Structure & Responsibilities

### Frontend Team (React/Vite)
```
Lead: UI/UX Designer (You)
├─ Responsible for: Component design, Figma → Code
├─ Owns: Component library, design consistency
├─ Communicates with: Backend team on API contracts
└─ Tools: Figma, Vite, ESLint, Chrome DevTools

Developers (2-3):
├─ Responsible for: Component implementation, API integration
├─ Owns: Feature development, bug fixes
├─ Reviews: Code quality, TypeScript types
└─ Tools: VS Code, Git, Postman, Redux DevTools
```

### Backend Team (Express/Laravel)
```
Lead/Architect:
├─ Responsible for: System design, API design, database schema
├─ Owns: Backend architecture, scaling strategy
└─ Communicates with: Frontend team on API contracts

Developers (2-3):
├─ Responsible for: API endpoints, business logic, database queries
├─ Owns: Feature development, performance optimization
├─ Tests: Unit tests, integration tests
└─ Tools: Postman, pgAdmin, Laravel Tinker

DevOps/Infrastructure:
└─ Responsible for: Deployment, monitoring, database backups
```

### Product/Project Management
```
PM/Director:
├─ Owns: Product roadmap, stakeholder communication
├─ Communicates with: Design + Engineering leads weekly
└─ Reviews: Sprint progress, blockers
```

---

## 📊 Development Workflow & Best Practices

### Git Workflow (Recommended)

```bash
# Create feature branch from main
git checkout -b feature/campaign-management

# Make changes, commit with descriptive messages
git add .
git commit -m "feat: add campaign CRUD functionality

- Implement campaign list with pagination
- Add create/edit campaign forms
- Integrate campaign status filtering
- Refs issue #123"

# Push branch to remote
git push origin feature/campaign-management

# Create Pull Request on GitHub
# → Code review by team lead
# → Merge to main after approval

# Main branch auto-deploys to Vercel
```

### Commit Message Convention

```
feat: Add new feature
fix: Fix a bug
refactor: Restructure code without changing behavior
docs: Update documentation
style: Update CSS/styling
test: Add tests
chore: Update dependencies, configs
```

### Component Development Checklist

```
□ Create component file in appropriate folder
□ Define TypeScript interfaces for props
□ Add JSDoc comments for complex logic
□ Test on mobile (use Chrome DevTools)
□ Test with keyboard navigation (a11y)
□ Add loading state (if data-fetching)
□ Add error handling & user feedback
□ Pass noHeader prop where applicable
□ Responsive sizing with Tailwind
□ Code review by team
□ Update component documentation
```

### Code Review Checklist

```
Reviewer should verify:
□ Code follows project conventions
□ No TypeScript errors
□ Props are properly typed
□ No console.log/debug statements remaining
□ Responsive design tested
□ No hardcoded strings (should use constants)
□ Error handling implemented
□ API integration correct (matches backend spec)
□ Performance acceptable (no unnecessary re-renders)
└─ Approve or request changes
```

---

## 🔍 Troubleshooting Guide

### Issue: "Cannot find module 'react'"
```bash
Solution: npm install
# Then restart dev server: npm run dev
```

### Issue: "VITE_API_URL is undefined"
```bash
Solution: Create .env.local in project root with:
VITE_API_URL=https://backendd-fundunity.vercel.app

# Verify with: console.log(import.meta.env.VITE_API_URL)
```

### Issue: AuthContext not persisting after page refresh
```bash
Verify:
1. Check localStorage has 'token' item (DevTools → Application)
2. Check AuthProvider useEffect loads token on mount
3. Clear cache & hard refresh (Ctrl+Shift+R)
4. If still broken → Check browser localStorage disabled
```

### Issue: Donation flow shows wrong state on resume
```bash
Cause: Stale localStorage data
Solution:
1. Open DevTools → Application → Storage → Clear Site Data
2. Redo donation flow
3. If persists → Check DonationPage.jsx resume logic
```

### Issue: Sidebar not collapsing smoothly
```bash
Cause: CSS transition conflict or transform repaints
Solution:
1. Check Tailwind transform properties
2. Verify no JavaScript conflicts in Sidebar.tsx
3. Test in Incognito mode (no extensions)
4. Check browser GPU acceleration (enable in DevTools)
```

### Issue: Build fails with "Types not assignable"
```bash
Solution: 
npm run lint  # Check for TypeScript errors
# Fix: Update component prop types to match interface
```

---

## 📚 Additional Resources

### Documentation
- [React 19 Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Axios Documentation](https://axios-http.com)

### Design System References
- Figma: [FundUnity Design File]() *(to be shared)*
- Tailwind Config: `./tailwind.config.js`
- Design Tokens: Emerald (#10b981), Orange (#f97316)

### Backend API References
- Base URL: https://backendd-fundunity.vercel.app
- API Postman Collection: *(to be published)*
- Backend Repo: *(link to be shared)*

---

## 📝 Changelog & Version History

### v1.0.0 (April 2026) - MVP Frontend Release
✅ Authentication system (Login/Logout)
✅ Landing page with 8+ sections
✅ Admin dashboard with 11 feature modules
✅ Multi-step donation flow with localStorage persistence
✅ Responsive design (Mobile-first)
✅ Dark sidebar navigation
✅ Financial transparency interface
✅ Stakeholder database
✅ Content management modules

### v1.1.0 (Planned Q2 2026) - Backend Integration
⏳ Real payment gateway (Midtrans)
⏳ Email notification system
⏳ Real database persistence
⏳ API documentation
⏳ Advanced filtering & pagination

### v2.0.0 (Planned Q3 2026) - Enterprise Features
⏳ Laravel migration
⏳ Multi-organization support (SaaS)
⏳ Advanced reporting & PDF export
⏳ 2FA authentication
⏳ Audit logging
⏳ Compliance & regulatory features

---

## ⚖️ License & Contributing

This project is currently **Not Open Source** - Development restricted to team members only.

### Contributing Guidelines
1. All changes must go through code review
2. Follow commit message conventions
3. Update documentation for new features
4. Test on mobile before submitting
5. No direct pushes to main branch

---

## 📞 Contact & Support

**Project Lead (PM)**: [Name, Email]  
**Frontend Lead**: [Name, Email]  
**Backend Lead**: [Name, Email]  

For questions, issues, or blockers:
1. Check this README first
2. Review Troubleshooting section
3. Ask in team Slack/chat
4. Create GitHub issue if bug verified

---

## 🙏 Acknowledgments

**Built with:**
- React 19 & Vite by the frontend team
- Express.js backend (current) & Laravel (future) migrations
- Tailwind CSS for consistent, modern UI
- Community libraries: react-router, axios, recharts

**Special Thanks To:**
- UI/UX Designer for visual leadership
- Backend architects for API contracts
- QA team for testing & feedback
- Organization leadership for vision & support

---

**Last Updated**: April 3, 2026  
**Status**: Active Development  
**Feedback**: Please reach out to PM team  

⭐ Star this repo if you found it helpful!
