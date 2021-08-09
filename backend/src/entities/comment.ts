import { Prop } from "@nestjs/mongoose";

export class Comment {
  @Prop()
  commenter: string;

  @Prop()
  comment: string;

  @Prop()
  created: Date;
}