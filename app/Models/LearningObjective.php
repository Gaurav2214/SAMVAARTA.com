<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
use App\Models\LearningObjectiveTypes;


class LearningObjective extends Pivot{

    protected $fillable = ['id', 'objective_type','status','user_id','description'];

    protected $table ='learning_objectives';

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public  function learning_objective_type(){
        return $this->hasOne(LearningObjectiveTypes::class,'id','objective_type');
    }


}