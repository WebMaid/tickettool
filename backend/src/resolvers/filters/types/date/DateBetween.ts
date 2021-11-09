import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
@ObjectType()
export class DateBeween {
  @Field({ defaultValue: "1970-01-01 00:00", nullable: true })
  min: string;
  @Field({ defaultValue: "2100-01-01 00:00", nullable: true })
  max: string;
}
