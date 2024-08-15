"use client";
import { useState, useEffect, useContext } from "react";
import { CartContext, CartProvider } from "../context/cartContext";
import Link from "next/link";
import Card from "./components/Card"

export default function Home() {
  const { addToCart, cart } = useContext(CartContext);
  const [data, setData] = useState([]);

  const getData = async () => {
    console.log("Khela begins");

    const dataas = await fetch('/api/products/')
    const productData = await dataas.json();
    console.log("data as " + JSON.stringify(productData.data));
    setData(productData.data);
  }
  useEffect(() => {
    getData()
  }, []);
  
  const handleAddToCart = (product) => {
    addToCart(product);
    console.log("Cart here : ", cart);
  };

  return (
    <CartProvider>
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center py-4 px-6 bg-[#081444] text-white">
          <h1 className="text-2xl font-medium">My Store</h1>
          <div>
            <Link href="/cart"><span className="text-lg">Cart </span>
              <span className="text-xl font-semibold">({cart.length})</span>  </Link>

          </div>
        </header>

        <h1 className="text-4xl text-center text-[#081444] font-medium m-10">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <Card key={product._id} product={product} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </CartProvider>
  );
}
