import { Field, InputType, ObjectType } from "type-graphql";
import { TicketHistoryInclude } from "./TicketHistoryInclude";

@InputType()
@ObjectType()
export class TicketHistoryActionInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  type?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  value1?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  value2?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  value3?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  history_id?: boolean;
  @Field(() => TicketHistoryInclude, { defaultValue: false, nullable: true })
  history?: TicketHistoryInclude;
}
