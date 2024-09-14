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
use App\Models\TrainingSession;
use App\Models\DocumentConversations;
use Carbon\Carbon;
use App\Models\PerformanceData;
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
			"outcome_description"    => "required|array|min:3",
			"outcome_description.*"  => "required",
			"parameter"    => "required|array|min:3",
			"parameter.*"  => "required",
		]);    

		if (!$validator->fails())
		{
			
			$user_id =  $request->user()->id;
			$LearningOutcomes= LearningOutcomes::where('user_id',$user_id)->first();	
			
			$request_data=$request->post();

			if(!empty($LearningOutcomes)){
				$LearningOutcomes->outcome_description=json_encode($request->outcome_description);
				$LearningOutcomes->parameter=json_encode($request->parameter);
				$LearningOutcomes->save();

			}else{
				$LearningOutcomes = LearningOutcomes::create(['user_id'=>$user_id,'outcome_description'=>json_encode($request->outcome_description),'parameter'=>json_encode($request->parameter)]);
			}

			$LearningOutcomes= LearningOutcomes::where('user_id', $request->user()->id)->first();

			if($LearningOutcomes){
				$LearningOutcomes->outcome_description=json_decode($LearningOutcomes->outcome_description,true);

				$LearningOutcomes->parameter=json_decode($LearningOutcomes->parameter,true);
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

	public function getSessionListing(Request $request){
		$User = $request->user();

		$request_for=$request->request_for??'';

		if($User->user_type=="user"){
			$User = User::with('trainer')->find($User->id);  
			
			$trainer_id= $User['trainer'][0]->id;
			
		}else if($User->user_type=="trainer"){
			$User = User::with('users')->find($User->id);             
		}

		$TrainingSession =TrainingSession::with('trainer');
		if($request_for=="past"){
            $TrainingSession = $TrainingSession->whereRaw("date(session_date) < date(now())");
        }else if($request_for=="today"){
            $TrainingSession = $TrainingSession->whereRaw("date(session_date) = date(now())");
        }else{
			$TrainingSession = $TrainingSession->whereRaw("date(session_date) >= date(now())");
		}

        if($trainer_id>0){
            $TrainingSession =  $TrainingSession->where('trainer_id',$trainer_id);
        }

        $TrainingSession=$TrainingSession->orderBy('session_date', 'DESC')->get()->toArray();

		$TrainingSession2=TrainingSession::where('trainer_id',0)->where('status','1')->get()->toArray();

		$TrainingSession=array_merge($TrainingSession,$TrainingSession2);


        return response()->json(['success' =>'true','count'=>count($TrainingSession),'data'=>$TrainingSession]);

	}

	public function addDocumentingConversations(Request $request){
		$validator =Validator::make($request->all(), [
			'focus_of_the_day' => 'required|max:255',
			'today_conversion'=>'required|max:255',
			'feedback'=>'required|max:2000',
			'next_date'=>'required|date_format:Y-m-d|after:today',
			'session_id'=>'required',
			"last_week_comments"=>'required|max:500',
		]);    

		if (!$validator->fails())
		{
			
			$user_id =  $request->user()->id;


			$next_date = Carbon::parse($request->next_date);
			
			$DocumentConversations = DocumentConversations::create(
				[
					'user_id'=>$user_id,
					'focus_of_the_day'=>$request->focus_of_the_day,
					'today_conversion'=>$request->today_conversion,
					'feedback'=>$request->feedback,
					'next_date'=>$next_date->format('Y-m-d'),
					'status'=>'1',
					'session_id'=>$request->session_id,
					"last_week_comments"=>$request->last_week_comments
				]);

			if($request->has('doc_file')) {
				$DocumentConversations->doc_file = asset('storage/'.$request->doc_file->store('user/docs'));
				$DocumentConversations->save();
			}
			
			//$DocumentConversations= DocumentConversations::where('user_id', $request->user()->id)->orderBy('id','desc')->first();

			if($DocumentConversations){
				
				return response()->json(['data' => $DocumentConversations,"success"=>"true","message"=>"Successfully Updated"]);
			}else{
				return response()->json(['data' => $DocumentConversations,"success"=>"false"]);
			}

		}else{
			return $validator->errors();
		}
	}

	public function updateDocumentingConversations(Request $request){
		$validator =Validator::make($request->all(), [
			'focus_of_the_day' => 'required|max:255',
			'today_conversion'=>'required|max:255',
			'feedback'=>'required|max:2000',
			'next_date'=>'required|date_format:Y-m-d|after:today',
			'session_id'=>'required',
			'document_conversation_id'=>"required",
			"last_week_comments"=>'required|max:500',
		]);    

		if (!$validator->fails())
		{
			
			$user_id =  $request->user()->id;
			$next_date = Carbon::parse($request->next_date);

			$DocumentConversations=DocumentConversations::where('id',$request->document_conversation_id)->where("user_id",$user_id)->first();

			if(empty($DocumentConversations)){
				return response()->json(['message' =>"Document Conversation Id is not valid","success"=>"false"]);
			}

			$DocumentConversations->focus_of_the_day=$request->focus_of_the_day;
			$DocumentConversations->today_conversion=$request->today_conversion;
			$DocumentConversations->feedback=$request->feedback;
			$DocumentConversations->next_date=$request->next_date;
			$DocumentConversations->session_id=$request->session_id;
			$DocumentConversations->last_week_comments=$request->last_week_comments;

			if($request->has('doc_file')) {
				$DocumentConversations->doc_file = asset('storage/'.$request->doc_file->store('user/docs'));
			}
			$DocumentConversations->save();

			if($DocumentConversations){
				
				return response()->json(['data' => $DocumentConversations,"success"=>"true","message"=>"Successfully Updated"]);
			}else{
				return response()->json(['data' => $DocumentConversations,"success"=>"false"]);
			}

		}else{
			return $validator->errors();
		}
	}

	public function documentingConversations(Request $request){

		$request_for=$request->request_for??'';

		$DocumentConversations= DocumentConversations::trainerComment()->with('session','session.trainer')->where('document_conversations.user_id', $request->user()->id)->select('document_conversations.*','trainer_comments.comments');

		if($request_for=="current"){
			$DocumentConversations=$DocumentConversations->orderBy('document_conversations.id','desc')->first();
		}else{
			if($request_for=="past"){
				$DocumentConversations= $DocumentConversations->whereRaw('date(document_conversations.created_at) < DATE(now())')->get()->toArray();
			}else{
				$DocumentConversations= $DocumentConversations->get()->toArray();
			}
		}

		if($DocumentConversations){
			

			return response()->json(['data' => $DocumentConversations,"success"=>"true","count"=>($request_for=="current"?1:count($DocumentConversations))]);
		}else{
			return response()->json(['data' =>[],"success"=>"false"]);
		}
	}

	public function desiredObjective(Request $request){
		$user_id =  $request->user()->id;
		$PerformanceData=PerformanceData::with('session')->where("user_id",$user_id)->orderBy('id',"desc")->get()->toArray();

		if($PerformanceData){

			$temp=[];
			foreach($PerformanceData as $val){
				$temp[$val['performance_status']][$val['session_id']][]=($val);
			}

			return response()->json(['data' => $temp,"success"=>"true","count"=>count($PerformanceData)]);
		}else{
			return response()->json(['data' =>[],"success"=>"false"]);
		}

	}

	public function addDesiredObjective(Request $request){
		$request_data=$request->post();

		$user_id =  $request->user()->id;

		$validator =Validator::make($request->all(), [
				"performance"    => "required|array|min:3",
    			"performance.*"  => "required|numeric",
				"unit_measurement"    => "required|array|min:3",
    			"unit_measurement.*"  => "required",
				"description"    => "required|array|min:3",
    			"description.*"  => "required",
				"parameter"    => "required|array|min:3",
    			"parameter.*"  => "required",
				'session_id'=>'required',
			]);    
		

		if (!$validator->fails())
		{

			$PerformanceData=PerformanceData::where("user_id",$user_id)->where("session_id",$request->session_id)->orderBy('id',"desc")->get()->toArray();

			if(!empty($PerformanceData)){
				return response()->json(['message' =>"Performance data is alreardy added for this session","success"=>"false"]);
			}
			
			PerformanceData::where("user_id",$user_id)->update(['performance_status'=>'past']);

			$performance = $request_data['performance'];
			$parameter = $request_data['parameter'];
			$unit_measurement = $request_data['unit_measurement'];
			$description = $request_data['description'];

			foreach($performance as $key=>$val){

				PerformanceData::create(
				[
					'user_id'=>$user_id,
					'performance'=>$val,
					'kpi_score'=>0,
					'parameter'=>$parameter[$key],
					'unit_measurement'=>$unit_measurement[$key],
					'description'=>$description[$key],
					'status'=>'1',
					'performance_status'=>'current',
					'session_id'=>$request->session_id
				]);
			}
			
			$PerformanceData=PerformanceData::where("user_id",$user_id)->where("session_id",$request->session_id)->orderBy('id',"desc")->get();

			if($PerformanceData){
				return response()->json(['data' => $PerformanceData,"success"=>"true","message"=>"Successfully Added"]);
			}else{
				return response()->json(['data' => $PerformanceData,"success"=>"false"]);
			}

		}else{
			return $validator->errors();
		}
	}
	
	
}
