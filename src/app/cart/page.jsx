"use client";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function CartPage() {
  const { cart, addToCart, reduceQuantity, removeFromCart, applyDiscount, calculateTotal, discount } = useContext(CartContext);
  const [discountCode, setDiscountCode] = useState('');
  const [total, setTotal] = useState(0);

  const handleApplyDiscount = () => {
    if (cart.length > 0) {
      if (discountCode === 'SAVE10') {
        applyDiscount('percentage', 10);
      } else if (discountCode === 'FLAT50') {
        applyDiscount('fixed', 50);
      } else if (discountCode === '') {
        applyDiscount('null', 0)
        calculateTotal()
      } else {
        toast.error("Invalid discount code")
        applyDiscount('null', 0)
      }
    } else {
      toast.error("Cart is empty.")
    }
  };

  const checkoutHandle = () => {
    if (cart.length > 0) {
      toast('Checkout DONE!',
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: 'lightgreen',
            color: '#333',
          },
        }
      )
    } else {
      toast("Cart is empty..!!")
    }
  }

  useEffect(() => {
    console.log("CART : ", cart);

    const totalAmount = calculateTotal();
    setTotal(totalAmount);
  }, [cart, discount]);

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <header className="flex justify-between items-center py-4 px-6 bg-[#081444] text-white">
        <h1 className="text-2xl font-medium">My Store</h1>
        <div>
          <Link href={'/'}>{"< "}Back</Link>
        </div>
      </header>
      <h1 className="text-4xl text-center text-[#081444] font-medium m-10">Your Cart</h1>

      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Product List */}
        <div className="lg:w-2/3 m-6 p-6 bg-gray-100 rounded-xl">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((product, index) => (
                <div key={index} className="border-b pb-4 mb-4 flex items-center">
                  <div className="w-20 h-20">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-500">{product.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg">${product.price.toFixed(2)}</p>
                    <div className="flex items-center">
                      <button
                        onClick={() => reduceQuantity(product)}
                        className="px-2 py-1 border rounded text-gray-700"
                      >
                        -
                      </button>
                      <span className="px-4">{product.quantity}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-2 py-1 border rounded text-gray-700"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-bold">${(product.price * product.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(product)}
                      className="text-red-500 text-lg ml-4"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 bg-gray-200 p-6 rounded-xl m-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="mb-4">
            <input
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <div className="mb-4">
              <span onClick={(e) => setDiscountCode('SAVE10')} className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                SAVE10
              </span>
              <span onClick={(e) => setDiscountCode('FLAT50')} className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                FLAT50
              </span>
            </div>
            <button
              onClick={handleApplyDiscount}
              className="w-full bg-[#081444] text-white py-2 rounded hover:bg-white hover:text-[#081444]"
            >
              Apply Discount
            </button>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <button className="w-full bg-[#081444] text-white py-2 rounded mt-4 hover:bg-[#081444]" onClick={() => checkoutHandle()}>
            CHECKOUT
          </button>
        </div>
      </div>
    </div >
  );
}
