<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function AuthSignInPage()
    {
        // Tampilkan halaman login mahasiswa
        return view('mahasiswa.test');
    }
}
