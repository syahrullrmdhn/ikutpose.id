<?php

namespace Database\Seeders;

use App\Models\Template;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class IkutPoseGridSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * This seeder uses updateOrCreate to safely insert or update the template
     * without modifying or deleting any existing data in the database.
     * 
     * Command to run: php artisan db:seed --class=IkutPoseGridSeeder
     */
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first() ?? User::first();
        $adminId = $admin ? $admin->id : 1;

        $templateData = [
            'name' => 'Ikut Pose Strip 3x2',
            'slug' => 'ikut-pose-strip-3x2',
            'description' => 'Frame receipt strip 3 foto dicetak 2x side-by-side. Desain khas Ikut Pose dengan header tanggal, Instagram, dan footer receipt. Sempurna untuk event!',
            'layout' => 'strip_3',
            'canvas_width' => 1600,
            'canvas_height' => 2404,
            'background_color' => '#FFFFFF',
            'photo_slots' => [
                // LEFT STRIP — foto 1, 2, 3
                ['x' => 30,  'y' => 429,  'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                ['x' => 30,  'y' => 1021, 'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                ['x' => 30,  'y' => 1614, 'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                // RIGHT STRIP — duplikat foto 1, 2, 3
                ['x' => 830, 'y' => 429,  'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                ['x' => 830, 'y' => 1021, 'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
                ['x' => 830, 'y' => 1614, 'width' => 740, 'height' => 574, 'borderRadius' => 0, 'rotation' => 0],
            ],
            'overlay_image' => '/frame-ikutpose-strip3x2.png',
            'text_overlays' => [],
            'is_premium' => false,
            'is_active' => true,
            'sort_order' => 8,
            'thumbnail' => '/frame-ikutpose-strip3x2.png',
            'created_by' => $adminId,
        ];

        $template = Template::updateOrCreate(
            ['slug' => 'ikut-pose-strip-3x2'],
            $templateData
        );

        $this->command->info("✅ Template 'Ikut Pose Strip 3x2' berhasil disimpan (ID: {$template->id})");
    }
}
