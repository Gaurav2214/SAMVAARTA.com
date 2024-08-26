<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;


class TrainingSession extends Pivot{

    protected $fillable = ['session_id', 'session_date','status','duration','trainer_id','topic','location','session_status','description'];

    protected $table ='training_sessions';

    protected $hidden = [
        'created_at', 'updated_at','deleted_at'
    ];

    protected $primaryKey = 'session_id';


    public  function trainer(){
        return $this->hasOne(User::class,'id','trainer_id');
    }


}