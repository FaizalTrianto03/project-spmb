<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AnnouncementController extends Controller
{
    // GET /api/public/announcements
    public function index(Request $request)
    {
        $limit = $request->query('limit', 10); // Default 10 item per halaman

        $announcements = Announcement::query()
            // Hanya ambil yang sudah di-publish dan tanggal publish-nya sudah lewat
            ->where('is_published', true)
            ->where('publish_date', '<=', Carbon::now())
            // Filter berdasarkan tipe jika ada
            ->when($request->query('type'), function ($query, $type) {
                return $query->where('type', $type);
            })
            ->orderBy('publish_date', 'desc') // Tampilkan yang terbaru dulu
            ->paginate($limit);

        return AnnouncementResource::collection($announcements);
    }

    // GET /api/public/announcements/latest
    public function latest()
    {
        $latestAnnouncements = Announcement::query()
            ->where('is_published', true)
            ->where('publish_date', '<=', Carbon::now())
            ->orderBy('publish_date', 'desc')
            ->limit(5)
            ->get();

        return AnnouncementResource::collection($latestAnnouncements);
    }

    // GET /api/public/announcements/{announcement}
    public function show(Announcement $announcement)
    {
        // Pastikan hanya pengumuman yang sudah terbit yang bisa diakses
        if (!$announcement->is_published || $announcement->publish_date > Carbon::now()) {
            abort(404, 'Pengumuman tidak ditemukan.');
        }

        return new AnnouncementResource($announcement);
    }
}
