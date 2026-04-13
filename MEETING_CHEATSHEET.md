# 🎯 MEETING CHEATSHEET - FundUnity Design Update

**Purpose:** Quick reference untuk meeting diskusi redesign  
**Duration:** 5-min overview + detailed discussion  
**Prepared By:** Frontend Lead  
**Date:** April 3, 2026  

---

## 📌 KEY TALKING POINTS

### 1. SCOPE OF CHANGES
```
Total Modules: 30 components
├─ Landing Pages: 18 komponen (redesign semua?)
├─ Admin Dashboard: 11 komponen (design changes)
├─ Layout/Auth: 2 komponen
└─ Context/Services: Supporting layer
```

**Q: Apakah semua module di-redesign atau selektif?**

---

### 2. MAIN MODULE BREAKDOWNS

#### PUBLIC LANDING (User-facing)
```
Hero                    → Hero banner + CTA
LandingAboutUs         → About/profile section  
LandingFocusAreas      → Program categories showcase
HotCampaigns           → Active campaigns display
TransparansiLanding    → Finance summary public view
Partners               → Partner logos
LandingFaqs            → FAQ section
VolunteerCTA           → Volunteer call-to-action
VolunteerRegistration  → Volunteer form
DonationPage           → Multi-step donation ($)
ContactSection         → Contact info + form
Gallery                → Image showcase (WITH LIGHTBOX)
**MORE GALLERY** → Full-screen photo gallery (NEEDS CLARIFICATION)
```

**Decision Needed:** 
- Mana yang disederhanakan?
- Mana yang di-enhance?
- Mana yang dihapus?

---

#### ADMIN DASHBOARD (Internal operations)
```
Home                   → KPI dashboard + charts
Campaign               → Campaign CRUD + tracking
KeuanganTransparansi   → Finance tabs (Income/Spending)
DatabaseStakeholder    → Stakeholder DB (Donors/Recipients/Volunteers)
AboutUs                → Organization profile editor
FocusAreas             → Program categories manager
ImageSlider            → Banner management
Partners               → Partner logos manager
Faqs                   → FAQ CRUD
Messages               → Inbox/contact forms
Notifications          → Activity log
Settings               → Account & system config
```

**Decision Needed:** 
- Consolidate any?
- Split any modules?
- Change navigation structure?

---

### 3. CURRENT STATE INVENTORY

**✅ IMPLEMENTED:**
- ✓ Responsive layout (mobile-first)
- ✓ Auth system (JWT + localStorage)
- ✓ Sidebar navigation (collapsible)
- ✓ Multi-step donation flow
- ✓ Mock data structure
- ✓ Tailwind CSS (customized)

**⚠️ STATUS:**
- ⏳ Real API integration (90% non-functional)
- ⏳ Payment gateway (not integrated)
- ⏳ Email notifications (EmailJS imported, not used)
- ⏳ Image upload (URLs only)

---

### 4. DESIGN DECISION MATRIX

| Aspect | Current | New (?) | Status |
|--------|---------|---------|--------|
| Color Palette | Emerald + Orange | ? | 🤔 DECIDE |
| Typography | Inter (Tailwind) | ? | 🤔 DECIDE |
| Sidebar | Dark green (fixed left) | ? | 🤔 DECIDE |
| Dashboard Grid | 1-column (mobile) | ? | 🤔 DECIDE |
| Card Radius | 2xl (rounded) | ? | 🤔 DECIDE |
| Spacing System | Tailwind default | ? | 🤔 DECIDE |
| Icons | React Icons (PI) | ? | 🤔 DECIDE |
| Form Style | Modern/Glass effect | ? | 🤔 DECIDE |

---

### 5. GALLERY CLARIFICATION NEEDED

**Current Gallery Implementation:**
```
Gallery.jsx
├─ Fetches: /v1/content/imageslider (backend endpoint)
├─ Shows: 3-grid layout
│  ├─ YouTube video embed (sidebar)
│  ├─ CTA block (blue box with link to /moregallery)
│  └─ Photo grid (4 images)
├─ Feature: Lightbox modal on photo click
└─ Link: "Lihat Galeri Lengkap" → /moregallery (NOT IMPLEMENTED YET)
```

**Questions for PM:**
1. **Purpose**: Apa function gallery ini?
   - [ ] Showcase amal kegiatan/evidence impact?
   - [ ] Photo portfolio organisasi?
   - [ ] Documentation bukti program?
   - [ ] Impact stories dengan foto?

2. **Necessity**: Apakah WAJIB untuk platform donasi?
   - [ ] YES - Trust building (show evidence of work)
   - [ ] MAYBE - Nice to have, low priority
   - [ ] NO - Delete it, fokus core features

3. **More Gallery Page**: Apa konten di `/moregallery`?
   - [ ] Full grid (20+ photos)?
   - [ ] Paginated/infinite scroll?
   - [ ] Filter by program/category?
   - [ ] Photo descriptions?

---

## 🎨 DESIGN COMPONENTS AFFECTED

### When Changing Design, Check These:

```
Component Changes Checklist:
├─ [ ] Colors - All {bg-emerald-*, text-emerald-*} references
├─ [ ] Spacing - Padding/margin consistency
├─ [ ] Typography - Font sizes, weights, line-height
├─ [ ] Borders - Rounded corners, borders
├─ [ ] Shadows - Shadow depth
├─ [ ] Icons - Icon sizes, colors
├─ [ ] Responsive - Mobile, tablet, desktop
├─ [ ] States - Hover, active, disabled, loading
└─ [ ] Accessibility - Contrast ratios, focus states
```

**Critical Files to Update:**
```
├─ tailwind.config.js       [Design tokens]
├─ App.css                   [Global styles]
├─ index.css                 [Root styles]
└─ Every .tsx/.jsx file      [Component styles]
```

---

## 📊 IMPACT ASSESSMENT

### If Full Redesign:
```
Effort Level: **HIGH** ⚠️⚠️⚠️
├─ Estimation: 2-3 weeks
├─ Developers: 2 people
├─ Testing: QA full regression
└─ Risk: Breaking existing functionality

Files Modified: ~25-30 components
Lines Changed: ~3000+
```

### If Selective Redesign:
```
Effort Level: **MEDIUM** ⚠️⚠️
├─ Estimation: 1-2 weeks  
├─ Developers: 1-2 people
├─ Testing: Partial regression
└─ Risk: Inconsistent design

Files Modified: ~10-15 components
Lines Changed: ~1000+
```

### If Minimal Changes:
```
Effort Level: **LOW** ✅
├─ Estimation: 2-3 days
├─ Developers: 1 person
├─ Testing: Smoke testing
└─ Risk: Low

Files Modified: ~5-10 components
Lines Changed: ~200-500
```

---

## 🔄 PROCESS & NEXT STEPS

### If APPROVE Redesign:
```
1. Finalize design specs (Figma)
   └─ Color palette, typography, components
   
2. Create component library/storybook (optional)
   └─ Document all component variants
   
3. Update key files first
   ├─ tailwind.config.js (new colors)
   ├─ App.css (global styles)
   └─ Layout components (Header, Sidebar)
   
4. Rolling deployment
   ├─ Landing pages module by module
   ├─ Admin dashboard module by module
   └─ Test each before moving next
   
5. QA & UAT
   ├─ Mobile responsiveness check
   ├─ Browser compatibility
   └─ Accessibility audit
```

### If DEFER Redesign:
```
1. Use current design as-is
2. Focus on: Backend API integration
3. Timeline: Q2 2026 redesign sprint
```

---

## ⚡ QUICK DECISIONS NEEDED

```
Before leaving meeting, confirm:

☐ Full redesign or selective?
☐ Timeline/deadline?
☐ Design file ready (Figma link)?
☐ Color palette approved?
☐ Gallery: Keep or Delete?
☐ /moregallery: Implement or Remove?
☐ Resource allocation (who does what)?
☐ QA/Testing approach?
☐ Risk tolerance (breaking changes acceptable)?
☐ Rollback plan if issues?
```

---

## 📝 ACTION ITEMS TEMPLATE

```
Post-Meeting Assignments:

❏ PM: 
  - Share Figma design file
  - Clarify gallery purpose & gallery page
  - Confirm timeline with team

❏ Frontend Lead:
  - Review design specs
  - Plan component update order
  - Set up development branch

❏ Developers:
  - Prepare dev environment
  - Pull latest changes
  - Await design specs

❏ QA:
  - Prepare test cases
  - Setup test devices
  - Create regression test plan
```

---

## 📞 OPEN QUESTIONS

```
1. Gallery function & necessity?
   Answer: _______________________________________________

2. Design timeline?
   Answer: _______________________________________________

3. Scope - Full or Partial redesign?
   Answer: _______________________________________________

4. Resources available?
   Answer: _______________________________________________

5. Risk tolerance?
   Answer: _______________________________________________

6. Other concerns?
   Answer: _______________________________________________
```

---

## 🔗 QUICK REFERENCES

**Key Files:**
- Frontend Routes: [App.tsx](src/App.tsx)
- Design Config: [tailwind.config.js](tailwind.config.js)
- Main Components: [src/components/](src/components/)
- Landing Layout: [LandingLayout.tsx](src/components/LandingLayout.tsx)

**Deployment:**
- Current Frontend: https://uifix.vercel.app (or custom domain)
- Current Backend: https://backendd-fundunity.vercel.app
- Branch for changes: `feature/redesign-[date]`

**Tech Stack (In Case Needed):**
- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (routing)
- Axios (HTTP client)

---

**MEETING NOTES:**
```
Attendees: ________________________
Date: ________________________
Decisions Made: ________________________
Follow-ups: ________________________
```

