import { MoviesManagementState } from "../containers/MoviesView"

export const initState = (): MoviesManagementState => {

    const state: MoviesManagementState = {
        moviesList: [],
        defaultMoviesList: [],
        loading: null,
        searchTerm: "",
        isSearching: false,
        genresEntities: null,
        sortMoviesBy: "",
        pagination: {
            page: 1,
            total_pages: 0,
            total_results: 0,
            hasNextPage: false
        }
    }

    return state;
}