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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {pizzas.map((pizza) => (
                        <div
                            key={pizza.id}
                            className="p-4 border rounded shadow-md bg-white"
                        >
                            <img
                                src={pizza.image_url}
                                alt={pizza.name}
                                className="w-full h-40 object-cover rounded mb-4"
                            />
                            <h3 className="text-lg font-bold">{pizza.name}</h3>
                            <p className="text-gray-600">{pizza.ingredients}</p>
                            <p className="text-lg font-semibold mt-2">
                                ${pizza.price}
                            </p>
                            {isInCart(pizza.id) ? (
                                <div className="flex items-center justify-center mt-4">
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
                                    className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded"
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
