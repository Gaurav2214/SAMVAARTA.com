<?php

namespace App\Http\Controllers\Resource;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Validator;
use Route;
use Exception;

use App\User;
use App\Models\TrainerLearnerMapping;

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
            return response()->json(['success' =>'true','message'=>"User has been successfulle ".( $status==1?'activated':'rejected')]);
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
    
   
}