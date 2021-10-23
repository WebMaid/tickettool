import { Ctx, Field, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../auth/IsAuth";
import { ApiScopeCategory } from "../entities/ApiScopeCategory";
import { ServerError } from "../helpers/ServerError";
import { ServerContext } from "../ServerContext";
import { ValidationError } from "../validators/ValidationError";

@ObjectType()
class GetCategoriesResponse {
    @Field(() => [ApiScopeCategory], {defaultValue: []})
    categories?: ApiScopeCategory[];
    @Field(() => ServerError, { defaultValue: [] })
    error?: ServerError;
}

@Resolver()
export class ApiScopeCategoryResolver {

    /**
     * This method returns all ApiScopeCategories 
     * and there scopes.
     *  
     * @returns GetCategoriesResponse
     */
    @Query(() => GetCategoriesResponse)
    async getAllScopeCategories() {
        try {
            const categories = await ApiScopeCategory.find({relations: ["scopes"]});
            return {
                categories: categories
            }
        } catch(e) {
            console.log(e);
            return {
                error: {
                    name: "Internal Server Error",
                    message: "Something at the serverside went wrong!"
                }
            }
        } 
    }
}