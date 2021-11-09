import { Field, InputType, ObjectType } from "type-graphql";
import { DepartmentInclude } from "./DepartmentInclude";
import { PermissionInclude } from "./PermissionInclude";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class RoleInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  name?: boolean;
  @Field(() => UserInclude, { defaultValue: null, nullable: true })
  user?: UserInclude;
  @Field(() => PermissionInclude, { defaultValue: null, nullable: true })
  permissions?: PermissionInclude;
  @Field(() => DepartmentInclude, { defaultValue: null, nullable: true })
  departments?: DepartmentInclude;
}
