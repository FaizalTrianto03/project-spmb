<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AnnouncementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'type' => $this->type,
            'banner_image_url' => $this->banner_image ? url($this->banner_image) : null,
            'published_at' => $this->publish_date->toFormattedDateString(), // Format: Dec 25, 2024
            'created_at_human' => $this->created_at->diffForHumans(), // Format: '1 week ago'
        ];
    }
}
