import { Field, InputType } from "type-graphql";
import { EqualFilterType } from "../EqualFilterType";
import { FilterType } from "../FilterType";

@InputType()
export class IdFilter extends FilterType {
  @Field()
  value: string;
  @Field()
  comparasion: EqualFilterType;
}
