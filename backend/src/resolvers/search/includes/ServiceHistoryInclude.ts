import { Field, InputType, ObjectType } from "type-graphql";
import { ServiceHistoryActionInclude } from "./ServiceHistoryActionInclude";
import { ServiceInclude } from "./ServiceInclude";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class ServiceHistoryInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  responsible_user_id?: boolean;
  @Field(() => UserInclude, { defaultValue: null, nullable: true })
  responsible_user?: UserInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  action_id?: boolean;
  @Field(() => ServiceHistoryActionInclude, {
    defaultValue: null,
    nullable: true,
  })
  action?: ServiceHistoryActionInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  service_id?: boolean;
  @Field(() => ServiceInclude, { defaultValue: null, nullable: true })
  service?: ServiceInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  created_at?: boolean;
}
