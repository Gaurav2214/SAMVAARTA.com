<?php

use Illuminate\Support\Facades\Route;

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
Route::get('/report', 'UserController@report');
Route::get('/dashboard', 'UserController@dashboard');
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
