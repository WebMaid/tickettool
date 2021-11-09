import { Field, InputType } from "type-graphql";
import { FilterType } from "../FilterType";
import {
  EnumArrayFilterType,
  EnumFilterType,
  NullableEnumFilterType,
} from "./EnumFilterType";

@InputType()
export class EnumFilter extends FilterType {
  @Field()
  value: string;
  @Field(() => String)
  comparasion: EnumFilterType;
}

@InputType()
export class NullableEnumFilter extends FilterType {
  @Field()
  value: string;
  @Field(() => String)
  comparasion: NullableEnumFilterType;
}

@InputType()
export class EnumArrayFilter extends FilterType {
  @Field(() => [String])
  values: string[];
  @Field(() => String)
  comparasion: EnumArrayFilterType;
}
