import React, { useState, useEffect } from 'react'
import { Category } from '../models/category';
import { getCategories } from '../services';
import Link from 'next/link';

// type categoriesProps = {
//     categories: string[],
//     slug: string
// }

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

    return ( 
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='tect-xl mb-8 font-semibold'>
                Categories
            </h3>
            {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className='cursor-pointer block pb-3 mb-3'>
                        {category.name}
                    </span>
                </Link>
            ))}
        </div>
     );
}
 
export default Categories;