<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Mail\WeeklyGoalsCheckInMail;
use Illuminate\Support\Facades\Mail;
use App\User;
use App\Models\LearningOutcomes;


class SendWeeklyGoalsCheckIn extends Command
{
    protected $signature = 'send:weekly-goals';
    protected $description = 'Send weekly check-in emails to users';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {

        $Users = User::with(['trainer'])->where(['user_type'=>'user'])->where('status','1')->orderBy('id', 'DESC')->get();


        foreach ($Users as $user) {

            $LearningOutcomes= LearningOutcomes::where('user_id', $user['id'])->first();
            $outcome_description = $parameter =[];

            if(!empty($LearningOutcomes)){
                $outcome_description = json_decode($LearningOutcomes->outcome_description,true);
                $parameter = json_decode($LearningOutcomes->parameter,true);
            }

        
            $mail_data=[
                "name"=>$user['name'],
                "email"=>$user['email'],
                "parameter1"=>isset($parameter[0])??'',
                "parameter2"=>isset($parameter[1])??'',
                "parameter3"=>isset($parameter[2])??'',
                "description1"=>isset($outcome_description[0])??'',
                "description2"=>isset($outcome_description[1])??'',
                "description3"=>isset($outcome_description[2])??'',
            ];

            $mail_data['email']="abhishek.checkmail@yopmail.com";

            Mail::to($mail_data['email'])->send(new WeeklyGoalsCheckInMail($mail_data));

            exit;
        }

        $this->info('Weekly goals emails sent successfully.');
    }
}