import fetchGraphql from "../utilities/fetch-graphql"

const editRegexEntry = async (entryId, title, regex, description) => {
  let result = await fetchGraphql(
    `mutation editRegexEntry($entryId: String!, $title: String!, $regex: String!, $description: String!) {
      editEntry(entryId: $entryId, title: $title, regex: $regex, description: $description) {
        id
      }
    }`, {
      entryId: entryId,
      title: title,
      regex: regex,
      description: description
    });

  return result.data.editEntry;
};

export default editRegexEntry;