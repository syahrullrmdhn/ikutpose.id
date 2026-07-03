<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'code',
        'description',
        'logo',
        'banner',
        'primary_color',
        'secondary_color',
        'branding',
        'start_date',
        'end_date',
        'status',
        'gallery_public',
        'require_email',
        'max_photos_per_session',
        'countdown_seconds',
        'photo_limit',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'branding' => 'array',
            'start_date' => 'datetime',
            'end_date' => 'datetime',
            'gallery_public' => 'boolean',
            'require_email' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function templates(): BelongsToMany
    {
        return $this->belongsToMany(Template::class)
            ->withPivot('sort_order');
    }

    public function stickerPacks(): BelongsToMany
    {
        return $this->belongsToMany(StickerPack::class, 'event_sticker_pack');
    }

    public function filters(): BelongsToMany
    {
        return $this->belongsToMany(Filter::class, 'event_filter');
    }

    public function photoSessions(): HasMany
    {
        return $this->hasMany(PhotoSession::class);
    }
}
