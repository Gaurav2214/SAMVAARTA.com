<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\TrainingSession;

class DocumentConversations extends Model
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
    
     protected $table = "document_conversations";

     protected $fillable = [
        'user_id',
        'doc_file',
        'status',
        'session_id',
        'feedback',
        'focus_of_the_day',
        'today_conversion',
        'next_date',
        'last_week_comments'
    ];
   
    public  function session(){
        return $this->hasOne(TrainingSession::class,'session_id','session_id');
    }

    

    public function scopeTrainerComment($query){
        return $query->join('trainer_comments', 'trainer_comments.session_id', '=', 'document_conversations.session_id','left');
    }

}
