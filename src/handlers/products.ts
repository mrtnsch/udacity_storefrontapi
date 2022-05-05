import express, {Request, Response} from 'express';
import {Product,ProductStore} from '../models/product';
import { verifyAuthToken } from './users';

//todo: write test for Product handler

const store = new ProductStore();

const create = async (_req:Request, res:Response) => {
    try {
    const product:Product = {
        name: _req.body.name,
        price: parseFloat(_req.body.price),
        category: _req.body.category
    }
    
    const createdProduct = await store.create(product);
    
    res.json(createdProduct);
} catch (err) {
    res.status(400).send(err);
}
}

const index = async(_req: Request, res: Response) => {
    try {
        const ProductList = await store.index();
        res.json(ProductList);
    } catch (err) {
        res.json(err);
    }
}

const show = async(_req: Request, res: Response) => {
    try {
        const requestedId = parseInt(_req.params.id);
        const requestedProduct = await store.show(requestedId)
        res.json(requestedProduct);
    } catch (err) {
        res.json(err);
    }
}

const showByCategory = async(_req: Request, res: Response) => {
    try {
        const resultProducts = await store.showByCategory(_req.params.category)
        res.json(resultProducts);
    } catch (err) {
        res.json(err);
    }
}

const product_routes = (app:express.Application) => {
    app.post('/product/create',verifyAuthToken, create)
    app.get('/product/index', index)
    app.get('/product/show/:id', show)
    app.get('/product/:category',showByCategory)
}

export default product_routes;