import { type } from "os";
import { Author } from "./author";
import { Category } from "./category";

export class Post {
    constructor(
                public author: Author,
                public title: string,
                public excerpt: string,
                public createdAt: Date,
                public slug: string,
                public categories: Category[],
                public featuredImage?: Image,
                public content?: string,
                
        ) {
    }
}

export class Node {
    constructor(
            public node: Post
        ) {
    }
}

export class RecentPost {
    constructor(
            public title: string,
            public createdAt: Date,
            public slug: string,
            public featuredImage?: Image,
        ) {
    }
}

type Image = {
    url: string
}