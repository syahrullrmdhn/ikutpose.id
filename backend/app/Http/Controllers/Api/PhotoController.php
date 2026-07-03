<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Photo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Photo::with(['photoSession.event', 'photoSession.template']);

        if ($request->filled('event_id')) {
            $query->whereHas('photoSession', function ($q) use ($request) {
                $q->where('event_id', $request->event_id);
            });
        }

        if ($request->filled('template_id')) {
            $query->whereHas('photoSession', function ($q) use ($request) {
                $q->where('template_id', $request->template_id);
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('date_from')) {
            $query->where('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->where('created_at', '<=', $request->date_to . ' 23:59:59');
        }

        $query->orderBy('created_at', 'desc');

        $photos = $query->paginate($request->input('per_page', 15));

        return response()->json($photos);
    }

    public function publicGallery(Request $request): JsonResponse
    {
        $query = Photo::where('status', 'ready')
            ->whereHas('photoSession', function ($q) {
                $q->where('status', 'completed')
                    ->whereHas('event', function ($eq) {
                        $eq->where('status', 'active')
                            ->where('gallery_public', true);
                    });
            })
            ->with(['photoSession.event'])
            ->orderBy('created_at', 'desc');

        $photos = $query->paginate($request->input('per_page', 20));

        return response()->json($photos);
    }

    public function show(Photo $photo): JsonResponse
    {
        $photo->load(['photoSession.event', 'photoSession.template']);

        return response()->json($photo);
    }

    public function destroy(Photo $photo): JsonResponse
    {
        $photo->delete();

        return response()->json(['message' => 'Photo deleted successfully.']);
    }
}
