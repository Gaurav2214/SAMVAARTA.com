<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;


class LearningObjectiveTypes extends Pivot{

    protected $fillable = ['id', 'objective_type','status'];

    protected $table ='learning_objective_types';


}