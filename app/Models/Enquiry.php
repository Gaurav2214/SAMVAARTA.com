<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Enquiry extends Model
{

     use SoftDeletes, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['id', 'type', 'email', 'first_name', 'last_name', 'phone_number', 'mobile_number', 'message', 'status'];
	
	/**
     * The attributes is used to replace primary key.
     *
     * @var string
     */
		//protected $primaryKey = 'enquiry_id';

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at',
    ];
     
}
