"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401).send("Please authenticate before proceeding");
    }
};
exports.verifyAuthToken = verifyAuthToken;
const create = async (_req, res) => {
    try {
        const user = {
            firstname: _req.body.firstname,
            lastname: _req.body.lastname,
            password: _req.body.password
        };
        const createdUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: createdUser }, process.env.TOKEN_SECRET);
        res.json({
            firstname: createdUser.firstname,
            lastname: createdUser.lastname,
            id: createdUser.id,
            token: token
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
};
const authenticate = async (_req, res) => {
    const authUser = await store.authenticate(_req.body.firstname, _req.body.lastname, _req.body.password);
    if (authUser == null) {
        res.status(403).send("invalid user credentials");
    }
    else {
        var token = jsonwebtoken_1.default.sign({ user: authUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
};
const index = async (_req, res) => {
    try {
        const userList = await store.index();
        res.json(userList);
    }
    catch (err) {
        res.json(err);
    }
};
const show = async (_req, res) => {
    try {
        const requestedId = parseInt(_req.params.id);
        const requestedUser = await store.show(requestedId);
        res.json(requestedUser);
    }
    catch (err) {
        res.json(err);
    }
};
const user_routes = (app) => {
    app.post('/user/create', create);
    app.get('/user/authenticate', authenticate);
    app.get('/user/index', exports.verifyAuthToken, index);
    app.get('/user/show/:id', exports.verifyAuthToken, show);
};
exports.default = user_routes;
