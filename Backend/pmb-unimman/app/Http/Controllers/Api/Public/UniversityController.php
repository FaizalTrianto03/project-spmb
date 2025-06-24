<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Resources\UniversityResource;
use App\Http\Controllers\Controller;
use App\Models\University;

class UniversityController extends Controller
{
    public function show()
    {
        $university = University::firstOrFail();
        return new UniversityResource($university); // Gunakan resource
    }
}
