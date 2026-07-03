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
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('photo_session_id')->constrained()->cascadeOnDelete();
            $table->string('original_image');
            $table->string('processed_image')->nullable();
            $table->string('composite_image')->nullable();
            $table->string('thumbnail')->nullable();
            $table->integer('slot_index');
            $table->json('crop_data')->nullable();
            $table->json('adjustments')->nullable();
            $table->integer('file_size')->nullable();
            $table->enum('status', ['captured', 'processing', 'ready', 'failed'])->default('captured');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
