<?php

namespace App\Http\Controllers\Resource;

use App\Models\Enquiry;
 use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Route;
use Exception;
use Storage;
use App\User;
use App\Models\TrainerLearnerMapping;
use App\Models\DocumentConversations;
use App\Models\TrainerComment;
use App\Models\TrainingSession;
use App\Models\LearningOutcomes;
 use App\PDFGenerate;
 use App\Models\PerformanceData;
 use App\Models\PerformanceDataOthers;
 use App\Models\ClosureUserExperinces;
 use App\Models\ClosureTrainerExperinces;


class UserResource extends Controller
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

    public function listing()
    {
        $Users = User::with(['trainer'])->where(['user_type'=>'user'])->orderBy('id', 'DESC')->get();
        return response()->json(['success' =>'true','data'=>$Users,'count'=>count($Users)]);
    }

    public function trainer_listing()
    {
        $Users = User::with(['users'])->where(['user_type'=>'trainer'])->orderBy('id', 'DESC')->get();
        return response()->json(['success' =>'true','data'=>$Users,'count'=>count($Users)]);
    }

    public function admin_listing()
    {
        $Users = User::where(['user_type'=>'admin'])->orderBy('id', 'DESC')->get();
        return response()->json(['success' =>'true','data'=>$Users,'count'=>count($Users)]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view(Route::currentRouteName());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
                'name' => 'required|max:255',
                'email' => 'required|unique:users|email|max:255',
                'phone' => 'required|unique:users|string|max:255',
                'avatar' => 'image|max:2120',
                'password' => 'required|min:6|confirmed',
                'country_code' => 'required',
                'phone_number' => 'required'
            ]);

        try {
            $User = $request->all();
            $User['password'] = bcrypt($request->password);
            if($request->hasFile('avatar')) {
                $User['avatar'] = asset('storage/'.$request->avatar->store('user/profile'));
            }
            $User['latitude'] = 0;
            $User['longitude'] = 0;
            $User = User::create($User);

            // return redirect()->route('admin.users.index')->with('flash_success','User added successfully');
            return back()->with('flash_success',trans('user.created_success',['name'=>$User->name]));
        } catch (Exception $e) {
            // return redirect()->route('admin.users.index')->with('flash_error', 'Whoops! something went wrong.');
            return back()->with('flash_error', 'Whoops! something went wrong.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(empty($id)){
            return response()->json(['success' =>'false','message'=>"User Id is required"]);
         }
 
         $User = User::find($id);
         if(empty($User)){
             return response()->json(['success' =>'false','message'=>"User is not exists"]);
         }else{
             return response()->json(['success' =>'true','user'=>$User]);
         }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        try {
            $User = User::find($id);
            return view(Route::currentRouteName(), compact('User'));
        } catch (ModelNotFoundException $e) {
            // return redirect()->route('admin.users.index')->with('flash_error', 'User not found!');
            return back()->with('flash_error', 'User not found!');
        } catch (Exception $e) {
            // return redirect()->route('admin.users.index')->with('flash_error', 'Whoops! something went wrong.');
            return back()->with('flash_error', 'Whoops! something went wrong.');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $User = User::find($id);

            if(empty($User)){
                return response()->json(['success' =>'false','message'=>"User is not exists"]);
            }
            
            $Update['name'] = $request->name;
            $Update['phone'] = $request->phone;

            if($request->has('password')) {
                $Update['password'] = bcrypt($request->password);
            }
            
            $User->update($Update);
            return response()->json(['success' =>'true','message'=>"User has been successfulle updated"]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' =>'false','message'=>"User not found!"]);
        } catch (Exception $e) {
            return response()->json(['success' =>'false','message'=>"Whoops! something went wrong."]);
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
        try {
            $User = User::findOrFail($id);
            $User->phone = $User->phone.'-'.uniqid();
            $User->email = $User->email.'-'.uniqid();
            $User->social_unique_id = $User->social_unique_id.'-'.uniqid();
            $User->save();
            $User->delete();

            return back()->with('flash_success','User has been deleted!');
        } catch (ModelNotFoundException $e) {
            return back()->with('flash_error', 'Whoops! something went wrong.');
        }
    }

    public function activate(Request $request,$id){
        if(empty($id)){
           return response()->json(['success' =>'false','message'=>"User Id is required"]);
        }

        $status =(int)$request->status;

        $User = User::find($id);

        if(empty($User)){
            return response()->json(['success' =>'false','message'=>"User is not exists"]);
        }else if($status =="1" && $User['status']=='1'){
            return response()->json(['success' =>'false','message'=>"User has been already activated"]);
        }else if($status =="2" && $User['status']=='2'){
            return response()->json(['success' =>'false','message'=>"User has been already rejected"]);
        }else if($status =="0" && $User['status']=='0'){
            return response()->json(['success' =>'false','message'=>"User has been already deactivated"]);
        }else{
            $User->status= $status;
            $User->save();
            return response()->json(['success' =>'true','message'=>"User has been successfully ".( $status==1?'activated':'rejected')]);
        }
    }

    public function assign_trainer(Request $request){
        $validator =Validator::make($request->all(), [
            'user_id' => 'required',
            'trainer_id'  => 'required',	
        ]);    

        if (!$validator->fails())
        {
            $User = User::where('id',$request->user_id)->where('user_type','user')->first();
            $Trainer = User::where('id',$request->trainer_id)->where('user_type','trainer')->first();

            if(empty($User)){
                return response()->json(['success' =>'false','message'=>"Unable to found User"]);
            }

            if(empty($Trainer)){
                return response()->json(['success' =>'false','message'=>"Unable to found Trainer"]);
            }
            
            if($User['status']!='1'){
                return response()->json(['success' =>'false','message'=>"User not activated, please activate the user first."]);
            }

            if($Trainer['status']!='1'){
                return response()->json(['success' =>'false','message'=>"Trainer not activated, please activate the user first."]);
            }

            $user_id = $User['id'];
            $trainer_id = $Trainer['id'];


            $trainermapping=TrainerLearnerMapping::where('user_id',$user_id)->where('status','1')->first();

            if(!empty($trainermapping)){
                return response()->json(['success' =>'false','message'=>"Tainer is already assigned"]);
            }


            $Admin = $request->user();

            TrainerLearnerMapping::create([
                'user_id'       => $user_id,
                'trainer_id'    => $trainer_id,
                'status'        => 1,
                'assign_by'     => $Admin['id']
            ]);


            return response()->json(['success' =>'true','message'=>"Successfully assigned for trainer"]);

        }else{
            return $validator->errors();
        }

    }
    

	public function downloadReport(Request $request){
        $Users = User::with(['trainer'])->where('status',1)->where(['user_type'=>'user'])->orderBy('id', 'DESC')->get();

		$fileName = "user/reports/report-".date('Ymd').'.csv';//.date('YmdHis').'
    	$columns = array('User Code','name', 'email','phone','vision','description','created_at','Trainer Name','Trainer Email','Trainer Phone','Focus of the day','Status of last week\'s commitment','Today\'s conversation','Commitment for the week','Next Interaction Date','Interaction Name','Desired Outcomes Parameter','Brief Description');
		$csv =implode(",",$columns);

		
        foreach($Users as $user){

            $DocumentConversations= DocumentConversations::trainerComment()->with('session','session.trainer')->where('document_conversations.user_id', $user['id'])->select('document_conversations.*','trainer_comments.comments');

            $DocumentConversations=$DocumentConversations->get()->toArray();

            
            $data=[];         
            $data[0]=$user['unique_number'];   
            $data[1]=$user['name'];
            $data[2]=$user['email'];
            $data[3]=$user['phone'];
            $data[4]='"'.$user['vision'].'"';
            $data[5]='"'.$user['description'].'"';
            $data[6]=$user['created_at'];
            $data[7]=isset($user['trainer'][0]['name'])?$user['trainer'][0]['name']:"";
            $data[8]=isset($user['trainer'][0]['email'])?$user['trainer'][0]['email']:"";
            $data[9]=isset($user['trainer'][0]['phone'])?$user['trainer'][0]['phone']:"";

            $data[10]="";
            $data[11]="";
            $data[12]="";
            $data[13]="";
            $data[14]="";
            $data[15]="";

            $LearningOutcomes= LearningOutcomes::where('user_id', $user['id'])->first();

            $data[16]="";
            $data[17]="";

            if(!empty($LearningOutcomes)){
                $outcome_description = json_decode($LearningOutcomes->outcome_description,true);
                $parameter = json_decode($LearningOutcomes->parameter,true);
                $data[16]='"'.implode(",",$outcome_description).'"';
                $data[17]='"'.implode(",",$parameter).'"';
            }
            
            if(!empty($DocumentConversations)){
                foreach($DocumentConversations as $dc){
                    $d = $data;
                    $d[10]=$dc["focus_of_the_day"];
                    $d[11]='"'.$dc["last_week_comments"].'"';
                    $d[12]=$dc["today_conversion"];
                    $d[13]='"'.$dc["feedback"].'"';
                    $d[14]=$dc["next_date"];
                    $d[15]=isset($dc["session"]['topic'])?$dc["session"]['topic']:"";
                    $csv .=PHP_EOL;
                    $csv .=implode(",",$d);
                }
            }else{
                $d = $data;
                $csv .=PHP_EOL;
                $csv .=implode(",",$d);
            }



            
            //$csv .=PHP_EOL;
           // $csv .=implode(",",$data);
        }


	   Storage::disk('public')->put($fileName, $csv);

		return response()->json(['data' =>asset('storage/'.$fileName),"success"=>"true","message"=>"Successfully generated"]);
   

	}

    public function enquiry()
    {
        $Enquiry = Enquiry::where(['status'=>'1'])->orderBy('id', 'DESC')->get();
        return response()->json(['success' =>'true','data'=>$Enquiry,'count'=>count($Enquiry)]);
    }
   

    public function documentingConversationsForTrainer(Request $request){

        if(empty($request->user_id)){
            return response()->json(['success' =>'false','message'=>"User Id is required"]);
         }

        $User = User::with('trainer')->find($request->user_id);  

        $user_ids=[];
		$user_ids[] =$request->user_id;


		$DocumentConversations= DocumentConversations::trainerComment()->with('session')->whereIn('document_conversations.user_id', $user_ids)->select('document_conversations.*','trainer_comments.comments');

		$DocumentConversations= $DocumentConversations->get()->toArray();

		
		if($DocumentConversations){

			$LearningOutcomes= LearningOutcomes::whereIn('user_id', $user_ids)->get()->toArray();

			if(!empty($LearningOutcomes)){
				foreach($LearningOutcomes as $key=>$val){
              	     $outcome_description = json_decode($val['outcome_description'],true);
               		 $parameter = json_decode($val['parameter'],true);
					 $LearningOutcomes[$key]['parameter']=$parameter;
					 $LearningOutcomes[$key]['outcome_description']=$outcome_description;
				}
            }

			$PerformanceData=PerformanceData::whereIn("user_id",$user_ids)->orderBy('id',"desc")->get()->toArray();
			$temp=[];

			if($PerformanceData){
				foreach($PerformanceData as $val){
					$val['unit_measurement']=json_decode($val['unit_measurement'],true);
					$val['performance']=json_decode($val['performance'],true);
					$val['parameter']=json_decode($val['parameter'],true);
					$temp[]=($val);
				}

				$PerformanceDataOthers=PerformanceDataOthers::whereIn("user_id",$user_ids)->orderBy('id',"desc")->get()->toArray();

				if(!empty($PerformanceDataOthers)){
					foreach($PerformanceDataOthers as $key=>$val){

						$PerformanceDataOthers[$key]['parameter']=json_decode($val['parameter'],true);
						$PerformanceDataOthers[$key]['description']=json_decode($val['description'],true);

					}
				}
			}

            $ClosureUserExperinces=ClosureUserExperinces::whereIn("user_id",$user_ids)->orderBy('id',"desc")->get()->toArray();

            $trainer_id = isset($User->trainer[0]->id)?$User->trainer[0]->id:0;

            $ClosureTrainerExperinces=ClosureTrainerExperinces::where("trainer_id",$trainer_id)->whereIn('user_id',$user_ids)->orderBy('id',"desc")->get()->toArray();

			return response()->json(['data'=>$User,'DocumentConversations' => $DocumentConversations,'LearningOutcomes'=>$LearningOutcomes,'PerformanceData'=>$temp,'PerformanceDataOthers'=>$PerformanceDataOthers,"success"=>"true","ClosureUserExperinces"=>$ClosureUserExperinces,"ClosureTrainerExperinces"=>$ClosureTrainerExperinces]);
		}else{
			return response()->json(['data' =>[],"success"=>"false"]);
		}
	
	}
}