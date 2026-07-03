<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TemplateController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Template::with('creator')
            ->withCount('layers');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('layout')) {
            $query->where('layout', $request->layout);
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        if ($request->has('is_premium')) {
            $query->where('is_premium', $request->boolean('is_premium'));
        }

        $sortField = $request->input('sort_by', 'sort_order');
        $sortDirection = $request->input('sort_direction', 'asc');
        $allowedSorts = ['name', 'layout', 'sort_order', 'created_at', 'updated_at'];

        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        }

        $templates = $query->paginate($request->input('per_page', 15));

        return response()->json($templates);
    }

    public function publicIndex(): JsonResponse
    {
        $templates = Template::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($templates);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'layout' => 'required|string|in:strip_2,strip_3,strip_4,grid_2x2,single,wide_strip_3',
            'canvas_width' => 'required|integer|min:100',
            'canvas_height' => 'required|integer|min:100',
            'photo_slots' => 'required|array|min:1',
            'photo_slots.*.x' => 'required|numeric',
            'photo_slots.*.y' => 'required|numeric',
            'photo_slots.*.width' => 'required|numeric|min:1',
            'photo_slots.*.height' => 'required|numeric|min:1',
            'photo_slots.*.borderRadius' => 'nullable|numeric|min:0',
            'overlay_image' => 'nullable|string',
            'background_image' => 'nullable|string',
            'background_color' => 'nullable|string|max:20',
            'text_overlays' => 'nullable|array',
            'is_premium' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        $slug = Str::slug($validated['name']);
        $originalSlug = $slug;
        $counter = 1;

        while (Template::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $validated['slug'] = $slug;
        $validated['created_by'] = $request->user()->id;

        $template = Template::create($validated);

        return response()->json($template->load('creator'), 201);
    }

    public function show(Template $template): JsonResponse
    {
        $template->load(['creator', 'layers']);

        return response()->json($template);
    }

    public function update(Request $request, Template $template): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'layout' => 'sometimes|string|in:strip_2,strip_3,strip_4,grid_2x2,single,wide_strip_3',
            'canvas_width' => 'sometimes|integer|min:100',
            'canvas_height' => 'sometimes|integer|min:100',
            'photo_slots' => 'sometimes|array|min:1',
            'photo_slots.*.x' => 'required|numeric',
            'photo_slots.*.y' => 'required|numeric',
            'photo_slots.*.width' => 'required|numeric|min:1',
            'photo_slots.*.height' => 'required|numeric|min:1',
            'photo_slots.*.borderRadius' => 'nullable|numeric|min:0',
            'overlay_image' => 'nullable|string',
            'background_image' => 'nullable|string',
            'background_color' => 'nullable|string|max:20',
            'text_overlays' => 'nullable|array',
            'is_premium' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if (isset($validated['name']) && $validated['name'] !== $template->name) {
            $slug = Str::slug($validated['name']);
            $originalSlug = $slug;
            $counter = 1;

            while (Template::where('slug', $slug)->where('id', '!=', $template->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            $validated['slug'] = $slug;
        }

        $template->update($validated);

        return response()->json($template->fresh()->load('creator'));
    }

    public function destroy(Template $template): JsonResponse
    {
        $template->delete();

        return response()->json(['message' => 'Template deleted successfully.']);
    }

    public function duplicate(Template $template): JsonResponse
    {
        $newTemplate = $template->replicate();
        $newTemplate->name = $template->name . ' (Copy)';

        $slug = Str::slug($newTemplate->name);
        $originalSlug = $slug;
        $counter = 1;

        while (Template::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $newTemplate->slug = $slug;
        $newTemplate->is_active = false;
        $newTemplate->sort_order = $template->sort_order + 1;
        $newTemplate->created_by = request()->user()->id;
        $newTemplate->save();

        foreach ($template->layers as $layer) {
            $newLayer = $layer->replicate();
            $newLayer->template_id = $newTemplate->id;
            $newLayer->save();
        }

        return response()->json($newTemplate->load('creator'), 201);
    }
}
