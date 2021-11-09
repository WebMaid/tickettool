import { Field, InputType, ObjectType } from "type-graphql";
import { RoleFilter } from "./RoleFilter";
import { UserFilter } from "./UserFilter";
import { IdFilter } from "./types/id/IdFilter";
import { StringFilter } from "./types/string/StringFilter";
import { Filter } from ".";

@InputType()
@ObjectType()
export class PermissionFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  name?: StringFilter[];
  @Field(() => RoleFilter, { defaultValue: null, nullable: true })
  roles?: RoleFilter;
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  users?: UserFilter;
}
