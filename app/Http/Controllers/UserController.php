<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Setting;
use Helper;


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

    public function contact()
    {   
        return view('contact');
    }

    public function about()
    {   
        return view('about');
    }

    public function sitemap()
    {   
        return view('sitemap');
    }

    public function sitemapXML()
    {   
        return view('sitemapXML');
    }

    public function certifications()
    {   
        return view('certifications');
    }

    public function articleBlogs()
    {   
        return view('articleBlogs');
    }
    public function developments()
    {   
        return view('developments');
    }

    public function enquiries()
    {   
        return view('enquiries');
    }

    public function upcomingEvents()
    {   
        return view('upcomingEvents');
    }

    public function report()
    {   
        return view('pdfreport');
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

    public function checkmail(){

        $from_name = \Setting::get('site_title');
	 
			$mail_to = "ved@yopmail.com";
			$subject = "check mail";
            $message ="Check Mail";
			
			if($mail_to!=''){
				$param = array(
					'to_email'  =>$mail_to,
					'from_email'=>\Setting::get('from_email'),
					'from_name' =>$from_name,
					'to_name' 	=>$from_name,
					'subject'   =>$subject,
					'body_part' =>$message,
				);					
				Helper::send_mail($param);
			}
    }


}