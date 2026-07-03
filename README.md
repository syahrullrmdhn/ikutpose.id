# 📸 IkutPose - Digital Photobooth Web App

A modern digital photobooth web application built with Laravel 11 (Backend) and React 18 (Frontend). Capture moments, apply templates, filters, and stickers, then download or share your photo strips.

![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=flat&logo=laravel)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

---

## ✨ Features

- **Zero Install** — Runs directly in the browser, no app download required
- **Template-Driven** — Admin can upload and manage frame/overlay templates without coding
- **Event-Ready** — Each event has a unique URL, custom branding, and separate gallery
- **Privacy-First** — Client-side processing option, photos not stored on server without user consent
- **Real-time Editing** — Apply filters, add stickers, and customize photo strips instantly
- **Responsive Design** — Works seamlessly on desktop and mobile devices

---

## 🎨 Design System

**Theme:** Dusty Pink · Slow Living · Firm Elegance

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Dusty Pink | `#C4919B` | Primary brand, CTA buttons |
| Deep Rose | `#A66B76` | Hover states, strong accents |
| Blush Mist | `#E8CDD0` | Soft backgrounds, cards |
| Rose Cream | `#F5E6E8` | Page backgrounds |
| Charcoal | `#2D2226` | Heading text |
| Warm Gray | `#6B5B5F` | Body text |

### Typography

- **Headings:** Instrument Serif (elegant, intentional)
- **Body:** Plus Jakarta Sans (modern, readable)
- **Accent:** Cormorant Garamond (overlay text, watermarks)
- **Monospace:** JetBrains Mono (codes, technical text)

---

## 🏗️ Architecture

### Tech Stack

**Backend (Laravel 11):**
- PHP 8.2+
- Laravel Sanctum (API Authentication)
- Spatie Media Library (File Management)
- Intervention Image (Image Processing)
- Spatie Permission (Role & Permission)
- Maatwebsite Excel (Data Export)
- SQLite (Development) / MySQL / PostgreSQL (Production)

**Frontend (React 18):**
- Vite 5.x (Build Tool)
- React Router v6 (Routing)
- TanStack Query (Server State)
- Zustand (Client State)
- React Hook Form + Zod (Form & Validation)
- Tailwind CSS 3.x (Styling)
- Framer Motion (Animations)
- Fabric.js (Canvas Manipulation)
- Lucide React (Icons)

---

## 📁 Project Structure

```
ikutpose/
├── backend/                    # Laravel 11 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   ├── Middleware/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Models/
│   │   ├── Services/
│   │   ├── Jobs/
│   │   └── Enums/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   │   └── api.php
│   └── storage/
│
├── frontend/                   # React 18 SPA
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   └── shared/
│   │   ├── features/
│   │   │   ├── booth/
│   │   │   ├── events/
│   │   │   ├── gallery/
│   │   │   └── admin/
│   │   ├── hooks/
│   │   ├── stores/
│   │   ├── utils/
│   │   └── styles/
│   ├── public/
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── AGENTS.md                   # Full project specification
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- SQLite (for development)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/syahrullrmdhn/ikutpose.id.git
cd ikutpose.id
```

#### 2. Backend Setup

```bash
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# (Optional) Seed the database
php artisan db:seed

# Start development server
php artisan serve
```

#### 3. Frontend Setup

```bash
cd frontend

# Install npm dependencies
npm install

# Start development server
npm run dev
```

#### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api

---

## 📊 Database Schema

### Entity Relationships

```
users ─────────────┬─── events (hasMany)
                    ├─── photos (hasMany)
                    └─── photo_sessions (hasMany)

templates ─────────┬─── template_layers (hasMany)
                    └─── events (belongsToMany)

sticker_packs ─────┬─── stickers (hasMany)
                    └─── events (belongsToMany)

filters ───────────┬─── events (belongsToMany)

events ────────────┬─── photo_sessions (hasMany)
                    ├─── templates (belongsToMany)
                    ├─── sticker_packs (belongsToMany)
                    └─── filters (belongsToMany)

photo_sessions ────┬─── photos (hasMany)
```

### Main Tables

- `users` — User accounts with roles (admin, operator, user)
- `templates` — Photo strip templates with layout configurations
- `template_layers` — Layer components for templates
- `sticker_packs` — Collections of stickers
- `stickers` — Individual sticker items
- `filters` — Image filter configurations
- `events` — Photo booth events with custom branding
- `photo_sessions` — Individual photo session instances
- `photos` — Captured photos within sessions
- `settings` — Application configuration key-value store

---

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/register         # Register new user
POST   /api/auth/login            # Login, return token
POST   /api/auth/logout           # Revoke token
GET    /api/auth/me               # Get current user
PUT    /api/auth/profile          # Update profile
```

### Admin - Templates

```
GET    /api/admin/templates       # List all templates
POST   /api/admin/templates       # Create template
GET    /api/admin/templates/{id}  # Template detail
PUT    /api/admin/templates/{id}  # Update template
DELETE /api/admin/templates/{id}  # Delete template
```

### Admin - Events

```
GET    /api/admin/events          # List all events
POST   /api/admin/events          # Create event
GET    /api/admin/events/{id}     # Event detail
PUT    /api/admin/events/{id}     # Update event
DELETE /api/admin/events/{id}     # Delete event
```

### Public - Booth

```
GET    /api/booth/templates       # Available templates
GET    /api/booth/sticker-packs   # Available stickers
GET    /api/booth/filters         # Available filters
POST   /api/booth/sessions        # Start photo session
```

---

## 🎭 Template Layouts

| Layout | Dimensions | Photo Slots |
|--------|------------|-------------|
| Strip 2 | 600 × 1100 px | 2 photos (vertical) |
| Strip 3 | 600 × 1500 px | 3 photos (vertical) |
| Strip 4 | 600 × 1800 px | 4 photos (vertical) |
| Grid 2×2 | 1200 × 1200 px | 4 photos (grid) |
| Single | 800 × 1000 px | 1 photo |
| Wide Strip 3 | 1800 × 600 px | 3 photos (horizontal) |

---

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
php artisan serve          # Start development server
php artisan migrate        # Run migrations
php artisan db:seed        # Seed database
php artisan test           # Run tests
```

**Frontend:**
```bash
npm run dev                # Start development server
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Run ESLint
```

### Code Style

- **Backend:** PSR-12 coding standards
- **Frontend:** ESLint + Prettier
- **Commits:** Conventional Commits format

---

## 📦 Deployment

### Production Stack

- Server: VPS / Cloud (DigitalOcean, AWS, Hetzner)
- Web Server: Nginx + PHP-FPM
- Database: MySQL 8 / PostgreSQL 15
- Cache: Redis
- Storage: S3-compatible (AWS S3, MinIO)
- SSL: Let's Encrypt

### Build for Production

```bash
# Backend
cd backend
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Frontend
cd frontend
npm run build
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Syahrul Ramadhan**
- GitHub: [@syahrullrmdhn](https://github.com/syahrullrmdhn)
- Repository: [ikutpose.id](https://github.com/syahrullrmdhn/ikutpose.id)

---

## 🙏 Acknowledgments

Design inspiration from:
- [nabooth.id](https://nabooth.id/)
- [photobooth-io.com](https://photobooth-io.com/)
- [photoboothcamera.com](https://photoboothcamera.com/)
- [yoyobooth.com](https://www.yoyobooth.com/)
