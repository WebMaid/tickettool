import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  ResolverFilterData,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { ILike } from "typeorm";
import { isAuth } from "../auth/IsAuth";
import { Department } from "../entities/Department";
import { Service } from "../entities/Service";
import { Ticket } from "../entities/Ticket";
import { TicketGroup } from "../entities/TicketGroup";
import { User } from "../entities/User";
import { TicketStatusEnum } from "../enums/TicketStatusEnum";
import { TicketTypeEnum } from "../enums/TicketTypeEnum";
import { ServerError } from "../helpers/ServerError";
import { findByDepartmentAndDisplayName } from "../helpers/UserData";
import { ServerContext } from "../ServerContext";
import { Subscriptions } from "../Subscription";
import { TicketValidator } from "../validators/TicketValidator";
import { ValidationError } from "../validators/ValidationError";

@ObjectType()
class TicketCreateResponse {
  @Field(() => Ticket, { nullable: true, defaultValue: null })
  ticket?: Ticket;
  @Field(() => [ServerError], { defaultValue: [] })
  errors?: ServerError[];
  @Field(() => [ValidationError], { defaultValue: [] })
  validation_errors?: ValidationError[];
}

@ObjectType()
class TicketQueryAllResponse {
  @Field(() => [Ticket], { defaultValue: [] })
  tickets?: Ticket[];
  @Field(() => ServerError, { nullable: true, defaultValue: null })
  error?: ServerError;
}

@ObjectType()
class TicketUpdateResponse {
  @Field(() => Ticket, { nullable: true, defaultValue: null })
  ticket?: Ticket;
  @Field(() => [ServerError], { defaultValue: [] })
  errors?: ServerError[];
  @Field(() => [ValidationError], { defaultValue: [] })
  validation_errors?: ValidationError[];
}

@ArgsType()
@ObjectType()
class DefaultFilterArgs {
  @Field()
  id?: string;
}

@Resolver()
export class TicketResolver {
  @Mutation(() => TicketCreateResponse)
  @UseMiddleware(isAuth)
  async createTicket(
    @Arg("short_description") short_description: string,
    @Arg("description") description: string,
    @Arg("type") type: TicketTypeEnum,
    @Arg("issuer", { nullable: true, defaultValue: null }) issuer: string, // TODO: FIX WRONG POSITION OF NULLABLE COLUMN
    @Arg("issuer_department") issuer_department: string,
    @Arg("service") service: string,
    @Arg("group_id", { nullable: true, defaultValue: null }) group_id: string,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() { payload }: ServerContext
  ): Promise<TicketCreateResponse> {
    if (payload.error) {
      return {
        errors: [payload.error],
      };
    }
    const resp_user = await User.findOne(payload.id);

    const iss_id = await findByDepartmentAndDisplayName(
      issuer,
      issuer_department
    );

    const errors = await TicketValidator.validate({
      short_description,
      description,
      type,
      status: null,
      issuer: iss_id,
      issuer_department,
      service,
      group_id,
      owner_group_id: null,
    });

    if (errors.length == 0) {
      const ticket = new Ticket(
        short_description,
        description,
        type,
        resp_user.id,
        resp_user.department_id,
        iss_id,
        await Department.findOne({ where: { name: issuer_department } }),
        await Service.findOne({ where: { name: service } }),
        null
      );
      try {
        const res = await Ticket.insert(ticket);
        const insert_id = res.identifiers[0].id;
        const db_ticket = await Ticket.findOne({
          where: {
            id: insert_id,
          },
          relations: [
            "responsible_department",
            "issuer_department",
            "service",
            "group",
            "group.owner",
          ],
        });
        db_ticket.responsible_user = await User.findOne(
          db_ticket.responsible_user_id
        );
        db_ticket.issuer = await User.findOne(db_ticket.issuer_id);
        await pubSub.publish(Subscriptions.CREATE_TICKET, db_ticket);
        return {
          ticket: db_ticket,
        };
      } catch (err) {
        console.log(err);
        return {
          errors: [
            {
              name: "Server Error",
              message: "Something at the servers side went wrong!",
            },
          ],
        };
      }
    }
    return {
      validation_errors: errors,
    };
  }

  @Query(() => TicketQueryAllResponse)
  @UseMiddleware(isAuth)
  async findAllTickets(
    @Arg("count") count: number,
    @Ctx() { payload }: ServerContext
  ): Promise<TicketQueryAllResponse> {
    if (payload.error) {
      return { error: payload.error };
    }
    const tickets = await Ticket.find({
      take: count,
      relations: [
        "responsible_department",
        "issuer_department",
        "service",
        "group",
      ],
      order: { ticket_id: "ASC" },
    });
    for (let i = 0; i < tickets.length; i++) {
      tickets[i].issuer = await User.findOne(tickets[i].issuer_id);
      tickets[i].responsible_user = await User.findOne(
        tickets[i].responsible_user_id
      );
    }
    return {
      tickets: tickets,
    };
  }
  /*
  @Mutation(() => TicketUpdateResponse)
  async updateTicket(
    @Arg("id") id: string,
    @Arg("short_description", { nullable: true, defaultValue: null })
    short_description: string,
    @Arg("description", { nullable: true, defaultValue: null })
    description: string,
    @Arg("type", { nullable: true, defaultValue: null }) type: TicketTypeEnum,
    @Arg("status", { nullable: true, defaultValue: null })
    status: TicketStatusEnum,
    @Arg("responsible_user_id", { nullable: true, defaultValue: null })
    responsible_user_id: string,
    @Arg("responsible_department_id", { nullable: true, defaultValue: null })
    responsible_department_id: string,
    @Arg("service_id", { nullable: true, defaultValue: null })
    service_id: string,
    @Arg("group_id", { nullable: true, defaultValue: null }) group_id: string,
    @Arg("owner_group_id", { nullable: true, defaultValue: null })
    owner_group_id: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<TicketUpdateResponse> {
    // TODO: validation
    const errors = await TicketValidator.validate({
      short_description,
      description,
      type,
      status,
      responsible_user_id,
      responsible_department_id,
      issuer_id: null,
      issuer_department_id: null,
      service_id,
      group_id,
      owner_group_id,
    });

    if (errors.length == 0) {
      const ticket = await Ticket.findOne(id);
      ticket.short_description = short_description ?? ticket.short_description;
      ticket.description = description ?? ticket.description;
      ticket.type = type ?? ticket.type;
      ticket.status = status ?? ticket.status;
      ticket.responsible_user_id =
        responsible_user_id ?? ticket.responsible_user_id;
      ticket.responsible_department_id =
        responsible_department_id ?? ticket.responsible_department_id;
      ticket.service_id = service_id ?? ticket.service_id;
      ticket.group_id = group_id ?? ticket.group_id;
      ticket.owner_group_id = owner_group_id ?? ticket.owner_group_id;
      try {
        Ticket.update(id, ticket);
        const db_ticket = await Ticket.findOne({
          where: {
            id: id,
          },
          relations: [
            "responsible_department",
            "issuer_department",
            "service",
            "group",
            "group.owner",
          ],
        });
        for (let i = 0; i < db_ticket.histories.length; i++) {
          db_ticket.histories[i].responsible_user = await User.findOne(
            db_ticket.histories[i].responsible_user_id
          );
        }
        db_ticket.responsible_user = await User.findOne(
          db_ticket.responsible_user_id
        );
        db_ticket.issuer = await User.findOne(db_ticket.issuer_id);

        await pubSub.publish(Subscriptions.UPDATE_TICKET, db_ticket);
        return {
          ticket: db_ticket,
        };
      } catch (err) {
        console.log(err);
        return {
          errors: [
            {
              name: "Server Error",
              message: "Something at the servers side went wrong!",
            },
          ],
        };
      }
    }
    return {
      validation_errors: errors,
    };
  }*/

  @Subscription(() => Ticket, {
    nullable: true,
    topics: Subscriptions.CREATE_TICKET,
  })
  ticketCreated(@Root() ticketPayload: Ticket): Ticket {
    return ticketPayload;
  }

  @Subscription({
    topics: Subscriptions.UPDATE_TICKET,
    filter: ({
      payload,
      args,
    }: ResolverFilterData<Ticket, DefaultFilterArgs>) =>
      args.id == null || args.id == payload.id,
  })
  ticketUpdated(
    @Root() ticketPayload: Ticket,
    @Args() id: DefaultFilterArgs
  ): Ticket {
    return ticketPayload;
  }
}
