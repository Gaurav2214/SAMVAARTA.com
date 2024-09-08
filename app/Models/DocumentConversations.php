<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\TrainerLearnerMapping;

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
        'next_date'
    ];
   

}
