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
                public featuredImage?: Image,
                public categories?: Category,
        ) {
    }
}

export class Node {
    constructor(
            public node: Post
        ) {
    }
}

type Image = {
    url: string
}