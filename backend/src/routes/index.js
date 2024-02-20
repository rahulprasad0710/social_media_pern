import express from "express";

// Routes
import bookRoute from "./book.route.js";
import bookAttributeRoute from "./bookAttribute.route.js";
import usersRoute from "./user.route.js";
import authRoute from "./auth.route.js";
import fileUpload from "./fileUpload.route.js";
import adminRoute from "./admin.route.js";
import categoryRoute from "./category.route.js";
import productRoute from "./product.route.js";
import employeesRoute from "./employees.route.js";
import auditRoute from "./audit.route.js";
import corouselRoute from "./corousel.route.js";
import customerRoute from "./customer.route.js";
import permissionRoute from "./permission.route.js";
import statusRoute from "./status.route.js";
import addressRoute from "./address.route.js";
import orderRoute from "./order.route.js";
import adminSetting from "./adminSetting.route.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Check Server
 *   description: Check if the API server is working.
 */

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Check if server is working ping.
 *     description: /Ping with get response as pont.
 *     tags: [Check Server]
 *     responses:
 *       '200':
 *         description: Successful response
 */

router.get("/ping", (req, res) => {
    res.send("pong!");
});

const routes = [
    {
        path: "/users",
        route: usersRoute,
    },
    {
        path: "/products",
        route: productRoute,
    },
    {
        path: "/employees",
        route: employeesRoute,
    },
    {
        path: "/auth",
        route: authRoute,
    },
    {
        path: "/categories",
        route: categoryRoute,
    },
    {
        path: "/corousel",
        route: corouselRoute,
    },
    {
        path: "/admin",
        route: adminRoute,
    },
    {
        path: "/uploads",
        route: fileUpload,
    },
    {
        path: "/books",
        route: bookRoute,
    },
    {
        path: "/book-attributes",
        route: bookAttributeRoute,
    },
    {
        path: "/audits",
        route: auditRoute,
    },
    {
        path: "/customers",
        route: customerRoute,
    },
    {
        path: "/admin-settings",
        route: permissionRoute,
    },
    {
        path: "/statuses",
        route: statusRoute,
    },
    {
        path: "/addresses",
        route: addressRoute,
    },
    {
        path: "/orders",
        route: orderRoute,
    },
];

// apply middleware to all routes

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
