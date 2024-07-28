<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class TrainerLearnerMapping extends Model{

    protected $fillable = ['id', 'user_id', 'trainer_id','assign_by', 'status'];

    protected $table ='tarianer_learner_mapping';


    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at',
    ];

}