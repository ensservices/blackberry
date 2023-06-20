import { Router } from "express";
import { help, ShopifyAu, Auth, addProduct, fetchAllProducts, fetchProduct, updateProduct } from "../controller";

const router = Router();

router.get("/health", help);

router.get("/shopify",  ShopifyAu);
router.get("/auth", Auth);
router.post("/product", addProduct);
router.put("/product", updateProduct);
router.get("/product", fetchAllProducts);
router.get("/productid", fetchProduct);





export default router;