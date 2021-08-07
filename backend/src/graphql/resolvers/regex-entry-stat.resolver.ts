import { Args, Query, Resolver } from "@nestjs/graphql";
import { RegexEntryUseCases } from "src/use-cases/regex-entry-use-cases";
import { RegexEntryStatModel } from "../model-types/regex-entry-stat.model";

@Resolver(() => RegexEntryStatModel)
export class RegexEntryStatResolver {
  constructor(private regexEntryUseCases: RegexEntryUseCases) { }

  @Query(() => RegexEntryStatModel, {
    name: 'regexEntryStats'
  })
  async getStats(@Args('keywords', { type: () => String }) keywords: string): Promise<RegexEntryStatModel> {
    return ({
      totalItems: await this.regexEntryUseCases.getTotalItems(keywords)
    });
  }
}