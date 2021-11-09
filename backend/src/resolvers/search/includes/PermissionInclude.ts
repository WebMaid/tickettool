import { Field, InputType, ObjectType } from "type-graphql";
import { RoleInclude } from "./RoleInclude";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class PermissionInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  name?: boolean;
  @Field(() => RoleInclude, { defaultValue: false, nullable: true })
  roles?: RoleInclude;
  @Field(() => UserInclude, { defaultValue: false, nullable: true })
  users?: UserInclude;
}
