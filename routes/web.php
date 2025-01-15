<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PizzaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', [PizzaController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/pizzas', [PizzaController::class, 'index'])->name('pizzas.index');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [PizzaController::class, 'index'])->name('dashboard');
    Route::resource('pizzas', PizzaController::class);
});

Route::post('/cart/add', [PizzaController::class, 'addToCart'])->name('cart.add');


require __DIR__.'/auth.php';
