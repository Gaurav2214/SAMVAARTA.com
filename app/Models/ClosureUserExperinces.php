<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\TrainingSession;

class ClosureUserExperinces extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
   
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    
     protected $table = "closure_user_experinces";

     protected $fillable = [
        'user_id',
        'trainer_id',
        'status',
        'experience_enjoyed',
        'experience_wish',
        'experience_gained'
    ];
}
