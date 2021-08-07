import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class RegexEntryStatModel {
  @Field(() => Int)
  totalItems: number
}