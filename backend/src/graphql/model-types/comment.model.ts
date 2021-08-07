import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommentModel {
  @Field()
  commenter: string;

  @Field()
  comment: string;

  @Field()
  created: Date;
}