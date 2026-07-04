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
        Schema::create('template_layers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('template_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['background', 'overlay', 'decoration', 'text']);
            $table->string('image')->nullable();
            $table->json('properties');
            $table->text('text_content')->nullable();
            $table->json('text_style')->nullable();
            $table->integer('z_index')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('template_layers');
    }
};
