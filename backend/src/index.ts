import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import * as express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { genApolloServer } from './apolloServer';
import { endpoints } from "./endpoints";
import * as globals from './globals';
import * as settings from "./settings";

(async () => {
    const app = express();
    app.use(settings.corsSettings());
    app.use(cookieParser());

    app.post(
        endpoints.refreshToken.route,
        async (req, res) => { await endpoints.refreshToken.endpoint(req, res); }
    );

    app.get(
        endpoints.generateKey.route,
        async (req, res) => { await endpoints.generateKey.endpoint(req, res); }
    );

    await createConnection();

    const apolloServer = await genApolloServer();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(settings.port, async () => {
        await globals.defineValues();
        console.log("STARTED SERVER SUCCESSFULLY!");
    })
})()