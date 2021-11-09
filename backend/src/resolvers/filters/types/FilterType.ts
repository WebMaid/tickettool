import { Field, InputType, ObjectType } from "type-graphql";
import { FilterTypeEnum } from "..";

@ObjectType()
@InputType()
export class FilterType {
  @Field()
  comparasion: FilterTypeEnum;
}
