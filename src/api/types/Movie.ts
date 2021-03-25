export interface Movie {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: string;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

export interface MovieExtended extends Movie {
    genres: string;
}

export interface Trailer {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string
}

export interface Review {
    author: string;
    author_details: Author;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}

 interface Author {
    avatar_path: string;
    name: string;
    rating: number;
    username: string;
}