<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Hesto\MultiAuth\Traits\LogsoutGuard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use Hash;
use Laravel\Passport\HasApiTokens;



class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    /*use AuthenticatesUsers, LogsoutGuard {
        LogsoutGuard::logout insteadof AuthenticatesUsers;
    }
    */
    use HasApiTokens;


    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    public $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
       //$this->middleware('user.guest', ['except' => 'logout']);
      
       //$this->middleware('guest')->except('logout');

    }

    /**
     * Show the application's login form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLoginForm()
    {
        return view('user.auth.login');
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard('user');
    }

    public function username()
	{
		return 'email';
	}

    protected function validator(array $data)
    {   
        return Validator::make($data, [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        
    }

	public function login(Request $request){
        $validator =$this->validator($request->all());    
        if (!$validator->fails())
        {     
            try{
            	$email = $request->email;
            	$password=$request->password;
            	$remember=$request->remember;

            	$user = User::where('email',$email)->first();
				//qldd();

                if(empty($user)){
                    return response()->json(['error' =>'User is not exists!']);
                }

                if($user->status=='0'){
                    return response()->json(['error' =>'User is not activated, Please connect to adminstrator']);
                }
				
	                      	            	            	
            	if($this->guard()->loginUsingId($user->id)){
            		if (Auth::attempt(['email' => $email, 'password' => $password]))
					{		
                        if (Hash::check($request->password, $user->password)) {

                            $token = $user->createToken('User Login')->accessToken;

                            $response = ['token' => $token];
                            return response($response, 200);
                        } else {
                            $response = ["message" => "Password mismatch"];
                            return response($response, 422);
                        }

					}else{
                        return response()->json(['error' =>'Login/Password Invalid. Please try Again!','status'=>'false']);
                    }
            	}
            	
            	if ($this->guard()->login($user)){
            	}

				


            }catch(ModelNotFoundException $e){
                return response()->json(['error' =>'Woops']);
            }

        }else{
            return $validator->errors();
        }

	}
}
