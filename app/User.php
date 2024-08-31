<?php

namespace App;

use App\Notifications\UserResetPassword;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use App\Models\TrainerLearnerMapping;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','phone','role','linkedin_url','login_by','user_type','status','user_code','date_of_joining','experience','user_function','location','vision','description','no_of_coachees'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new UserResetPassword($token));
    }

    public function trainer()
    {
        return $this->belongsToMany(User::class,'trainer_learner_mapping','id','trainer_id')->where('users.status',1);
    }

    public function users()
    {
        return $this->belongsToMany(User::class,'trainer_learner_mapping','trainer_id','trainer_learner_mapping.user_id');
    }

}
