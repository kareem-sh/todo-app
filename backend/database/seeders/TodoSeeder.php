<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Todo;
use App\Models\User;
use Database\Factories\TodoFactory;

class TodoSeeder extends Seeder
{
    public function run()
    {
        Todo::factory()->count(10)->create();
    }
}
