<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\TrainingSession;

class PerformanceDataOthers extends Model
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
    
     protected $table = "performance_data_others";

     protected $fillable = [
        'user_id',
        'parameter',
        'status',
        'description',
    ];

    public  function session(){
        return $this->hasOne(TrainingSession::class,'session_id','session_id');
    }
}
