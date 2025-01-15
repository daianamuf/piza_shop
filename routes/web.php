<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PizzaController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('pizzas', PizzaController::class);
http://127.0.0.1:8000/pizzas