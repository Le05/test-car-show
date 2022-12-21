<?php

use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AuthController;
use \App\Http\Controllers\MarcaController;
use \App\Http\Controllers\ModeloController;

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

Route::post('autenticar', [AuthController::class, 'autenticar']);
Route::get('buscar-parametros-veiculo-novo', [HomeController::class, 'buscarParametrosVeiculoNovo']);
Route::get('buscar-veiculos', [HomeController::class, 'buscarVeiculos']);

Route::middleware('auth:sanctum')->group(function () {

    Route::group(['prefix' => 'marca'], function () {
        Route::post('criar', [MarcaController::class, 'criar']);
        Route::post('alterar', [MarcaController::class, 'alterar']);
        Route::delete('deletar', [MarcaController::class, 'deletar']);
        Route::get('buscar-todas', [MarcaController::class, 'buscarTodas']);
        Route::get('buscar-por-id/{id}', [MarcaController::class, 'buscarPorId']);
    });

    Route::group(['prefix' => 'modelo'], function () {
        Route::post('criar', [ModeloController::class, 'criar']);
        Route::post('alterar', [ModeloController::class, 'alterar']);
        Route::delete('deletar/{id}', [ModeloController::class, 'deletar']);
        Route::get('buscar-todos', [ModeloController::class, 'buscarTodos']);
        Route::get('buscar-por-id/{id}', [ModeloController::class, 'buscarPorId']);
        Route::post('upload', [ModeloController::class, 'upload']);
    });

});
//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
