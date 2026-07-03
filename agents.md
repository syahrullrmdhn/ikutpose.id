# 📸 Digital Photobooth — Full Project Specification (agents.md)

> **Project Name:** Digital Photobooth Web App  
> **Stack:** Laravel 11 (API Backend) + ReactJS 18 (Frontend SPA)  
> **Design Mood:** Dusty Pink · Slow Living · Tegas (Firm Elegance)  
> **Reference:** [nabooth.id](https://nabooth.id/), [photobooth-io.com](https://photobooth-io.com/), [photoboothcamera.com](https://photoboothcamera.com/), [yoyobooth.com](https://www.yoyobooth.com/)

---

## 1. PROJECT OVERVIEW

Aplikasi web digital photobooth yang memungkinkan user mengambil foto melalui kamera device (webcam/mobile), menerapkan template/frame, filter, dan sticker, lalu menghasilkan photo strip yang bisa didownload atau dishare. Dilengkapi admin panel CRUD lengkap untuk mengelola template, sticker pack, filter, event, user, dan gallery.

### 1.1 Core Value Proposition

- **Zero Install** — Berjalan langsung di browser, tanpa download app
- **Template-Driven** — Admin bisa upload dan kelola template frame/overlay tanpa coding
- **Event-Ready** — Setiap event punya URL unik, branding sendiri, dan gallery terpisah
- **Privacy-First** — Opsi client-side processing, foto tidak disimpan di server kecuali user consent

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette — "Dusty Pink Firm Elegance"

Warna dominan dusty pink yang tidak mencolok tapi juga tidak terlalu lembut. Simbol slow living tapi tegas — ada kedalaman dan karakter di warnanya.

```
┌─────────────────────────────────────────────────────────┐
│  PRIMARY PALETTE                                         │
├──────────────────┬──────────┬────────────────────────────┤
│  Dusty Pink      │ #C4919B  │ Primary brand, CTA utama   │
│  Deep Rose       │ #A66B76  │ Hover states, accent kuat  │
│  Blush Mist      │ #E8CDD0  │ Soft backgrounds, cards    │
│  Rose Cream      │ #F5E6E8  │ Page backgrounds           │
│  Petal White     │ #FDF5F6  │ Lightest tint, hero bg     │
├──────────────────┴──────────┴────────────────────────────┤
│  NEUTRAL PALETTE                                         │
├──────────────────┬──────────┬────────────────────────────┤
│  Charcoal        │ #2D2226  │ Heading text, strong text   │
│  Warm Gray       │ #6B5B5F  │ Body text                  │
│  Muted Mauve     │ #9A8B8E  │ Secondary text, captions   │
│  Soft Gray       │ #D4CBCC  │ Borders, dividers          │
│  Cloud           │ #F7F3F4  │ Alt background, subtle bg  │
│  White           │ #FFFFFF  │ Cards, modals, clean space  │
├──────────────────┴──────────┴────────────────────────────┤
│  ACCENT & FUNCTIONAL                                     │
├──────────────────┬──────────┬────────────────────────────┤
│  Mauve Gold      │ #C4A882  │ Premium accent, badges     │
│  Sage Soft       │ #A8B5A0  │ Success states, balance    │
│  Terra Blush     │ #D4A59A  │ Warm accent, secondary CTA │
│  Muted Red       │ #C97070  │ Error, destructive actions  │
│  Dusty Blue      │ #8FA6B5  │ Info, links                │
└──────────────────┴──────────┴────────────────────────────┘
```

### 2.2 Color Usage Rules

- **Background Utama:** `Rose Cream (#F5E6E8)` atau `Petal White (#FDF5F6)` — tidak full white, supaya feel dusty pink terasa dari pertama buka
- **Card/Panel:** `White (#FFFFFF)` dengan `border: 1px solid #E8CDD0` dan `box-shadow: 0 2px 12px rgba(196, 145, 155, 0.08)`
- **CTA Button Primary:** `Dusty Pink (#C4919B)` background, `White (#FFFFFF)` text, hover ke `Deep Rose (#A66B76)`
- **CTA Button Secondary:** `transparent` background, `Dusty Pink (#C4919B)` border & text
- **Heading Text:** `Charcoal (#2D2226)` — tegas dan kontras cukup
- **Body Text:** `Warm Gray (#6B5B5F)` — nyaman dibaca, tidak terlalu dark
- **Disabled States:** opacity 0.5 dari warna asli
- **Focus Ring:** `0 0 0 3px rgba(196, 145, 155, 0.35)`

### 2.3 Typography

Font pairing yang menyeimbangkan kesan elegan (slow living) dan tegas (firm).

```
HEADING / DISPLAY FONT:
  Font    : "Instrument Serif" (Google Fonts)
  Fallback: Georgia, "Times New Roman", serif
  Usage   : Hero title, section heading, brand name, overlay text
  Traits  : Carefully considered curves, intentional, not showy — 
            cocok dengan konsep slow living tapi tegas

BODY / UI FONT:
  Font    : "Plus Jakarta Sans" (Google Fonts)  
  Fallback: "Segoe UI", system-ui, sans-serif
  Usage   : Body text, button, label, navigation, form, caption
  Traits  : Modern geometric, friendly tapi professional, designed 
            for digital — legibility sangat bagus di semua ukuran

ACCENT / DECORATIVE FONT (opsional):
  Font    : "Cormorant Garamond" (Google Fonts)
  Fallback: "Instrument Serif", Georgia, serif
  Usage   : Quote overlay di foto, watermark text, event tagline
  Traits  : Renaissance elegance, cocok untuk overlay text di foto

MONOSPACE (code/technical):
  Font    : "JetBrains Mono" (Google Fonts)
  Fallback: "Fira Code", monospace
  Usage   : Kode embed, event code display
```

### 2.4 Type Scale

```
Display     : 3.5rem  / 56px  — Instrument Serif, weight 400
H1          : 2.5rem  / 40px  — Instrument Serif, weight 400
H2          : 2rem    / 32px  — Instrument Serif, weight 400
H3          : 1.5rem  / 24px  — Plus Jakarta Sans, weight 700
H4          : 1.25rem / 20px  — Plus Jakarta Sans, weight 600
Body Large  : 1.125rem/ 18px  — Plus Jakarta Sans, weight 400, line-height 1.7
Body        : 1rem    / 16px  — Plus Jakarta Sans, weight 400, line-height 1.65
Body Small  : 0.875rem/ 14px  — Plus Jakarta Sans, weight 400, line-height 1.6
Caption     : 0.75rem / 12px  — Plus Jakarta Sans, weight 500, line-height 1.5
```

### 2.5 Border Radius & Spacing

```
Radius:
  xs    : 6px    — tags, badges, small chips
  sm    : 10px   — buttons, input fields
  md    : 14px   — cards, panels
  lg    : 20px   — modals, photo frames
  xl    : 28px   — hero cards, featured sections
  full  : 9999px — avatar, circular elements

Spacing (base 4px):
  xs    : 4px
  sm    : 8px
  md    : 16px
  lg    : 24px
  xl    : 32px
  2xl   : 48px
  3xl   : 64px
  4xl   : 96px
```

### 2.6 Component Styling Khas

- **Buttons** — `border-radius: 10px`, `padding: 12px 28px`, `font-weight: 600`, `letter-spacing: 0.01em`, transisi smooth 200ms. Tidak pakai shadow berlebihan, cukup subtle `box-shadow: 0 1px 3px rgba(196, 145, 155, 0.15)` di primary.
- **Cards** — `border-radius: 14px`, white background, border `#E8CDD0`, shadow `0 2px 12px rgba(196, 145, 155, 0.08)`. Hover: shadow naik sedikit.
- **Input Fields** — `border-radius: 10px`, border `#D4CBCC`, focus border `#C4919B` dengan focus ring. Placeholder color `#9A8B8E`.
- **Photo Frame Preview** — `border-radius: 6px` (agar terlihat seperti foto cetak), subtle shadow, background pattern diagonal stripes halus saat belum ada foto.
- **Navigation** — Clean, minimal. Active link pakai underline `Dusty Pink` 2px, bukan background. Mobile: slide-out drawer dari kanan dengan backdrop blur.
- **Toast/Notification** — `border-radius: 10px`, muncul dari bawah, ikon di kiri, auto-dismiss 4 detik. Success pakai `Sage Soft`, error pakai `Muted Red`.

### 2.7 Ilustrasi & Ikonografi

- **Icon Set:** Lucide React (line icons, 1.5px stroke) — konsisten, clean, cocok dengan dusty pink aesthetic
- **Ilustrasi:** Minimalis line art dengan aksen dusty pink. Untuk empty states, gunakan ilustrasi sederhana (kamera, frame, foto) dengan garis `#C4919B` dan fill wash `#F5E6E8`.
- **Logo:** Teks-based, menggunakan Instrument Serif untuk nama brand + ikon kamera sederhana line art

---

## 3. ARCHITECTURE

### 3.1 Tech Stack Detail

```
BACKEND (Laravel 11):
├── PHP 8.2+
├── Laravel 11.x
├── Laravel Sanctum (API auth)
├── Laravel Media Library (spatie) — file/image management
├── Intervention Image 3.x — server-side image processing
├── Laravel Permission (spatie) — role & permission
├── Laravel Excel (maatwebsite) — export data
├── MySQL 8.0 / PostgreSQL 15
├── Redis — cache, session, queue
├── Laravel Horizon — queue monitoring
└── MinIO / S3 — object storage untuk gambar

FRONTEND (React 18):
├── Vite 5.x — build tool
├── React Router v6 — routing
├── TanStack Query (React Query) — server state
├── Zustand — client state management
├── React Hook Form + Zod — form & validation
├── Tailwind CSS 3.x — utility CSS  
├── Framer Motion — animasi halus
├── react-webcam — akses kamera device
├── html2canvas / dom-to-image — capture composite foto
├── Fabric.js — canvas manipulation (drag sticker, resize, rotate)
├── Lucide React — icon set
└── Sonner — toast notifications
```

### 3.2 Project Structure

```
digital-photobooth/
├── backend/                          # Laravel 11
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Api/
│   │   │   │   │   ├── AuthController.php
│   │   │   │   │   ├── TemplateController.php
│   │   │   │   │   ├── StickerPackController.php
│   │   │   │   │   ├── FilterController.php
│   │   │   │   │   ├── EventController.php
│   │   │   │   │   ├── PhotoController.php
│   │   │   │   │   ├── GalleryController.php
│   │   │   │   │   ├── SettingController.php
│   │   │   │   │   └── DashboardController.php
│   │   │   │   └── Admin/
│   │   │   │       └── ... (admin-specific if needed)
│   │   │   ├── Middleware/
│   │   │   ├── Requests/
│   │   │   │   ├── StoreTemplateRequest.php
│   │   │   │   ├── UpdateTemplateRequest.php
│   │   │   │   ├── StoreEventRequest.php
│   │   │   │   └── ...
│   │   │   └── Resources/
│   │   │       ├── TemplateResource.php
│   │   │       ├── EventResource.php
│   │   │       ├── PhotoResource.php
│   │   │       └── ...
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Template.php
│   │   │   ├── TemplateLayer.php
│   │   │   ├── StickerPack.php
│   │   │   ├── Sticker.php
│   │   │   ├── Filter.php
│   │   │   ├── Event.php
│   │   │   ├── Photo.php
│   │   │   ├── PhotoSession.php
│   │   │   └── Setting.php
│   │   ├── Services/
│   │   │   ├── ImageCompositor.php      # Gabung foto + template server-side
│   │   │   ├── TemplateProcessor.php    # Validasi & proses template upload
│   │   │   ├── PhotoStripGenerator.php  # Generate final strip
│   │   │   └── StorageService.php       # Abstract storage (local/s3)
│   │   ├── Jobs/
│   │   │   ├── ProcessPhotoComposite.php
│   │   │   ├── GeneratePhotoThumbnail.php
│   │   │   └── CleanupExpiredPhotos.php
│   │   └── Enums/
│   │       ├── TemplateLayout.php       # STRIP_2, STRIP_3, STRIP_4, GRID_2X2, SINGLE
│   │       ├── PhotoStatus.php
│   │       └── EventStatus.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   └── storage/
│
├── frontend/                         # React 18 + Vite
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── api/                      # Axios instance & API calls
│   │   │   ├── client.js
│   │   │   ├── auth.js
│   │   │   ├── templates.js
│   │   │   ├── events.js
│   │   │   ├── photos.js
│   │   │   └── stickers.js
│   │   ├── components/
│   │   │   ├── ui/                   # Reusable UI primitives
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Dropdown.jsx
│   │   │   │   ├── Table.jsx
│   │   │   │   ├── Pagination.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   └── Toast.jsx
│   │   │   ├── layout/
│   │   │   │   ├── PublicLayout.jsx
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── shared/
│   │   │       ├── TemplatePreview.jsx
│   │   │       ├── PhotoFrameRenderer.jsx
│   │   │       └── StickerDraggable.jsx
│   │   ├── features/
│   │   │   ├── booth/                # Core photobooth experience
│   │   │   │   ├── BoothPage.jsx
│   │   │   │   ├── CameraCapture.jsx
│   │   │   │   ├── CountdownOverlay.jsx
│   │   │   │   ├── TemplateSelector.jsx
│   │   │   │   ├── FilterSelector.jsx
│   │   │   │   ├── StickerPanel.jsx
│   │   │   │   ├── PhotoEditor.jsx
│   │   │   │   ├── PhotoStripCanvas.jsx
│   │   │   │   ├── ResultPreview.jsx
│   │   │   │   └── ShareDownload.jsx
│   │   │   ├── events/
│   │   │   │   ├── EventLanding.jsx
│   │   │   │   └── EventGallery.jsx
│   │   │   ├── gallery/
│   │   │   │   ├── PublicGallery.jsx
│   │   │   │   └── PhotoDetail.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── templates/
│   │   │       │   ├── TemplateList.jsx
│   │   │       │   ├── TemplateForm.jsx
│   │   │       │   └── TemplateLayerEditor.jsx
│   │   │       ├── stickers/
│   │   │       │   ├── StickerPackList.jsx
│   │   │       │   └── StickerPackForm.jsx
│   │   │       ├── filters/
│   │   │       │   ├── FilterList.jsx
│   │   │       │   └── FilterForm.jsx
│   │   │       ├── events/
│   │   │       │   ├── EventList.jsx
│   │   │       │   └── EventForm.jsx
│   │   │       ├── photos/
│   │   │       │   └── PhotoManagement.jsx
│   │   │       ├── users/
│   │   │       │   ├── UserList.jsx
│   │   │       │   └── UserForm.jsx
│   │   │       └── settings/
│   │   │           └── GeneralSettings.jsx
│   │   ├── hooks/
│   │   │   ├── useCamera.js
│   │   │   ├── useCountdown.js
│   │   │   ├── usePhotoStrip.js
│   │   │   ├── useCanvasComposite.js
│   │   │   └── useAuth.js
│   │   ├── stores/
│   │   │   ├── authStore.js
│   │   │   └── boothStore.js
│   │   ├── utils/
│   │   │   ├── imageHelpers.js
│   │   │   ├── canvasUtils.js
│   │   │   ├── downloadHelper.js
│   │   │   └── formatters.js
│   │   └── styles/
│   │       ├── tailwind.css
│   │       └── fonts.css
│   ├── public/
│   │   └── fonts/
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── docker-compose.yml
```

---

## 4. DATABASE SCHEMA

### 4.1 ERD Overview

```
users ─────────────┬─── events (hasMany)
                    ├─── photos (hasMany)
                    └─── photo_sessions (hasMany)

templates ─────────┬─── template_layers (hasMany)
                    └─── events (belongsToMany via event_template)

sticker_packs ─────┬─── stickers (hasMany)
                    └─── events (belongsToMany via event_sticker_pack)

filters ───────────┬─── events (belongsToMany via event_filter)

events ────────────┬─── photo_sessions (hasMany)
                    ├─── templates (belongsToMany)
                    ├─── sticker_packs (belongsToMany)
                    └─── filters (belongsToMany)

photo_sessions ────┬─── photos (hasMany)
```

### 4.2 Migration Detail

```php
// users (extend Laravel default)
Schema::table('users', function (Blueprint $table) {
    $table->string('avatar')->nullable();
    $table->enum('role', ['admin', 'operator', 'user'])->default('user');
    $table->boolean('is_active')->default(true);
    $table->timestamp('last_login_at')->nullable();
});

// templates
Schema::create('templates', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique();
    $table->text('description')->nullable();
    $table->string('thumbnail');                    // Preview image
    $table->enum('layout', [
        'strip_2', 'strip_3', 'strip_4',           // Vertical strips
        'grid_2x2',                                  // 2x2 grid
        'single',                                    // Single photo
        'wide_strip_3',                             // Horizontal strip
    ]);
    $table->integer('canvas_width');                // px, e.g. 1200
    $table->integer('canvas_height');               // px, e.g. 3600 (strip_4)
    $table->json('photo_slots');                    // Array of {x, y, width, height, rotation, borderRadius}
    $table->string('overlay_image')->nullable();    // PNG overlay (frame, decoration)
    $table->string('background_image')->nullable(); // Background layer
    $table->string('background_color')->nullable(); // Fallback bg color
    $table->json('text_overlays')->nullable();      // [{text, x, y, font, size, color, rotation}]
    $table->boolean('is_premium')->default(false);
    $table->boolean('is_active')->default(true);
    $table->integer('sort_order')->default(0);
    $table->foreignId('created_by')->constrained('users');
    $table->timestamps();
    $table->softDeletes();
});

// template_layers (untuk template yang punya multiple layer)
Schema::create('template_layers', function (Blueprint $table) {
    $table->id();
    $table->foreignId('template_id')->constrained()->cascadeOnDelete();
    $table->enum('type', ['background', 'overlay', 'decoration', 'text']);
    $table->string('image')->nullable();        // Path to layer image
    $table->json('properties');                 // {x, y, width, height, opacity, rotation, zIndex}
    $table->text('text_content')->nullable();   // For text layers
    $table->json('text_style')->nullable();     // {font, size, color, weight, align}
    $table->integer('z_index')->default(0);
    $table->timestamps();
});

// sticker_packs
Schema::create('sticker_packs', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique();
    $table->string('thumbnail');
    $table->text('description')->nullable();
    $table->string('category')->nullable();     // 'cute', 'party', 'wedding', 'birthday', 'nature'
    $table->boolean('is_premium')->default(false);
    $table->boolean('is_active')->default(true);
    $table->integer('sort_order')->default(0);
    $table->timestamps();
    $table->softDeletes();
});

// stickers
Schema::create('stickers', function (Blueprint $table) {
    $table->id();
    $table->foreignId('sticker_pack_id')->constrained()->cascadeOnDelete();
    $table->string('name');
    $table->string('image');                    // PNG with transparency
    $table->integer('default_width')->default(100);  // Default size saat di-drop
    $table->integer('default_height')->default(100);
    $table->integer('sort_order')->default(0);
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});

// filters
Schema::create('filters', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique();
    $table->string('thumbnail');                // Before-after preview
    $table->json('css_filter');                 // {brightness, contrast, saturate, hue-rotate, grayscale, sepia, blur}
    $table->json('canvas_adjustments')->nullable(); // More advanced: curves, levels, tint overlay
    $table->string('overlay_image')->nullable(); // Optional color/texture overlay with blend mode
    $table->string('overlay_blend_mode')->nullable(); // 'multiply', 'screen', 'overlay', dll
    $table->float('overlay_opacity')->default(0.3);
    $table->boolean('is_active')->default(true);
    $table->integer('sort_order')->default(0);
    $table->timestamps();
});

// events
Schema::create('events', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained();  // Owner
    $table->string('name');
    $table->string('slug')->unique();
    $table->string('code', 20)->unique();          // Short code untuk akses cepat
    $table->text('description')->nullable();
    $table->string('logo')->nullable();
    $table->string('banner')->nullable();
    $table->string('primary_color')->nullable();   // Override tema event
    $table->string('secondary_color')->nullable();
    $table->json('branding')->nullable();          // {tagline, footer_text, watermark_text, custom_css}
    $table->timestamp('start_date');
    $table->timestamp('end_date');
    $table->enum('status', ['draft', 'active', 'paused', 'ended'])->default('draft');
    $table->boolean('gallery_public')->default(true);
    $table->boolean('require_email')->default(false);
    $table->integer('max_photos_per_session')->default(4);
    $table->integer('countdown_seconds')->default(3);
    $table->integer('photo_limit')->nullable();    // null = unlimited
    $table->timestamps();
    $table->softDeletes();
});

// event_template (pivot)
Schema::create('event_template', function (Blueprint $table) {
    $table->foreignId('event_id')->constrained()->cascadeOnDelete();
    $table->foreignId('template_id')->constrained()->cascadeOnDelete();
    $table->integer('sort_order')->default(0);
    $table->primary(['event_id', 'template_id']);
});

// event_sticker_pack (pivot)
Schema::create('event_sticker_pack', function (Blueprint $table) {
    $table->foreignId('event_id')->constrained()->cascadeOnDelete();
    $table->foreignId('sticker_pack_id')->constrained()->cascadeOnDelete();
    $table->primary(['event_id', 'sticker_pack_id']);
});

// event_filter (pivot)
Schema::create('event_filter', function (Blueprint $table) {
    $table->foreignId('event_id')->constrained()->cascadeOnDelete();
    $table->foreignId('filter_id')->constrained()->cascadeOnDelete();
    $table->primary(['event_id', 'filter_id']);
});

// photo_sessions
Schema::create('photo_sessions', function (Blueprint $table) {
    $table->id();
    $table->uuid('session_uuid')->unique();
    $table->foreignId('event_id')->nullable()->constrained()->nullOnDelete();
    $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
    $table->foreignId('template_id')->constrained();
    $table->string('guest_name')->nullable();
    $table->string('guest_email')->nullable();
    $table->string('ip_address')->nullable();
    $table->string('user_agent')->nullable();
    $table->json('applied_filter')->nullable();
    $table->json('applied_stickers')->nullable();  // [{sticker_id, x, y, width, height, rotation}]
    $table->enum('status', ['in_progress', 'completed', 'expired'])->default('in_progress');
    $table->timestamps();
});

// photos
Schema::create('photos', function (Blueprint $table) {
    $table->id();
    $table->foreignId('photo_session_id')->constrained()->cascadeOnDelete();
    $table->string('original_image');           // Raw captured photo
    $table->string('processed_image')->nullable(); // After filter applied
    $table->string('composite_image')->nullable(); // Final with template
    $table->string('thumbnail')->nullable();
    $table->integer('slot_index');              // Posisi di template (0, 1, 2, 3)
    $table->json('crop_data')->nullable();      // {x, y, width, height} crop info
    $table->json('adjustments')->nullable();    // {brightness, contrast, dll}
    $table->integer('file_size')->nullable();   // bytes
    $table->enum('status', ['captured', 'processing', 'ready', 'failed'])->default('captured');
    $table->timestamps();
});

// settings (key-value untuk global config)
Schema::create('settings', function (Blueprint $table) {
    $table->id();
    $table->string('key')->unique();
    $table->text('value')->nullable();
    $table->string('type')->default('string');  // string, boolean, integer, json
    $table->string('group')->default('general'); // general, booth, branding, storage
    $table->text('description')->nullable();
    $table->timestamps();
});
```

---

## 5. API ENDPOINTS

### 5.1 Authentication

```
POST   /api/auth/register              # Register user baru
POST   /api/auth/login                 # Login, return token
POST   /api/auth/logout                # Revoke token
GET    /api/auth/me                    # Get current user
PUT    /api/auth/profile               # Update profile
POST   /api/auth/change-password       # Ubah password
```

### 5.2 Admin — Templates CRUD

```
GET    /api/admin/templates            # List semua template (paginated, filterable)
POST   /api/admin/templates            # Create template baru
GET    /api/admin/templates/{id}       # Detail template
PUT    /api/admin/templates/{id}       # Update template
DELETE /api/admin/templates/{id}       # Soft delete template
POST   /api/admin/templates/{id}/duplicate  # Duplikasi template
PUT    /api/admin/templates/reorder    # Update sort order (bulk)
POST   /api/admin/templates/{id}/layers     # Tambah layer
PUT    /api/admin/templates/{id}/layers/{layerId}  # Update layer
DELETE /api/admin/templates/{id}/layers/{layerId}  # Delete layer
```

### 5.3 Admin — Sticker Packs CRUD

```
GET    /api/admin/sticker-packs                 # List semua pack
POST   /api/admin/sticker-packs                 # Create pack baru
GET    /api/admin/sticker-packs/{id}            # Detail pack + stickers
PUT    /api/admin/sticker-packs/{id}            # Update pack
DELETE /api/admin/sticker-packs/{id}            # Soft delete pack
POST   /api/admin/sticker-packs/{id}/stickers   # Upload sticker baru ke pack
PUT    /api/admin/sticker-packs/{id}/stickers/{stickerId}   # Update sticker
DELETE /api/admin/sticker-packs/{id}/stickers/{stickerId}   # Delete sticker
POST   /api/admin/sticker-packs/{id}/stickers/bulk-upload   # Bulk upload stickers
```

### 5.4 Admin — Filters CRUD

```
GET    /api/admin/filters              # List filters
POST   /api/admin/filters              # Create filter
GET    /api/admin/filters/{id}         # Detail filter
PUT    /api/admin/filters/{id}         # Update filter
DELETE /api/admin/filters/{id}         # Delete filter
```

### 5.5 Admin — Events CRUD

```
GET    /api/admin/events               # List events (paginated, status filter)
POST   /api/admin/events               # Create event
GET    /api/admin/events/{id}          # Detail event + stats
PUT    /api/admin/events/{id}          # Update event
DELETE /api/admin/events/{id}          # Soft delete event
PUT    /api/admin/events/{id}/status   # Toggle status (active/paused/ended)
GET    /api/admin/events/{id}/photos   # All photos in event
GET    /api/admin/events/{id}/stats    # Event analytics
POST   /api/admin/events/{id}/export   # Export gallery sebagai ZIP
```

### 5.6 Admin — Photos & Gallery

```
GET    /api/admin/photos               # List all photos (paginated, filterable)
GET    /api/admin/photos/{id}          # Photo detail
DELETE /api/admin/photos/{id}          # Delete photo
DELETE /api/admin/photos/bulk-delete   # Bulk delete
GET    /api/admin/gallery/stats        # Global gallery stats
```

### 5.7 Admin — Users

```
GET    /api/admin/users                # List users
POST   /api/admin/users                # Create user
GET    /api/admin/users/{id}           # User detail
PUT    /api/admin/users/{id}           # Update user
DELETE /api/admin/users/{id}           # Delete user
PUT    /api/admin/users/{id}/toggle-active  # Activate/deactivate
```

### 5.8 Admin — Settings & Dashboard

```
GET    /api/admin/settings             # All settings (grouped)
PUT    /api/admin/settings             # Bulk update settings
GET    /api/admin/dashboard            # Dashboard stats (photos today, events active, dll)
```

### 5.9 Public — Booth & Gallery

```
GET    /api/booth/templates            # Available templates for public booth
GET    /api/booth/sticker-packs        # Available sticker packs
GET    /api/booth/filters              # Available filters
POST   /api/booth/sessions             # Start new photo session
POST   /api/booth/sessions/{uuid}/capture  # Upload captured photo
PUT    /api/booth/sessions/{uuid}/finalize # Finalize session (generate composite)
GET    /api/booth/sessions/{uuid}/result   # Get final result + download URL

GET    /api/events/{slug}              # Event landing page data
GET    /api/events/{slug}/booth        # Event booth config (templates, stickers, filters assigned)
GET    /api/events/{slug}/gallery      # Event public gallery (paginated)

GET    /api/gallery                    # Public gallery (if enabled)
GET    /api/gallery/{id}               # Single photo detail
```

---

## 6. PAGE & FEATURE SPECIFICATION

### 6.1 Public Pages

#### 6.1.1 Landing Page (`/`)

```
Sections:
├── Hero Section
│   ├── Headline: Instrument Serif, Display size
│   │   "Capture Moments, Create Memories"
│   ├── Subheadline: Plus Jakarta Sans, Body Large
│   │   "Digital photobooth yang bisa kamu akses kapanpun, di manapun."
│   ├── CTA Button: "Mulai Foto" → /booth
│   ├── Secondary CTA: "Punya Event?" → /events
│   └── Background: Gradient Petal White → Rose Cream dengan floating  
│       decorative elements (circle shapes, camera line art) animasi subtle
│
├── How It Works (3 steps)
│   ├── 1. Pilih Template — Ikon frame, desc singkat
│   ├── 2. Foto & Hias — Ikon kamera + sparkle, desc singkat
│   └── 3. Download & Share — Ikon download, desc singkat
│   └── Layout: horizontal 3 column, card style, Instrument Serif number
│
├── Template Showcase
│   ├── Grid preview template-template populer
│   ├── Auto-scroll horizontal di mobile
│   └── CTA: "Lihat Semua Template"
│
├── Event Feature Promo
│   ├── Mockup screenshot event page
│   ├── Highlight features: custom branding, gallery, link unik
│   └── CTA: "Buat Event Sekarang"
│
└── Footer
    ├── Brand logo + tagline
    ├── Quick links
    ├── Social media
    └── Copyright
```

#### 6.1.2 Booth Page (`/booth` atau `/events/{slug}/booth`)

Ini adalah halaman utama pengalaman photobooth. Flow-nya step-by-step:

```
STEP 1 — PILIH TEMPLATE
├── Grid template cards (thumbnail + name + layout badge)
├── Filter by layout type (strip, grid, single)
├── Klik template → preview lebih besar di modal
├── Tombol "Pilih Template Ini"
└── Info: jumlah foto yang perlu diambil berdasarkan layout

STEP 2 — AMBIL FOTO
├── Camera viewport (full width, aspect ratio sesuai slot)
├── Mirror toggle (flip horizontal)
├── Countdown overlay (3... 2... 1... *click*)
│   └── Angka besar di tengah, Instrument Serif, animasi scale + fade
├── Flash effect (white overlay fade 200ms)
├── Progress indicator: "Foto 2 dari 4"
├── Retake button per foto
├── Mini preview strip di bawah (foto yang sudah diambil)
└── Tombol: "Ambil Foto" (besar, center, Dusty Pink)

STEP 3 — EDIT & HIAS
├── Preview Canvas (real-time composite: template + foto-foto)
│   ├── Foto sudah ter-place di slot template sesuai posisi
│   ├── Bisa klik foto untuk adjust (crop/reposition dalam slot)
│   └── Overlay template layer di atas
├── Tab Panel di bawah preview:
│   ├── [Filter] — Grid filter thumbnails, tap to apply (real-time preview)
│   ├── [Stickers] — Sticker packs accordion, drag & drop ke canvas
│   │   └── Sticker bisa: drag, resize (pinch/handle), rotate, delete
│   └── [Text] — Add text overlay (pilih font, warna, size)
├── Undo/Redo buttons
└── Tombol: "Selesai & Preview"

STEP 4 — PREVIEW & DOWNLOAD
├── Final composite preview (high-res)
├── Tombol "Download" (save as PNG/JPG)
├── Tombol "Share" (copy link, atau share to social)
├── Tombol "Foto Lagi" (restart)
├── Optional: form nama & email (jika event require_email)
└── Watermark kecil di corner (configurable by admin)
```

**Technical Notes untuk Booth:**

```
PHOTO SLOT POSITIONING SYSTEM:
─────────────────────────────
Template mendefinisikan "photo_slots" sebagai array JSON:
[
  { "x": 40, "y": 40, "width": 520, "height": 390, "borderRadius": 8 },
  { "x": 40, "y": 460, "width": 520, "height": 390, "borderRadius": 8 },
  { "x": 40, "y": 880, "width": 520, "height": 390, "borderRadius": 8 },
  { "x": 40, "y": 1300, "width": 520, "height": 390, "borderRadius": 8 }
]

Setiap slot = area di mana foto user ditempatkan.
Koordinat relatif terhadap canvas template.

Frontend menggunakan <canvas> atau Fabric.js untuk:
1. Render background_image template sebagai base layer
2. Untuk setiap slot, render foto user (dengan object-fit cover, centered)
3. Render overlay_image di atas (PNG dengan transparency — ini frame/border-nya)
4. Render sticker-sticker yang user letakkan
5. Render text overlays

Ini memastikan foto user SELALU berada DI BELAKANG frame/overlay,
sehingga frame menutupi tepi foto dengan rapi.

LAYER ORDER (z-index):
1. Background color/image (paling bawah)
2. Photo slot images (foto user)
3. Decoration layers (jika ada)
4. Overlay/frame image (menutupi tepi foto)
5. User stickers (drag & drop)
6. Text overlays
7. Watermark (paling atas, semi-transparent)
```

#### 6.1.3 Event Landing (`/events/{slug}`)

```
├── Event banner (full-width, dari event.banner)
├── Event logo + name (Instrument Serif)
├── Event description
├── Event info: tanggal, status
├── CTA: "Mulai Foto" → /events/{slug}/booth
├── Gallery preview (recent 8 photos)
└── CTA: "Lihat Gallery" → /events/{slug}/gallery
```

#### 6.1.4 Event Gallery (`/events/{slug}/gallery`)

```
├── Masonry grid layout foto-foto
├── Infinite scroll / load more
├── Klik foto → lightbox view
│   ├── Full-res preview
│   ├── Download button
│   └── Share button
├── Filter: newest / oldest
└── Search by guest name (jika ada)
```

### 6.2 Admin Pages

#### 6.2.1 Admin Layout

```
┌──────────────────────────────────────────────────────────┐
│  Top Bar: Logo | Breadcrumb              User ▾ | 🔔     │
├──────────┬───────────────────────────────────────────────┤
│          │                                               │
│ Sidebar  │   Main Content Area                          │
│          │                                               │
│ Dashboard│   ┌───────────────────────────────────────┐  │
│ Templates│   │                                       │  │
│ Stickers │   │   Page content renders here           │  │
│ Filters  │   │                                       │  │
│ Events   │   │                                       │  │
│ Photos   │   │                                       │  │
│ Users    │   │                                       │  │
│ Settings │   │                                       │  │
│          │   └───────────────────────────────────────┘  │
│          │                                               │
└──────────┴───────────────────────────────────────────────┘

Sidebar:
- Background: White
- Active item: background Rose Cream, text Deep Rose, left border 3px Dusty Pink
- Icons: Lucide, color Muted Mauve (active: Dusty Pink)
- Collapsible di desktop, drawer di mobile
```

#### 6.2.2 Dashboard (`/admin`)

```
Stats Cards Row:
├── Total Foto Hari Ini — ikon Camera, angka besar, +% vs kemarin
├── Event Aktif — ikon Calendar, angka besar
├── Total Template — ikon Layout, angka besar
└── Total User — ikon Users, angka besar

Charts:
├── Line chart: Foto per hari (7 / 30 hari terakhir) 
│   └── Warna garis: Dusty Pink, area fill: Rose Cream 10% opacity
└── Bar chart: Top 5 template paling sering dipakai

Recent Activity:
├── Table: 10 foto terbaru (thumbnail, event, template, waktu)
└── Quick actions: view, delete

Upcoming Events:
└── List card event yang akan datang
```

#### 6.2.3 Template CRUD (`/admin/templates`)

**List View:**
```
├── Header: "Templates" + Button "Buat Template Baru"
├── Search bar + Filter dropdown (layout, status, premium)
├── View toggle: Grid / Table
├── Grid View:
│   └── Card per template:
│       ├── Thumbnail (aspect ratio template)
│       ├── Name + layout badge (e.g. "Strip 4")
│       ├── Status badge (active/inactive)
│       ├── Premium badge (jika premium)
│       └── Actions: Edit | Duplicate | Delete
├── Table View:
│   └── Columns: Thumbnail | Name | Layout | Status | Photos Used | Actions
└── Pagination
```

**Create/Edit Form:**
```
├── Template Info Section
│   ├── Name (text input)
│   ├── Description (textarea)
│   ├── Layout (dropdown: strip_2, strip_3, strip_4, grid_2x2, single, wide_strip_3)
│   ├── Canvas Width (number, auto-suggest based on layout)
│   ├── Canvas Height (number, auto-suggest based on layout)
│   ├── Is Premium (toggle)
│   └── Is Active (toggle)
│
├── Visual Layers Section
│   ├── Background Color picker (with hex input)
│   ├── Background Image upload (drag & drop area)
│   ├── Overlay Image upload (drag & drop area) — INI FRAME UTAMANYA
│   │   └── Help text: "Upload PNG transparan. Area transparan = tempat foto user."
│   └── Thumbnail upload (auto-generate option)
│
├── Photo Slots Editor ⭐ (INI YANG PALING PENTING)
│   ├── Visual canvas editor:
│   │   ├── Tampilkan canvas sesuai ukuran template (scaled)
│   │   ├── Overlay image ditampilkan semi-transparent
│   │   ├── Photo slots ditampilkan sebagai rectangles yang bisa di-drag & resize
│   │   ├── Klik slot → panel properties:
│   │   │   ├── X position (px)
│   │   │   ├── Y position (px)
│   │   │   ├── Width (px)
│   │   │   ├── Height (px)
│   │   │   ├── Border Radius (px)
│   │   │   └── Rotation (deg)
│   │   ├── Button: "+ Add Slot"
│   │   ├── Button: "Remove Slot"
│   │   └── Snap to grid option
│   └── JSON view toggle (untuk advanced user, edit raw JSON)
│
├── Text Overlays Section
│   ├── Add text overlay button
│   ├── Per text overlay:
│   │   ├── Text content
│   │   ├── Position X, Y
│   │   ├── Font (dropdown: Instrument Serif, Cormorant Garamond, Plus Jakarta Sans)
│   │   ├── Font Size
│   │   ├── Font Color (picker)
│   │   └── Rotation
│   └── Real-time preview on canvas
│
├── Live Preview Panel (kanan layar atau bawah)
│   ├── Real-time preview template dengan dummy photos
│   ├── Bisa toggle: show overlay, show slots, show text
│   └── Zoom control
│
└── Save / Cancel buttons
```

#### 6.2.4 Sticker Pack CRUD (`/admin/sticker-packs`)

**List View:**
```
├── Header: "Sticker Packs" + Button "Buat Pack Baru"
├── Grid cards:
│   └── Per pack:
│       ├── Thumbnail
│       ├── Pack name
│       ├── Category badge
│       ├── Sticker count
│       ├── Status
│       └── Actions: Edit | Delete
└── Pagination
```

**Create/Edit Form:**
```
├── Pack Info: Name, Description, Category, Thumbnail
├── Sticker Management:
│   ├── Upload area (multiple file drag & drop, PNG only)
│   ├── Grid preview semua sticker dalam pack
│   ├── Per sticker: preview, name edit, default size, reorder (drag), delete
│   └── Bulk upload support
└── Settings: Is Premium, Is Active, Sort Order
```

#### 6.2.5 Filter CRUD (`/admin/filters`)

**List View:**
```
├── Header: "Filters" + Button "Buat Filter Baru"
├── Grid cards:
│   └── Per filter:
│       ├── Before/after thumbnail
│       ├── Filter name
│       ├── Status
│       └── Actions
└── Pagination
```

**Create/Edit Form:**
```
├── Filter Info: Name
├── CSS Filter Controls (slider per property):
│   ├── Brightness (0-200%)
│   ├── Contrast (0-200%)
│   ├── Saturation (0-200%)
│   ├── Hue Rotate (0-360°)
│   ├── Grayscale (0-100%)
│   ├── Sepia (0-100%)
│   └── Blur (0-10px)
├── Overlay (optional):
│   ├── Overlay image upload (texture, color wash)
│   ├── Blend mode dropdown
│   └── Opacity slider
├── Live Preview:
│   ├── Sample photo with filter applied real-time
│   └── Before/after slider
└── Settings: Is Active, Sort Order
```

#### 6.2.6 Event CRUD (`/admin/events`)

**List View:**
```
├── Tabs: All | Active | Draft | Ended
├── Table/Grid cards:
│   └── Per event:
│       ├── Banner/logo
│       ├── Event name
│       ├── Date range
│       ├── Status badge (warna sesuai status)
│       ├── Photo count
│       ├── Unique link
│       └── Actions: View | Edit | Manage Photos | Export | Delete
└── Pagination
```

**Create/Edit Form:**
```
├── Basic Info:
│   ├── Event Name
│   ├── Slug (auto-generate from name, editable)
│   ├── Short Code (auto-generate, 6 chars)
│   ├── Description (rich text)
│   ├── Start Date & Time
│   ├── End Date & Time
│   └── Status (draft/active/paused)
│
├── Branding:
│   ├── Logo upload
│   ├── Banner upload
│   ├── Primary Color override (picker)
│   ├── Secondary Color override (picker)
│   ├── Tagline text
│   ├── Footer text
│   └── Watermark text
│
├── Booth Configuration:
│   ├── Template assignment (multi-select, search + drag reorder)
│   ├── Sticker pack assignment (multi-select)
│   ├── Filter assignment (multi-select)
│   ├── Max photos per session
│   ├── Countdown seconds (1-10)
│   ├── Require guest email (toggle)
│   └── Photo limit (number, 0 = unlimited)
│
├── Gallery Settings:
│   ├── Gallery public (toggle)
│   └── Allow download from gallery (toggle)
│
└── Preview & Share:
    ├── Preview event landing page (dalam modal/new tab)
    ├── Copy event link
    └── QR Code generate untuk event URL
```

#### 6.2.7 Photo Management (`/admin/photos`)

```
├── Filter: Event, Date range, Template
├── Masonry grid dengan checkboxes
├── Bulk actions: Delete, Export ZIP
├── Per photo:
│   ├── Thumbnail
│   ├── Event name
│   ├── Template used
│   ├── Guest info (jika ada)
│   ├── Timestamp
│   └── Actions: View full, Download, Delete
└── Pagination
```

#### 6.2.8 User Management (`/admin/users`)

```
├── Table: Avatar | Name | Email | Role | Status | Last Login | Actions
├── Create/Edit Form:
│   ├── Name, Email, Password (create only)
│   ├── Role: Admin / Operator / User
│   └── Is Active (toggle)
└── Pagination + Search
```

#### 6.2.9 Settings (`/admin/settings`)

```
Grouped tabs:
├── General:
│   ├── Site Name
│   ├── Site Tagline
│   ├── Logo upload
│   ├── Favicon upload
│   └── Contact email
│
├── Booth Defaults:
│   ├── Default countdown seconds
│   ├── Default max photos per session
│   ├── Enable mirror mode by default
│   ├── Default image quality (70-100%)
│   └── Max image resolution
│
├── Branding:
│   ├── Default watermark text
│   ├── Watermark position (dropdown)
│   ├── Watermark opacity (slider)
│   └── Default primary color
│
└── Storage:
    ├── Storage driver (local / s3)
    ├── S3 credentials (jika s3)
    ├── Photo retention days (0 = keep forever)
    └── Max upload size (MB)
```

---

## 7. TEMPLATE DESIGN SYSTEM — PANDUAN MEMBUAT GAMBAR

Ini panduan detail supaya gambar yang dibuat **pas** dengan posisi foto.

### 7.1 Standard Template Dimensions

```
LAYOUT: STRIP_4 (Photo strip vertical, 4 foto)
├── Canvas: 600 x 1800 px (rasio 1:3)
├── Photo slots: 4 buah
├── Slot size: 520 x 350 px (rasio ~3:2)
├── Spacing between slots: 30 px
├── Margin top/bottom: 40 px
├── Margin left/right: 40 px
└── Area bawah untuk branding text: ~120 px

LAYOUT: STRIP_3 (Photo strip vertical, 3 foto)
├── Canvas: 600 x 1500 px
├── Photo slots: 3 buah
├── Slot size: 520 x 380 px
└── Spacing & margins sama

LAYOUT: STRIP_2 (Photo strip vertical, 2 foto)
├── Canvas: 600 x 1100 px
├── Photo slots: 2 buah
├── Slot size: 520 x 400 px
└── Spacing & margins sama

LAYOUT: GRID_2X2 (2 kolom × 2 baris)
├── Canvas: 1200 x 1200 px (square)
├── Photo slots: 4 buah
├── Slot size: 560 x 420 px
├── Grid gap: 20 px
├── Margin all sides: 40 px
└── Bottom area untuk branding: 80 px

LAYOUT: SINGLE (Single photo with frame)
├── Canvas: 800 x 1000 px 
├── Photo slot: 1 buah
├── Slot size: 720 x 540 px (atau custom)
└── Frame border area: ~40 px semua sisi

LAYOUT: WIDE_STRIP_3 (Horizontal, 3 foto sejajar)
├── Canvas: 1800 x 600 px
├── Photo slots: 3 buah
├── Slot size: 540 x 400 px
└── Horizontal spacing: 30 px
```

### 7.2 Cara Membuat Template Image (Overlay)

```
PRINSIP UTAMA:
Overlay image = PNG dengan area TRANSPARAN di mana foto user akan muncul.

STEP-BY-STEP:
1. Buka software design (Figma/Photoshop/Canva)
2. Buat canvas sesuai dimensi layout yang dipilih
3. Design frame/border/dekorasi di SEKITAR area foto
4. Area yang akan diisi foto user → HARUS TRANSPARAN (hapus/kosongkan)
5. Export sebagai PNG-24 dengan transparency

VISUALISASI (Strip 4):
┌──────────────────────────┐
│ ┌──────────────────────┐ │
│ │                      │ │ ← Area transparan (foto 1)
│ │     TRANSPARENT      │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │                      │ │ ← Area transparan (foto 2)
│ │     TRANSPARENT      │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │                      │ │ ← Area transparan (foto 3)
│ │     TRANSPARENT      │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │                      │ │ ← Area transparan (foto 4)
│ │     TRANSPARENT      │ │
│ └──────────────────────┘ │
│   🌸 Event Name 2025 🌸  │ ← Solid area (text/branding)
└──────────────────────────┘

Area SOLID = frame, border, dekorasi → WARNA/GAMBAR (ini yang menutupi tepi foto)
Area TRANSPARENT = slot foto → KOSONG (foto user render di belakang layer ini)
```

### 7.3 Template Checklist

```
☐ File format: PNG-24 (with alpha transparency)
☐ Resolution: sesuai dimensi canvas layout
☐ DPI: 72 (untuk web) atau 300 (jika support print)
☐ Area foto benar-benar transparan (alpha = 0)
☐ Overlay edges rapi (no jagged edges di border antara frame dan transparency)
☐ File size: optimal < 2MB per overlay
☐ Test: overlay di atas dummy photo — pastikan framing rapi
☐ Photo slot coordinates di JSON HARUS match dengan area transparan di overlay
☐ Beri margin 2-4px overlap antara foto dan frame supaya tidak ada gap putih
☐ Sediakan juga thumbnail (400 x auto) untuk preview di template selector
```

### 7.4 Dusty Pink Template Styling Guide

Saat membuat template yang sesuai brand:

```
WARNA FRAME:
- Utama: #C4919B (Dusty Pink) atau #E8CDD0 (Blush Mist)
- Border frame: solid #C4919B 3-5px, atau gradien Dusty Pink ke Deep Rose
- Dekorasi: floral line art #A66B76, dot pattern #E8CDD0
- Text branding: #2D2226 (Charcoal) pada Instrument Serif

STYLE VARIATIONS:
1. Minimalis Clean — Frame tipis #C4919B, background Petal White, 
   text branding kecil di corner
2. Floral Elegant — Frame medium, dekorasi floral line art di corner, 
   Cormorant Garamond text, dusty pink + sage soft accents
3. Modern Bold — Frame tebal Deep Rose, geometric accent shapes, 
   Plus Jakarta Sans bold text
4. Vintage Film — Frame dengan sprocket holes effect, 
   slightly rounded corners, sepia-ish dusty pink
5. Polaroid Style — White frame tebal bawah (seperti polaroid), 
   handwriting-style text di area bawah
```

---

## 8. IMAGE PROCESSING PIPELINE

### 8.1 Client-Side (Preferred — faster, privacy-friendly)

```
CAPTURE → FILTER → PLACE IN SLOT → COMPOSITE → EXPORT

1. CAPTURE
   - react-webcam → getScreenshot() → base64 JPEG
   - Resolusi: max 1920x1080 (scale down jika lebih besar)
   - Mirror: flip horizontal jika front camera

2. FILTER  
   - Apply CSS filter ke <canvas>
   - ctx.filter = "brightness(1.1) contrast(1.05) saturate(0.9) sepia(0.15)"
   - Jika ada overlay filter: draw dengan globalCompositeOperation

3. PLACE IN SLOT
   - Untuk setiap foto, hitung crop & position:
     a. Source foto aspect ratio vs slot aspect ratio
     b. Object-fit: cover calculation
     c. Draw foto ke slot position di canvas
   - Support: user bisa drag foto dalam slot untuk adjust position

4. COMPOSITE (Layer stacking)
   canvas = new OffscreenCanvas(template.canvas_width, template.canvas_height)
   ctx = canvas.getContext('2d')
   
   // Layer 1: Background
   ctx.drawImage(backgroundImage, 0, 0)
   
   // Layer 2: Photos in slots
   for (slot of template.photo_slots) {
     ctx.save()
     // Clip to slot area (with borderRadius)
     roundRect(ctx, slot.x, slot.y, slot.width, slot.height, slot.borderRadius)
     ctx.clip()
     // Draw photo (object-fit: cover)
     drawCoverImage(ctx, photo, slot)
     ctx.restore()
   }
   
   // Layer 3: Overlay (frame)
   ctx.drawImage(overlayImage, 0, 0)
   
   // Layer 4: Stickers
   for (sticker of appliedStickers) {
     ctx.save()
     ctx.translate(sticker.x + sticker.width/2, sticker.y + sticker.height/2)
     ctx.rotate(sticker.rotation * Math.PI / 180)
     ctx.drawImage(stickerImg, -sticker.width/2, -sticker.height/2, 
                   sticker.width, sticker.height)
     ctx.restore()
   }
   
   // Layer 5: Text overlays
   for (text of textOverlays) {
     ctx.font = `${text.size}px "${text.font}"`
     ctx.fillStyle = text.color
     ctx.fillText(text.content, text.x, text.y)
   }
   
   // Layer 6: Watermark
   drawWatermark(ctx, settings.watermark)

5. EXPORT
   - canvas.toBlob(blob, 'image/png', 1.0) untuk lossless
   - canvas.toBlob(blob, 'image/jpeg', 0.92) untuk JPEG
   - Download via URL.createObjectURL(blob)
   - Optional: upload ke server via API
```

### 8.2 Server-Side (Backup / gallery generation)

```php
// Menggunakan Intervention Image 3.x
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

$manager = new ImageManager(new Driver());

// Load template background
$canvas = $manager->read(storage_path('templates/bg.png'));

// Place photos in slots
foreach ($template->photo_slots as $index => $slot) {
    $photo = $manager->read($photos[$index]->path);
    
    // Resize to cover slot
    $photo->cover($slot['width'], $slot['height']);
    
    // Place on canvas
    $canvas->place($photo, 'top-left', $slot['x'], $slot['y']);
}

// Apply overlay frame
$overlay = $manager->read(storage_path('templates/overlay.png'));
$canvas->place($overlay, 'top-left', 0, 0);

// Save
$canvas->save(storage_path('results/final.png'));
```

---

## 9. RESPONSIVE & MOBILE DESIGN

### 9.1 Breakpoints

```
sm  :  640px   — Mobile landscape
md  :  768px   — Tablet portrait
lg  : 1024px   — Tablet landscape / small desktop
xl  : 1280px   — Desktop
2xl : 1536px   — Large desktop
```

### 9.2 Mobile-Specific Booth UX

```
MOBILE BOOTH LAYOUT:
┌─────────────────────┐
│  Camera Viewfinder   │ ← 75% viewport height
│  (full-width)        │
│                      │
│    [Mirror] [Flash]  │ ← Floating controls
│                      │
├─────────────────────┤
│  Mini strip preview  │ ← Horizontal scroll, foto2 kecil
│  [📷1] [📷2] [  ] [  ] │
├─────────────────────┤
│  [ 📸 Ambil Foto ]  │ ← CTA besar, sticky bottom
└─────────────────────┘

MOBILE EDIT LAYOUT:
┌─────────────────────┐
│  Composite Preview   │ ← Scalable, pinch to zoom
│                      │
├─────────────────────┤
│  [Filter][Sticker][Text] │ ← Tab bar sticky bottom
├─────────────────────┤
│  Tab content area    │ ← Slide up panel
│  (filter grid /      │
│   sticker grid)      │
├─────────────────────┤
│  [ ✓ Selesai ]       │ ← CTA sticky
└─────────────────────┘
```

### 9.3 Touch Interactions

```
- Sticker placement: Long press → drag to canvas
- Sticker resize: Pinch gesture (2 finger)
- Sticker rotate: Two finger rotate gesture
- Photo in slot: Pan/drag to reposition
- Preview zoom: Pinch to zoom
- Tab panel: Swipe up/down to expand/collapse
- Gallery: Pull to refresh
```

---

## 10. PERFORMANCE REQUIREMENTS

```
Target Metrics:
├── First Contentful Paint  : < 1.5s
├── Largest Contentful Paint: < 2.5s  
├── Time to Interactive     : < 3.0s
├── Camera ready            : < 2.0s after permission granted
├── Photo capture           : < 300ms (shutter to preview)
├── Filter apply            : < 100ms (real-time preview)
├── Final composite render  : < 2.0s
├── Download start          : < 1.0s after click
└── API response (CRUD)     : < 500ms p95

Optimizations:
├── Template images: WebP with PNG fallback, lazy load
├── Sticker images: SVG preferred, PNG < 100KB each
├── Photo compression: client-side before upload (max 2MB)
├── Canvas rendering: OffscreenCanvas + Web Workers for heavy compositing
├── Template list: virtual scroll jika > 50 items
├── Image CDN: serve via CloudFront/Cloudflare with auto-resize
├── API: eager load relationships, proper indexing
└── Cache: Redis cache for settings, template metadata
```

---

## 11. SECURITY

```
├── Laravel Sanctum token-based auth (SPA mode with cookies untuk same-domain,
│   atau Bearer token untuk cross-domain)
├── CSRF protection via Sanctum
├── Rate limiting:
│   ├── Auth endpoints: 5 req/min
│   ├── Photo upload: 20 req/min
│   └── General API: 60 req/min
├── File upload validation:
│   ├── MIME type check (image/png, image/jpeg only)
│   ├── Max file size: 10MB per image
│   ├── Image dimension check (max 4096x4096)
│   └── Virus scan (optional, via ClamAV)
├── Input sanitization: semua text input di-sanitize
├── SQL injection: Eloquent ORM + parameterized queries
├── XSS: React auto-escapes, + Content-Security-Policy headers
├── CORS: whitelist frontend domain only
├── Storage: signed URLs untuk private photos (expiring links)
└── Admin auth: middleware group, role check via Spatie Permission
```

---

## 12. DEPLOYMENT & INFRASTRUCTURE

```
PRODUCTION STACK:
├── Server: VPS / Cloud (DigitalOcean, AWS, Hetzner)
├── OS: Ubuntu 24.04 LTS
├── Web Server: Nginx + PHP-FPM
├── PHP: 8.2+
├── Node: 20 LTS (for build)
├── Database: MySQL 8 / PostgreSQL 15
├── Cache: Redis 7
├── Storage: S3-compatible (MinIO for self-host, AWS S3 for cloud)
├── Queue: Laravel Horizon + Redis
├── SSL: Let's Encrypt via Certbot
├── CI/CD: GitHub Actions
│   ├── Test → Build React → Deploy Backend → Deploy Frontend
│   └── Auto-migration via Artisan
└── Monitoring: Laravel Telescope (dev), Horizon dashboard (queue)

DOCKER (Development):
├── docker-compose.yml
│   ├── app (PHP-FPM + Laravel)
│   ├── nginx 
│   ├── mysql
│   ├── redis
│   ├── minio (S3-compatible storage)
│   └── node (React dev server)
```

---

## 13. DEVELOPMENT PHASES

### Phase 1 — Foundation (Week 1-2)

```
☐ Setup Laravel project + database + auth
☐ Setup React + Vite + Tailwind + routing
☐ Design system implementation (colors, fonts, components)
☐ Admin layout (sidebar, topbar, responsive)
☐ Auth flow (login, register, forgot password)
☐ Dashboard page (placeholder stats)
```

### Phase 2 — CRUD Admin (Week 3-4)

```
☐ Template CRUD (list, create, edit, delete, reorder)
☐ Template Layer Editor (visual slot positioning)
☐ Sticker Pack CRUD + bulk upload stickers
☐ Filter CRUD + live preview
☐ Event CRUD + template/sticker/filter assignment
☐ User Management CRUD
☐ Settings page
```

### Phase 3 — Photobooth Core (Week 5-7)

```
☐ Camera capture (react-webcam, mirror, countdown)
☐ Template selector (public)
☐ Photo slot placement (canvas compositing)
☐ Filter application (CSS + canvas)
☐ Sticker drag & drop (Fabric.js)
☐ Text overlay
☐ Final composite generation
☐ Download & share
☐ Photo session management (API)
```

### Phase 4 — Events & Gallery (Week 8-9)

```
☐ Event landing page (public)
☐ Event-specific booth (custom templates, branding)
☐ Event gallery (masonry grid, lightbox)
☐ Public gallery
☐ Photo upload to server (optional)
☐ Gallery moderation (admin)
☐ Export gallery as ZIP
```

### Phase 5 — Polish & Launch (Week 10-11)

```
☐ Landing page (hero, how it works, showcase)
☐ Animations (Framer Motion: page transitions, micro-interactions)
☐ Mobile optimization & touch gestures
☐ Performance audit & optimization
☐ SEO meta tags
☐ Error handling & empty states
☐ Testing (unit + integration)
☐ Deployment setup (CI/CD, SSL, CDN)
☐ Seed data (demo templates, stickers, filters)
```

### Phase 6 — Future Enhancements

```
☐ AI background removal
☐ AI style transfer filters
☐ Video booth mode (boomerang, GIF)
☐ Social media direct share (IG Stories, WhatsApp)
☐ Print mode (optimize for 4x6 / 2x6 print)
☐ Multi-language support (i18n)
☐ Premium subscription / payment integration
☐ Analytics dashboard (detailed usage stats)
☐ Custom domain per event
☐ White-label option
```

---

## 14. TAILWIND CONFIG

```js
// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary
        'dusty-pink': {
          50:  '#FDF5F6',   // Petal White
          100: '#F5E6E8',   // Rose Cream
          200: '#E8CDD0',   // Blush Mist
          300: '#D4A8AE',
          400: '#C4919B',   // Dusty Pink (PRIMARY)
          500: '#B47A85',
          600: '#A66B76',   // Deep Rose
          700: '#8C5562',
          800: '#73414F',
          900: '#5A303D',
          950: '#2D2226',   // Charcoal
        },
        // Neutrals
        'warm-gray': {
          50:  '#F7F3F4',   // Cloud
          100: '#EEEBEC',
          200: '#D4CBCC',   // Soft Gray
          300: '#B8ACAE',
          400: '#9A8B8E',   // Muted Mauve
          500: '#6B5B5F',   // Warm Gray (body text)
          600: '#564A4D',
          700: '#41383A',
          800: '#2D2226',   // Charcoal
          900: '#1A1416',
        },
        // Accents
        'mauve-gold':  '#C4A882',
        'sage-soft':   '#A8B5A0',
        'terra-blush': '#D4A59A',
        'muted-red':   '#C97070',
        'dusty-blue':  '#8FA6B5',
      },
      fontFamily: {
        'heading': ['"Instrument Serif"', ...defaultTheme.fontFamily.serif],
        'body':    ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        'accent':  ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
        'mono':    ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        'xs': '6px',
        'sm': '10px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
      },
      boxShadow: {
        'card':    '0 2px 12px rgba(196, 145, 155, 0.08)',
        'card-hover': '0 4px 20px rgba(196, 145, 155, 0.14)',
        'btn':     '0 1px 3px rgba(196, 145, 155, 0.15)',
        'modal':   '0 16px 48px rgba(45, 34, 38, 0.12)',
      },
      animation: {
        'fade-in':     'fadeIn 0.3s ease-out',
        'slide-up':    'slideUp 0.3s ease-out',
        'scale-in':    'scaleIn 0.2s ease-out',
        'countdown':   'countdownPulse 1s ease-in-out',
        'flash':       'flash 0.3s ease-out',
      },
      keyframes: {
        fadeIn:     { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp:    { '0%': { opacity: 0, transform: 'translateY(16px)' }, 
                      '100%': { opacity: 1, transform: 'translateY(0)' } },
        scaleIn:    { '0%': { opacity: 0, transform: 'scale(0.95)' }, 
                      '100%': { opacity: 1, transform: 'scale(1)' } },
        countdownPulse: { '0%': { transform: 'scale(1)', opacity: 1 }, 
                          '50%': { transform: 'scale(1.3)' }, 
                          '100%': { transform: 'scale(0.8)', opacity: 0 } },
        flash:      { '0%': { opacity: 0.8 }, '100%': { opacity: 0 } },
      },
    },
  },
  plugins: [],
}
```

---

## 15. FONT LOADING

```css
/* src/styles/fonts.css */

/* Instrument Serif — Heading/Display */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

/* Plus Jakarta Sans — Body/UI (weight 400, 500, 600, 700) */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

/* Cormorant Garamond — Accent/Overlay (weight 400, 500, 600) */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');

/* JetBrains Mono — Code/Technical (weight 400, 500) */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

---

## 16. KEY CONVENTIONS & RULES

### Coding Standards

```
BACKEND (Laravel):
├── PSR-12 coding style
├── Strict types di semua file PHP
├── Form Request untuk validasi (TIDAK di controller)
├── API Resource untuk response formatting
├── Service class untuk business logic kompleks
├── Enum class untuk constants
├── Soft deletes untuk semua entity utama
├── Database transactions untuk operasi multi-table
└── Queue jobs untuk image processing

FRONTEND (React):
├── Functional components only (no class components)
├── Custom hooks untuk reusable logic
├── Zustand untuk global state (minimal, prefer server state)
├── TanStack Query untuk semua API calls
├── Zod schema untuk form validation
├── Path alias: @ → src/
├── File naming: PascalCase.jsx (components), camelCase.js (utils/hooks)
├── Tailwind utility classes (hindari custom CSS kecuali animasi kompleks)
└── Framer Motion untuk animasi (AnimatePresence untuk exit animations)
```

### Git Workflow

```
main          — production-ready
├── develop   — integration branch
├── feature/* — feature branches
├── fix/*     — bugfix branches
└── release/* — release preparation

Commit format: type(scope): description
Examples:
  feat(booth): add countdown overlay animation
  fix(template): correct photo slot positioning calculation
  style(admin): update sidebar dusty pink active state
  refactor(api): extract image composite to service class
```

---

*Document Version: 1.0*  
*Last Updated: Juli 2026*  
*Stack: Laravel 11 + React 18 + Tailwind CSS 3*
