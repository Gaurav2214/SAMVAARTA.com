<?php
use App\Http\Controllers\EnquiryController;
use Illuminate\Routing\RouteParameterBinder;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
Route::post('/login', 'Auth\LoginController@login');
Route::post('/register', 'Auth\RegisterController@apiregister');
Route::post('/forgot/password','Auth\ForgotPasswordController@forgot_password');
Route::post('/reset/password', 'Auth\ResetPasswordController@reset_password');

Route::post('enquiry', 'EnquiryController@index');

Route::get('learning-objective-types','Resource\CommonController@learning_objective_types');


Route::group(['middleware' => ['auth:api']], function() {
	Route::group(['prefix' => 'profile'], function() {
		Route::get('/', 'Resource\ProfileController@index');
		Route::post('/update', 'Resource\ProfileController@update');
		Route::post('/password', 'Resource\ProfileController@password');
		Route::get('/code-of-ethics', 'Resource\ProfileController@code_of_ethics');
		Route::post('/code-of-ethics', 'Resource\ProfileController@add_edit_code_of_ethics');

		Route::get('/learning-objective', 'Resource\ProfileController@learning_objective');
		Route::post('/learning-objective', 'Resource\ProfileController@add_edit_learning_objective');

		Route::get('/learning-outcome', 'Resource\ProfileController@learning_outcome');
		Route::post('/learning-outcome', 'Resource\ProfileController@add_edit_learning_outcome');

		Route::get('/comments', 'Resource\ProfileController@getTrainerComments');

		Route::get('/session-listing', 'Resource\ProfileController@getSessionListing');
		Route::post('documenting-conversations','Resource\ProfileController@addDocumentingConversations');
		Route::post('update-documenting-conversations','Resource\ProfileController@updateDocumentingConversations');
		Route::get('documenting-conversations','Resource\ProfileController@documentingConversations');
		Route::get('desired-objective','Resource\ProfileController@desiredObjective');
		Route::post('desired-objective','Resource\ProfileController@addDesiredObjective');
		Route::get('download-report',"Resource\ProfileController@downloadReport");

		Route::get('closing-of-intraction','Resource\ProfileController@closingOfIntraction');
		Route::post('closing-of-intraction','Resource\ProfileController@addClosingOfIntraction');
	});
	Route::group(['prefix' => 'trainer'], function() {
		Route::post('/add_comment', 'Resource\ProfileController@add_comment');
		Route::get('/comments', 'Resource\ProfileController@comments');

		Route::get('closing-of-intraction','Resource\ProfileController@trainerClosingOfIntraction');
		Route::post('closing-of-intraction','Resource\ProfileController@addTrainerClosingOfIntraction');
	});
	Route::get('/logout', 'Resource\ProfileController@logout');
});

Route::group(['prefix' => 'admin','middleware' => ['auth:api']], function () {
	Route::get('users/listing', 'Resource\UserResource@listing');
	Route::get('trainer/listing', 'Resource\UserResource@trainer_listing');
	Route::get('admin/listing', 'Resource\UserResource@admin_listing');
	Route::get('user/activate/{id}', 'Resource\UserResource@activate');
	Route::get('user/show/{id}', 'Resource\UserResource@show');
	Route::post('user/update/{id}', 'Resource\UserResource@edit');
	Route::post('user/assign_trainer', 'Resource\UserResource@assign_trainer');

	Route::get('sessions', 'Resource\SessionController@listing');
	Route::post('session/add', 'Resource\SessionController@add');
	Route::post('session/update/{id}', 'Resource\SessionController@update');
	
	Route::get('download-report','Resource\UserResource@downloadReport');


});