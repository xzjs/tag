<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('user/login','UserController@login');
Route::get('user/get/{id}','UserController@getUser');

Route::resource('article_list','ArticleListController');

Route::post('word/search', 'WordController@search');
Route::resource('word','WordController');

Route::resource('tag','TagController');