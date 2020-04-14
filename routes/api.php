<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Tymon\JWTAuth\Facades\JWTAuth;

/*Route::post('/messages', 'Message\MessageController@store');

Route::middleware('jwt.auth')->post('user', function(Request $request) {
    return auth('api')->user();
});*/

Route::get('structure', 'ApplicationController@getUserStructure');
Route::post('structure/update', 'ApplicationController@updateUserStructure');
Route::post('structure/close-component', 'ApplicationController@closeComponent');
Route::post('/search', 'ApplicationController@search');





Route::prefix('todo')->group(function () {
    Route::get('', 'Todo\TodoController@index');
    Route::post('', 'Todo\TodoController@store');
    Route::post('/delete', 'Todo\TodoController@destroy');
    Route::post('/update', 'Todo\TodoController@update');
});



/**
 * User Authentication Routes
 */
Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('register', 'Auth\RegisterController@register');
    Route::post('login', 'Auth\AuthController@login');


    Route::post('logout', 'Auth\AuthController@logout');
    Route::post('refresh', 'Auth\AuthController@refresh');
    Route::post('me', 'Auth\AuthController@me');
});

/**
 * Contacts Routes
 */
Route::group(['prefix' => 'contacts'], function ($router) {
    Route::get('/', 'Contacts\ContactsController@index');
    Route::post('/', 'Contacts\ContactsController@store');
    Route::post('/search', 'Contacts\ContactsController@search');
});

/**
 * Route messages actions
 */
Route::group(['prefix' => 'messages'], function ($router) {

    Route::get('/', 'Message\MessageController@index');
    Route::post('/', 'Message\MessageController@store');

    Route::get('/chats', 'Message\ChatsController@index');
    Route::post('/', 'Message\MessageController@store');

    Route::get('/public', 'Message\AllMessagesController@index');
    Route::post('/public', 'Message\AllMessagesController@store');

    Route::get('/private', 'Message\PrivateController@index');
    Route::post('/private', 'Message\PrivateController@store');
});



Route::group(['prefix' => 'data'], function ($router) {

    Route::post('/route', 'Data\DataController@route');
    Route::get('/routes', 'Data\DataController@routes');

    Route::post('/car', 'Data\DataController@car');
    Route::post('/cars', 'Data\DataController@cars');

    Route::post('/search', 'Data\DataController@search');
});



Route::group(['prefix' => 'adverts'], function ($router) {
    Route::post('/add/transport', 'Routes\RouteController@storeTransport');
    Route::post('/add/shipment', 'Routes\RouteController@storeShipment');
});



Route::group(['prefix' => 'dealings'], function ($router) {
    Route::get('/stage', 'CRM\StagesController@index');
    Route::post('/stage', 'CRM\StagesController@store');

    Route::get('/transactions', 'CRM\TransactionsController@index');
    Route::post('/transactions', 'CRM\TransactionsController@store');
    Route::post('/transactions/stage-update', 'CRM\TransactionsController@stageUpdate');
    Route::delete('/transactions/delete/{id}', 'CRM\TransactionsController@destroy');
});



Route::group(['prefix' => 'rooms'], function ($router) {
    Route::post('/', 'Rooms\RoomController@addNewRoom');
    Route::get('/{room_id}', 'Rooms\RoomController@getRoomMessages');
    Route::post('/{room_id}', 'Rooms\RoomController@addRoomMessages');
});



Route::group(['prefix' => 'recordings'], function ($router) {
    Route::get('/', 'RecordingController@index');
    Route::post('/', 'RecordingController@store');
});


