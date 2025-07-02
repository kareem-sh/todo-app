<?php

namespace App\Repositories\Interfaces;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Collection;

interface TodoRepositoryInterface
{
    public function all(int $userId): Collection;
    public function find(int $id, int $userId): ?Todo;
    public function create(array $data): Todo;
    public function update(int $id, array $data, int $userId): bool;
    public function delete(int $id, int $userId): bool;
}
