import { Field, InputType, ObjectType } from "type-graphql";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class TicketCommentInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  content?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  creator_id?: boolean;
  @Field(() => UserInclude, { defaultValue: null, nullable: true })
  creator?: UserInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  created_at?: boolean;
}
