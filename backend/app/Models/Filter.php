<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filter extends Model
{
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
        'css_filter',
        'canvas_adjustments',
        'overlay_image',
        'overlay_blend_mode',
        'overlay_opacity',
        'is_active',
        'sort_order',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'css_filter' => 'array',
            'canvas_adjustments' => 'array',
            'is_active' => 'boolean',
        ];
    }
}
