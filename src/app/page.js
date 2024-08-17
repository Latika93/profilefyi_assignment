"use client";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/cartContext";
import Link from "next/link";
import Card from "./components/Card";
import HomeShimmerUi from "../app/components/Shimmer/HomeShimmerUi"
import { IoMdCart } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";


export default function Home() {
  const { addToCart, cart, setCart } = useContext(CartContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const getData = async () => {
    try {
      const response = await fetch('/api/products/');
      const productData = await response.json();
      setData(productData.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        if (data.cart.length > 0) {
          setCart(data.cart);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, [setCart]);

  useEffect(() => {
    getData();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/logout', {
        method: 'POST'
      });

      const result = await response.json();
      console.log(result);
      
      if (response.ok) {
        router.push('/login');
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <header className="flex justify-between items-center py-4 px-6 bg-[#081444] text-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-medium">Store</h1>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative flex items-center text-lg font-semibold hover:text-gray-300 transition duration-300">
            <span className="absolute top-0 right-0 bg-orange-500 text-white rounded-full text-xs px-1.5 font-medium">
              {cart.length}
            </span>
            <IoMdCart className="text-white text-4xl" />
          </Link>

          <span onClick={handleLogout} className="text-sm font-semibold bg-slate-100 text-[#081444] p-1 rounded-lg cursor-pointer hover:bg-slate-200">
            {loading ? "Logging out..." : "Logout"}
          </span>
        </div>
      </header>

      <h1 className="text-4xl text-center text-[#081444] font-medium m-10">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length > 0 ? (
          data.map((product) => (
            <Card key={product._id} product={product} handleAddToCart={handleAddToCart} />
          ))
        ) : (
          Array.from({ length: 8 }).map((_, index) => <HomeShimmerUi key={index} />)
        )}
      </div>
    </div>
  );
}
