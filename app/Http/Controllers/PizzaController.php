<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Models\Pizza;
use Inertia\Inertia;


class PizzaController extends Controller
{
    
    public function index()
    {
        $pizzas = Pizza::all();
        $user = Auth::user();
        $cart = Session::get('cart', []);
        return Inertia::render('Dashboard', [
            'pizzas' => $pizzas,
            'user' => $user,
            'cart' => $cart,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

     public function create()
    {
        return view('pizzas.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'ingredients' => 'nullable',
            'price' => 'required|numeric',
        ]);

        Pizza::create($request->all());
        return redirect()->route('pizzas.index')->with('success', 'Pizza created successfully.');
    }

    public function edit(Pizza $pizza)
    {
        return view('pizzas.edit', compact('pizza'));
    }

    public function update(Request $request, Pizza $pizza)
    {
        $request->validate([
            'name' => 'required',
            'ingredients' => 'nullable',
            'price' => 'required|numeric',
            'image_url' => 'nullable|url',
        ]);

        $pizza->update($request->all());
        return redirect()->route('pizzas.index')->with('success', 'Pizza updated successfully.');
    }

    public function destroy(Pizza $pizza)
    {
        $pizza->delete();
        return redirect()->route('pizzas.index')->with('success', 'Pizza deleted successfully.');
    }

    public function viewCart()
    {
        $cart = Session::get('cart', []);
        return Inertia::render('Cart', [
            'cart' => $cart,
        ]);
    }

   

    
}


