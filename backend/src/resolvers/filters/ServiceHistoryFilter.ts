import { Field, InputType, ObjectType } from "type-graphql";
import { Filter } from ".";
import { ServiceFilter } from "./ServiceFilter";
import { ServiceHistoryActionFilter } from "./ServiceHistoryActionFilter";
import { DateFilter } from "./types/date/DateFilter";
import { IdFilter } from "./types/id/IdFilter";
import { UserFilter } from "./UserFilter";

@InputType()
@ObjectType()
export class ServiceHistoryFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  responsible_user?: UserFilter;
  @Field(() => ServiceHistoryActionFilter, {
    defaultValue: null,
    nullable: true,
  })
  action?: ServiceHistoryActionFilter;
  @Field(() => ServiceFilter, { defaultValue: null, nullable: true })
  service?: ServiceFilter;
  @Field(() => [DateFilter], { defaultValue: [], nullable: true })
  created_at?: DateFilter[];
}
