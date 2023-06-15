import { Category } from '@/models/category';
import { getCategories } from '@/services';
import Link from 'next/link';
import React, { useState, useEffect} from 'react'

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
        <div>
            Categories
        </div>
     );
}
 
export default Categories;