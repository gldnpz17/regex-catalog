import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Comment } from "src/entities/comment";
import { RegexEntry } from "src/entities/regex-entry";
import { CreateCommentArgs } from "src/graphql/input-types/create-comment.args";
import { CreateEntryArgs } from "src/graphql/input-types/create-entry.args";
import { EditEntryArgs } from "src/graphql/input-types/edit-entry.args";
import { DatetimeService, DATETIME_SERVICE } from "src/services/datetime-service";
import { Connection, MongoRepository, Repository } from "typeorm";
import { ObjectID } from 'mongodb';

@Injectable()
export class RegexEntryUseCases {
  private regexEntryRepository: MongoRepository<RegexEntry>;

  constructor(
    @InjectConnection() connection: Connection,
    @Inject(DATETIME_SERVICE) private datetimeService: DatetimeService
  ) {
    this.regexEntryRepository = connection.getMongoRepository(RegexEntry);
  }

  async getTotalItems(keywords: string): Promise<number> {
    let searchRegex = this.constructSearchRegex(keywords);

    return await this.regexEntryRepository.count({
      $or: [
        { 
          title: { $regex: searchRegex, $options: 'i' } 
        },
        {
          description: { $regex: searchRegex, $options: 'i' }
        }
      ]
    });
  }

  async readRegexEntry(entryId: string): Promise<RegexEntry> {
    return await this.regexEntryRepository.findOne({ _id: new ObjectID(entryId) });
  }

  async readAllEntries(start: number, count: number, keywords: string): Promise<RegexEntry[]> {
    let searchRegex = this.constructSearchRegex(keywords);

    let results = await this.regexEntryRepository.find({ 
      where: {
        $or: [
          { 
            title: { $regex: searchRegex, $options: 'i' } 
          },
          {
            description: { $regex: searchRegex, $options: 'i' }
          }
        ]
      },
      skip: start,
      take: count
    });

    return results;
  }

  async createEntry(input: CreateEntryArgs): Promise<RegexEntry> {
    let newEntry = new RegexEntry();
    newEntry.title = input.title;
    newEntry.regex = input.regex;
    newEntry.description = input.description;
    
    newEntry.created = newEntry.lastEdited = this.datetimeService.getCurrentDatetime();

    return await this.regexEntryRepository.save(newEntry);
  }

  async editEntry(input: EditEntryArgs): Promise<RegexEntry> {
    let entry = await this.regexEntryRepository.findOne({ _id: new ObjectID(input.entryId) });

    if (entry) {
      entry.title = input.title;
      entry.regex = input.regex;
      entry.description = input.description;
      
      entry.lastEdited = this.datetimeService.getCurrentDatetime();

      return await this.regexEntryRepository.save(entry);
    } else {
      return null;
    }
  }

  async comment(input: CreateCommentArgs): Promise<Comment> {
    let entry = await this.regexEntryRepository.findOne({ _id: new ObjectID(input.entryId) });

    if (entry) {
      let newComment = new Comment();
      newComment.commenter = input.commentAs;
      newComment.comment = input.comment;
      
      newComment.created = this.datetimeService.getCurrentDatetime();

      entry.comments.push(newComment);

      await this.regexEntryRepository.save(entry);

      return newComment;
    }

    return null;
  }

  private constructSearchRegex(keywords: string): string {
    return keywords.split(' ').map(keyword => `(${keyword})`).join('|');
  }
}