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
                'status'=>0
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
                'phone' => 'required|unique:users|min:6',
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

       if (!$validator->fails())
       {
        try {
	        $User = $this->create($request->all());	       		
			
			if($User){
                return response()->json(['success' =>'A Profile is under review. <br />A Confirmation will be sent to your email id on '.$request['email']]);
            }else{
                return response()->json(['error' =>'Please try again']);
            }	

		} catch (Exception $e) {
			return response()->json(['error' => trans('form.whoops')], 500);
		}

       }else{
        return $validator->errors();
       }
    }
}
