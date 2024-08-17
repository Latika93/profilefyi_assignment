import React from 'react';
import Image from 'next/image';

function Card({ product, handleAddToCart }) {
    return (
        <div
            key={product._id}
            className="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative w-full h-64">
                <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover" 
                    className="rounded-t-lg"
                />
            </div>
            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-[#081444] mb-2">{product.name}</h3>
                <p className="text-gray-700 text-base mb-4">
                    ${product.price.toFixed(2)}
                </p>
                <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#081444] text-white py-2 px-4 rounded hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#081444] focus:ring-opacity-50"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default Card;