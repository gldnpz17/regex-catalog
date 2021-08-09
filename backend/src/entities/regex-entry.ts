import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Comment } from "./comment";
import { MongoEntityBase } from "./mongo-entity-base";

export type RegexEntryDocument = RegexEntry & Document;

@Schema()
export class RegexEntry extends MongoEntityBase {
  @Prop()
  title: string;

  @Prop()
  regex: string;

  @Prop()
  description: string;

  @Prop()
  created: Date;

  @Prop()
  lastEdited: Date;

  @Prop([Comment])
  comments: Comment[] = [];
}

export const RegexEntrySchema = SchemaFactory.createForClass(RegexEntry);