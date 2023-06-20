import { httpsCode, httpsMessage } from "../utils"
import { config } from "../config";
import { accessTokenModel, productsModel } from "../model";
import axios from "axios";
import { generateAppToken } from "../helper";

export const help = (req, res) => {
    try {
        res.status(200).json({
            message: httpsMessage.OK,
            code: httpsCode.OK
        });
    } catch (error) {
        res.status(200).json({
            message: httpsMessage.INTERNALSERVERERROR,
            code: httpsCode.INTERNALSERVERERROR
        });
    }
}

export const ShopifyAu = async (req, res) => {
    try {
        const { shop } = req.query;
        const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${config.shopifyClientId}&scope=read_products,write_products&redirect_uri=${config.appUrl}/admin/auth`;
        res.redirect(installUrl);

    } catch (error) {
        res.status(200).json({
            message: httpsMessage.INTERNALSERVERERROR,
            code: httpsCode.INTERNALSERVERERROR
        });
    }
}

export const Auth = async (req, res) => {
    try {
        const { code, shop } = req.query;
        const storeCheck = await accessTokenModel.find({ shopify_store_name: shop });
        const app_access_token = generateAppToken({ shop });

        if (storeCheck.length >= 1) {
            // res.status(200).json({
            //     message: "1111",
            //     app_access_token
            // });
            res.redirect(`/?token=${app_access_token}`);
        } else {
            const { data } = await axios({
                url: `https://${shop}/admin/oauth/access_token`,
                method: "POST",
                data: {
                    client_id: config.shopifyClientId,
                    client_secret: config.shopifyClientSecret,
                    code
                }
            });
            await accessTokenModel.create({
                shopify_store_name: shop,
                shopify_sccess_token: data.access_token
            });
            // res.status(200).json({
            //     message: "8789",
            //     app_access_token
            // });
            res.redirect(`/?token=${app_access_token}`);
        }

    } catch (error) {
        res.status(200).json({
            message: httpsMessage.INTERNALSERVERERROR,
            code: httpsCode.INTERNALSERVERERROR
        });
    }
}

export const addProduct = async (req, res) => {
    try {
        const { title = "",
            product_state = "",
            description = "",
            rank = "",
            type = "",
            vendor = "",
            price = "",
            sku = "",
            status = "" } = req.body;
        const acc = await accessTokenModel.find({ shopify_store_name: "sikandarsah.myshopify.com" });
        const { shopify_sccess_token } = acc[0];
        const { data } = await axios({
            method: "POST",
            url: "https://sikandarsah.myshopify.com/admin/api/2023-01/products.json",
            headers: {
                "X-Shopify-Access-Token": shopify_sccess_token
            },
            data: {
                "product": {
                    "title": title,
                    "vendor": vendor,
                    "product_type": type,
                    "body_html": description,
                    "tags": [rank, product_state],
                    "status": status,
                    "variants": [
                        {
                            "option1": title,
                            "price": price,
                            "sku": sku
                        }
                    ]
                }
            }
        });
        //console.log(data);
        await productsModel.create({ title, product_state, description, rank, type, vendor, price, sku, status, product_id: data?.product?.id });

        res.status(200).json({
            message: httpsMessage.CREATED,
            code: httpsCode.CREATED
        });

    } catch (error) {
        console.log(error);
        res.status(200).json({
            message: httpsMessage.INTERNALSERVERERROR,
            code: httpsCode.INTERNALSERVERERROR
        });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { title = "",
            product_state = "",
            description = "",
            rank = "",
            type = "",
            vendor = "",
            price = "",
            sku = "",
            status = "",
            product_id = "",
            _id = "" } = req.body;

        const acc = await accessTokenModel.find({ shopify_store_name: "sikandarsah.myshopify.com" });
        const { shopify_sccess_token } = acc[0];
        const { data } = await axios({
            method: "PUT",
            url: `https://sikandarsah.myshopify.com/admin/api/2023-01/products/${product_id}.json`,
            headers: {
                "X-Shopify-Access-Token": shopify_sccess_token
            },
            data: {
                "product": {
                    "title": title,
                    "vendor": vendor,
                    "product_type": type,
                    "body_html": description,
                    "tags": [rank, product_state],
                    "status": status,
                    "variants": [
                        {
                            "option1": title,
                            "price": price,
                            "sku": sku
                        }
                    ]
                }
            }
        });
        //console.log(data);
        await productsModel.findOneAndUpdate({ _id: _id }, { title, product_state, description, rank, type, vendor, price, sku, status });

        res.status(200).json({
            message: httpsMessage.CREATED,
            code: httpsCode.CREATED
        });

    } catch (error) {
        console.log(error);
        res.status(200).json({
            message: httpsMessage.INTERNALSERVERERROR,
            code: httpsCode.INTERNALSERVERERROR
        });
    }
}
export const fetchAllProducts = async (req, res) => {
    try {
        const allProducts = await productsModel.find({});
        res.status(200).json({
            message: httpsMessage.OK,
            code: httpsCode.OK,
            data: allProducts
        });

    } catch (error) {
        console.log(error);
        res.status(200).json({
            message: httpsMessage.INTERNALSERVERERROR,
            code: httpsCode.INTERNALSERVERERROR
        });
    }
}
export const fetchProduct = async (req, res) => {
    try {
        const { id } = req.query;
        const pro = await productsModel.find({ _id: id });
        res.status(200).json({
            message: httpsMessage.OK,
            code: httpsCode.OK,
            data: pro
        });

    } catch (error) {
        console.log(error);
        res.status(200).json({
            message: httpsMessage.INTERNALSERVERERROR,
            code: httpsCode.INTERNALSERVERERROR
        });
    }
}

