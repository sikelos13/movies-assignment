
import React, { Component } from "react";
import { fetchMoviesApi, FetchMoviesApiResponse } from "../api/fetchMovies";
import MoviesList from "../components/MoviesList";
import Box from "@material-ui/core/Box";
import toast from "react-hot-toast";
import SkeletonLoader from "../components/SkeletonLoader";
import Header from "../components/Header";
import { debounce } from "../utils/debounce";
import { MovieExtended } from "../api/types/Movie";
import { Pagination } from "../api/types/Pagination";
import { fetchNowPlayingApi, FetchNowPlayingApiResponse } from "../api/fetchNowPlaying";
import { normalizeGenres } from "../normalizers/genres.normalize";
import { fetchGenresList, FetchGenresApiResponse } from "../api/fetchGenres";
import { Genre } from "../api/types/Genre";
import { normalizeMovies } from '../normalizers/movies.normalize';
import { initState } from '../utils/initialState';
import { getUpdatedWithNewItemsList } from '../utils/getUpdatedWithNewItemsList';
import { getUpdatedState } from '../utils/getUpdatedState';
import { getSortedMoviesList } from '../utils/getSortedMoviesList';

export interface MoviesManagementState {
    loading: LoadingType;
    moviesList: MovieExtended[];
    searchTerm: string;
    isSearching: boolean;
    pagination: Pagination;
    sortMoviesBy: string;
    defaultMoviesList: MovieExtended[];
    genresEntities: Record<number, Genre> | null;
}

export type SortType = "highest_vote_average" | "lowest_vote_average" | "" | string;
type LoadingType = "load_more_items" | "initial_load" | null;

class MoviesView extends Component<{}, MoviesManagementState> {
    constructor(props: any) {
        super(props);

        this.state = initState();
        this.handleSearch = debounce(this.handleSearch, 500);
    }

    componentDidMount() {
        this.fetchGenres();
    }

    componentDidUpdate() {
        this.scrollbarIsVisible();
    }

    fetchMovies = (nextPage: number, searchParam: string) => {
        if (searchParam === "") {
            this.fetchNowPlaying(nextPage);
        } else {
            this.fetchSearchedMovies(searchParam, false, nextPage);
        }
    }

    fetchGenres = () => {
        fetchGenresList().then((response: FetchGenresApiResponse) => {
            if (response.success) {
                const normalizedGenresList = normalizeGenres(response.data.genres);

                this.setState({ genresEntities: normalizedGenresList }, () => {
                    this.fetchNowPlaying();
                });
            } else {
                toast.error(response.errorMessage, {
                    duration: 3000
                });
                this.setState({
                    genresEntities: null,
                    loading: null,
                });
            }
        });
    }

    fetchNowPlaying = (nextPage?: number) => {
        const { moviesList, genresEntities } = this.state;

        this.setState({ loading: nextPage ? "load_more_items" : "initial_load" });

        const params = {
            page: nextPage ? nextPage : 1,
        }

        fetchNowPlayingApi(params).then((response: FetchNowPlayingApiResponse) => {
            if (response.success) {
                const normalizedMoviesList = normalizeMovies(response.data.results, genresEntities);
                const updatedMoviesList = nextPage ? getUpdatedWithNewItemsList(moviesList, normalizedMoviesList) : normalizedMoviesList;

                this.setState(getUpdatedState(this.state, response, updatedMoviesList));
                toast.dismiss();
            } else {
                toast.error(response.errorMessage, {
                    duration: 3000
                });
                this.setState({
                    moviesList: [],
                    loading: null,
                });
            }
        });
    }

    fetchSearchedMovies = (query: string, isNewSearch?: boolean, nextPage?: number) => {
        const { genresEntities, moviesList } = this.state;

        this.setState({ loading: isNewSearch ? "initial_load" : "load_more_items" });

        const params = {
            query,
            page: nextPage ? nextPage : 1,
        };

        fetchMoviesApi(params).then((response: FetchMoviesApiResponse) => {
            if (response.success) {
                const normalizedMoviesList = normalizeMovies(response.data.results, genresEntities);
                const updatedMoviesList = nextPage ? getUpdatedWithNewItemsList(moviesList, normalizedMoviesList) : normalizedMoviesList;

                this.setState(getUpdatedState(this.state, response, updatedMoviesList));
                toast.dismiss();
            } else {
                toast.error(response.errorMessage, {
                    duration: 3000
                });
                this.setState({
                    moviesList: [],
                    loading: null,
                });
            }
        });
    };

    handleSearch = (event: any) => {
        const value = event.target.value;
        if (value === "") {
            this.setState({ searchTerm: value });
            this.fetchNowPlaying();
            this.scrollToTopScrollbar();
            return;
        }

        this.setState({ searchTerm: value }, () => this.fetchSearchedMovies(value, true));
        this.scrollToTopScrollbar();
    };

    handleScroll = (e: any) => {
        const { pagination, loading, searchTerm } = this.state;
        const { page, hasNextPage } = pagination;

        const bottom = e.target.scrollHeight - e.target.scrollTop - 1 <= e.target.clientHeight; // -1 is for edge cases with decimal numbers of scrollTop 

        if (bottom && hasNextPage && loading === null) {
            toast.loading('Loading more items');
            this.fetchMovies(page + 1, searchTerm);
        }
    }

    scrollbarIsVisible = () => {
        const { pagination, loading, searchTerm } = this.state;
        const { page, hasNextPage } = pagination;

        const moviesViewerComponent = document.getElementById("listScroll");

        if (moviesViewerComponent) {
            const elementOffset = moviesViewerComponent['offsetTop'];
            const hasScrollBar = moviesViewerComponent['scrollHeight'] + elementOffset + 1 > window.innerHeight;
            if (hasNextPage && loading === null && !hasScrollBar) {
                this.fetchMovies(page + 1, searchTerm);
            }
        }
    }

    scrollToTopScrollbar = () => {
        const moviesViewerComponent = document.getElementById("listScroll");
        if (moviesViewerComponent) {
            moviesViewerComponent['scrollTo']({ top: 0, behavior: 'smooth' });
        }
    }

    handleSortChange = (event: any) => {
        const { moviesList, defaultMoviesList } = this.state;
        const { value } = event.target;
        let sortedMoviesList = [] as MovieExtended[];
        this.setState({ loading: "initial_load"})
        sortedMoviesList = getSortedMoviesList(moviesList, defaultMoviesList, value);

        this.setState({ 
                loading: null,
                defaultMoviesList: moviesList, 
                moviesList: sortedMoviesList, 
                sortMoviesBy: value 
            }, () => this.scrollToTopScrollbar());
    }

    render() {
        const {
            moviesList,
            loading,
            searchTerm,
            isSearching,
            pagination,
            sortMoviesBy
        } = this.state;

        return (
            <Box>
                <Header
                    sortMoviesBy={sortMoviesBy}
                    handleSortChange={this.handleSortChange}
                    handleSearch={this.handleSearch}
                    pagination={pagination}
                    isSearching={isSearching}
                    searchTerm={searchTerm}
                />
                <Box display="flex" justifyContent="center" flexDirection="row" className="MainContainer_Body">
                    <Box
                        mt={2}
                        pb={2}
                        display="flex"
                        flexDirection="row"
                        flexWrap="wrap"
                        justifyContent="space-evenly"
                        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 310px)' }}
                        id="listScroll"
                        onScroll={this.handleScroll}
                    >
                        {loading === "initial_load"
                            ? <SkeletonLoader />
                            : <MoviesList moviesList={moviesList} />
                        }

                    </Box>
                </Box>
            </Box>
        );
    }
}

export default MoviesView;