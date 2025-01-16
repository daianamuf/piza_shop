import React, { useState } from "react";
import { useCart } from "../CartContext";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function Cart() {
    const { cart, dispatch } = useCart();
    const { post } = useForm(); // Use Inertia's form submission
    const [message, setMessage] = useState(""); // Local message state for feedback
    const { props } = usePage();
    const userId = props.auth.user.id;

    console.log("User ID from Inertia:", userId);

    // Calculate total price
    const calculateTotal = () =>
        Object.values(cart).reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

    // Handle order placement
    const handleOrder = () => {
        const totalPrice = calculateTotal();
        const payload = { user_id: userId, total_price: totalPrice };

        post("/cart", payload, {
            onSuccess: () => {
                console.log("Order placed successfully!");
                dispatch({ type: "EMPTY_CART" });
                setMessage("Your order has been placed successfully.");
            },
            onError: (error) => {
                console.error("Order Error:", error);
                const errorMessage =
                    error.response?.data?.message ||
                    "There was an issue placing your order.";
                setMessage(errorMessage);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold">Your Cart</h1>

                {/* Display feedback message */}
                {message && (
                    <div className="my-4 p-4 text-green-600 bg-green-100 rounded">
                        {message}
                    </div>
                )}

                {Object.keys(cart).length > 0 ? (
                    <div>
                        {Object.entries(cart).map(([id, item]) => (
                            <div
                                key={id}
                                className="flex items-center gap-4 mt-4"
                            >
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
                                    <span className="mx-2">
                                        {item.quantity}
                                    </span>
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
                                <p>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
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

                        {/* Total Price */}
                        <h2 className="mt-4 text-xl font-bold">
                            Total: ${calculateTotal().toFixed(2)}
                        </h2>

                        {/* Place Order Button */}
                        <button
                            onClick={handleOrder}
                            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg"
                        >
                            Place Order
                        </button>
                    </div>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
