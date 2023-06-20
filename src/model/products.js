import { Schema, model } from "mongoose";

const productsSchema = new Schema({
    title: {
        type: String
    },
    product_state: {
        type: String
    },
    description: {
        type: String
    },
    rank: {
        type: String
    },
    type: {
        type: String
    },
    vendor: {
        type: String
    },
    price: {
        type: String
    },
    sku: {
        type: String
    },
    status: {
        type: String
    },
    product_id: {
        type: String
    }
});

export const productsModel = model('products', productsSchema);
