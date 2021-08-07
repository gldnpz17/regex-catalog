import { BeforeInsert, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { Comment } from "./comment";

@Entity()
export class RegexEntry {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  title: string;

  @Column()
  regex: string;

  @Column()
  description: string;

  @Column()
  created: Date;

  @Column()
  lastEdited: Date;

  @Column(() => Comment)
  comments: Comment[];

  @BeforeInsert()
  beforeInserActions() {
    this.comments = [];
  }
}