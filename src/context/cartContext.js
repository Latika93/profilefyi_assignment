"use client";

import React, { createContext, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [discount, setDiscount] = useState({ type: null, value: 0 });

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item._id === product._id);

            if (existingProductIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += 1;
                toast.success(`${product.name} quantity increased!`);
                return updatedCart;
            } else {
                toast.success(`${product.name} added to cart!`);
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });

    };

    const reduceQuantity = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingProductIndex >= 0) {
                const updatedCart = [...prevCart];
                const currentProduct = updatedCart[existingProductIndex];

                if (currentProduct.quantity > 1) {
                    currentProduct.quantity -= 1;
                } else {
                    updatedCart.splice(existingProductIndex, 1);
                }

                return updatedCart;
            }

            return prevCart;
        });
    };


    const removeFromCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingProductIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart.splice(existingProductIndex, 1);
                return updatedCart;
            }
            return prevCart;
        });
    };

    const applyDiscount = (type, value) => {
        setDiscount({ type, value });
        if (type === 'fixed') {
            toast.success(`Discount of $${value} applied!`);
        } else if (type === 'percentage') {
            toast.success(`${value}% discount applied!`);
        }
    };

    const calculateTotal = () => {
        const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
        console.log("Sub Total Total : " + subtotal);

        let total = subtotal;
        if (discount.type === 'fixed') {
            total -= discount.value;
        } else if (discount.type === 'percentage') {
            total -= (total * discount.value) / 100;
        }
        console.log("Total Total : " + total);

        return total > 0 ? total : 0;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, reduceQuantity, removeFromCart, applyDiscount, calculateTotal, discount }}>
            <Toaster /> {children}
        </CartContext.Provider>
    );
};
