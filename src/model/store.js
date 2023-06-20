import { Schema, model } from "mongoose";

const accessTokenSchema = new Schema({
    shopify_store_name: {
        type: String
    },
    shopify_sccess_token: {
        type: String
    }
});

export const accessTokenModel = model('store', accessTokenSchema);
