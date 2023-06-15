import { Category } from "@/models/category";
import { Node, RecentPost } from "../models/post";
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

export const getRecentPosts = async () => {
    const query = gql`
      query GetPostDetails() {
        posts(
          orderBy: createdAt_ASC
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const results: GetResponseRecentPosts = await request(graphqlAPI, query)
    return results.posts;
}

export const getSimilarPosts = async (categories: string[], slug: string) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories }}}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const results: GetResponseRecentPosts = await request(graphqlAPI, query)
    return results.posts;
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
                categories {
                name
                slug
            }
        }
        
    `
    const results: GetResponseCategories = await request(graphqlAPI, query)
    return results.categories;
}



interface GetResponsePosts {
    postsConnection: {
        edges: {
            node: Node[];
        },
    }    
}

interface GetResponseRecentPosts {
    posts: RecentPost[];    
}

interface GetResponseCategories {
    categories: Category[];    
}