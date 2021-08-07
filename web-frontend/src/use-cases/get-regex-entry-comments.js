import fetchGraphql from "../utilities/fetch-graphql"

const getRegexEntryComments = async (entryId) => {
  let result = await fetchGraphql(
    `query getRegexEntryComments($id: String) {
      regexEntries(id: $id){
        comments {
          commenter,
          comment,
          created
        }
      }
    }`, {
      id: entryId
    }
  );

  return result.data.regexEntries[0].comments;
};

export default getRegexEntryComments;