<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use Setting;
use Helper; 


class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('user.guest');
    }

    /**
     * Display the form to request a password reset link.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLinkRequestForm()
    {
        return view('user.auth.passwords.email');
    }

    /**
     * Get the broker to be used during password reset.
     *
     * @return \Illuminate\Contracts\Auth\PasswordBroker
     */
    public function broker()
    {
        return Password::broker('users');
    }

    protected function validator(array $data)
    {   
        return Validator::make($data, [
            'email' => 'required|email|exists:users,email',    
        ]);
        
    }

    public function forgot_password(Request $request) {
       
        $validator =$this->validator($request->all());    
        if (!$validator->fails())
        { 
    	

        try {
            $user = User::where('email' , $request->email)->first();

            $otp = rand(100000, 999999);
            $user->password = bcrypt($otp);
            $user->otp = $otp;
            $user->save();

            //Notification::send($user, new ResetPasswordOTP($otp));
            //$data['phone'] = $request->phone;
           // $data['otp'] = $otp;
			$message='Your Password : '.$otp."\r".\Setting::get('site_title'); 
           
            $from_name = \Setting::get('site_title');
	 
			$mail_to = $user->email;
			$subject = $message;
			
			if($mail_to!=''){
				$param = array(
					'to_email'  =>$mail_to,
					'from_email'=>\Setting::get('from_email'),
					'from_name' =>$from_name,
					'to_name' 	=>$from_name,
					'subject'   =>$subject,
					'body_part' =>$message,
				);					
				Helper::send_mail($param);
			}


            return response()->json([
                'message' => 'Mail Sent!',
                'success'=>"true",
                'user' => $user
            ]);
            	
            	     
            
        } catch(Exception $e) {
            return response()->json([
                'error' => trans('form.whoops')
            ], 500);
        }
    }else{
        return $validator->errors();
    }
    }
}
