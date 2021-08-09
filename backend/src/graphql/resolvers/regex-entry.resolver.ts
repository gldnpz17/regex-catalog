import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { model } from "mongoose";
import { RegexEntry } from "src/entities/regex-entry";
import { RegexEntryUseCases } from "src/use-cases/regex-entry-use-cases";
import { CreateCommentArgs } from "../input-types/create-comment.args";
import { CreateEntryArgs } from "../input-types/create-entry.args";
import { EditEntryArgs } from "../input-types/edit-entry.args";
import { SearchRegexArgs } from "../input-types/search-regex.args";
import { CommentModel } from "../model-types/comment.model";
import { RegexEntryModel } from "../model-types/regex-entry.model";

@Resolver(() => RegexEntryModel)
export class RegexEntryResolver {
  constructor(private regexEntryUseCases: RegexEntryUseCases) { }

  @Query(() => [RegexEntryModel], {
    name: 'regexEntries',
    nullable: true
  })
  async getRegexEntry(@Args() args: SearchRegexArgs): Promise<RegexEntryModel[]> {
    let results: RegexEntry[] = [];
    if (args.id !== undefined) {
      results[0] = await this.regexEntryUseCases.readRegexEntry(args.id);
    } else if (args.start !== undefined && args.count !== undefined) {
      args.keywords = args.keywords ?? '';

      results = await this.regexEntryUseCases.readAllEntries(args.start, args.count, args.keywords);
    } else {
      throw new Error('Invalid arguments.');
    }

    let output = results.map(result => {
      let model: RegexEntryModel = {
        ...result,
        commentCount: result.comments.length
      }

      return model;
    });

    console.log(output[0])

    return output;
  }

  @Mutation(() => RegexEntryModel)
  async createEntry(@Args() args: CreateEntryArgs): Promise<RegexEntryModel> {
    let result = await this.regexEntryUseCases.createEntry(args);

    return ({
      ...result,
      commentCount: result.comments.length
    });
  }

  @Mutation(() => RegexEntryModel)
  async editEntry(@Args() args: EditEntryArgs): Promise<RegexEntryModel> {
    let result = await this.regexEntryUseCases.editEntry(args);

    return ({
      ...result,
      commentCount: result.comments.length
    });
  }

  @Mutation(() => CommentModel)
  async createComment(@Args() args: CreateCommentArgs): Promise<CommentModel> {
    return await this.regexEntryUseCases.comment(args);
  }
}