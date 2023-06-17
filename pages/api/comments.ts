// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';


type Data = {
  name: string,
  email: string,
  slug: string,
  comment: string,
}

const graphqlAPI:string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;
  try {
    const result: Data = await graphQLClient.request(query, req.body);

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }

}
