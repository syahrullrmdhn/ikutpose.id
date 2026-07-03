<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function publicIndex(): JsonResponse
    {
        // Kunci setting yang boleh diakses publik
        $publicKeys = [
            'site_name', 'site_tagline', 
            'about_us_content', 
            'contact_email', 'contact_whatsapp', 'contact_instagram', 'contact_address'
        ];

        $settings = Setting::whereIn('key', $publicKeys)->get()->map(function ($setting) {
            return [
                'key' => $setting->key,
                'value' => $this->castValue($setting->value, $setting->type),
            ];
        });

        // Ubah menjadi format key-value flat object
        $flatSettings = [];
        foreach ($settings as $s) {
            $flatSettings[$s['key']] = $s['value'];
        }

        return response()->json($flatSettings);
    }

    public function index(): JsonResponse
    {
        $settings = Setting::all()->map(function ($setting) {
            return [
                'id' => $setting->id,
                'key' => $setting->key,
                'value' => $this->castValue($setting->value, $setting->type),
                'type' => $setting->type,
                'group' => $setting->group,
                'description' => $setting->description,
            ];
        });

        return response()->json($settings);
    }

    public function update(Request $request): JsonResponse
    {
        $data = $request->all();

        // Accept both formats: { settings: [{key, value}] } or { key: value, key: value }
        $items = [];
        if (isset($data['settings']) && is_array($data['settings'])) {
            $items = $data['settings'];
        } else {
            // Flat object format from frontend
            foreach ($data as $key => $value) {
                $items[] = ['key' => $key, 'value' => $value];
            }
        }

        foreach ($items as $item) {
            if (!isset($item['key'])) continue;
            $setting = Setting::where('key', $item['key'])->first();
            if ($setting) {
                $castedValue = $this->prepareValue($item['value'] ?? null, $setting->type);
                $setting->update(['value' => $castedValue]);
            } else {
                // Buat baru jika belum ada
                Setting::create([
                    'key' => $item['key'],
                    'value' => (string) ($item['value'] ?? ''),
                    'type' => 'string',
                    'group' => 'general'
                ]);
            }
        }

        return $this->index();
    }

    private function castValue(?string $value, string $type): mixed
    {
        if ($value === null) return null;
        return match ($type) {
            'boolean' => filter_var($value, FILTER_VALIDATE_BOOLEAN),
            'integer' => (int) $value,
            'json' => json_decode($value, true),
            default => $value,
        };
    }

    private function prepareValue(mixed $value, string $type): ?string
    {
        if ($value === null) return null;
        return match ($type) {
            'boolean' => $value ? '1' : '0',
            'integer' => (string) $value,
            'json' => is_string($value) ? $value : json_encode($value),
            default => (string) $value,
        };
    }
}
