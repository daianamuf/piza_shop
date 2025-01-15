import React from "react";
import { useCart } from "../CartContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Cart() {
    const { cart, dispatch } = useCart();

    const calculateTotal = () =>
        Object.values(cart).reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

    return (
        <AuthenticatedLayout>
            <h1 className="text-2xl font-bold">Your Cart</h1>
            {Object.keys(cart).length > 0 ? (
                <div>
                    {Object.entries(cart).map(([id, item]) => (
                        <div key={id} className="flex items-center gap-4 mt-4">
                            <h3 className="text-lg">{item.name}</h3>
                            <div className="flex items-center">
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: "DECREMENT_QUANTITY",
                                            payload: { id },
                                        })
                                    }
                                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                                >
                                    -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: "INCREMENT_QUANTITY",
                                            payload: { id },
                                        })
                                    }
                                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                                >
                                    +
                                </button>
                            </div>
                            <p>${item.price * item.quantity}</p>
                            <button
                                onClick={() =>
                                    dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: { id },
                                    })
                                }
                                className="px-2 py-1 bg-red-500 text-white rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <h2 className="mt-4 text-xl font-bold">
                        Total: ${calculateTotal().toFixed(2)}
                    </h2>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </AuthenticatedLayout>
    );
}
