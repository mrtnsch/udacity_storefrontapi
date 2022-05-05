import express, {Request, Response} from 'express';
import {Order,OrderStore} from '../models/order';
import { verifyAuthToken } from './users';

const store = new OrderStore();

const create = async (_req:Request, res:Response) => {
    try {
    const order:Order = {
        user_id: _req.body.user_id,
        status:"active"
    }
    
    const createdOrder = await store.create(order);
    
    res.json(createdOrder);
} catch (err) {
    res.status(400).send(err);
}
}

const show = async(_req: Request, res: Response) => {
    try {
        const requestedId = parseInt(_req.params.id);
        const requestedOrder = await store.show(requestedId)
        res.json(requestedOrder);
    } catch (err) {
        res.json(err);
    }
}

const showCurrentOrderOfUser =async (_req:Request, res:Response) => {
    try {
        const requestedOrder = await store.showCurrentOrderOfUser(parseInt(_req.params.user_Id));
        res.json(requestedOrder);
    } catch (err) {
        res.json(err);
    }
}

const addProductToOrder =async (_req:Request, res: Response) => {
    try {
        const {quantity, product_id, orderId} = _req.body;

        const addedProduct = await store.addProductToOrder(quantity, orderId,product_id);

        res.json(addedProduct);
    } catch (err) {
        res.json(err);
    }
}

const order_routes = (app:express.Application) => {
    app.post('/order/create',verifyAuthToken, create)
    app.post('/order/addProductToOrder', addProductToOrder)
    app.get('/order/showCurrentOrderOfUser/:user_Id', showCurrentOrderOfUser)
    app.get('/order/show/:id', show)
}

export default order_routes;