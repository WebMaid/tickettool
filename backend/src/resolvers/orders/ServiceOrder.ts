import { Field, InputType, ObjectType } from "type-graphql";
import { Order } from "./Order";
import { TicketOrder } from "./TicketOrder";

@InputType()
@ObjectType()
export class ServiceOrder {
  @Field(() => Order, { defaultValue: null, nullable: true })
  id?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  service_id?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  name?: Order;
  /*@Field(() => ServiceHistoryOrder, { defaultValue: null, nullable: true })
  histories?: ServiceHistoryOrder;*/
  @Field(() => TicketOrder, { defaultValue: null, nullable: true })
  histories?: TicketOrder;
}
