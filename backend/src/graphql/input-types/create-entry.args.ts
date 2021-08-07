import { ArgsType, Field, InputType } from "@nestjs/graphql";

@ArgsType()
export class CreateEntryArgs {
  @Field()
  title: string;

  @Field()
  regex: string;

  @Field()
  description: string;
}