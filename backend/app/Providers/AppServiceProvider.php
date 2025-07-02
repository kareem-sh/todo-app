<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\AuthService;
use App\Repositories\Interfaces\TodoRepositoryInterface;
use App\Repositories\TodoRepository;
use App\Models\Todo;
use App\Policies\TodoPolicy;

class AppServiceProvider extends ServiceProvider
{



    protected $policies = [
        Todo::class => TodoPolicy::class,
    ];


    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthService::class, function ($app) {
            return new AuthService();
        });
        $this->app->bind(TodoRepositoryInterface::class, TodoRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
