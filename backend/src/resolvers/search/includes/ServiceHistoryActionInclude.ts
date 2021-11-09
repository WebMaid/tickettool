import { Field, InputType, ObjectType } from "type-graphql";
import { ServiceHistoryInclude } from "./ServiceHistoryInclude";

@InputType()
@ObjectType()
export class ServiceHistoryActionInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  type?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  value1?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  value2?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  value3?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  histories?: ServiceHistoryInclude;
}
