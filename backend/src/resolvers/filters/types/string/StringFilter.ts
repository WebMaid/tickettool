import { Field, InputType } from "type-graphql";
import { FilterType } from "../FilterType";
import { NullableStringFilterType, StringFilterType } from "./StringFilterType";

@InputType()
export class StringFilter extends FilterType {
  @Field()
  value: string;
  @Field(() => String)
  comparasion: StringFilterType;
}

@InputType()
export class NullableStringFilter extends FilterType {
  @Field()
  value: string;
  @Field(() => String)
  comparasion: NullableStringFilterType;
}
