import { InputType, ObjectType } from "type-graphql";
import {
  BooleanFilterType,
  NullableBooleanFilterType,
} from "./types/boolean/BooleanFilterType";
import {
  DateFilterType,
  NullableDateFilterType,
} from "./types/date/DateFilterType";
import {
  EnumArrayFilterType,
  EnumFilterType,
  NullableEnumFilterType,
} from "./types/enum/EnumFilterType";
import { EqualFilterType } from "./types/EqualFilterType";
import { NullFilterType } from "./types/NullFilterType";
import {
  NullableNumberFilterType,
  NumberFilterType,
} from "./types/number/NumberFilterType";
import {
  NullableStringFilterType,
  StringFilterType,
} from "./types/string/StringFilterType";

export type FilterTypeEnum =
  | BooleanFilterType
  | NullableBooleanFilterType
  | DateFilterType
  | NullableDateFilterType
  | EnumFilterType
  | EnumArrayFilterType
  | NullableEnumFilterType
  | NullableNumberFilterType
  | NumberFilterType
  | NullFilterType
  | EqualFilterType
  | StringFilterType
  | NullableStringFilterType;

@InputType()
@ObjectType()
export class Filter {}
