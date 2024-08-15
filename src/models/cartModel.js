// import mongoose from 'mongoose';

// const cartSchema = new mongoose.Schema({
//     image: {
//         type: String,
//         required: true,
//     },
//     name: {
//         type: String,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     quantity: {
//         type: Number,
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
// }, {
//     timestamps: true,
// });

// const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
// export default Cart;

import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
        }
    ]
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
