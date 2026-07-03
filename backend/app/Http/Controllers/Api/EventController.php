<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Photo;
use App\Models\PhotoSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Event::with('user')
            ->withCount('photoSessions');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $sortField = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $allowedSorts = ['name', 'start_date', 'end_date', 'status', 'created_at'];

        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $events = $query->paginate($request->input('per_page', 15));

        return response()->json($events);
    }

    public function publicIndex(): JsonResponse
    {
        $events = Event::where('status', 'active')
            ->where('gallery_public', true)
            ->withCount('photoSessions')
            ->orderBy('start_date', 'desc')
            ->get();

        return response()->json($events);
    }

    public function publicShow(string $slug): JsonResponse
    {
        $event = Event::where('slug', $slug)
            ->where('status', 'active')
            ->with(['templates' => function ($q) {
                $q->where('is_active', true)->orderBy('sort_order');
            }])
            ->withCount('photoSessions')
            ->firstOrFail();

        $recentPhotos = Photo::whereHas('photoSession', function ($query) use ($event) {
            $query->where('event_id', $event->id)
                ->where('status', 'completed');
        })
            ->where('status', 'ready')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();

        return response()->json([
            'event' => $event,
            'recent_photos' => $recentPhotos,
        ]);
    }

    public function publicGallery(Request $request, string $slug): JsonResponse
    {
        $event = Event::where('slug', $slug)
            ->where('status', 'active')
            ->where('gallery_public', true)
            ->firstOrFail();

        $query = Photo::whereHas('photoSession', function ($q) use ($event) {
            $q->where('event_id', $event->id)
                ->where('status', 'completed');
        })
            ->where('status', 'ready');

        if ($request->filled('guest_name')) {
            $query->whereHas('photoSession', function ($q) use ($request) {
                $q->where('guest_name', 'like', "%{$request->guest_name}%");
            });
        }

        $sortDirection = $request->input('sort', 'desc');
        $query->orderBy('created_at', in_array($sortDirection, ['asc', 'desc']) ? $sortDirection : 'desc');

        $photos = $query->paginate($request->input('per_page', 20));

        return response()->json($photos);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|string',
            'banner' => 'nullable|string',
            'primary_color' => 'nullable|string|max:20',
            'secondary_color' => 'nullable|string|max:20',
            'branding' => 'nullable|array',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'status' => 'sometimes|string|in:draft,active,paused,ended',
            'gallery_public' => 'boolean',
            'require_email' => 'boolean',
            'max_photos_per_session' => 'integer|min:1|max:20',
            'countdown_seconds' => 'integer|min:1|max:10',
            'photo_limit' => 'nullable|integer|min:0',
            'template_ids' => 'nullable|array',
            'template_ids.*' => 'exists:templates,id',
            'sticker_pack_ids' => 'nullable|array',
            'sticker_pack_ids.*' => 'exists:sticker_packs,id',
            'filter_ids' => 'nullable|array',
            'filter_ids.*' => 'exists:filters,id',
        ]);

        $slug = Str::slug($validated['name']);
        $originalSlug = $slug;
        $counter = 1;

        while (Event::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $code = strtoupper(Str::random(6));
        while (Event::where('code', $code)->exists()) {
            $code = strtoupper(Str::random(6));
        }

        $templateIds = $validated['template_ids'] ?? [];
        $stickerPackIds = $validated['sticker_pack_ids'] ?? [];
        $filterIds = $validated['filter_ids'] ?? [];

        unset($validated['template_ids'], $validated['sticker_pack_ids'], $validated['filter_ids']);

        $validated['slug'] = $slug;
        $validated['code'] = $code;
        $validated['user_id'] = $request->user()->id;

        $event = Event::create($validated);

        if (! empty($templateIds)) {
            $event->templates()->attach($templateIds);
        }

        if (! empty($stickerPackIds)) {
            $event->stickerPacks()->attach($stickerPackIds);
        }

        if (! empty($filterIds)) {
            $event->filters()->attach($filterIds);
        }

        return response()->json($event->load(['templates', 'stickerPacks', 'filters']), 201);
    }

    public function show(Event $event): JsonResponse
    {
        $event->load(['user', 'templates', 'stickerPacks', 'filters']);
        $event->loadCount('photoSessions');

        return response()->json($event);
    }

    public function update(Request $request, Event $event): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|string',
            'banner' => 'nullable|string',
            'primary_color' => 'nullable|string|max:20',
            'secondary_color' => 'nullable|string|max:20',
            'branding' => 'nullable|array',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
            'status' => 'sometimes|string|in:draft,active,paused,ended',
            'gallery_public' => 'boolean',
            'require_email' => 'boolean',
            'max_photos_per_session' => 'integer|min:1|max:20',
            'countdown_seconds' => 'integer|min:1|max:10',
            'photo_limit' => 'nullable|integer|min:0',
            'template_ids' => 'nullable|array',
            'template_ids.*' => 'exists:templates,id',
            'sticker_pack_ids' => 'nullable|array',
            'sticker_pack_ids.*' => 'exists:sticker_packs,id',
            'filter_ids' => 'nullable|array',
            'filter_ids.*' => 'exists:filters,id',
        ]);

        if (isset($validated['name']) && $validated['name'] !== $event->name) {
            $slug = Str::slug($validated['name']);
            $originalSlug = $slug;
            $counter = 1;

            while (Event::where('slug', $slug)->where('id', '!=', $event->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;
        }

        $templateIds = $validated['template_ids'] ?? null;
        $stickerPackIds = $validated['sticker_pack_ids'] ?? null;
        $filterIds = $validated['filter_ids'] ?? null;

        unset($validated['template_ids'], $validated['sticker_pack_ids'], $validated['filter_ids']);

        $event->update($validated);

        if ($templateIds !== null) {
            $event->templates()->sync($templateIds);
        }

        if ($stickerPackIds !== null) {
            $event->stickerPacks()->sync($stickerPackIds);
        }

        if ($filterIds !== null) {
            $event->filters()->sync($filterIds);
        }

        return response()->json($event->fresh()->load(['templates', 'stickerPacks', 'filters']));
    }

    public function destroy(Event $event): JsonResponse
    {
        $event->delete();

        return response()->json(['message' => 'Event deleted successfully.']);
    }

    public function updateStatus(Request $request, Event $event): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:draft,active,paused,ended',
        ]);

        $event->update(['status' => $validated['status']]);

        return response()->json($event->fresh());
    }
}
