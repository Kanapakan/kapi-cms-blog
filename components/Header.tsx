import React from 'react'
import Link from 'next/link';

type Category = {
    name: string,
    slug: string
}

const Header = () => {

    const categories: Category[] = [
        { name: 'React', slug: 'react' },
        { name: 'Web Dev', slug: 'web-dev'}
    ]

  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-400 py-8'>
            <div className='md:float-left block'>
                <Link href='/'>
                    <span className='cursor-poiter font-bold text-4xl text-white'>
                        KapiCMS
                    </span>
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                { categories.map((category) => (
                    <Link key={ category.slug } href={ `/category/${category.slug}` }>
                        <span className='md:float-right mt-2 align-middle text-white ml-3 font-semibold cursor-pointer'>
                            { category.name }
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  );
}

export default Header;