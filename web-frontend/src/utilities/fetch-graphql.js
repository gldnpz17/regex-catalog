const fetchGraphql = async (query, variables) => {
  let response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables
    })
  });

  return await response.json();
};

export default fetchGraphql;