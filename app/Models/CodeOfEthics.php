<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\TrainerLearnerMapping;

class CodeOfEthics extends Model
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
    
     protected $table = "code_of_ethics";

     protected $fillable = [
        'user_id',
        'comments',
    ];


   

}
