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
        return Inertia::render('Dashboard', [
            'pizzas' => $pizzas,
            'user' => $user,
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

    public function addToCart(Request $request)
{
    $pizzaId = $request->input('pizza_id');
    $quantity = $request->input('quantity', 1);

    // Get the current cart from the session or initialize an empty array
    $cart = Session::get('cart', []);

    // Add or update the pizza in the cart
    if (isset($cart[$pizzaId])) {
        $cart[$pizzaId]['quantity'] += $quantity; // Update quantity if pizza already exists
    } else {
        $pizza = Pizza::find($pizzaId);
        $cart[$pizzaId] = [
            'name' => $pizza->name,
            'price' => $pizza->price,
            'quantity' => $quantity,
        ];
    }

    // Save the updated cart back to the session
    Session::put('cart', $cart);

    return response()->json(['message' => 'Pizza added to cart!', 'cart' => $cart]);
}




    
}


