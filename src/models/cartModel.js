import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String }
});

const Products = mongoose.models.Products || mongoose.model('Products', productSchema);

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    products: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            description: { type: String },
            image: { type: String },
            quantity: { type: Number, default: 1 }
        }
    ]
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);


export { Products, Cart };