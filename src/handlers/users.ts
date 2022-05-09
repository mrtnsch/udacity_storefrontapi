import express, {Request, Response} from 'express';
import {User,UserStore} from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore();

export const verifyAuthToken = (req: Request, res: Response, next:Function) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET as string)
        next()
    } catch (error) {
        res.status(401).send("Please authenticate before proceeding") ;
    }
}


const create = async (_req:Request, res:Response) => {
    try {
    const user:User = {
        firstname: _req.body.firstname,
        lastname: _req.body.lastname,
        password: _req.body.password
    }
    const createdUser = await store.create(user);
    var token = jwt.sign({user:createdUser},process.env.TOKEN_SECRET as string)
    
    res.json({
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        id: createdUser.id,
        token: token
    });
} catch (err) {
    res.status(400).send(err);
}
}

const authenticate = async(_req:Request,res:Response) => {
    const authUser = await store.authenticate(_req.body.firstname, _req.body.lastname, _req.body.password);
    if (authUser==null){
     res.status(403).send("invalid user credentials")
    } else {
        var token = jwt.sign({user:authUser},process.env.TOKEN_SECRET as string)
    res.json(token);
    }
}

const index = async(_req: Request, res: Response) => {
    try {
        const userList = await store.index();
        res.json(userList);
    } catch (err) {
        res.json(err);
    }
}

const show = async(_req: Request, res: Response) => {
    try {
        const requestedId = parseInt(_req.params.id);
        const requestedUser = await store.show(requestedId)
        res.json(requestedUser);
    } catch (err) {
        res.json(err);
    }
}

const user_routes = (app:express.Application) => {
    app.post('/user/create',create)
    app.get('/user/authenticate',authenticate)
    app.get('/user/index', verifyAuthToken, index)
    app.get('/user/show/:id',verifyAuthToken, show)
}

export default user_routes;