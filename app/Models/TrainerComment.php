<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;


class TrainerComment extends Pivot{

    protected $fillable = ['id', 'comments','status','user_id','trainer_id','session_id','document_conversation_id'];

    protected $table ='trainer_comments';

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public  function user(){
        return $this->hasOne(LearningObjectiveTypes::class,'id','objective_type');
    }


}