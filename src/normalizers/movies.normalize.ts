import { Movie, MovieExtended } from "../api/types/Movie";
import { Genre } from "../api/types/Genre";
import { getGenresNames } from "../utils/getGenresNames";

export const normalizeMovies = (moviesList: Movie[], genresEntities: Record<number, Genre> | null) => {
    if(moviesList.length === 0) {
        return [];
    }

    const updatedMoviesList = moviesList.map((movie: Movie) => {
        const item = {
            ...movie,
            release_date: movie.release_date !== "" ? movie.release_date : 'Date not available',
            overview: movie.overview !== "" ? movie.overview : 'Overview not available',
            genres: getGenresNames(genresEntities, movie.genre_ids)
        } as MovieExtended;

        return item;
    })

    return updatedMoviesList;
}