import { connect } from '../../../dbconfig/dbconfig';
import { Products } from '../../../models/cartModel'
import { NextResponse } from "next/server";

connect()

export async function GET(req, res) {
  try {
    const products = await Products.find();
    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const newProduct = new Products({
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      savedProduct
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}