import React from 'react'
import moment from 'moment';
import Link from 'next/link';
import { Node, Post } from '@/models/Post';

type PostProps = {
    post: Post
}
  
const PostCard = ({ post }: PostProps ) => {
    // const { title, excerpt } = props;
    // console.log(post);
    

    return ( 
        <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
            <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
                <img className='object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg' src={post.featuredImage?.url} alt={post.title}/>
            </div>
            <h1 className='transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold'>
                <Link href={`/post/${post.slug}`}>
                    {post.title}
                </Link>
            </h1>
            <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
                <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center'>
                    <img 
                        src={post.author.photo?.url} 
                        alt={post.author.name}
                        height='30px'
                        width='30px'
                        className='align-middle rounded-full'
                    />
                    <p className='inline align-middle text-grey-700 ml-2 text-lg'>{ post.author.name }</p>
                    </div>
                    <div className='font-medium text-grey-700'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>

                </div>

            </div>
            { post.author.name }
            {/* { post.excerpt } */}
        </div>
     );
}
 
export default PostCard;