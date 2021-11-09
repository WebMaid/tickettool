import { Field, InputType, ObjectType } from "type-graphql";
import { Order } from "./Order";
import { RoleOrder } from "./RoleOrder";
import { TicketOrder } from "./TicketOrder";
import { UserOrder } from "./UserOrder";

@InputType()
@ObjectType()
export class DepartmentOrder {
  @Field(() => Order, { defaultValue: null, nullable: true })
  id?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  name?: Order;
  @Field(() => UserOrder, { defaultValue: null, nullable: true })
  users?: UserOrder;
  @Field(() => RoleOrder, { defaultValue: null, nullable: true })
  roles?: RoleOrder;
  @Field(() => TicketOrder, { defaultValue: null, nullable: true })
  ticket_responsibilities?: TicketOrder;
  @Field(() => TicketOrder, { defaultValue: null, nullable: true })
  previous_ticket_responsibilities?: TicketOrder;
  /*@Field(() => TicketTemplateOrder, { defaultValue: null, nullable: true })
  template_responsibilities?: TicketTemplateOrder;
  @Field(() => TicketHistoryOrder, { defaultValue: null, nullable: true })
  history_responsibilities?: TicketHistoryOrder;*/
  @Field(() => TicketOrder, { defaultValue: null, nullable: true })
  issued?: TicketOrder;
}
