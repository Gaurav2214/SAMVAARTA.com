<?php

Route::get('/home', function () {
    $users[] = Auth::user();
    $users[] = Auth::guard()->user();
    $users[] = Auth::guard('trainer')->user();

    //dd($users);

    return view('trainer.home');
})->name('home');

