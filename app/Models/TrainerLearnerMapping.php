<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;


class TrainerLearnerMapping extends Pivot{

    protected $fillable = ['id', 'user_id', 'trainer_id','assign_by', 'status'];

    protected $table ='trainer_learner_mapping';


    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at',
    ];

    public function trainer(){

    }
}