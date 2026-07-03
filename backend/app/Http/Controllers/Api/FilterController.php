<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Filter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FilterController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Filter::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        $query->orderBy('sort_order');

        $filters = $query->paginate($request->input('per_page', 15));

        return response()->json($filters);
    }

    public function publicIndex(): JsonResponse
    {
        $filters = Filter::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($filters);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'thumbnail' => 'nullable|string',
            'css_filter' => 'required|array',
            'css_filter.brightness' => 'nullable|numeric|min:0|max:2',
            'css_filter.contrast' => 'nullable|numeric|min:0|max:2',
            'css_filter.saturate' => 'nullable|numeric|min:0|max:2',
            'css_filter.hue-rotate' => 'nullable|numeric|min:0|max:360',
            'css_filter.grayscale' => 'nullable|numeric|min:0|max:1',
            'css_filter.sepia' => 'nullable|numeric|min:0|max:1',
            'css_filter.blur' => 'nullable|numeric|min:0|max:10',
            'canvas_adjustments' => 'nullable|array',
            'overlay_image' => 'nullable|string',
            'overlay_blend_mode' => 'nullable|string|max:50',
            'overlay_opacity' => 'nullable|numeric|min:0|max:1',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $slug = Str::slug($validated['name']);
        $originalSlug = $slug;
        $counter = 1;

        while (Filter::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $validated['slug'] = $slug;

        $filter = Filter::create($validated);

        return response()->json($filter, 201);
    }

    public function show(Filter $filter): JsonResponse
    {
        return response()->json($filter);
    }

    public function update(Request $request, Filter $filter): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'thumbnail' => 'nullable|string',
            'css_filter' => 'sometimes|array',
            'css_filter.brightness' => 'nullable|numeric|min:0|max:2',
            'css_filter.contrast' => 'nullable|numeric|min:0|max:2',
            'css_filter.saturate' => 'nullable|numeric|min:0|max:2',
            'css_filter.hue-rotate' => 'nullable|numeric|min:0|max:360',
            'css_filter.grayscale' => 'nullable|numeric|min:0|max:1',
            'css_filter.sepia' => 'nullable|numeric|min:0|max:1',
            'css_filter.blur' => 'nullable|numeric|min:0|max:10',
            'canvas_adjustments' => 'nullable|array',
            'overlay_image' => 'nullable|string',
            'overlay_blend_mode' => 'nullable|string|max:50',
            'overlay_opacity' => 'nullable|numeric|min:0|max:1',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if (isset($validated['name']) && $validated['name'] !== $filter->name) {
            $slug = Str::slug($validated['name']);
            $originalSlug = $slug;
            $counter = 1;

            while (Filter::where('slug', $slug)->where('id', '!=', $filter->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;
        }

        $filter->update($validated);

        return response()->json($filter->fresh());
    }

    public function destroy(Filter $filter): JsonResponse
    {
        $filter->delete();

        return response()->json(['message' => 'Filter deleted successfully.']);
    }
}
