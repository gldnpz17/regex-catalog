import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { CommentModel } from "./comment.model";

@ObjectType()
export class RegexEntryModel {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  regex: string;

  @Field()
  description: string;

  @Field()
  created: Date;

  @Field()
  lastEdited: Date;

  @Field(() => Int)
  commentCount: number;

  @Field(() => [CommentModel])
  comments: CommentModel[];
}