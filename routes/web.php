<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PizzaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Home
Route::get('/', [PizzaController::class, 'index'])->name('home');

// Dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [PizzaController::class, 'index'])->name('dashboard');
});

// Profile Management
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Pizza Management
Route::middleware(['auth'])->group(function () {
    Route::resource('pizzas', PizzaController::class)->except(['show']);
    Route::get('/pizzas/manage', [PizzaController::class, 'manage'])->name('pizzas.manage');
    Route::post('/pizzas/manage', [PizzaController::class, 'storeAll'])->name('pizzas.storeAll');
    Route::put('/pizzas/manage', [PizzaController::class, 'updateAll'])->name('pizzas.updateAll');
});

// Cart and Orders
Route::middleware(['auth'])->group(function () {
    Route::get('/cart', [PizzaController::class, 'viewCart'])->name('cart.view');
    Route::post('/cart/order', [PizzaController::class, 'placeOrder'])->name('cart.order');
});

Route::post('/cart/order', [PizzaController::class, 'placeOrder'])
    ->middleware('auth')
    ->name('cart.order');




require __DIR__.'/auth.php';