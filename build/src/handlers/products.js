"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const users_1 = require("./users");
const store = new product_1.ProductStore();
const create = async (_req, res) => {
    try {
        const product = {
            name: _req.body.name,
            price: parseFloat(_req.body.price),
            category: _req.body.category
        };
        const createdProduct = await store.create(product);
        res.json(createdProduct);
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const index = async (_req, res) => {
    try {
        const ProductList = await store.index();
        res.json(ProductList);
    }
    catch (err) {
        res.json(err);
    }
};
const show = async (_req, res) => {
    try {
        const requestedId = parseInt(_req.params.id);
        const requestedProduct = await store.show(requestedId);
        res.json(requestedProduct);
    }
    catch (err) {
        res.json(err);
    }
};
const showByCategory = async (_req, res) => {
    try {
        const resultProducts = await store.showByCategory(_req.params.category);
        res.json(resultProducts);
    }
    catch (err) {
        res.json(err);
    }
};
const product_routes = (app) => {
    app.post('/product/create', users_1.verifyAuthToken, create);
    app.get('/product/index', index);
    app.get('/product/show/:id', show);
    app.get('/product/:category', showByCategory);
};
exports.default = product_routes;
