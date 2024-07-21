<?php

namespace App\Http\Controllers\Resource;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Route;
use Exception;

use App\User;

class UserResource extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function listing()
    {
        $Users = User::orderBy('id', 'DESC')->get();
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
            return response()->json(['success' =>'false','message'=>"Whoops! something went wrong.");
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

    public function activate($id){
        if(empty($id)){
           return response()->json(['success' =>'false','message'=>"User Id is required"]);
        }

        $User = User::find($id);
        if(empty($User)){
            return response()->json(['success' =>'false','message'=>"User is not exists"]);
        }else if($User['status']=='1'){
            return response()->json(['success' =>'false','message'=>"User has been already activated"]);
        }else{
            $User->status='1';
            $User->save();
            return response()->json(['success' =>'true','message'=>"User has been successfulle activated"]);
        }
    }
    
   
}
