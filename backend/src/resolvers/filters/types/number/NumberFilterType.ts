import { EqualFilterType } from "../EqualFilterType";
import { NullFilterType } from "../NullFilterType";

export type NumberFilterType = LocalNumberFilterType | EqualFilterType;
export type NullableNumberFilterType = NullFilterType | NumberFilterType;

enum LocalNumberFilterType {
  SMALLER = "smaller",
  SMALLER_OR_EQUALS = "smaller-or-equals",
  BIGGER = "bigger",
  BIGGER_OR_EQUALS = "bigger-or-equals",
  BETWEEN = "between",
}
