import { Field, InputType, ObjectType } from "type-graphql";
import { ApiKeyInclude } from "./ApiKeyInclude";
import { ApiScopeCategoryInclude } from "./ApiScopeCategoryInclude";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class ApiScopeInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  name?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  description?: boolean;
  @Field(() => ApiKeyInclude, { defaultValue: false, nullable: true })
  keys?: ApiKeyInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  category_id?: boolean;
  @Field(() => ApiScopeCategoryInclude, { defaultValue: null, nullable: true })
  category?: ApiScopeCategoryInclude;
}
