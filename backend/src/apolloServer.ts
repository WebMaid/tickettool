import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";

export const genApolloServer = async () => {
    return new ApolloServer({
        schema: await buildSchema({
            resolvers: resolvers
        }),
        context: ({ req, res }) => ({ req, res })
    });
};