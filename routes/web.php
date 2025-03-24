<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\WeeklyGoalsCheckInMail;
use App\User;
use App\Models\LearningOutcomes;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {return view('outer');});
Route::get('/login', 'UserController@login');
Route::get('/contact', 'UserController@contact');
Route::get('/about', 'UserController@about');
Route::get('/sitemap', 'UserController@sitemap');
Route::get('/upcomingEvents', 'UserController@upcomingEvents');
Route::get('/sitemap.xml', 'UserController@sitemapXML');
Route::get('/certifications', 'UserController@certifications');
Route::get('/article-blogs', 'UserController@articleBlogs');
Route::get('/developments', 'UserController@developments');
Route::get('/enquiries', 'UserController@enquiries');
Route::get('/report', 'UserController@report');
Route::get('/dashboard', 'UserController@dashboard');
Route::get('/dashboard/user-details/{id}', 'UserController@userDetail');
Route::get('/dashboard/trainer-details/{id}', 'UserController@trainerDetail');
Route::get('/myaccount', 'UserController@myaccount');
Route::get('/change-password', 'UserController@change_password');
Route::get('/user-details', 'UserController@user_details');
Route::get('/upcoming_session', 'UserController@upcoming_session');
Route::get('/trainer-details', 'UserController@trainer_details');

Route::get('/list', function () { return view('list'); });
Route::get('/activate_list', function () { return view('activate_list'); });

Route::get('/checkmail', 'UserController@checkmail');

Route::group(['prefix' => 'admin'], function () {
  Route::get('/login', 'AdminAuth\LoginController@showLoginForm')->name('admin_login');
  Route::post('/login', 'AdminAuth\LoginController@login');
  Route::post('/logout', 'AdminAuth\LoginController@logout')->name('admin_logout');
  /*

  Route::get('/register', 'AdminAuth\RegisterController@showRegistrationForm')->name('register');
  Route::post('/register', 'AdminAuth\RegisterController@register');

  Route::post('/password/email', 'AdminAuth\ForgotPasswordController@sendResetLinkEmail')->name('password.request');
  Route::post('/password/reset', 'AdminAuth\ResetPasswordController@reset')->name('password.email');
  Route::get('/password/reset', 'AdminAuth\ForgotPasswordController@showLinkRequestForm')->name('password.reset');
  Route::get('/password/reset/{token}', 'AdminAuth\ResetPasswordController@showResetForm');
  */
});

Route::group(['prefix' => 'trainer'], function () {
  Route::get('/login', 'TrainerAuth\LoginController@showLoginForm')->name('trainer-login');
  Route::post('/login', 'TrainerAuth\LoginController@login');
  Route::post('/logout', 'TrainerAuth\LoginController@logout')->name('trainer-logout');


   /*
  Route::get('/register', 'TrainerAuth\RegisterController@showRegistrationForm')->name('register');
  Route::post('/register', 'TrainerAuth\RegisterController@register');

  Route::post('/password/email', 'TrainerAuth\ForgotPasswordController@sendResetLinkEmail')->name('password.request');
  Route::post('/password/reset', 'TrainerAuth\ResetPasswordController@reset')->name('password.email');
  Route::get('/password/reset', 'TrainerAuth\ForgotPasswordController@showLinkRequestForm')->name('password.reset');
  Route::get('/password/reset/{token}', 'TrainerAuth\ResetPasswordController@showResetForm');
  */
});

Route::group(['prefix' => 'user'], function () {
  Route::get('/login', 'Auth\LoginController@showLoginForm')->name('login');
  Route::post('/login', 'Auth\LoginController@login');
  Route::post('/logout', 'Auth\LoginController@logout')->name('logout');

  Route::get('/register', 'Auth\RegisterController@showRegistrationForm')->name('register');
  Route::post('/register', 'Auth\RegisterController@register');

  Route::post('/password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.request');
  Route::post('/password/reset', 'Auth\ResetPasswordController@reset')->name('password.email');
  Route::get('/password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.reset');
  Route::get('/password/reset/{token}', 'Auth\ResetPasswordController@showResetForm');
});

Route::get('/send-mail', function () {
  $Users = User::with(['trainer'])->where(['user_type'=>'user'])->where('status','1')->orderBy('id', 'DESC')->get();


        foreach ($Users as $user) {

            $LearningOutcomes= LearningOutcomes::where('user_id', $user['id'])->first();
            $outcome_description = $parameter =[];
            
            if(empty($LearningOutcomes))continue;
            

            if(!empty($LearningOutcomes)){
                $outcome_description = json_decode($LearningOutcomes->outcome_description,true);
                $parameter = json_decode($LearningOutcomes->parameter,true);
            }
    

            $mail_data=[
                "name"=>$user['name'],
                "email"=>$user['email'],
                "parameter1"=>isset($parameter[0])?$parameter[0]:'',
                "parameter2"=>isset($parameter[1])?$parameter[1]:'',
                "parameter3"=>isset($parameter[2])?$parameter[2]:'',
                "description1"=>isset($outcome_description[0])?$outcome_description[0]:'',
                "description2"=>isset($outcome_description[1])?$outcome_description[1]:'',
                "description3"=>isset($outcome_description[2])?$outcome_description[2]:'',
            ];
            
           Mail::to($mail_data['email'])->send(new WeeklyGoalsCheckInMail($mail_data));
        }

  //Mail::to($user['email'])->send(new WeeklyGoalsCheckInMail($user));

  return "Email sent successfully!";
});
