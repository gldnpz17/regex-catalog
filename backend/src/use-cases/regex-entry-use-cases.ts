import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectConnection, InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Document, Model } from "mongoose";
import { Comment } from "src/entities/comment";
import { MongoEntityBase } from "src/entities/mongo-entity-base";
import { RegexEntry, RegexEntryDocument } from "src/entities/regex-entry";
import { CreateCommentArgs } from "src/graphql/input-types/create-comment.args";
import { CreateEntryArgs } from "src/graphql/input-types/create-entry.args";
import { EditEntryArgs } from "src/graphql/input-types/edit-entry.args";
import { DatetimeService, DATETIME_SERVICE } from "src/services/datetime-service";

@Injectable()
export class RegexEntryUseCases {
  constructor(
    @InjectModel(RegexEntry.name) private regexEntryModel: Model<RegexEntryDocument>,
    @Inject(DATETIME_SERVICE) private datetimeService: DatetimeService
  ) {

  }

  async getTotalItems(keywords: string): Promise<number> {
    let searchRegex = this.constructSearchRegex(keywords);

    return this.regexEntryModel.find({
      $or: [
        {
          title: { $regex: searchRegex, $options: 'i' }
        },
        {
          description: { $regex: searchRegex, $options: 'i' }
        }
      ]
    }).countDocuments().exec();
  }

  async readRegexEntry(entryId: string): Promise<RegexEntry> {
    return this.documentToEntity(await this.regexEntryModel.findById(entryId).exec());
  }

  async readAllEntries(start: number, count: number, keywords: string): Promise<RegexEntry[]> {
    let searchRegex = this.constructSearchRegex(keywords);

    let results = await this.regexEntryModel.find({
      $or: [
        { 
          title: { $regex: searchRegex, $options: 'i' } 
        },
        {
          description: { $regex: searchRegex, $options: 'i' }
        }
      ]
    }).skip(start).limit(count).exec();

    return results.map(result => this.documentToEntity(result));
  }

  async createEntry(input: CreateEntryArgs): Promise<RegexEntry> {
    let newEntry = new this.regexEntryModel();
    newEntry.title = input.title;
    newEntry.regex = input.regex;
    newEntry.description = input.description;
    
    newEntry.created = newEntry.lastEdited = this.datetimeService.getCurrentDatetime();

    return this.documentToEntity(await newEntry.save());
  }

  async editEntry(input: EditEntryArgs): Promise<RegexEntry> {
    let entry = await this.regexEntryModel.findById(input.entryId).exec();

    if (entry) {
      entry.title = input.title;
      entry.regex = input.regex;
      entry.description = input.description;
      
      entry.lastEdited = this.datetimeService.getCurrentDatetime();

      return this.documentToEntity(await entry.save());
    } else {
      return null;
    }
  }

  async comment(input: CreateCommentArgs): Promise<Comment> {
    let entry = await this.regexEntryModel.findById(input.entryId).exec();

    if (entry) {
      let newComment = new Comment();
      newComment.commenter = input.commentAs;
      newComment.comment = input.comment;
      
      newComment.created = this.datetimeService.getCurrentDatetime();

      entry.comments.push(newComment);

      await entry.save();

      return newComment;
    }

    return null;
  }

  private constructSearchRegex(keywords: string): string {
    return keywords.split(' ').map(keyword => `(${keyword})`).join('|');
  }

  private documentToEntity(document: RegexEntryDocument): RegexEntry {
    let { _id, __v, ...object } = document.toObject();

    return ({
      ...object,
      id: _id
    });
  }
}