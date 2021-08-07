import fetchGraphql from "../utilities/fetch-graphql"

const addRegexEntry = async (title, regex, description) => {
  let result = await fetchGraphql(
    `mutation addRegexEntry($title: String!, $regex: String!, $description: String!) {
      createEntry(title: $title, regex: $regex, description: $description) {
        id,
        title
      }
    }`, {
      title: title,
      regex: regex,
      description: description
    }
  );

  return result.data.createEntry;
};

export default addRegexEntry;