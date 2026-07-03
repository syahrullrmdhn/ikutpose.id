<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sticker;
use App\Models\StickerPack;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class StickerPackController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = StickerPack::withCount('stickers');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $query->orderBy('sort_order');

        $packs = $query->paginate($request->input('per_page', 15));

        return response()->json($packs);
    }

    public function publicIndex(): JsonResponse
    {
        $packs = StickerPack::where('is_active', true)
            ->with(['stickers' => function ($query) {
                $query->where('is_active', true)->orderBy('sort_order');
            }])
            ->orderBy('sort_order')
            ->get();

        return response()->json($packs);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'is_premium' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $slug = Str::slug($validated['name']);
        $originalSlug = $slug;
        $counter = 1;

        while (StickerPack::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $validated['slug'] = $slug;

        $pack = StickerPack::create($validated);

        return response()->json($pack, 201);
    }

    public function show(StickerPack $stickerPack): JsonResponse
    {
        $stickerPack->load(['stickers' => function ($query) {
            $query->orderBy('sort_order');
        }]);

        return response()->json($stickerPack);
    }

    public function update(Request $request, StickerPack $stickerPack): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'is_premium' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if (isset($validated['name']) && $validated['name'] !== $stickerPack->name) {
            $slug = Str::slug($validated['name']);
            $originalSlug = $slug;
            $counter = 1;

            while (StickerPack::where('slug', $slug)->where('id', '!=', $stickerPack->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;
        }

        $stickerPack->update($validated);

        return response()->json($stickerPack->fresh());
    }

    public function destroy(StickerPack $stickerPack): JsonResponse
    {
        $stickerPack->delete();

        return response()->json(['message' => 'Sticker pack deleted successfully.']);
    }

    public function addSticker(Request $request, StickerPack $stickerPack): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|string',
            'default_width' => 'integer|min:10',
            'default_height' => 'integer|min:10',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['sticker_pack_id'] = $stickerPack->id;
        $validated['sort_order'] = $validated['sort_order'] ?? $stickerPack->stickers()->max('sort_order') + 1;

        $sticker = Sticker::create($validated);

        return response()->json($sticker, 201);
    }

    public function updateSticker(Request $request, StickerPack $stickerPack, Sticker $sticker): JsonResponse
    {
        if ($sticker->sticker_pack_id !== $stickerPack->id) {
            return response()->json(['message' => 'Sticker does not belong to this pack.'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'image' => 'sometimes|string',
            'default_width' => 'integer|min:10',
            'default_height' => 'integer|min:10',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        $sticker->update($validated);

        return response()->json($sticker->fresh());
    }

    public function deleteSticker(StickerPack $stickerPack, Sticker $sticker): JsonResponse
    {
        if ($sticker->sticker_pack_id !== $stickerPack->id) {
            return response()->json(['message' => 'Sticker does not belong to this pack.'], 404);
        }

        $sticker->delete();

        return response()->json(['message' => 'Sticker deleted successfully.']);
    }
}
