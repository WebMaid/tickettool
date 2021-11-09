import { Field, InputType, ObjectType } from "type-graphql";
import { DepartmentOrder } from "./DepartmentOrder";
import { Order } from "./Order";
import { PermissionOrder } from "./PermissionOrder";
import { TicketOrder } from "./TicketOrder";
import { UserOrder } from "./UserOrder";

@InputType()
@ObjectType()
export class RoleOrder {
  @Field(() => Order, { defaultValue: null, nullable: true })
  id?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  name?: Order;
  @Field(() => UserOrder, { defaultValue: null, nullable: true })
  users?: UserOrder;
  @Field(() => PermissionOrder, { defaultValue: null, nullable: true })
  permissions?: PermissionOrder;
  @Field(() => DepartmentOrder, { defaultValue: null, nullable: true })
  departments?: DepartmentOrder;
}
