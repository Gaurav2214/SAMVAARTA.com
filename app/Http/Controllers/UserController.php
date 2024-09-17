<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;


class UserController extends Controller
{

    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function dashboard()
    {   
        return view('dashboard');
    }

    public function login()
    {   
        return view('login');
    }

    public function myaccount()
    {   
        return view('myaccount');
    }

    public function change_password()
    {   
        return view('change_password');
    }

    public function user_details()
    {   
        return view('user_details');
    }

    public function trainer_details()
    {   
        return view('trainer_details');
    }

    public function upcoming_session()
    {   
        return view('upcoming_session');
    }


}