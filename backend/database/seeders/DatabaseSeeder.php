<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Order matters: users first, then todos
        $this->call([
            UserSeeder::class,
            TodoSeeder::class,
        ]);
    }
}
