import { Author } from '../models/author'
import React from 'react'
import Image from 'next/image'

type AuthorPost = {
  author: Author;
}

const AuthorPost = ({ author } : AuthorPost) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-14">
        <Image 
          alt={author.name}
          unoptimized
          width={0}
          height={0}
          style={{ width: '100px', height: '100px' }}
          className='aligh-middle rounded-full'
          src={author.photo?.url!}
        />
      </div>
      <h3 className='text-white my-4 text-xl font-bold'>{author.name}</h3>
      <p className='text-white text-ls'>{author.bio}</p>
    </div>
  )
}

export default AuthorPost