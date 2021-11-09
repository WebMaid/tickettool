import { EqualFilterType } from "../EqualFilterType";
import { NullFilterType } from "../NullFilterType";

export type NullableStringFilterType = StringFilterType | NullFilterType;
export type StringFilterType = StringFilterTypeEnum | EqualFilterType;

export enum StringFilterTypeEnum {
  LIKE = "like",
  NOT_LIKE = "not-like",
  STARTS_WITH = "starts-with",
  CONTAINS = "contains",
}
