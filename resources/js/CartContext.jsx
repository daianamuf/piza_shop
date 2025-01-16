import React, { useEffect, useReducer, createContext } from "react";
import axios from "axios";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const item = action.payload;
            return {
                ...state,
                [item.id]: {
                    ...item,
                    quantity: (state[item.id]?.quantity || 0) + 1,
                },
            };
        }
        case "REMOVE_FROM_CART": {
            const { [action.payload.id]: _, ...rest } = state;
            return rest;
        }
        case "EMPTY_CART":
            return {};
        case "INCREMENT_QUANTITY": {
            const itemId = action.payload.id;
            return {
                ...state,
                [itemId]: {
                    ...state[itemId],
                    quantity: state[itemId].quantity + 1,
                },
            };
        }
        case "DECREMENT_QUANTITY": {
            const itemId = action.payload.id;
            if (state[itemId].quantity <= 1) return state; // Prevent quantity from going below 1
            return {
                ...state,
                [itemId]: {
                    ...state[itemId],
                    quantity: state[itemId].quantity - 1,
                },
            };
        }
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, {});

    // Sync cart to backend whenever the cart changes
    useEffect(() => {
        const syncCartWithBackend = async () => {
            try {
                if (Object.keys(cart).length === 0) return; // Skip sync if the cart is empty

                const payload = {
                    cart: Object.values(cart).map((item) => ({
                        id: item.id,
                        quantity: item.quantity,
                    })),
                };

                console.log("Syncing Cart Payload:", payload);

                await axios.post("/cart/update", payload, {
                    headers: { "Content-Type": "application/json" },
                });
            } catch (error) {
                console.error("Error syncing cart with backend:", error);
            }
        };

        syncCartWithBackend();
    }, [cart]); // Sync only when the cart changes

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => React.useContext(CartContext);
