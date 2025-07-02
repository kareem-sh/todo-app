<?php

namespace Database\Factories;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TodoFactory extends Factory
{
    protected $model = Todo::class;

    public function definition()
    {
        return [
            'user_id'      => User::factory(),
            'title'        => $this->faker->sentence(3),
            'is_completed' => $this->faker->boolean(30),
        ];
    }
}
