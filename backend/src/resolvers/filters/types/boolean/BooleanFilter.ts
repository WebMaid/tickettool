import { Field, InputType } from "type-graphql";
import { FilterType } from "../FilterType";
import {
  NullableBooleanFilterType,
  BooleanFilterType,
} from "./BooleanFilterType";

@InputType()
export class BooleanFilter extends FilterType {
  @Field(() => Boolean)
  value: boolean;
  @Field(() => String)
  comparasion: BooleanFilterType;
}

@InputType()
export class NullableBooleanFilter extends FilterType {
  @Field(() => Boolean)
  value: boolean;
  @Field(() => String)
  comparasion: NullableBooleanFilterType;
}
