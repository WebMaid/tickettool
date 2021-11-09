import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
@InputType()
export class NumberBetween {
  @Field(() => Number, { defaultValue: 0, nullable: true })
  min: number;
  @Field(() => Number, { defaultValue: Number.MAX_VALUE, nullable: true })
  max: number;
}
