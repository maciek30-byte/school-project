interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: Address;
    phone?: string;
    website: string;
    company?: Company;
}

export interface Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    userId: number;
}

export interface Album {
    id: number;
    title: string;
    userId: number;
}

export interface Post {
    body: string;
    title: string;
    userId: number;
    id: number;
}

export interface Comment {
    postId: number;
    body: string;
    email: string;
    id: number;
    name: string;
}

export interface PostWithData extends Post {
   comments: Comment[];
   user: User;
}




