import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { isAuth } from "../auth/IsAuth";
import { ICrypticoEncryptedKey, Rsa } from "../auth/rsa/Rsa";
import { ApiKey } from "../entities/ApiKey";
import { ApiScope } from "../entities/ApiScope";
import { User } from "../entities/User";
import { addDateStringToDate } from "../helpers/DateHelper";
import { ServerError } from "../helpers/ServerError";
import { ApiScopeInput } from "../input-types/ApiScopeInput";
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

@ObjectType()
class CrypticoEncryptedKey implements ICrypticoEncryptedKey {
    @Field()
    status: string;
    @Field()
    cipher: string;
}

@ObjectType()
class CreateKeyResponse {
    @Field(() => ApiKey, {nullable: true, defaultValue: null})
    api_key?: ApiKey;
    @Field(() => CrypticoEncryptedKey, {nullable: true, defaultValue: null})
    secret?: ICrypticoEncryptedKey;
    @Field(() => ServerError, {nullable: true, defaultValue: null})
    error?: ServerError;
    @Field(() => [ValidationError], {defaultValue: []})
    validation_errors?: ValidationError[];
}

@ObjectType()
class DeleteKeyResponse {
    @Field(() => Boolean, {defaultValue: false})
    success?: boolean;
    @Field(() => ServerError, {nullable: true, defaultValue: null})
    error?: ServerError;
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

    @Mutation(() => DeleteKeyResponse)
    @UseMiddleware(isAuth)
    async deleteApiKey(
        @Arg('id') id: string,
        @Ctx() { payload }: ServerContext
    ): Promise<DeleteKeyResponse> {
        if (payload.error) {
            return {
                error: {
                    name: payload.error.name,
                    message: payload.error.message
                }
            };
        }
        if (!await ApiKey.exists(id)) {
            return {
                error: {
                    name: 'Invalid api-key_id',
                    message: 'Please use a valid id!'
                }
            };
        }
        try {
            await ApiKey.delete(id)
            return {
                success: true
            };
        } catch(e) {
            console.log(e);
            return {
                error: {
                    name: "Server Error",
                    message: "Serversite error"
                }
            };
        }
    }

    @Mutation(() => CreateKeyResponse)
    @UseMiddleware(isAuth)
    async createApiKey(
        @Arg('note') note: string,
        @Arg('expires_in') expires_in: string,
        @Arg('public_key') public_key: string,
        @Arg('scopes', type => [ApiScopeInput]) scopes: ApiScopeInput[],
        @Ctx() { payload }: ServerContext
    ): Promise<CreateKeyResponse> {
        if (payload.error) {
            return {
                error: {
                    name: payload.error.name,
                    message: payload.error.message
                }
            };
        }
        const expires_at = addDateStringToDate(expires_in, new Date());
        const key = await ApiKey.generate(payload.id, expires_in);
        let relationScopes: ApiScope[] = []
        scopes.forEach(async s => {
            const scope = await ApiScope.findOne(s.id);
            if (scope != null) {
                relationScopes.push(scope);
            }
        });
        const res = await ApiKey.insert(new ApiKey(
            note, 
            expires_at, 
            key, 
            payload.id,
        ));
        const ak = await ApiKey.findOne({where: {id: res.identifiers[0].id}, relations:['scopes']});
        await getConnection()
            .createQueryBuilder()
            .relation(ApiKey, "scopes")
            .of(ak)
            .add(relationScopes);
            
        return {
            api_key: ak,
            secret: Rsa.encrypt(key, public_key)
        };
    }

}