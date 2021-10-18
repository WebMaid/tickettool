import { Arg, Ctx, Field, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../auth/IsAuth";
import { ApiKey } from "../entities/ApiKey";
import { User } from "../entities/User";
import { ServerError } from "../helpers/ServerError";
import { ServerContext } from "../ServerContext";
import { ValidationError } from "../validators/ValidationError";

@ObjectType()
class GetKeysResponse {
    @Field(() => [ApiKey], {defaultValue: []})
    keys?: ApiKey[];
    @Field(() => [ServerError], { defaultValue: [] })
    errors?: ServerError[];
    @Field(() => [ValidationError], { defaultValue: [] })
    validation_errors?: ValidationError[];
}

@Resolver()
export class ApiKeyResolver {

    @Query(() => GetKeysResponse)
    @UseMiddleware(isAuth)
    async getKeysOfUser(
        @Arg('user_id') user_id: string,
        @Ctx() { payload }: ServerContext
    ): Promise<GetKeysResponse> {
        if (payload.error) {
            return {
                errors: [{
                    name: payload.error.name,
                    message: payload.error.message
                }]
            };
        }
        if (!await User.exists(user_id)) {
            return {
                errors: [{
                    name: 'Invalid user_id',
                    message: 'Please use a valid user_id!'
                }]
            };
        }
        const keys = await ApiKey.find({where: {owner_id: user_id}, relations: ["scopes"]});
        return {
            keys: keys
        }
    }

}