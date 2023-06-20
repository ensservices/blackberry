import { Router } from "express";
import adminRoutes from "./adminRoutes";

const router = Router();

const allRoutes = [
   { path: "/admin", route: adminRoutes}
];

allRoutes.forEach(item=>{
    router.use(item.path, item.route);
});

export default router;