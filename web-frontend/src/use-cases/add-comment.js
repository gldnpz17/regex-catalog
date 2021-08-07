import fetchGraphql from "../utilities/fetch-graphql"

const addComment = async (entryId, commentAs, comment) => {
  let result = await fetchGraphql(
    `mutation addComment($entryId: String!, $commentAs: String!, $comment: String!) {
      createComment(entryId: $entryId, commentAs: $commentAs, comment: $comment) {
        commenter
      }
    }`, {
      entryId: entryId,
      commentAs: commentAs,
      comment: comment
    }
  );

  return result.data.createComment.commenter;
};

export default addComment;