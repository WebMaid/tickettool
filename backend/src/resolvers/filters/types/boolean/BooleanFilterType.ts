import { EqualFilterType } from "../EqualFilterType";
import { NullFilterType } from "../NullFilterType";

export type BooleanFilterType = EqualFilterType;
export type NullableBooleanFilterType = NullFilterType | BooleanFilterType;
