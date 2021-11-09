import { Field, InputType, ObjectType } from "type-graphql";
import { FilterType } from "../FilterType";
import { NumberBetween } from "./NumberBetween";
import { NullableNumberFilterType, NumberFilterType } from "./NumberFilterType";

@InputType()
export class NumberFilter extends FilterType {
  @Field(() => Number)
  value?: number;
  @Field(() => NumberBetween)
  between?: NumberBetween;
  @Field(() => String)
  comparasion: NumberFilterType;
}

@InputType()
export class NullableNumberFilter extends FilterType {
  @Field(() => Number)
  value?: number;
  @Field(() => NumberBetween)
  between?: NumberBetween;
  @Field(() => String)
  comparasion: NullableNumberFilterType;
}
