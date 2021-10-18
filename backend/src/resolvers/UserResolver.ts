import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { verify_password } from '../auth/auth';
import { isAuth } from "../auth/IsAuth";
import { Jwt } from "../auth/jwt/Jwt";
import { Rsa } from "../auth/rsa/Rsa";
import { Client } from "../entities/Client";
import { User } from "../entities/User";
import { ServerError } from "../helpers/ServerError";
import { find as findUser } from '../helpers/UserData';
import { ServerContext } from "../ServerContext";

@ObjectType()
class LoginResponse {
    @Field({ nullable: true })
    accessToken: string;
    @Field(() => User, { nullable: true })
    user: User | null;
    @Field(() => ServerError, { nullable: true })
    error: ServerError | null;
}

@Resolver()
export class UserResolver {

    @Query(() => String)
    @UseMiddleware(isAuth)
    async hi(
        @Ctx() { payload }: ServerContext
    ) {
        if (payload.error)
            return `${payload.error.name}: ${payload.error.message}`;
        const user = await User.findOne(payload.id);
        return `Hello ${user.displayName}!`;
    }

    @Query(() => User, { nullable: true })
    async currentUser(
        @Ctx() context: ServerContext
    ) {
        const authorization = context.req.headers['authorization'];
        if (!authorization) {
            return null;
        }
        try {
            const token = authorization.split(" ")[1];
            const payload: any = await Jwt.verify_data(token);
            return await User.findOne(payload.sub);
        } catch (err) {
            return null;
        }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('client_id') client_id: string,
        @Arg('mail') mail: string,
        @Arg('password') password: string,
        @Ctx() { res }: ServerContext
    ): Promise<LoginResponse> {
        let user: User = null;
        if (mail.includes("@")) {
            const local_user = await findUser({ mail: mail })
            if (local_user) {
                user = await User.findOne(local_user.id);
            }
        }
        else {
            const local_user = await findUser({ username: mail })
            if (local_user) {
                user = await User.findOne(local_user.id);
            }
        }
        if (!user) {
            return {
                accessToken: null,
                user: null,
                error: {
                    name: "Invalid logindata",
                    message: `The specified logindata was invalid`
                }
            }
        }
        const client = await Client.findOne(client_id);
        if (!client) {
            return {
                accessToken: null,
                user: null,
                error: {
                    name: "Invalid client",
                    message: `The specified client_id '${client_id}' has not been found!`
                }
            }
        }
        client.remove();
        const valid = verify_password(Rsa.decrypt(password, client.private_key), user.password, user.personalized_secret);
        if (!valid) {
            return {
                accessToken: null,
                user: null,
                error: {
                    name: "Invalid logindata",
                    message: `The specified logindata was invalid`
                }
            }
        }

        // login successful

        await Jwt.send_refresh_token(res, await Jwt.generate_refresh_token(user));

        return {
            accessToken: await Jwt.generate_access_token(user),
            user: user,
            error: null
        }

    }
}