
import { ApolloServer } from 'apollo-server-express';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import * as express from "express";
import { execute, subscribe } from 'graphql';
import * as http from 'http';
import "reflect-metadata";
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
import { endpoints } from "./endpoints";
import { Department } from './entities/Department';
import { User } from './entities/User';
import * as globals from './globals';
import { resolvers } from './resolvers';
import * as settings from "./settings";

(async () => {
  const app = express();
  app.use(settings.corsSettings());
  app.use(cookieParser());
  app.use(express.json());

  app.post(
    endpoints.refreshToken.route,
    async (req, res) => { await endpoints.refreshToken.endpoint(req, res); }
  );

  app.post(
    endpoints.generateKey.route,
    async (req, res) => { await endpoints.generateKey.endpoint(req, res); }
  );

  app.post(
    endpoints.generateApiKey.route,
    async (req, res) => { await endpoints.generateApiKey.endpoint(req, res); }
  )

  await createConnection();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: resolvers
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/graphql' }
  );

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ]
  });;
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  httpServer.listen(settings.port, async () => {
    await globals.defineValues();
    console.log("STARTED SERVER SUCCESSFULLY!");
    /*const dep = await Department.findOne();
    await User.insert(new User("meierluk", "Meier Lukas", "lukas.meier.1@post.ch", "12345", dep.id));
  */
  });
})();