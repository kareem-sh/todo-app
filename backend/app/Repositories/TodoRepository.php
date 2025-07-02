<?php

namespace App\Repositories;

use App\Models\Todo;
use App\Repositories\Interfaces\TodoRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class TodoRepository implements TodoRepositoryInterface
{
    public function all(int $userId): Collection
    {
        return Todo::where('user_id', $userId)->get();
    }

    public function find(int $id, int $userId): ?Todo
    {
        return Todo::where('user_id', $userId)->find($id);
    }

    public function create(array $data): Todo
    {
        return Todo::create($data);
    }

    public function update(int $id, array $data, int $userId): bool
    {
        $todo = $this->find($id, $userId);

        if (!$todo) {
            return false;
        }

        return $todo->update($data);
    }

    public function delete(int $id, int $userId): bool
    {
        $todo = $this->find($id, $userId);

        if (!$todo) {
            return false;
        }

        return $todo->delete();
    }
}
