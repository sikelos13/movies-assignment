import { MovieExtended } from "../api/types/Movie";
import { SortType } from "../containers/MoviesView";

export const getSortedMoviesList = (moviesList: MovieExtended[], defaultMoviesList: MovieExtended[], sortBy: SortType) => {
    let sortedMoviesList = [] as MovieExtended[];

    if(sortBy === "") {
        return defaultMoviesList;
    }

    if(sortBy === "highest_vote_average") {
        sortedMoviesList = [...moviesList].sort((movieA: MovieExtended, movieB: MovieExtended) => movieB['vote_average'] - movieA['vote_average']);
    } else if (sortBy === "lowest_vote_average") {
        sortedMoviesList = [...moviesList].sort((movieA: MovieExtended, movieB: MovieExtended) => movieA['vote_average'] - movieB['vote_average']);
    }

    return sortedMoviesList;
}