import fetchGraphql from "../utilities/fetch-graphql"

const getRegexEntries = async (start, count, keywords) => {
  let result = await fetchGraphql(
    `query getRegexEntries($start: Int, $count: Int, $keywords: String) {
      regexEntries(start: $start, count: $count, keywords: $keywords){
        id,
        title,
        regex,
        description,
        created,
        lastEdited,
        commentCount
      }
    }`, {
      start: start,
      count: count,
      keywords: keywords
    }
  );

  return result.data.regexEntries;
};

export default getRegexEntries;