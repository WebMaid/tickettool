import { Field, InputType, ObjectType } from "type-graphql";
import { TicketInclude } from "./TicketInclude";

@InputType()
@ObjectType()
export class TicketGroupInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => TicketInclude, { defaultValue: null, nullable: true })
  owner?: TicketInclude;
  @Field(() => TicketInclude, { defaultValue: null, nullable: true })
  members?: TicketInclude;
}
