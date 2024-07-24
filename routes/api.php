<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
Route::post('/login', 'Auth\LoginController@login');
Route::post('/register', 'Auth\RegisterController@apiregister');
Route::post('/forgot/password','Auth\ForgotPasswordController@forgot_password');
Route::post('/reset/password', 'Auth\ResetPasswordController@reset_password');


Route::group(['middleware' => ['auth:api']], function() {
	Route::group(['prefix' => 'profile'], function() {
		Route::get('/', 'Resource\ProfileController@index');
		Route::post('/update', 'Resource\ProfileController@update');
		Route::post('/password', 'Resource\ProfileController@password');
	});
	Route::get('/logout', 'Resource\ProfileController@logout');
});

Route::group(['prefix' => 'admin'], function () {
	Route::get('users/listing', 'Resource\UserResource@listing');
	Route::get('user/activate/{id}', 'Resource\UserResource@activate');
	Route::get('user/show/{id}', 'Resource\UserResource@show');
	Route::post('user/update/{id}', 'Resource\UserResource@edit');
});