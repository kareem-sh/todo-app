<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoController;

Route::apiResource('/todos', TodoController::class)->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Route::get('/todos', [TodoController::class, 'index']);
    // Route::post('/todos', [TodoController::class, 'store']);
    // Route::put('/todos/{id}', [TodoController::class, 'update']);
    // Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
});
