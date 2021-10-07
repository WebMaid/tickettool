import "reflect-metadata";
import 'dotenv/config';
import * as express from "express";
import { createConnection } from "typeorm";
import * as cookieParser from 'cookie-parser';
import { endpoints } from "./endpoints";
import * as settings from "./settings";
import { genApolloServer } from './apolloServer';


(async () => {
    const app = express();
    app.use(settings.corsSettings());
    app.use(cookieParser());

    app.post(
        endpoints.refreshToken.route, 
        async (req, res) => {await endpoints.refreshToken.endpoint(req, res)}
    );

    await createConnection();

    const apolloServer = await genApolloServer();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(settings.port, () => {
        console.log("STARTED SERVER SUCCESSFULLY!");
    })
})()