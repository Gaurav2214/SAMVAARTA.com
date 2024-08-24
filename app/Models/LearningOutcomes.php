<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
use App\Models\LearningObjectiveTypes;


class LearningOutcomes extends Pivot{

    protected $fillable = ['id', 'objective_type','status','user_id','outcome_description','skill_level','experience_at_end'];

    protected $table ='learning_outcomes';

    protected $hidden = [
        'created_at', 'updated_at'
    ];

   

}