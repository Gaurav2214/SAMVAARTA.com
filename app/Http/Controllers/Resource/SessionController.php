<?php

namespace App\Http\Controllers\Resource;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Route;
use Exception;

use App\User;
use App\Models\TrainingSession;
use DB;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function __construct(Request $request)
	{		
	}

    public function listing(Request $request){
        $trainer_id =$request->trainer_id??'';
        $request_for=$request->request_for??'';

        $TrainingSession = TrainingSession::with(['trainer']);

        if($request_for=="upcoming"){
            $TrainingSession = TrainingSession::whereRaw("date(session_date) >= date(now())");
        }else if($request_for=="past"){
            $TrainingSession = TrainingSession::whereRaw("date(session_date) < date(now())");
        }else if($request_for=="today"){
            $TrainingSession = TrainingSession::whereRaw("date(session_date) = date(now())");
        }


        if($trainer_id>0){
            $TrainingSession =  $TrainingSession->where('trainer_id',$trainer_id);
        }

        $TrainingSession=$TrainingSession->orderBy('session_date', 'DESC')->get();

        return response()->json(['success' =>'true','count'=>count($TrainingSession),'data'=>$TrainingSession]);
    }

    public function add(Request $request){
        $validator =Validator::make($request->all(), [
            'session_date' => 'required|after:today',
            'trainer_id'  => 'required|int',	
            'duration'=>'required',
            'topic'=>'required|max:100',
            'description'=>'required',
            'session_status'=>'required|in:Scheduled,Completed,Cancelled,Postponed'
        ]);    

        if (!$validator->fails())
        {

            $TrainingSession = new TrainingSession;
            $TrainingSession->session_date=$request->session_date;
            $TrainingSession->trainer_id=$request->trainer_id;
            $TrainingSession->duration=$request->duration;
            $TrainingSession->topic=$request->topic;
            $TrainingSession->description=$request->description;
            $TrainingSession->session_status=$request->session_status;
            $TrainingSession->status=1;


            if($TrainingSession->save()){

                $lastId= (DB::getPdo()->lastInsertId());

                $TrainingSession=TrainingSession::with('trainer')->find($lastId);
                return response()->json(['data' => $TrainingSession,"success"=>"true","message"=>"Successfully Added"]);
            }else{
                return response()->json(['data' => $TrainingSession,"success"=>"false"]);
            }
        }else{
            return $validator->errors();
        }
    }

    public function update(Request $request){
        $TrainingSession=TrainingSession::with('trainer')->find($request->id);
        if(empty($TrainingSession)){
            return response()->json(['message' => "Session Id is not valid","success"=>"false"]);
        }

        $validator =Validator::make($request->all(), [
            'session_date' => 'required|after:today',
            'trainer_id'  => 'required|int',	
            'duration'=>'required',
            'topic'=>'required|max:100',
            'description'=>'required',
            'session_status'=>'required|in:Scheduled,Completed,Cancelled,Postponed'
        ]);    

        if (!$validator->fails())
        {

          
            $TrainingSession->session_date=$request->session_date;
            $TrainingSession->trainer_id=$request->trainer_id;
            $TrainingSession->duration=$request->duration;
            $TrainingSession->topic=$request->topic;
            $TrainingSession->description=$request->description;
            $TrainingSession->session_status=$request->session_status;
            $TrainingSession->status=(int)1;


            if($TrainingSession->save()){

                $TrainingSession=TrainingSession::with('trainer')->find($request->id);
                return response()->json(['data' => $TrainingSession,"success"=>"true","message"=>"Successfully updatee"]);
            }else{
                return response()->json(['data' => $TrainingSession,"success"=>"false"]);
            }
        }else{
            return $validator->errors();
        }
    }

}