import { Field, ObjectType } from "type-graphql";
import { JwtTypeEnum } from "./JwtTypeEnum";

@ObjectType()
export class AccessTokenData {
    @Field()
    id: string;
    @Field()
    type?: JwtTypeEnum;
}

@ObjectType()
export class RefreshTokenData {
    @Field()
    id: string;
    @Field()
    version: number;
    @Field()
    type?: JwtTypeEnum;
}

@ObjectType()
export class ApiKeyData {
    @Field()
    id: string;
    @Field()
    secret: string;
    @Field()
    type?: JwtTypeEnum;
}