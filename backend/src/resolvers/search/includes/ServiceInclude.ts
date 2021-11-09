import { Field, InputType, ObjectType } from "type-graphql";
import { ServiceHistoryInclude } from "./ServiceHistoryInclude";
import { TicketInclude } from "./TicketInclude";

@InputType()
@ObjectType()
export class ServiceInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  service_id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  name?: boolean;
  @Field(() => ServiceHistoryInclude, { defaultValue: false, nullable: true })
  histories?: ServiceHistoryInclude;
  @Field(() => TicketInclude, { defaultValue: false, nullable: true })
  tickets?: TicketInclude;
}
