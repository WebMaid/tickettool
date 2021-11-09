import { Field, InputType, ObjectType } from "type-graphql";
import { ApiScopeInclude } from "./ApiScopeInclude";

@InputType()
@ObjectType()
export class ApiScopeCategoryInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  name?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  description?: boolean;
  @Field(() => ApiScopeInclude, { defaultValue: null, nullable: true })
  scopes?: ApiScopeInclude;
}
