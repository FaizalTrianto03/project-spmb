<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdmissionPathResource;
use App\Http\Resources\AdmissionRequirementResource;
use App\Http\Resources\StudyProgramResource;
use App\Models\AdmissionPath;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AdmissionPathController extends Controller
{
    public function index(Request $request)
    {
        $now = Carbon::now();

        $paths = AdmissionPath::query()
            ->where('is_active', true)
            ->whereDate('start_date', '<=', $now)
            ->whereDate('end_date', '>=', $now)
            ->when($request->query('academic_year'), function ($query, $year) {
                return $query->where('academic_year', $year);
            })
            ->orderBy('start_date')
            ->get();

        return AdmissionPathResource::collection($paths);
    }

    public function show(AdmissionPath $admissionPath)
    {
        return new AdmissionPathResource($admissionPath);
    }

    public function programs(AdmissionPath $admissionPath)
    {
        return StudyProgramResource::collection($admissionPath->studyPrograms);
    }

    public function requirements(AdmissionPath $admissionPath)
    {
        return AdmissionRequirementResource::collection($admissionPath->admissionRequirements);
    }
}
