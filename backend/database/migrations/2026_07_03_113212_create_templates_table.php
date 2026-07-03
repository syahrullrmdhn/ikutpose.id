<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('thumbnail');
            $table->enum('layout', ['strip_2', 'strip_3', 'strip_4', 'grid_2x2', 'single', 'wide_strip_3']);
            $table->integer('canvas_width');
            $table->integer('canvas_height');
            $table->json('photo_slots');
            $table->string('overlay_image')->nullable();
            $table->string('background_image')->nullable();
            $table->string('background_color')->nullable();
            $table->json('text_overlays')->nullable();
            $table->boolean('is_premium')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('templates');
    }
};
