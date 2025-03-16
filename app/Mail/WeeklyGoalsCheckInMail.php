<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WeeklyGoalsCheckInMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        return $this->subject('Staying on Track – Your Weekly Goals N U Check-In')
                    ->view('emails.weekly_goals')
                    ->with('data', $this->data)
                    ->cc('goalsnu24@gmail.com');
    }
}
