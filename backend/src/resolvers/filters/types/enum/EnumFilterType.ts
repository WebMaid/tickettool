import { EqualFilterType } from "../EqualFilterType";
import { NullFilterType } from "../NullFilterType";

export type EnumFilterType = EqualFilterType;
export type NullableEnumFilterType = NullFilterType | EnumFilterType;
export type EnumArrayFilterType = LocalEnumArrayFilterType;

enum LocalEnumArrayFilterType {
  CONTAINS = "array-contains",
}
