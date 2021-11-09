import { Field, InputType, ObjectType } from "type-graphql";
import { Filter } from ".";
import { DateFilter } from "./types/date/DateFilter";
import { IdFilter } from "./types/id/IdFilter";
import { StringFilter } from "./types/string/StringFilter";
import { UserFilter } from "./UserFilter";

@InputType()
@ObjectType()
export class TicketCommentFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  content?: StringFilter[];
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  creator?: UserFilter;
  @Field(() => [DateFilter], { defaultValue: [], nullable: true })
  created_at?: DateFilter[];
}
