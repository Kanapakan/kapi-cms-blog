// @ts-nocheck
import React from 'react'
import { getPosts, getPostDetails } from '../../services'
import { Author, Categories, Comments, CommentsForm, PostDetail, PostWidget } from '../../components'; 
import { ParsedUrlQuery } from 'querystring';
import { Post } from '@/models/post';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useRouter } from 'next/router';
// import PostWidget from '@/components/PostWidget';

export interface QParams extends ParsedUrlQuery {
  slug?: string
  // lang?: Locale
}

type PostDetail = {
  post: Post;
}

const PostDetails = ({ post }: PostDetail) => {
  const router = useRouter();
  // const router = useRouter()
  // console.log([router.query.slug]);
  console.log(post);
  
  
  return (
    <div className='container mx-auto px-10 mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='col-span-1 lg:col-span-8'>
          <PostDetail post={post} />
          <Author author={post.author} />
          <Comments slug={post.slug} />
          <CommentsForm slug={post.slug} />
        </div>
        <div className='col-span-1 lg:col-span-4'>
          <div className='relative lg:sticky top-8'>
            <PostWidget categories={post.categories.map((category) => category.slug)} slug={post.slug} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostDetails;


export async function getStaticProps({ params }: QParams[]) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export const  getStaticPaths: GetStaticPaths = async () => {
  
  const posts = await getPosts();
  
  return {
    paths: posts.map(({ node: { slug }}) => ({ params: { slug } })),
    fallback: true,
  };
}