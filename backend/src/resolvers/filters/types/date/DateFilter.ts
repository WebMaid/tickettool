import { Field, InputType } from "type-graphql";
import { DateFilterType, NullableDateFilterType } from "./DateFilterType";
import { DateBeween } from "./DateBetween";
import { FilterType } from "../FilterType";

@InputType()
export class DateFilter extends FilterType {
  @Field()
  value?: string;
  @Field(() => DateBeween)
  between?: DateBeween;
  @Field(() => String)
  comparasion: DateFilterType;
}

@InputType()
export class NullableDateFilter extends FilterType {
  @Field()
  value?: string;
  @Field(() => DateBeween)
  between?: DateBeween;
  @Field(() => String)
  comparasion: NullableDateFilterType;
}
