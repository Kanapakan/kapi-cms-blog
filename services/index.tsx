import { Node } from "../models/post";
import { request, gql } from "graphql-request";
const graphqlAPI: any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPost = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
            edges {
                node {
                    author {
                        bio
                        name
                        id
                        photo {
                            url
                        }
                    }
                    createdAt
                    slug
                    title
                    excerpt
                    featuredImage {
                        url
                    }
                    categories {
                        name
                        slug
                    }
                }
            }
            }
        }
    `
    const results: GetResponsePosts = await request(graphqlAPI, query)
    return results.postsConnection.edges;
}

//Unwraps the Json from Spring Data REST postsConnection  entry
interface GetResponsePosts {
    postsConnection: {
        edges: {
            node: Node[];
        },
    }    
}