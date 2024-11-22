"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_router_1 = __importDefault(require("./module/product-model(bike)/product.router"));
const order_router_1 = __importDefault(require("./module/order-model/order.router"));
const app = (0, express_1.default)();
//parsers/middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//router connector
app.use('/api/products', product_router_1.default); //1. Create a Bike
app.use('/api/orders', order_router_1.default); //2.Order A Bike
//server live
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Server on live 🏃🏾‍♀️‍➡️',
    });
});
exports.default = app;
