import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

export class Comment {
  @Column()
  commenter: string;

  @Column()
  comment: string;

  @Column()
  created: Date;
}