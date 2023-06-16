import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';
import { Node } from '../models/post';

const inter = Inter({ subsets: ['latin'] })

type PostProps = {
    posts: Node[];
}

function Home( { posts }: PostProps ) {

  return (
    <div className='container mx-auto px-10 mb-8'>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts?.map((post) => <PostCard post={post.node} key={post.node.title} />)}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          {/* {posts.map((post) => <PostWidget categories={post.node.categories} key={post.node.title} slug={post.node.categories} />)} */}
          <PostWidget categories={[]} slug={''} />
          <Categories />
        </div>
        
      </div>
      <div className=''>

      </div>
    </div>
  )
}
export default Home;

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}

