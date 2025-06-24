<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\CityResource;
use App\Http\Resources\ProvinceResource;
use App\Http\Resources\SchoolResource;
use App\Models\Province;
use App\Models\School;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function provinces(Request $request)
    {
        $provinces = Province::query()
            ->when($request->query('search'), function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy('name')
            ->get();

        return ProvinceResource::collection($provinces);
    }

    public function cities(Province $province)
    {
        $cities = $province->cities()->orderBy('name')->get();

        return CityResource::collection($cities);
    }

    public function schools(Request $request)
    {
        $schools = School::query()
            ->where('is_verified', true)
            ->when($request->query('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('npsn', 'like', "%{$search}%");
            })
            ->when($request->query('province_id'), function ($query, $provinceId) {
                $query->where('province_id', $provinceId);
            })
            ->when($request->query('city_id'), function ($query, $cityId) {
                $query->where('city_id', $cityId);
            })
            ->when($request->query('type'), function ($query, $type) {
                $query->where('type', $type);
            })
            ->paginate(10);

        return SchoolResource::collection($schools);
    }
}
