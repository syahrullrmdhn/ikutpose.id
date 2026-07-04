import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './features/landing/LandingPage'
import AboutPage from './features/pages/AboutPage'
import ContactPage from './features/pages/ContactPage'
import PricingPage from './features/pages/PricingPage'
import BoothPage from './features/booth/BoothPage'
import PublicEvents from './features/events/PublicEvents'
import PublicGallery from './features/gallery/PublicGallery'
import EventLanding from './features/events/EventLanding'
import EventGallery from './features/events/EventGallery'
import EventBoothPage from './features/events/EventBoothPage'
import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import ProfilePage from './features/auth/ProfilePage'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './features/admin/dashboard/Dashboard'
import TemplateList from './features/admin/templates/TemplateList'
import TemplateForm from './features/admin/templates/TemplateForm'
import StickerPackList from './features/admin/stickers/StickerPackList'
import StickerPackForm from './features/admin/stickers/StickerPackForm'
import FilterList from './features/admin/filters/FilterList'
import FilterForm from './features/admin/filters/FilterForm'
import EventList from './features/admin/events/EventList'
import EventForm from './features/admin/events/EventForm'
import PhotoManagement from './features/admin/photos/PhotoManagement'
import UserList from './features/admin/users/UserList'
import UserForm from './features/admin/users/UserForm'
import GeneralSettings from './features/admin/settings/GeneralSettings'

export default function App() {
 return (
 <BrowserRouter future={{ v7_relativeSplatPath: true }}>
 <Routes>
 <Route path="/" element={<LandingPage />} />
 <Route path="/booth" element={<BoothPage />} />
 <Route path="/events" element={<PublicEvents />} />
 <Route path="/gallery" element={<PublicGallery />} />
 <Route path="/login" element={<LoginPage />} />
 <Route path="/register" element={<RegisterPage />} />
 <Route path="/profile" element={<ProfilePage />} />
 <Route path="/about" element={<AboutPage />} />
 <Route path="/pricing" element={<PricingPage />} />
 <Route path="/contact" element={<ContactPage />} />
 <Route path="/events/:slug" element={<EventLanding />} />
 <Route path="/events/:slug/booth" element={<EventBoothPage />} />
 <Route path="/events/:slug/gallery" element={<EventGallery />} />

 <Route path="/admin" element={<AdminLayout />}>
 <Route index element={<Dashboard />} />
 <Route path="templates" element={<TemplateList />} />
 <Route path="templates/create" element={<TemplateForm />} />
 <Route path="templates/:id/edit" element={<TemplateForm />} />
 <Route path="sticker-packs" element={<StickerPackList />} />
 <Route path="sticker-packs/create" element={<StickerPackForm />} />
 <Route path="sticker-packs/:id/edit" element={<StickerPackForm />} />
 <Route path="filters" element={<FilterList />} />
 <Route path="filters/create" element={<FilterForm />} />
 <Route path="filters/:id/edit" element={<FilterForm />} />
 <Route path="events" element={<EventList />} />
 <Route path="events/create" element={<EventForm />} />
 <Route path="events/:id/edit" element={<EventForm />} />
 <Route path="photos" element={<PhotoManagement />} />
 <Route path="users" element={<UserList />} />
 <Route path="users/create" element={<UserForm />} />
 <Route path="users/:id/edit" element={<UserForm />} />
 <Route path="settings" element={<GeneralSettings />} />
 </Route>
 </Routes>
 </BrowserRouter>
 )
}
