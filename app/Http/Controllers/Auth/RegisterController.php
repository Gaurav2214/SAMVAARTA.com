<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Redirect;
use Hash;
use Illuminate\Validation\Rule;
use Exception;
use Helper;



class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('user.guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */


    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        
       return User::create([
	            'name' => $data['name'],
	            'email' => $data['email'],
	            'phone' => $data['phone'],
	            'password' => isset($data['password'])?bcrypt($data['password']):bcrypt('123456'),
	            'login_by' => isset($data['login_by'])?$data['login_by']:'manual',
	            'social_unique_id' => '',
                'user_type'=> $data['user_type'],
                'linkedin_url'=>isset($data['linkedin_url'])?$data['linkedin_url']:'',
                'status'=>0,
                'date_of_joining'=>'1970-01-01'
        ]);
    }

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()
    {
        return view('user.auth.register');
    }

    /**
     * Get the guard to be used during registration.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard('user');
    }

    protected function validator(array $data)
    {   
        
        return Validator::make($data, [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'phone' => 'required|min:6',
                'password' => 'required|string|min:6',
                'linkedin_url'=>'url',
                'user_type' => [
                    'required',
                    Rule::in(['user', 'trainer','admin']),
                ],
        ]);
        
    }

    public function apiregister(Request $request)
    {
        $validator =$this->validator($request->all());    

       if(!$validator->fails())
       {
        try {
	        $User = $this->create($request->all());	 
                        
            if($request->hasFile('avatar')) {
				$User->avatar = asset('storage/'.$request->avatar->store('user/profile'));
				$User->save();
			}


            if($User->user_type=="user"){
                $User->unique_number = "U-".$User->id;
            }else if($User->user_type=="trainer"){
                $User->unique_number = "C-".$User->id;
            }else if($User->user_type=="admin"){
                $User->unique_number = "A-".$User->id;
            }
            $User->save();
			
			if($User){

                $from_name = \Setting::get('site_title');
	 
                $mail_to = \Setting::get('from_email');
                $subject = "New ".$User->user_type." has been registered";

                
                $param = array(
                        'to_email'  =>$mail_to,
                        'from_email'=>\Setting::get('from_email'),
                        'from_name' =>$from_name,
                        'to_name' 	=>$from_name,
                        'subject'   =>$subject,
                        'email' =>$User->email,
                        'user_type'=>$User->user_type,
                        'member_name'=>"Admin",
                        'site_name'=>$from_name,
                        'phone'=>$User->phone,
                        'mail_type'=>"register",
                        "body_part"=>""
                );					
                Helper::send_mail($param);
                

                return response()->json(['success' =>'A Profile is under review. <br />A Confirmation will be sent to your email id on '.$request['email']]);
            }else{
                return response()->json(['error' =>'Please try again','status'=>'false']);
            }	

		} catch (Exception $e) {
			return response()->json(['error' => $e->getMessage(),'status'=>'false'], 500);
		}

       }else{
        return $validator->errors();
       }
    }
}
