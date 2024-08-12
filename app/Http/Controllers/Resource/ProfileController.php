<?php

namespace App\Http\Controllers\Resource;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Setting;
use Hash;
use App\User;
use Illuminate\Support\Facades\Validator;
use Exception;

class ProfileController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */

   public function __construct(Request $request)
	{		
		$this->middleware('auth');		
	}


	public function index(Request $request)
	{
		$User = $request->user();

		
		if($request->has('device_type')){
			$User->device_type = $request->device_type;
		}
		if($request->has('device_token')){
			$User->device_token = $request->device_token;
		}
		if($request->has('device_id')){
			$User->device_id = $request->device_id;
		}
		$User->save();
		if($User->user_type=="user"){
			$User = User::with('trainer')->find($User->id);             
		}else if($User->user_type=="trainer"){
			$User = User::with('users')->find($User->id);             
		}
        return $User;
	
		
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request)
	{
		/* */

		$User = $request->user();


		if($request->action=="profile" || $request->action==""){

            $validator =Validator::make($request->all(), [
                    'name' => 'required|string|max:255',
                    'phone'  => 'required|max:15',
                    'linkedin_url'=>'url',
            ]);    

            if (!$validator->fails())
            {
			

			try{					
				$msg = trans('form.resource.updated');
				if($request->has('name')){
					$User->name = $request->name;
				}
				if($request->has('linkedin_url')){
					$User->linkedin_url = $request->linkedin_url;
				}
				if($request->has('phone')){
					$User->phone = $request->phone;
				}

				if($request->hasFile('avatar')) {
					$User->avatar = asset('storage/'.$request->avatar->store('user/profile'));
				}
				
				$User->save();
				return response()->json(['success' =>'true','message'=>'Profile has been successfully updated','data'=>$User]);
				

			} catch (Exception $e) {
				
					return response()->json(['error' => trans('form.whoops'),'status'=>'false'], 500);
				
			}
        }else{
            return $validator->errors();
        }
		}else if($request->action=="password"){
			$validator =Validator::make($request->all(), [
					'password' => 'required|confirmed|min:6',
					'password_old' => 'required',
			]);    

			if (!$validator->fails())
			{
				
				if(Hash::check($request->password_old, $User->password))
				{
					$User->password = bcrypt($request->password);
					$User->save();

					return response()->json(['message' => ('Password Updated'),'status'=>'true']);
						
				}else{
					return response()->json(['error' => 'Password did not matched','status'=>'false']);
				}
			}else{
				return $validator->errors();
			}
		}
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function password(Request $request)
	{
		$this->validate($request, [
                'password' => 'required|confirmed|min:6',
                'password_old' => 'required',
		]);

		$User = $request->user();

		if(Hash::check($request->password_old, $User->password))
		{
			$User->password = bcrypt($request->password);
			$User->save();

			if($request->ajax()) {
				return response()->json(['message' => trans('Password Updated')]);
			} else {
				return back()->with('flash_success', 'Password Updated');
			}

		} else {
			if($request->ajax()) {
				return response()->json(['error' => trans('Incorrect Password')], 500);
			}
			return back()->with('flash_failure', 'Incorrect Password');
		}
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		//
	}

	/**
	 * Show the application dashboard.
	 *
	 * @return \Illuminate\Http\Response
	 */

	public function logout(Request $request)
	{
		try {
			User::where('id', $request->user()->id)->update(['device_id'=> '', 'device_token' => '']);
			return response()->json(['message' => trans('form.logout_success')]);
		} catch (Exception $e) {
			return response()->json(['error' => trans('form.whoops')], 500);
		}
	}

	

}
