<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Todo extends Model
{
    use HasFactory, Notifiable;
    protected $fillable = ['user_id', 'title', 'is_completed'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
