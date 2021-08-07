import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { CreateEntryArgs } from "./create-entry.args";

@ArgsType()
export class EditEntryArgs extends CreateEntryArgs {
  @Field()
  entryId: string;
}