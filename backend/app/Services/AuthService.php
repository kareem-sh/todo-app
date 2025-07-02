<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data): array
    {
        $user = User::create([
            'full_name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return $data = [
            'user' => $user,
            'token' => $token
        ];
    }

    public function login(array $credentials)
    {
        if (!Auth::attempt($credentials)) {
            return false;
        }
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return $data = [
            'user' => $user,
            'token' => $token
        ];
    }

    public function authUser(): User
    {
        $user = Auth::user();
        return $user;
    }

    public function logout(User $user): void
    {
        $user->tokens()->delete();
    }
}
