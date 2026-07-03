<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Photo extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'photo_session_id',
        'original_image',
        'processed_image',
        'composite_image',
        'thumbnail',
        'slot_index',
        'crop_data',
        'adjustments',
        'file_size',
        'status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'crop_data' => 'array',
            'adjustments' => 'array',
        ];
    }

    public function photoSession(): BelongsTo
    {
        return $this->belongsTo(PhotoSession::class);
    }
}
