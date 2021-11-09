import { Field, InputType, Int, ObjectType } from "type-graphql";
import { OrderDirection } from "./OrderDirection";

@InputType()
@ObjectType()
export class Order {
  @Field(() => Int)
  position: number;
  @Field(() => String)
  direction: OrderDirection;
}
