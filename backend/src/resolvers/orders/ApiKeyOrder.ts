import { Field, InputType, ObjectType } from "type-graphql";
import { Order } from "./Order";
import { UserOrder } from "./UserOrder";

@InputType()
@ObjectType()
export class ApiKeyOrder {
  @Field(() => Order, { defaultValue: null, nullable: true })
  id?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  note?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  last_use?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  expires?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  created_at?: Order;
  @Field(() => Order, { defaultValue: null, nullable: true })
  updated_at?: Order;
  @Field(() => UserOrder, { defaultValue: null, nullable: true })
  owner?: UserOrder;
  /*@Field(() => ApiScopeOrder, { defaultValue: null, nullable: true })
  scopes?: ApiScopeOrder;*/
}
