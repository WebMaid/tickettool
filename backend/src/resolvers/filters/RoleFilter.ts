import { Field, InputType, ObjectType } from "type-graphql";
import { Filter } from ".";
import { DepartmentFilter } from "./DepartmentFilter";
import { PermissionFilter } from "./PermissionFilter";
import { IdFilter } from "./types/id/IdFilter";
import { StringFilter } from "./types/string/StringFilter";
import { UserFilter } from "./UserFilter";

@InputType()
@ObjectType()
export class RoleFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  name?: StringFilter[];
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  users?: UserFilter;
  @Field(() => PermissionFilter, { defaultValue: null, nullable: true })
  permissions?: PermissionFilter;
  @Field(() => DepartmentFilter, { defaultValue: null, nullable: true })
  departments?: DepartmentFilter;
}
