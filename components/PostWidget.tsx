import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services/index';
import { RecentPost } from '../models/post';
import { Category } from '../models/category';

type relatedPostProps = {
    categories: string[],
    slug: string
}


const PostWIdget = ({ categories, slug }: relatedPostProps) => {
    const [relatedPosts, setRelatedPosts] = useState<RecentPost[]>([]);
    // console.log();
    

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug)
            .then((result) => setRelatedPosts(result));
            console.log('have slug', slug);
            
        } else {
            getRecentPosts().then((result) => {
                setRelatedPosts(result);
              });
        }
    }, [slug])

    return ( 
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='tect-xl mb-8 font-semibold'>
                { slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map((post, index) => (
                <div key={post.title} className='flex items-center w-full mb-4'>
                   <div className='w-16 flex-none'>
                    <img 
                        src={post.featuredImage?.url}
                        alt={post.title}
                        height='60px'
                        width='60px'
                        className='align-middle rounded-full'
                    />
                </div>
                <div className='flex-grow ml-4'>
                    <p className='text-grey-500 font-xs'>
                        {moment(post.createdAt).format('MMM DD, YYYY')}
                    </p>
                    <Link href={`/post/${post.slug}`} key={index} className='text-md'>
                        { post.title }
                    </Link>
                </div>
                </div>
                
            ))}
        </div>
     );
}
 
export default PostWIdget;