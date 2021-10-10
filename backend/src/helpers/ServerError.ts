import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ServerError {
    @Field()
    name: string;

    @Field()
    message: string;
}