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
Route::get('/dashboard', function () { return view('dashboard'); });
Route::get('/list', function () { return view('list'); });


Route::group(['prefix' => 'admin'], function () {
  Route::get('/login', 'AdminAuth\LoginController@showLoginForm')->name('login');
  Route::post('/login', 'AdminAuth\LoginController@login');
  Route::post('/logout', 'AdminAuth\LoginController@logout')->name('logout');

  Route::get('/register', 'AdminAuth\RegisterController@showRegistrationForm')->name('register');
  Route::post('/register', 'AdminAuth\RegisterController@register');

  Route::post('/password/email', 'AdminAuth\ForgotPasswordController@sendResetLinkEmail')->name('password.request');
  Route::post('/password/reset', 'AdminAuth\ResetPasswordController@reset')->name('password.email');
  Route::get('/password/reset', 'AdminAuth\ForgotPasswordController@showLinkRequestForm')->name('password.reset');
  Route::get('/password/reset/{token}', 'AdminAuth\ResetPasswordController@showResetForm');
});

Route::group(['prefix' => 'trainer'], function () {
  Route::get('/login', 'TrainerAuth\LoginController@showLoginForm')->name('login');
  Route::post('/login', 'TrainerAuth\LoginController@login');
  Route::post('/logout', 'TrainerAuth\LoginController@logout')->name('logout');

  Route::get('/register', 'TrainerAuth\RegisterController@showRegistrationForm')->name('register');
  Route::post('/register', 'TrainerAuth\RegisterController@register');

  Route::post('/password/email', 'TrainerAuth\ForgotPasswordController@sendResetLinkEmail')->name('password.request');
  Route::post('/password/reset', 'TrainerAuth\ResetPasswordController@reset')->name('password.email');
  Route::get('/password/reset', 'TrainerAuth\ForgotPasswordController@showLinkRequestForm')->name('password.reset');
  Route::get('/password/reset/{token}', 'TrainerAuth\ResetPasswordController@showResetForm');
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
