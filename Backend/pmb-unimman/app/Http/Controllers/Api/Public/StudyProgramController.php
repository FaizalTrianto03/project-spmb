<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Resources\StudyProgramResource;
use App\Http\Controllers\Controller;
use App\Models\StudyProgram;
use Illuminate\Http\Request;

class StudyProgramController extends Controller
{
    public function index(Request $request)
    {
        $studyPrograms = StudyProgram::query()
            ->where('is_active', true)
            // Filter berdasarkan 'level' jika ada di request 
            ->when($request->query('level'), function ($query, $level) {
                return $query->where('level', $level);
            })
            // Filter berdasarkan 'search' jika ada di request 
            ->when($request->query('search'), function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
            })
            ->get();

        return StudyProgramResource::collection($studyPrograms); // Gunakan resource untuk koleksi
    }

    // Menggunakan Route Model Binding
    public function show(StudyProgram $studyProgram)
    {
        return new StudyProgramResource($studyProgram); // Gunakan resource
    }
}
