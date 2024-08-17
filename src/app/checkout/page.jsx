"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const CheckoutForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Done!");
    };

    return (

        <div className="container mx-auto p-4">
            <Toaster />
            <header className="flex justify-between items-center py-4 px-6 bg-[#081444] text-white">
                <h1 className="text-2xl font-medium">Store</h1>
                <div>
                    <Link href={'/cart'}>{"< "}Back</Link>
                </div>
            </header>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md"
                        required
                    />
                </div>

                <div className="flex space-x-4">
                    <div className="mb-4 flex-1">
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4 flex-1">
                        <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border rounded-md"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-[#081444] text-white p-3 rounded-md font-bold">
                    Proceed to Payment
                </button>
            </form>
        </div>



    );
};

export default CheckoutForm;
