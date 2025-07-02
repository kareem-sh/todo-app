<?php

namespace App\Http\Controllers;


use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function __construct(private AuthService $authService) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $this->authService->register($request->validated());

        return response()->json([
            'message' => 'User registered successfully',
            'user' => new UserResource($data['user']),
            'access_token' => $data['token'],
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $this->authService->login($request->validated());

        if (!$data) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => new UserResource($data['user']),
            'access_token' => $data['token'],
            'token_type' => 'Bearer',
        ]);
    }

    public function authUser()
    {
        $user = $this->authService->authUser();
        if (!$user) {
            return response()->json([
                'message' => 'user not found'
            ], 404);
        }
        return response()->json([
            'user' => $user,
        ], 200);
    }


    public function logout(): JsonResponse
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'message' => 'user not found'
            ], 404);
        }
        $this->authService->logout($user);

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
