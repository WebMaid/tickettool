import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { createQueryBuilder, ILike, Like } from "typeorm";
import { isAuth } from "../auth/IsAuth";
import { Service } from "../entities/Service";
import { ServerContext } from "../ServerContext";

@Resolver()
export class ServiceResolver {
  @Query(() => [Service], { defaultValue: [] })
  @UseMiddleware(isAuth)
  async searchService(
    @Arg("name") name: string,
    @Ctx() { payload }: ServerContext
  ): Promise<Service[]> {
    if (payload.error) return [];
    return Service.find({
      where: { name: ILike(`%${name}%`) },
      order: { name: "ASC" },
    });
  }
}
