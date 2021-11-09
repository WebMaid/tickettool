import { Field, InputType, ObjectType } from "type-graphql";
import { Order } from "./Order";
import { UserOrder } from "./UserOrder";

@InputType()
@ObjectType()
export class UserSettingOrder {
  @Field(() => Order, { defaultValue: null, nullable: true })
  id?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  public_profile?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  day_theme?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  night_theme?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  notification_assign_ticket?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  notification_assigned_ticket_change?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  notification_watching_ticket_change?: Order;
  @Field(() => UserOrder, { defaultValue: null, nullable: true })
  user?: UserOrder;
}
