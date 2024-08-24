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
use Storage;
use App\Models\CodeOfEthics;
use App\Models\LearningOutcomes;
use App\Models\LearningObjective;
use App\Models\TrainerComment;

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

				if($request->has('user_code')){
					$User->user_code = $request->user_code;
				}

				if($request->has('date_of_joining')){
					$User->date_of_joining = $request->date_of_joining;
				}

				if($request->has('experience')){
					$User->experience = (int)$request->experience;
				}
				if($request->has('user_function')){
					$User->user_function = $request->user_function;
				}
				if($request->has('location')){
					$User->location = $request->location;
				}
				if($request->has('vision')){
					$User->vision = $request->vision;
				}
				if($request->has('description')){
					$User->description = $request->description;
				}
				if($request->has('no_of_coachees')){
					$User->no_of_coachees = (int)$request->no_of_coachees;
				}
				

				if($request->has('avatar')) {
					//$User->avatar = asset('storage/'.$request->avatar->store('user/profile'));
					$base64_image = $request->avatar;

					if (preg_match('/^data:image\/(\w+);base64,/', $base64_image)) {
						$data = substr($base64_image, strpos($base64_image, ',') + 1);

						$image_name= "users/user-".time().".jpg";

						$data = base64_decode($data);
						Storage::disk('public')->put($image_name, $data);
						$User->avatar =asset('storage/'.$image_name);
					}

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

	public function code_of_ethics(Request $request)
	{
		try {
			$CodeOfEthics= CodeOfEthics::where('user_id', $request->user()->id)->first();
			return response()->json(['data' => $CodeOfEthics]);
		} catch (Exception $e) {
			return response()->json(['error' => "Something missing"], 500);
		}
	}

	
	public function add_edit_code_of_ethics(Request $request)
	{
		$validator =Validator::make($request->all(), [
			'comments' => 'required|max:1500',
		]);    

		if (!$validator->fails())
		{
			
			$user_id =  $request->user()->id;
			$CodeOfEthics= CodeOfEthics::where('user_id',$user_id)->first();

			

			if(!empty($CodeOfEthics)){
				$CodeOfEthics->comments=$request->comments;
			}else{
				$CodeOfEthics = CodeOfEthics::create(['user_id'=>$user_id,'comments'=>$request->comments]);
			}

			if($CodeOfEthics){
				return response()->json(['data' => $CodeOfEthics,"success"=>"true","message"=>"Successfully Updated"]);
			}else{
				return response()->json(['data' => $CodeOfEthics,"success"=>"false"]);
			}

		}else{
			return $validator->errors();
		}
	}

	public function learning_objective(Request $request)
	{
		try {
			$LearningObjective= LearningObjective::with('learning_objective_type')->where('user_id', $request->user()->id)->get()->toArray();
			return response()->json(['data' => $LearningObjective]);
		} catch (Exception $e) {
			return response()->json(['error' => "Something missing"], 500);
		}
	}

	public function add_edit_learning_objective(Request $request)
	{
		$validator =Validator::make($request->all(), [
			'description' => 'required',
			'objective_type'=>'required'
		]);    

		if (!$validator->fails())
		{
			
			$user_id =  $request->user()->id;
			$LearningObjective= LearningObjective::where('user_id',$user_id)->first();			

			if(!empty($LearningObjective)){
				$LearningObjective->description=json_encode($request->description);
				$LearningObjective->objective_type=$request->objective_type;
		
			}else{
				$LearningObjective = LearningObjective::create(['user_id'=>$user_id,'description'=>json_encode($request->description),'objective_type'=>$request->objective_type]);
			}

			$LearningObjective= LearningObjective::with('learning_objective_type')->where('user_id', $request->user()->id)->first();

			if($LearningObjective){
				$LearningObjective->description=json_decode($LearningObjective->description,true);
				return response()->json(['data' => $LearningObjective,"success"=>"true","message"=>"Successfully Updated"]);
			}else{
				return response()->json(['data' => $LearningObjective,"success"=>"false"]);
			}

		}else{
			return $validator->errors();
		}
	}

	public function learning_outcome(Request $request)
	{
		try {
			$LearningOutcomes= LearningOutcomes::where('user_id', $request->user()->id)->first();
			return response()->json(['data' => $LearningOutcomes]);
		} catch (Exception $e) {
			return response()->json(['error' => "Something missing"], 500);
		}
	}

	public function add_edit_learning_outcome(Request $request)
	{
		$validator =Validator::make($request->all(), [
			'description' => 'required',
		]);    

		if (!$validator->fails())
		{
			
			$user_id =  $request->user()->id;
			$LearningOutcomes= LearningOutcomes::where('user_id',$user_id)->first();			

			if(!empty($LearningOutcomes)){
				$LearningOutcomes->outcome_description=json_encode($request->outcome_description);
			}else{
				$LearningOutcomes = LearningOutcomes::create(['user_id'=>$user_id,'outcome_description'=>json_encode($request->outcome_description)]);
			}

			$LearningOutcomes= LearningOutcomes::where('user_id', $request->user()->id)->first();

			if($LearningOutcomes){
				$LearningOutcomes->outcome_description=json_decode($LearningOutcomes->outcome_description,true);
				return response()->json(['data' => $LearningOutcomes,"success"=>"true","message"=>"Successfully Updated"]);
			}else{
				return response()->json(['data' => $LearningOutcomes,"success"=>"false"]);
			}

		}else{
			return $validator->errors();
		}
	}

	public function add_comment(Request $request)
	{
		$validator =Validator::make($request->all(), [
			'comments' => 'required',
			'user_id'=>'required'
		]);    

		if (!$validator->fails())
		{
			
			$trainer_id =  $request->user()->id;
			$user_id = $request->user_id;

			$User = User::with('users')->find($trainer_id);   

			if($request->user()->user_type!="trainer"){
				return response()->json(['data' => "You are not trainer.","success"=>"false"]);
			}

			
			$TrainerComment = TrainerComment::create(['user_id'=>$user_id,'trainer_id'=>$trainer_id,'comments'=>$request->comments]);
			
			$TrainerComment= TrainerComment::where('trainer_id', $trainer_id)->get()->toArray();

			if($TrainerComment){
				return response()->json(['data' => $TrainerComment,"success"=>"true","message"=>"Successfully Added"]);
			}else{
				return response()->json(['data' => $TrainerComment,"success"=>"false"]);
			}

		}else{
			return $validator->errors();
		}
	}

	public function comments(Request $request)
	{
		try {
			$TrainerComment= TrainerComment::where('trainer_id', $request->user()->id)->get()->toArray();
			return response()->json(['data' => $TrainerComment]);
		} catch (Exception $e) {
			return response()->json(['error' => "Something missing"], 500);
		}
	}

	public function getTrainerComments(Request $request)
	{
		try {
			$TrainerComment= TrainerComment::where('user_id', $request->user()->id)->get()->toArray();
			return response()->json(['data' => $TrainerComment]);
		} catch (Exception $e) {
			return response()->json(['error' => "Something missing"], 500);
		}
	}

	
	
}
