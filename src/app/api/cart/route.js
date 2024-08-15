import { connect } from "../../../dbconfig/dbconfig"
import Cart from "../../../../models/cart"; 
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

connect();

export async function GET(request) {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ cart: [] }, { status: 200 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === 'object' && 'id' in decoded) {
            const userId = decoded.id;
            const cart = await Cart.findOne({ user: userId }).populate('products.productId');
            return NextResponse.json({ cart: cart ? cart.products : [] });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === 'object' && 'id' in decoded) {
            const userId = decoded.id;
            const { cart } = await request.json();

            let existingCart = await Cart.findOne({ user: userId });
            if (existingCart) {
                existingCart.products = cart;
                await existingCart.save();
            } else {
                await Cart.create({ user: userId, products: cart });
            }

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
