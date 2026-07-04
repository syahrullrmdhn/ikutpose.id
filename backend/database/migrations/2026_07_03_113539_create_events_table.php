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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('code', 20)->unique();
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('banner')->nullable();
            $table->string('primary_color')->nullable();
            $table->string('secondary_color')->nullable();
            $table->json('branding')->nullable();
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->enum('status', ['draft', 'active', 'paused', 'ended'])->default('draft');
            $table->boolean('gallery_public')->default(true);
            $table->boolean('require_email')->default(false);
            $table->integer('max_photos_per_session')->default(4);
            $table->integer('countdown_seconds')->default(3);
            $table->integer('photo_limit')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
