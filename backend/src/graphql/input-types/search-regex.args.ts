import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class SearchRegexArgs {
  @Field({ nullable: true })
  id?: string;

  @Field(() => Int, { nullable: true })
  start?: number;

  @Field(() => Int, { nullable: true })
  count?: number;

  @Field({ nullable: true })
  keywords?: string;
}