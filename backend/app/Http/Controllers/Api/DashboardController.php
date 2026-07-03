<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Photo;
use App\Models\Template;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $today = Carbon::today();
        $sevenDaysAgo = Carbon::today()->subDays(6);

        $photosToday = Photo::whereDate('created_at', $today)->count();

        $eventsActive = Event::where('status', 'active')->count();

        $totalTemplates = Template::count();

        $totalUsers = User::count();

        $recentPhotos = Photo::with(['photoSession.event', 'photoSession.template'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $upcomingEvents = Event::where('status', 'active')
            ->where('start_date', '>=', $today)
            ->orderBy('start_date', 'asc')
            ->limit(3)
            ->get();

        $photosPerDay = Photo::whereDate('created_at', '>=', $sevenDaysAgo)
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item['date'] => $item['count']];
            });

        $filledPhotosPerDay = collect();
        for ($date = $sevenDaysAgo->copy(); $date->lte($today); $date->addDay()) {
            $dateStr = $date->format('Y-m-d');
            $filledPhotosPerDay->push([
                'date' => $dateStr,
                'count' => $photosPerDay->get($dateStr, 0),
            ]);
        }

        $topTemplates = Template::select('templates.*')
            ->selectRaw('COUNT(photo_sessions.id) as usage_count')
            ->leftJoin('photo_sessions', 'templates.id', '=', 'photo_sessions.template_id')
            ->groupBy('templates.id')
            ->orderByDesc('usage_count')
            ->limit(5)
            ->get();

        return response()->json([
            'photos_today' => $photosToday,
            'events_active' => $eventsActive,
            'total_templates' => $totalTemplates,
            'total_users' => $totalUsers,
            'recent_photos' => $recentPhotos,
            'upcoming_events' => $upcomingEvents,
            'photos_per_day' => $filledPhotosPerDay,
            'top_templates' => $topTemplates,
        ]);
    }
}
