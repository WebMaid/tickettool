import { Field, InputType, ObjectType } from "type-graphql";
import { ApiKeyOrder } from "./ApiKeyOrder";
import { DepartmentOrder } from "./DepartmentOrder";
import { Order } from "./Order";
import { PermissionOrder } from "./PermissionOrder";
import { RoleOrder } from "./RoleOrder";
import { ServiceOrder } from "./ServiceOrder";
import { TicketOrder } from "./TicketOrder";
import { UserSettingOrder } from "./UserSettingOrder";

@InputType()
@ObjectType()
export class UserOrder {
  @Field(() => Order, { defaultValue: null, nullable: true })
  id?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  username?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  displayName?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  mail?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  phoneNumber?: Order;
  @Field(() => UserSettingOrder, { defaultValue: null, nullable: true })
  settings?: UserSettingOrder;
  @Field(() => RoleOrder, { defaultValue: null, nullable: true })
  roles?: RoleOrder;
  @Field(() => PermissionOrder, { defaultValue: null, nullable: true })
  permissions?: PermissionOrder;
  /*@Field(() => TicketOrder, { defaultValue: null, nullable: true })
  ticket_responsibilities?: TicketOrder;
  @Field(() => TicketTemplateOrder, { defaultValue: null, nullable: true })
  template_responsibilities?: TicketTemplateOrder;
  @Field(() => TicketHistoryOrder, { defaultValue: null, nullable: true })
  history_responsibilities?: TicketHistoryOrder;
  @Field(() => TicketCommentOrder, { defaultValue: null, nullable: true })
  ticket_comment_responsibilities?: TicketCommentOrder;*/
  @Field(() => TicketOrder, { defaultValue: null, nullable: true })
  issued?: TicketOrder;
  @Field(() => DepartmentOrder, { defaultValue: null, nullable: true })
  department?: DepartmentOrder;
  @Field(() => ApiKeyOrder, { defaultValue: null, nullable: true })
  api_keys?: ApiKeyOrder;
}
