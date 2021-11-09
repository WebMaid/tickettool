import { Field, InputType, ObjectType } from "type-graphql";
import { Order } from "./Order";
import { ServiceOrder } from "./ServiceOrder";

@InputType()
@ObjectType()
export class TicketOrder {
  @Field(() => Order, { defaultValue: null, nullable: true })
  id?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  ticket_id?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  short_description?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  description?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  type?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  status?: Order;
  /*@Field(() => UserOrder, { defaultValue: null, nullable: true })
  responsible_user?: UserOrder;
  @Field(() => DepartmentOrder, { defaultValue: null, nullable: true })
  responsible_department?: DepartmentOrder;
  @Field(() => DepartmentOrder, { defaultValue: null, nullable: true })
  previous_responsible_department?: DepartmentOrder;
  @Field(() => UserOrder, { defaultValue: null, nullable: true })
  issuer?: UserOrder;
  @Field(() => DepartmentOrder, { defaultValue: null, nullable: true })
  issuer_department?: DepartmentOrder;*/
  @Field(() => ServiceOrder, { defaultValue: null, nullable: true })
  service?: ServiceOrder;
  /*@Field(() => TicketGroupOrder, { defaultValue: null, nullable: true })
  group?: TicketGroupOrder;
  @Field(() => TicketGroupOrder, { defaultValue: null, nullable: true })
  owner_group?: TicketGroupOrder;*/
  @Field(() => Order, { defaultValue: null, nullable: true })
  created_at?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  updated_at?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  closed_at?: Order;
}
