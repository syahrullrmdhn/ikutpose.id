<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\StickerPackController;
use App\Http\Controllers\Api\FilterController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\PhotoController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\DashboardController;

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

// Public booth routes
Route::get('/booth/templates', [TemplateController::class, 'publicIndex']);
Route::get('/booth/sticker-packs', [StickerPackController::class, 'publicIndex']);
Route::get('/booth/filters', [FilterController::class, 'publicIndex']);

// Public event routes
Route::get('/events', [EventController::class, 'publicIndex']);
Route::get('/events/{slug}', [EventController::class, 'publicShow']);
Route::get('/events/{slug}/gallery', [EventController::class, 'publicGallery']);

// Public gallery
Route::get('/gallery', [PhotoController::class, 'publicGallery']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);

    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index']);
        
        // Templates
        Route::apiResource('templates', TemplateController::class);
        Route::post('templates/{template}/duplicate', [TemplateController::class, 'duplicate']);
        
        // Sticker Packs
        Route::apiResource('sticker-packs', StickerPackController::class);
        Route::post('sticker-packs/{stickerPack}/stickers', [StickerPackController::class, 'addSticker']);
        Route::put('sticker-packs/{stickerPack}/stickers/{sticker}', [StickerPackController::class, 'updateSticker']);
        Route::delete('sticker-packs/{stickerPack}/stickers/{sticker}', [StickerPackController::class, 'deleteSticker']);
        
        // Filters
        Route::apiResource('filters', FilterController::class);
        
        // Events
        Route::apiResource('events', EventController::class);
        Route::put('events/{event}/status', [EventController::class, 'updateStatus']);
        
        // Photos
        Route::get('photos', [PhotoController::class, 'index']);
        Route::get('photos/{photo}', [PhotoController::class, 'show']);
        Route::delete('photos/{photo}', [PhotoController::class, 'destroy']);
        
        // Users
        Route::apiResource('users', UserController::class);
        Route::put('users/{user}/toggle-active', [UserController::class, 'toggleActive']);
        
        // Settings
        Route::get('settings', [SettingController::class, 'index']);
        Route::put('settings', [SettingController::class, 'update']);
    });
});
