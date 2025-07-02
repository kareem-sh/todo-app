<?php

namespace App\Http\Controllers;

use App\Http\Requests\Todo\CreateTodoRequest;
use App\Http\Requests\Todo\UpdateTodoRequest;
use App\Http\Requests\TodoRequest;
use App\Repositories\Interfaces\TodoRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TodoController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        private TodoRepositoryInterface $todoRepository
    ) {}

    public function index(Request $request): JsonResponse
    {
        $todos = $this->todoRepository->all($request->user()->id);
        return response()->json($todos);
    }

    public function store(CreateTodoRequest $request): JsonResponse
    {
        $todo = $this->todoRepository->create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
        ]);

        return response()->json($todo, 201);
    }

    public function update(UpdateTodoRequest $request, int $id): JsonResponse
    {
        $todo = $this->todoRepository->find($id, $request->user()->id);
        try {
            $this->authorize('update', $todo);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Unauthorized action'
            ], 401);
        }
        $success = $this->todoRepository->update($id, $data = $request->validated(), $request->user()->id);

        if (!$success) {
            return response()->json(['message' => 'Todo not found'], 404);
        }

        return response()->json(['message' => 'Todo updated successfully']);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $todo = $this->todoRepository->find($id, $request->user()->id);
        try {
            $this->authorize('delete', $todo);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Unauthorized action'
            ], 401);
        }
        $success = $this->todoRepository->delete($id, $request->user()->id);

        if (!$success) {
            return response()->json(['message' => 'Todo not found'], 404);
        }

        return response()->json(['message' => 'Todo deleted successfully']);
    }
}
