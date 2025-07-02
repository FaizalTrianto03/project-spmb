<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User; // Pastikan model User diimpor
use App\Models\Dosen; // Pastikan model Dosen diimpor
use App\Models\Mahasiswa; // Pastikan model Mahasiswa diimpor
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;

class AuthController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
{
    $request->validate([
        'login' => ['required', 'string'],
        'password' => ['required', 'string'],
    ]);

    $login = $request->input('login');
    $password = $request->input('password');

    $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

    $user = null;
    $guardUsed = null;

    $foundUser = User::where($fieldType, $login)->first();
    if ($foundUser && Hash::check($password, $foundUser->password)) {
        $user = $foundUser;
        $guardUsed = 'web';
    }

    if (!$user) {
        $foundDosen = Dosen::where($fieldType, $login)->first();
        if ($foundDosen && Hash::check($password, $foundDosen->password)) {
            $user = $foundDosen;
            $guardUsed = 'dosen';
        }
    }

    if (!$user) {
        $foundMahasiswa = Mahasiswa::where($fieldType, $login)->first();
        if ($foundMahasiswa && Hash::check($password, $foundMahasiswa->password)) {
            $user = $foundMahasiswa;
            $guardUsed = 'mahasiswa';
        }
    }

    if (!$user) {
        throw ValidationException::withMessages([
            'login' => ['Kredensial yang diberikan tidak cocok dengan catatan kami.'],
        ]);
    }

    // FIXED: safe way to generate token
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login berhasil!',
        'user' => $user,
        'token' => $token,
        'token_type' => 'Bearer',
        'guard' => $guardUsed,
    ], 200);
}


    /**
     * Log the user out of the application (API).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Pastikan ada user yang terautentikasi melalui token Sanctum
        if ($request->user()) {
            // Revoke token yang sedang digunakan oleh sesi ini
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'message' => 'Logout berhasil.',
            ], 200);
        }

        return response()->json([
            'message' => 'Tidak ada pengguna yang terautentikasi.',
        ], 401); // Unauthorized
    }

    /**
     * Handle a forgot password request (API).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // Menggunakan fitur reset password bawaan Laravel
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Tautan reset password telah dikirim ke email Anda.'], 200);
        }

        return response()->json(['message' => 'Tidak dapat mengirim tautan reset password.'], 500);
    }

    /**
     * Handle a password reset request (API).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password Anda berhasil direset.'], 200);
        }

        return response()->json(['message' => 'Gagal mereset password.'], 500);
    }
}
