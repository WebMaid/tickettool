import { NullFilterType } from "../NullFilterType";

export type NullableDateFilterType = DateFilterType | NullFilterType;

export enum DateFilterType {
  AFTER = "date-after",
  BETWEEN = "date-between",
  BEFORE = "date-before",
}
