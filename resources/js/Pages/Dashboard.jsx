import React from "react";
import { useCart } from "../CartContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ pizzas }) {
    const { cart, dispatch } = useCart();

    const addToCart = (pizza) => {
        dispatch({ type: "ADD_TO_CART", payload: pizza });
    };

    const incrementQuantity = (id) => {
        dispatch({ type: "INCREMENT_QUANTITY", payload: { id } });
    };

    const decrementQuantity = (id) => {
        dispatch({ type: "DECREMENT_QUANTITY", payload: { id } });
    };

    const isInCart = (id) => cart[id];

    return (
        <AuthenticatedLayout>
            <h1 className="text-2xl font-bold">Pizza Dashboard</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {pizzas.map((pizza) => (
                    <div key={pizza.id} className="p-4 border rounded">
                        <h3 className="text-lg font-bold">{pizza.name}</h3>
                        <p>{pizza.ingredients}</p>
                        <p>${pizza.price}</p>
                        {isInCart(pizza.id) ? (
                            <div className="flex items-center mt-2">
                                <button
                                    onClick={() => decrementQuantity(pizza.id)}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                                >
                                    -
                                </button>
                                <span className="mx-2">
                                    {cart[pizza.id].quantity}
                                </span>
                                <button
                                    onClick={() => incrementQuantity(pizza.id)}
                                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(pizza)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Add to Order
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
