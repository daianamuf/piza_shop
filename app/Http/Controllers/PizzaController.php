<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use App\Models\Pizza;
use App\Models\Order;
use Inertia\Inertia;

class PizzaController extends Controller
{
    // Display all pizzas (Dashboard/Home)
    public function index()
    {
        $pizzas = Pizza::all();
        $user = Auth::user();
        $cart = Session::get('cart', []);

        return Inertia::render('Dashboard', [
            'pizzas' => $pizzas,
            'user' => $user,
            'cart' => $cart,
        ]);
    }

    // View form to create a pizza
    public function create()
    {
        return Inertia::render('Pizzas/Create');
    }

    // Store a new pizza
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'ingredients' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|url',
        ]);

        Pizza::create($request->all());

        return redirect()->route('pizzas.index')->with('success', 'Pizza created successfully!');
    }

    // View form to edit a specific pizza
    public function edit(Pizza $pizza)
    {
        return Inertia::render('Pizzas/Edit', ['pizza' => $pizza]);
    }

    // Update a specific pizza
    public function update(Request $request, Pizza $pizza)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'ingredients' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image_url' => 'nullable|url',
        ]);

        $pizza->update($request->all());

        return redirect()->route('pizzas.index')->with('success', 'Pizza updated successfully!');
    }

    // Delete a specific pizza
    public function destroy(Pizza $pizza)
    {
        $pizza->delete();

        return redirect()->route('pizzas.index')->with('success', 'Pizza deleted successfully!');
    }

    // Manage all pizzas (bulk edit/create)
    public function manage()
    {
        $pizzas = Pizza::all();

        return Inertia::render('Pizzas/Manage', ['pizzas' => $pizzas]);
    }

    // Bulk update pizzas
    public function updateAll(Request $request)
    {
        $request->validate([
            'pizzas.*.id' => 'required|exists:pizzas,id',
            'pizzas.*.name' => 'required|string|max:255',
            'pizzas.*.price' => 'required|numeric|min:0',
            'pizzas.*.ingredients' => 'nullable|string',
            'pizzas.*.image_url' => 'nullable|url',
        ]);

        foreach ($request->input('pizzas') as $pizzaData) {
            $pizza = Pizza::find($pizzaData['id']);
            $pizza->update($pizzaData);
        }

        return redirect()->route('pizzas.manage')->with('success', 'Pizzas updated successfully!');
    }

    // Bulk create pizzas
    public function storeAll(Request $request)
    {
        $request->validate([
            'pizzas.*.name' => 'required|string|max:255',
            'pizzas.*.price' => 'required|numeric|min:0',
            'pizzas.*.ingredients' => 'nullable|string',
            'pizzas.*.image_url' => 'nullable|url',
        ]);

        foreach ($request->input('pizzas') as $pizzaData) {
            Pizza::create($pizzaData);
        }

        return redirect()->route('pizzas.manage')->with('success', 'Pizzas added successfully!');
    }

    // View the cart
    public function viewCart()
    {
        $cart = Session::get('cart', []);

        return Inertia::render('Cart', ['cart' => $cart]);
    }

    // Place an order
    public function placeOrder(Request $request)
    {
        // Clear the cart from the session
        Session::forget('cart');

        // Return a success message
        return back()->with('success', 'Order placed successfully!');
    }
}
