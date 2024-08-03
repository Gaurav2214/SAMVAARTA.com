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

    public function myaccount()
    {   
        return view('myaccount');
    }

    public function change_password()
    {   
        return view('change_password');
    }


}