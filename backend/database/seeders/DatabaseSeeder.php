<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Filter;
use App\Models\Setting;
use App\Models\Sticker;
use App\Models\StickerPack;
use App\Models\Template;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->seedUsers();
        $this->seedTemplates();
        $this->seedStickerPacks();
        $this->seedFilters();
        $this->seedEvents();
        $this->seedSettings();
    }

    private function seedUsers(): void
    {
        User::create([
            'name' => 'Admin Utama',
            'email' => 'admin@ikutpose.id',
            'password' => 'admin123',
            'role' => 'admin',
            'is_active' => true,
        ]);

        for ($i = 1; $i <= 3; $i++) {
            User::create([
                'name' => "Operator {$i}",
                'email' => "operator{$i}@ikutpose.com",
                'password' => 'admin123',
                'role' => 'operator',
                'is_active' => true,
            ]);
        }

        $regularUsers = [
            ['name' => 'Siti Rahayu', 'email' => 'siti.rahayu@mail.com'],
            ['name' => 'Budi Santoso', 'email' => 'budi.santoso@mail.com'],
            ['name' => 'Dewi Lestari', 'email' => 'dewi.lestari@mail.com'],
            ['name' => 'Ahmad Fauzi', 'email' => 'ahmad.fauzi@mail.com'],
            ['name' => 'Rina Wulandari', 'email' => 'rina.wulandari@mail.com'],
        ];

        foreach ($regularUsers as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => 'admin123',
                'role' => 'user',
                'is_active' => true,
            ]);
        }
    }

    private function seedTemplates(): void
    {
        $admin = User::where('email', 'admin@ikutpose.id')->first();

        $templates = [
            [
                'name' => 'Classic Strip 4',
                'description' => 'Photo strip klasik dengan 4 foto vertikal. Cocok untuk event apapun.',
                'layout' => 'strip_4',
                'canvas_width' => 600,
                'canvas_height' => 1800,
                'background_color' => '#FDF5F6',
                'photo_slots' => [
                    ['x' => 40, 'y' => 40, 'width' => 520, 'height' => 350, 'borderRadius' => 8, 'rotation' => 0],
                    ['x' => 40, 'y' => 420, 'width' => 520, 'height' => 350, 'borderRadius' => 8, 'rotation' => 0],
                    ['x' => 40, 'y' => 800, 'width' => 520, 'height' => 350, 'borderRadius' => 8, 'rotation' => 0],
                    ['x' => 40, 'y' => 1180, 'width' => 520, 'height' => 350, 'borderRadius' => 8, 'rotation' => 0],
                ],
                'text_overlays' => [
                    ['text' => 'ikutpose', 'x' => 300, 'y' => 1620, 'font' => 'Instrument Serif', 'size' => 28, 'color' => '#C4919B', 'rotation' => 0],
                ],
                'is_premium' => false,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Modern Grid 2x2',
                'description' => 'Grid modern 2x2 untuk foto bersama. Layout square yang Instagrammable.',
                'layout' => 'grid_2x2',
                'canvas_width' => 1200,
                'canvas_height' => 1200,
                'background_color' => '#FFFFFF',
                'photo_slots' => [
                    ['x' => 40, 'y' => 40, 'width' => 540, 'height' => 540, 'borderRadius' => 12, 'rotation' => 0],
                    ['x' => 620, 'y' => 40, 'width' => 540, 'height' => 540, 'borderRadius' => 12, 'rotation' => 0],
                    ['x' => 40, 'y' => 620, 'width' => 540, 'height' => 540, 'borderRadius' => 12, 'rotation' => 0],
                    ['x' => 620, 'y' => 620, 'width' => 540, 'height' => 540, 'borderRadius' => 12, 'rotation' => 0],
                ],
                'text_overlays' => [
                    ['text' => 'ikutpose', 'x' => 600, 'y' => 1180, 'font' => 'Plus Jakarta Sans', 'size' => 24, 'color' => '#A66B76', 'rotation' => 0],
                ],
                'is_premium' => false,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Polaroid Single',
                'description' => 'Gaya polaroid klasik dengan satu foto besar. Nostalgic dan timeless.',
                'layout' => 'single',
                'canvas_width' => 800,
                'canvas_height' => 1000,
                'background_color' => '#FFFFFF',
                'photo_slots' => [
                    ['x' => 40, 'y' => 40, 'width' => 720, 'height' => 720, 'borderRadius' => 4, 'rotation' => 0],
                ],
                'text_overlays' => [
                    ['text' => 'Abadikan momen, ciptakan kenangan', 'x' => 400, 'y' => 880, 'font' => 'Cormorant Garamond', 'size' => 32, 'color' => '#6B5B5F', 'rotation' => 0],
                ],
                'is_premium' => false,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Strip 3 Elegant',
                'description' => 'Strip 3 foto dengan nuansa elegan. Pas untuk wedding dan formal event.',
                'layout' => 'strip_3',
                'canvas_width' => 600,
                'canvas_height' => 1500,
                'background_color' => '#F5E6E8',
                'photo_slots' => [
                    ['x' => 40, 'y' => 40, 'width' => 520, 'height' => 380, 'borderRadius' => 10, 'rotation' => 0],
                    ['x' => 40, 'y' => 460, 'width' => 520, 'height' => 380, 'borderRadius' => 10, 'rotation' => 0],
                    ['x' => 40, 'y' => 880, 'width' => 520, 'height' => 380, 'borderRadius' => 10, 'rotation' => 0],
                ],
                'text_overlays' => [
                    ['text' => 'ikutpose', 'x' => 300, 'y' => 1340, 'font' => 'Instrument Serif', 'size' => 26, 'color' => '#C4919B', 'rotation' => 0],
                ],
                'is_premium' => true,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Wide Strip 3',
                'description' => 'Layout horizontal lebar dengan 3 foto berdampingan. Ideal untuk banner event.',
                'layout' => 'wide_strip_3',
                'canvas_width' => 1800,
                'canvas_height' => 600,
                'background_color' => '#2D2226',
                'photo_slots' => [
                    ['x' => 40, 'y' => 40, 'width' => 540, 'height' => 400, 'borderRadius' => 8, 'rotation' => 0],
                    ['x' => 620, 'y' => 40, 'width' => 540, 'height' => 400, 'borderRadius' => 8, 'rotation' => 0],
                    ['x' => 1200, 'y' => 40, 'width' => 540, 'height' => 400, 'borderRadius' => 8, 'rotation' => 0],
                ],
                'text_overlays' => [
                    ['text' => 'ikutpose', 'x' => 900, 'y' => 540, 'font' => 'Instrument Serif', 'size' => 22, 'color' => '#E8CDD0', 'rotation' => 0],
                ],
                'is_premium' => true,
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Strip 2 Minimal',
                'description' => 'Strip minimalis 2 foto. Simpel, clean, dan modern.',
                'layout' => 'strip_2',
                'canvas_width' => 600,
                'canvas_height' => 1100,
                'background_color' => '#FFFFFF',
                'photo_slots' => [
                    ['x' => 40, 'y' => 40, 'width' => 520, 'height' => 400, 'borderRadius' => 14, 'rotation' => 0],
                    ['x' => 40, 'y' => 480, 'width' => 520, 'height' => 400, 'borderRadius' => 14, 'rotation' => 0],
                ],
                'text_overlays' => [
                    ['text' => 'ikutpose', 'x' => 300, 'y' => 980, 'font' => 'Plus Jakarta Sans', 'size' => 20, 'color' => '#9A8B8E', 'rotation' => 0],
                ],
                'is_premium' => false,
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'Photocard',
                'description' => 'Photocard 1200x1800 dengan 4 foto di tengah. Cocok untuk cetak foto kenangan.',
                'layout' => 'grid_2x2',
                'canvas_width' => 1200,
                'canvas_height' => 1800,
                'background_color' => '#FFFFFF',
                'photo_slots' => [
                    ['x' => 100, 'y' => 100, 'width' => 490, 'height' => 790, 'borderRadius' => 12, 'rotation' => 0],
                    ['x' => 610, 'y' => 100, 'width' => 490, 'height' => 790, 'borderRadius' => 12, 'rotation' => 0],
                    ['x' => 100, 'y' => 910, 'width' => 490, 'height' => 790, 'borderRadius' => 12, 'rotation' => 0],
                    ['x' => 610, 'y' => 910, 'width' => 490, 'height' => 790, 'borderRadius' => 12, 'rotation' => 0],
                ],
                'overlay_image' => '/1200x1800.png',
                'text_overlays' => [
                    ['text' => 'Abadikan momen, ciptakan kenangan', 'x' => 600, 'y' => 1700, 'font' => 'Plus Jakarta Sans', 'size' => 28, 'color' => '#FFFFFF', 'rotation' => 0],
                ],
                'is_premium' => false,
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'Ikut Pose Strip 3x2',
                'description' => 'Frame receipt strip 3 foto dicetak 2x side-by-side. Desain khas Ikut Pose dengan header tanggal, Instagram, dan footer receipt. Sempurna untuk event!',
                'layout' => 'strip_3',
                'canvas_width' => 1600,
                'canvas_height' => 2404,
                'background_color' => '#FFFFFF',
                'photo_slots' => [
                    ['x' => 30,  'y' => 429,  'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                    ['x' => 30,  'y' => 1021, 'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                    ['x' => 30,  'y' => 1614, 'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                    ['x' => 830, 'y' => 429,  'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                    ['x' => 830, 'y' => 1021, 'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                    ['x' => 830, 'y' => 1614, 'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                ],
                'overlay_image' => '/frame-ikutpose-strip3x2.png',
                'text_overlays' => [],
                'is_premium' => false,
                'is_active' => true,
                'sort_order' => 8,
            ],
        ];

        foreach ($templates as $index => $template) {
            $overlay = $template['overlay_image'] ?? 'templates/' . Str::slug($template['name']) . '-overlay.png';
            Template::create(array_merge($template, [
                'slug' => Str::slug($template['name']),
                'thumbnail' => 'templates/' . Str::slug($template['name']) . '-thumb.png',
                'overlay_image' => $overlay,
                'created_by' => $admin->id,
            ]));
        }
    }

    private function seedStickerPacks(): void
    {
        $packs = [
            [
                'pack' => [
                    'name' => 'Cute Animals',
                    'description' => 'Koleksi sticker hewan lucu untuk menambah keseruan foto.',
                    'category' => 'cute',
                    'is_premium' => false,
                    'is_active' => true,
                    'sort_order' => 1,
                ],
                'stickers' => [
                    ['name' => 'Cat Face', 'image' => 'stickers/cat-face.png', 'default_width' => 120, 'default_height' => 120],
                    ['name' => 'Dog Paw', 'image' => 'stickers/dog-paw.png', 'default_width' => 100, 'default_height' => 100],
                    ['name' => 'Bunny', 'image' => 'stickers/bunny.png', 'default_width' => 130, 'default_height' => 130],
                    ['name' => 'Bear', 'image' => 'stickers/bear.png', 'default_width' => 140, 'default_height' => 140],
                    ['name' => 'Panda', 'image' => 'stickers/panda.png', 'default_width' => 120, 'default_height' => 120],
                ],
            ],
            [
                'pack' => [
                    'name' => 'Party Time',
                    'description' => 'Sticker pesta dan perayaan. Bikin foto makin meriah!',
                    'category' => 'party',
                    'is_premium' => false,
                    'is_active' => true,
                    'sort_order' => 2,
                ],
                'stickers' => [
                    ['name' => 'Party Hat', 'image' => 'stickers/party-hat.png', 'default_width' => 110, 'default_height' => 130],
                    ['name' => 'Confetti', 'image' => 'stickers/confetti.png', 'default_width' => 160, 'default_height' => 160],
                    ['name' => 'Balloon', 'image' => 'stickers/balloon.png', 'default_width' => 80, 'default_height' => 140],
                    ['name' => 'Birthday Cake', 'image' => 'stickers/birthday-cake.png', 'default_width' => 130, 'default_height' => 130],
                ],
            ],
            [
                'pack' => [
                    'name' => 'Wedding Bells',
                    'description' => 'Sticker romantis untuk momen pernikahan dan kasih sayang.',
                    'category' => 'wedding',
                    'is_premium' => true,
                    'is_active' => true,
                    'sort_order' => 3,
                ],
                'stickers' => [
                    ['name' => 'Heart', 'image' => 'stickers/heart.png', 'default_width' => 100, 'default_height' => 100],
                    ['name' => 'Ring', 'image' => 'stickers/ring.png', 'default_width' => 90, 'default_height' => 90],
                    ['name' => 'Flower Bouquet', 'image' => 'stickers/flower-bouquet.png', 'default_width' => 120, 'default_height' => 140],
                    ['name' => 'Love Letter', 'image' => 'stickers/love-letter.png', 'default_width' => 110, 'default_height' => 100],
                    ['name' => 'Dove', 'image' => 'stickers/dove.png', 'default_width' => 130, 'default_height' => 110],
                ],
            ],
        ];

        foreach ($packs as $item) {
            $pack = StickerPack::create(array_merge($item['pack'], [
                'slug' => Str::slug($item['pack']['name']),
                'thumbnail' => 'sticker-packs/' . Str::slug($item['pack']['name']) . '-thumb.png',
            ]));

            foreach ($item['stickers'] as $index => $sticker) {
                Sticker::create(array_merge($sticker, [
                    'sticker_pack_id' => $pack->id,
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]));
            }
        }
    }

    private function seedFilters(): void
    {
        $filters = [
            [
                'name' => 'Normal',
                'description' => 'Tanpa filter, warna asli kamera.',
                'css_filter' => ['brightness' => 100, 'contrast' => 100, 'saturate' => 100, 'hue-rotate' => 0, 'grayscale' => 0, 'sepia' => 0, 'blur' => 0],
                'overlay_opacity' => 0,
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Warm Glow',
                'description' => 'Nuansa hangat keemasan, cocok untuk foto outdoor.',
                'css_filter' => ['brightness' => 105, 'contrast' => 100, 'saturate' => 110, 'hue-rotate' => -10, 'grayscale' => 0, 'sepia' => 15, 'blur' => 0],
                'overlay_opacity' => 0,
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Cool Breeze',
                'description' => 'Tone dingin kebiruan, kesan fresh dan modern.',
                'css_filter' => ['brightness' => 100, 'contrast' => 105, 'saturate' => 90, 'hue-rotate' => 15, 'grayscale' => 0, 'sepia' => 0, 'blur' => 0],
                'overlay_opacity' => 0,
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Vintage Film',
                'description' => 'Efek film retro dengan grain dan warna pudar.',
                'css_filter' => ['brightness' => 105, 'contrast' => 95, 'saturate' => 80, 'hue-rotate' => 5, 'grayscale' => 0, 'sepia' => 25, 'blur' => 0],
                'overlay_opacity' => 0,
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Noir',
                'description' => 'Hitam putih klasik dengan kontras tinggi.',
                'css_filter' => ['brightness' => 100, 'contrast' => 120, 'saturate' => 0, 'hue-rotate' => 0, 'grayscale' => 100, 'sepia' => 0, 'blur' => 0],
                'overlay_opacity' => 0,
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'Vivid',
                'description' => 'Warna cerah dan tajam, bikin foto pop!',
                'css_filter' => ['brightness' => 108, 'contrast' => 115, 'saturate' => 140, 'hue-rotate' => 0, 'grayscale' => 0, 'sepia' => 0, 'blur' => 0],
                'overlay_opacity' => 0,
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($filters as $filter) {
            Filter::create(array_merge($filter, [
                'slug' => Str::slug($filter['name']),
                'thumbnail' => 'filters/' . Str::slug($filter['name']) . '-thumb.png',
            ]));
        }
    }

    private function seedEvents(): void
    {
        $admin = User::where('email', 'admin@ikutpose.id')->first();
        $templates = Template::all();

        $events = [
            [
                'user_id' => $admin->id,
                'name' => 'Wedding Rina & Budi',
                'description' => 'Pernikahan Rina dan Budi. Abadikan momen bahagia bersama kami!',
                'primary_color' => '#C4919B',
                'secondary_color' => '#E8CDD0',
                'branding' => [
                    'tagline' => 'Love is in the Air',
                    'footer_text' => 'Terima kasih telah menjadi bagian dari hari bahagia kami',
                    'watermark_text' => 'Rina & Budi 2025',
                ],
                'start_date' => Carbon::create(2025, 6, 15, 8, 0, 0),
                'end_date' => Carbon::create(2025, 6, 15, 22, 0, 0),
                'status' => 'active',
                'gallery_public' => true,
                'require_email' => false,
                'max_photos_per_session' => 4,
                'countdown_seconds' => 3,
                'photo_limit' => null,
                'template_ids' => [1, 3, 4],
            ],
            [
                'user_id' => $admin->id,
                'name' => 'Birthday Party Afiq',
                'description' => 'Pesta ulang tahun Afiq yang ke-7. Yuk foto bareng!',
                'primary_color' => '#8FA6B5',
                'secondary_color' => '#F5E6E8',
                'branding' => [
                    'tagline' => 'Happy Birthday Afiq!',
                    'footer_text' => 'Semoga panjang umur dan sehat selalu',
                    'watermark_text' => 'Afiq 7th Birthday',
                ],
                'start_date' => Carbon::now()->subDays(1)->setTime(10, 0),
                'end_date' => Carbon::now()->addDays(1)->setTime(20, 0),
                'status' => 'active',
                'gallery_public' => true,
                'require_email' => true,
                'max_photos_per_session' => 6,
                'countdown_seconds' => 5,
                'photo_limit' => 200,
                'template_ids' => [1, 2, 6],
            ],
            [
                'user_id' => $admin->id,
                'name' => 'Corporate Gathering PT Maju Bersama',
                'description' => 'Annual gathering PT Maju Bersama. Photo booth untuk seluruh karyawan dan keluarga.',
                'primary_color' => '#A8B5A0',
                'secondary_color' => '#FDF5F6',
                'branding' => [
                    'tagline' => 'Together We Grow',
                    'footer_text' => 'PT Maju Bersama - Annual Gathering 2026',
                    'watermark_text' => 'Maju Bersama 2026',
                ],
                'start_date' => Carbon::now()->addDays(30)->setTime(9, 0),
                'end_date' => Carbon::now()->addDays(30)->setTime(17, 0),
                'status' => 'draft',
                'gallery_public' => false,
                'require_email' => true,
                'max_photos_per_session' => 2,
                'countdown_seconds' => 3,
                'photo_limit' => 500,
                'template_ids' => [2, 5],
            ],
            [
                'user_id' => $admin->id,
                'name' => 'Graduation Party Universitas Nusantara',
                'description' => 'Wisuda angkatan 2024 Universitas Nusantara. Selamat atas kelulusannya!',
                'primary_color' => '#C4A882',
                'secondary_color' => '#F5E6E8',
                'branding' => [
                    'tagline' => 'The Journey Continues',
                    'footer_text' => 'Universitas Nusantara - Wisuda 2024',
                    'watermark_text' => 'Wisuda UN 2024',
                ],
                'start_date' => Carbon::create(2024, 11, 10, 7, 0, 0),
                'end_date' => Carbon::create(2024, 11, 10, 18, 0, 0),
                'status' => 'ended',
                'gallery_public' => true,
                'require_email' => false,
                'max_photos_per_session' => 4,
                'countdown_seconds' => 3,
                'photo_limit' => null,
                'template_ids' => [1, 2, 4, 6],
            ],
        ];

        foreach ($events as $eventData) {
            $templateIds = $eventData['template_ids'];
            unset($eventData['template_ids']);

            $event = Event::create(array_merge($eventData, [
                'slug' => Str::slug($eventData['name']),
                'code' => strtoupper(Str::random(6)),
            ]));

            foreach ($templateIds as $index => $templateId) {
                $event->templates()->attach($templateId, ['sort_order' => $index + 1]);
            }
        }
    }

    private function seedSettings(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'ikutpose', 'type' => 'string', 'group' => 'general', 'description' => 'Nama situs web'],
            ['key' => 'site_tagline', 'value' => 'Capture Moments, Create Memories', 'type' => 'string', 'group' => 'general', 'description' => 'Tagline situs'],
            ['key' => 'default_countdown', 'value' => '3', 'type' => 'integer', 'group' => 'booth', 'description' => 'Detik countdown default sebelum foto diambil'],
            ['key' => 'watermark_text', 'value' => 'ikutpose', 'type' => 'string', 'group' => 'branding', 'description' => 'Teks watermark pada foto'],
            ['key' => 'watermark_position', 'value' => 'bottom-right', 'type' => 'string', 'group' => 'branding', 'description' => 'Posisi watermark (top-left, top-right, bottom-left, bottom-right)'],
            ['key' => 'watermark_opacity', 'value' => '0.3', 'type' => 'string', 'group' => 'branding', 'description' => 'Opacity watermark (0-1)'],
            ['key' => 'default_max_photos', 'value' => '4', 'type' => 'integer', 'group' => 'booth', 'description' => 'Jumlah foto maksimal per sesi'],
            ['key' => 'max_upload_size', 'value' => '10', 'type' => 'integer', 'group' => 'storage', 'description' => 'Ukuran maksimal upload dalam MB'],
            ['key' => 'photo_retention_days', 'value' => '30', 'type' => 'integer', 'group' => 'storage', 'description' => 'Berapa hari foto disimpan (0 = selamanya)'],
            ['key' => 'enable_mirror_mode', 'value' => 'true', 'type' => 'boolean', 'group' => 'booth', 'description' => 'Aktifkan mirror mode default untuk kamera depan'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
