import fetchGraphql from '../utilities/fetch-graphql';

const getRegexEntryCount = async (keywords) => {
  let result = await fetchGraphql(
    `query getRegexEntryCount($keywords: String!) {
      regexEntryStats(keywords: $keywords) {
        totalItems
      }
    }`, {
      keywords: keywords
    }
  );

  return result.data.regexEntryStats.totalItems;
};

export default getRegexEntryCount;