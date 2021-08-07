import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CreateCommentArgs {
  @Field()
  entryId: string;

  @Field()
  commentAs: string;

  @Field()
  comment: string;
}