import { Category } from "@/models/category";
import { Node, Post, RecentPost } from "../models/post";
import { request, gql } from "graphql-request";
const graphqlAPI: any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
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
  `;
    const results: GetResponsePosts = await request(graphqlAPI, query);
    return results.postsConnection.edges;
};

export const getPostDetails = async (slug: string) => {
    const query = gql`
      query GetPostDetails($slug : String!) {
        post(where: {slug: $slug}) {
          title
          excerpt
          featuredImage {
            url
          }
          author{
            name
            bio
            photo {
              url
            }
          }
          createdAt
          slug
          content {
            raw
          }
          categories {
            name
            slug
          }
        }
      }
    `;
    const results: GetResponsePostsDetail = await request(graphqlAPI, query, {
        slug,
    });
    return results.post;
};

export const getRecentPosts = async () => {
    const query = gql`
      query GetPostDetails {
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
    const results: GetResponseRecentPosts = await request(graphqlAPI, query);
    return results.posts;
};

export const getSimilarPosts = async (categories: string[], slug: string) => {
    const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
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
    const results: GetResponseRecentPosts = await request(graphqlAPI, query, { categories, slug });
    console.log("GetResponseRecentPosts", categories, slug);
    
    return results.posts;
};

export const getCategories = async () => {
    const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
    const results: GetResponseCategories = await request(graphqlAPI, query);
    return results.categories;
};

export const submitComment = async (obj: CommentObj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
}


interface GetResponsePosts {
    postsConnection: {
        edges: {
            [x: string]: any;
            node: Node[];
        };
    };
}

interface GetResponsePostsDetail {
    post: Post;
}

interface GetResponseRecentPosts {
    posts: RecentPost[];
}

interface GetResponseCategories {
    categories: Category[];
}

type CommentObj = {
  name: string,
  email: string,
  slug: string,
  comment: string,
}