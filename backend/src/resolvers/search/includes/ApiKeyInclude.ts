import { Field, InputType, ObjectType } from "type-graphql";
import { ApiScopeInclude } from "./ApiScopeInclude";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class ApiKeyInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  note?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  key?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  last_use?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  expires?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  created_at?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  updated_at?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  owner_id?: boolean;
  @Field(() => UserInclude, { defaultValue: false, nullable: true })
  owner?: UserInclude;
  @Field(() => ApiScopeInclude, { defaultValue: false, nullable: true })
  scopes?: ApiScopeInclude;
}
