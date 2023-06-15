export class Author {
    constructor(
                public id: string,
                public name: string,
                public bio?: string,
                public photo?: Image,
        ) {
    }
}

type Image = {
    url: string
}