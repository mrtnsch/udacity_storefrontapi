"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const users_1 = require("./users");
const store = new order_1.OrderStore();
const create = async (_req, res) => {
    try {
        const order = {
            user_id: _req.body.user_id,
            status: "active"
        };
        const createdOrder = await store.create(order);
        res.json(createdOrder);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const show = async (_req, res) => {
    try {
        const requestedId = parseInt(_req.params.id);
        const requestedOrder = await store.show(requestedId);
        res.json(requestedOrder);
    }
    catch (err) {
        res.json(err);
    }
};
const showCurrentOrderOfUser = async (_req, res) => {
    try {
        const requestedOrder = await store.showCurrentOrderOfUser(parseInt(_req.params.user_Id));
        res.json(requestedOrder);
    }
    catch (err) {
        res.json(err);
    }
};
const addProductToOrder = async (_req, res) => {
    try {
        const { quantity, product_id, orderId } = _req.body;
        const addedProduct = await store.addProductToOrder(quantity, orderId, product_id);
        res.json(addedProduct);
    }
    catch (err) {
        res.json(err);
    }
};
const order_routes = (app) => {
    app.post('/order/create', users_1.verifyAuthToken, create);
    app.post('/order/addProductToOrder', addProductToOrder);
    app.get('/order/showCurrentOrderOfUser/:user_Id', showCurrentOrderOfUser);
    app.get('/order/show/:id', show);
};
exports.default = order_routes;
