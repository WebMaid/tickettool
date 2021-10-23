import { Field, ID, InputType } from "type-graphql";
import { BaseEntity } from "typeorm";
import { ApiScope } from "../entities/ApiScope";

@InputType()
export class ApiScopeInput implements Partial<ApiScope> {
    @Field(() => ID)
    id: string;
}