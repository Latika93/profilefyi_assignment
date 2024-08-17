"use client"
import { createContext, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [discount, setDiscount] = useState(0);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex((item) => item._id === product._id);
            if (existingProductIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += 1;
                toast.success(`Increased quantity of ${product.name}` )
                return updatedCart;
            } else {
                toast.success(`Added ${product.name } to cart`)
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const reduceQuantity = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex((item) => item._id === product._id);
            if (existingProductIndex > -1) {
                const updatedCart = [...prevCart];
                const updatedProduct = updatedCart[existingProductIndex];
                if (updatedProduct.quantity > 1) {
                    updatedProduct.quantity -= 1;
                } else {
                    updatedCart.splice(existingProductIndex, 1);
                }
                return updatedCart;
            }
            return prevCart;
        });
    };

    const removeFromCart = (product) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== product._id));
    };

    const applyDiscount = (type, value) => {
        if (type === 'percentage') {
            setDiscount((prevTotal) => prevTotal * (value / 100));
        } else if (type === 'fixed') {
            setDiscount(value);
        } else {
            setDiscount(0);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0) - discount;
    };

    useEffect(() => {
        const saveCartData = async () => {
            try {
                await fetch('/api/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cart }),
                });
            } catch (error) {
                console.error('Error saving cart data:', error);
            }
        };

        saveCartData(); 
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                reduceQuantity,
                removeFromCart,
                applyDiscount,
                calculateTotal,
                discount,
                setCart,
            }}
        >
            <Toaster />
            {children}
        </CartContext.Provider>
    );
};
