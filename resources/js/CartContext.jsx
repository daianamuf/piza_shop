import React, { createContext, useContext, useReducer } from "react";

// Cart Context
const CartContext = createContext();

// Reducer to manage cart actions
const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const pizza = action.payload;
            const existingItem = state[pizza.id];

            return {
                ...state,
                [pizza.id]: {
                    ...pizza,
                    quantity: existingItem ? existingItem.quantity + 1 : 1,
                },
            };
        }
        case "INCREMENT_QUANTITY": {
            const { id } = action.payload;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    quantity: state[id].quantity + 1,
                },
            };
        }
        case "DECREMENT_QUANTITY": {
            const { id } = action.payload;
            if (state[id].quantity === 1) return state;

            return {
                ...state,
                [id]: {
                    ...state[id],
                    quantity: state[id].quantity - 1,
                },
            };
        }
        case "REMOVE_FROM_CART": {
            const { id } = action.payload;
            const newState = { ...state };
            delete newState[id];
            return newState;
        }
        default:
            return state;
    }
};

// Cart Provider
export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, {});

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to use the cart
export const useCart = () => useContext(CartContext);
