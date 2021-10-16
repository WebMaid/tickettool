import { NonEmptyArray } from "type-graphql";
import { TicketResolver } from "./TicketResolver";
import { UserResolver } from "./UserResolver";

export const resolvers: NonEmptyArray<Function> = [
    UserResolver,
    TicketResolver
];