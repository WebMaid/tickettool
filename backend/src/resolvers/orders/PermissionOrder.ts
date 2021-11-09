import { Field, InputType, ObjectType } from "type-graphql";
import { Order } from "./Order";
import { RoleOrder } from "./RoleOrder";
import { UserOrder } from "./UserOrder";

@InputType()
@ObjectType()
export class PermissionOrder {
  @Field(() => Order, { defaultValue: null, nullable: true })
  id?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  name?: Order;
  @Field(() => RoleOrder, { defaultValue: null, nullable: true })
  roles?: RoleOrder;
  @Field(() => UserOrder, { defaultValue: null, nullable: true })
  users?: UserOrder;
}
