<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        $json = File::get(database_path('data-dummy/realDummyData.json'));
        $data = json_decode($json, true);

        DB::table('schools')->insert($data['dummy_data']['schools']);
    }
}
