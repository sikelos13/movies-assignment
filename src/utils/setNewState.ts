import { MoviesManagementState } from "../containers/MoviesView"
import { MovieExtended } from "../api/types/Movie";
import { getHasNextPage } from "../utils/getHasNextPage";
import { FetchNowPlayingApiResponse } from "../api/fetchNowPlaying";
import { FetchMoviesApiResponse } from "../api/fetchMovies";

export const newState = (prevState: MoviesManagementState, response: FetchMoviesApiResponse | FetchNowPlayingApiResponse, updatedMoviesList: MovieExtended[]): MoviesManagementState => {

    const state: MoviesManagementState = {
        ...prevState,
        moviesList: updatedMoviesList,
        loading: null,
        sortMoviesBy: "",
        pagination: {
            page: response.data.page,
            total_results: response.data.total_results,
            total_pages: response.data.total_pages,
            hasNextPage: getHasNextPage(
                response.data.page,
                response.data.total_results
            ),
        }
    }

    return state;
}