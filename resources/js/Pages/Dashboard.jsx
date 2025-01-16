import React from "react";
import { useCart } from "../CartContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ pizzas }) {
    const { cart, dispatch } = useCart();

    // Add a pizza to the cart
    const addToCart = (pizza) => {
        dispatch({ type: "ADD_TO_CART", payload: pizza });
    };

    // Increment the quantity of a pizza in the cart
    const incrementQuantity = (id) => {
        dispatch({ type: "INCREMENT_QUANTITY", payload: { id } });
    };

    // Decrement the quantity of a pizza in the cart
    const decrementQuantity = (id) => {
        dispatch({ type: "DECREMENT_QUANTITY", payload: { id } });
    };

    // Check if a pizza is in the cart
    const isInCart = (id) => !!cart[id];

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold mb-6">Pizza Dashboard</h1>

                <div className="divide-y divide-stone-200 px-2">
                    {pizzas.map((pizza) => (
                        <div key={pizza.id} className="flex gap-4 py-2">
                            <img
                                src={pizza.image_url}
                                alt={pizza.name}
                                className="h-24 rounded mb-4"
                            />
                            <div className="flex grow flex-col pt-0.5">
                                <h3 className="text-lg font-bold">
                                    {pizza.name}
                                </h3>
                                <p className="text-sm capitalize italic text-stone-500">
                                    {pizza.ingredients}
                                </p>
                                <p className="text-sm font-semibold mt-2">
                                    ${pizza.price}
                                </p>
                            </div>

                            {isInCart(pizza.id) ? (
                                <div className="flex items-center gap-3 sm:gap-8">
                                    <button
                                        onClick={() =>
                                            decrementQuantity(pizza.id)
                                        }
                                        className="px-3 py-1 bg-yellow-500 text-white rounded-l"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 bg-gray-100 border">
                                        {cart[pizza.id].quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            incrementQuantity(pizza.id)
                                        }
                                        className="px-3 py-1 bg-yellow-500 text-white rounded-r"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => addToCart(pizza)}
                                    className="px-2 bg-orange-500 text-white rounded"
                                >
                                    Add to Order
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
