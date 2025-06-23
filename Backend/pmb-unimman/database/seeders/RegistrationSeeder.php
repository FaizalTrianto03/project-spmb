<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class RegistrationSeeder extends Seeder
{
    public function run(): void
    {
        $json = File::get(database_path('data-dummy/realDummyData.json'));
        $data = json_decode($json, true);

        DB::table('registrations')->insert($data['dummy_data']['registrations']);
    }
}
