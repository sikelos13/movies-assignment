import { MovieExtended } from "../api/types/Movie";

export const getUpdatedWithNewItemsList = (moviesList: MovieExtended[], normalizedMoviesList: MovieExtended[]) => {
        return [...moviesList, ...normalizedMoviesList] as MovieExtended[];
}