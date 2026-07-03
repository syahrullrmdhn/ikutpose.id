<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Template extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'thumbnail',
        'layout',
        'canvas_width',
        'canvas_height',
        'photo_slots',
        'overlay_image',
        'background_image',
        'background_color',
        'text_overlays',
        'is_premium',
        'is_active',
        'sort_order',
        'created_by',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'photo_slots' => 'array',
            'text_overlays' => 'array',
            'is_premium' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function layers(): HasMany
    {
        return $this->hasMany(TemplateLayer::class);
    }
}
