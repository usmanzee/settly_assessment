<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClientController;

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

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/profile', [AdminController::class, 'profile']);
    Route::group(['prefix'=>'clients',], function() {
        Route::get('/', [ClientController::class, 'index']);
        Route::get('/{id}', [ClientController::class, 'detail']);
        Route::post('/', [ClientController::class, 'store']);
        Route::delete('/{id}', [ClientController::class, 'remove']);
        Route::put('/{id}', [ClientController::class, 'update']);
    });
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::fallback(function() {
    return response()->json([
        'message' => 'Route does not exists'], 404);
});