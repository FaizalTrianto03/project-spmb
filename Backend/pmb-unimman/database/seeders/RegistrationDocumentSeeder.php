<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class RegistrationDocumentSeeder extends Seeder
{
    public function run(): void
    {
        $json = File::get(database_path('data-dummy/realDummyData.json'));
        $data = json_decode($json, true);

        DB::table('registration_documents')->insert($data['dummy_data']['registration_documents']);
    }
}
