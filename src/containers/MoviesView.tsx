
import React, { Component } from "react";
import { fetchMoviesApi, FetchMoviesApiResponse } from "../api/fetchMovies";
import MoviesList from "../components/MoviesList";
import Box from "@material-ui/core/Box";
import toast from "react-hot-toast";
import SkeletonLoader from "../components/TableCellLoader";
import Header from "../components/Header";
import { debounce } from "../utils/debounce";
import { getHasNextPage } from "../utils/getHasNextPage";
import { Movie } from "../api/types/Movie";
import { Pagination } from "../api/types/Pagination";
import { fetchNowPlayingApi, FetchNowPlayingApiResponse } from "../api/fetchNowPlaying";
import { normalizeGenres } from "../normalizers/genres.normalize";
import { fetchGenresList, FetchGenresApiResponse } from "../api/fetchGenres";
import { Genre } from "../api/types/Genre";
import CircularProgress from '@material-ui/core/CircularProgress';

interface MoviesManagementState {
    loading: LoadingType;
    moviesList: Movie[];
    searchTerm: string;
    isSearching: boolean;
    pagination: Pagination;
    sortMoviesBy: string;
    genresEntities: Record<number, Genre> | null;
}

export type SortType = "highest_vote_average" | "lowest_vote_average" | "" | string;
type LoadingType = "load_more_items" | "initial_load" | null;

class MoviesView extends Component<{}, MoviesManagementState> {
    private tableScrollbarRef: any;

    constructor(props: any) {
        super(props);

        this.tableScrollbarRef = React.createRef();

        this.state = {
            moviesList: [],
            loading: null,
            searchTerm: "",
            isSearching: false,
            genresEntities: null,
            sortMoviesBy: "",
            pagination: {
                page: 1,
                total_pages: 0,
                total_results: 0,
                hasNextPage: false,
            },
        };

        this.handleSearch = debounce(this.handleSearch, 500);
    }

    componentDidMount() {
        this.fetchGenres();
    }

    fetchGenres = () => {

        fetchGenresList().then((response: FetchGenresApiResponse) => {
            if (response.success) {
                const normalizedGenresList = normalizeGenres(response.data.genres);

                this.setState({ genresEntities: normalizedGenresList }, () => {
                    this.fetchNowPlaying();
                });
            } else {
                toast.error(response.errorMessage);
                this.setState({
                    genresEntities: null,
                    loading: null,
                });
            }
        });
    }

    fetchNowPlaying = (nextPage?: number) => {
        const { pagination, moviesList } = this.state;
        const { page } = pagination;

        this.setState({ loading: nextPage ? "load_more_items" : "initial_load" });

        const params = {
            page: nextPage ? nextPage : page,
        }

        fetchNowPlayingApi(params).then((response: FetchNowPlayingApiResponse) => {
            if (response.success) {
                const updatedMoviesList = nextPage ? [...moviesList, ...response.data.results] : response.data.results;

                this.setState({
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
                    },
                });
            } else {
                toast.error(response.errorMessage);
                this.setState({
                    moviesList: [],
                    loading: null,
                });
            }
        });
    }

    fetchMovies = (query: string, isNewSearch?: boolean) => {
        const { pagination } = this.state;
        const { page } = pagination;

        this.setState({ loading: isNewSearch ? "initial_load" : "load_more_items"});

        const params = {
            query,
            page: isNewSearch ? 1 : page,
        };

        fetchMoviesApi(params).then((response: FetchMoviesApiResponse) => {
            if (response.success) {
                // const updatedMoviesList = getFetchedUpdatedItems(selectedMovies, response.data.results);

                this.setState({
                    moviesList: response.data.results,
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
                    },
                });
            } else {
                toast.error(response.errorMessage);
                this.setState({
                    moviesList: [],
                    loading: null,
                });
            }
        });
    };

    handleSearch = (event: any) => {
        const value = event.target.value;
        if (value !== "") {
            this.setState({ searchTerm: value }, () => this.fetchMovies(value, true));
        }
    };

    handleScroll = (e: any) => {
        const { pagination, loading } = this.state;
        const { page, hasNextPage} = pagination

        const bottom = e.target.scrollHeight - e.target.scrollTop - 1 <= e.target.clientHeight; // -1 is for edge cases with decimal numbers of scrollTop

        if (bottom && hasNextPage && loading === null) {
            this.fetchNowPlaying(page+1);
        }
    }

    scrollToTopScrollbar = () => {
        this.tableScrollbarRef && this.tableScrollbarRef.scrollToTop && this.tableScrollbarRef.scrollToTop();
    }

    render() {
        const {
            moviesList,
            loading,
            searchTerm,
            isSearching,
            pagination,
            genresEntities,
            sortMoviesBy
        } = this.state;

        return (
            <Box p={2} mt={2} style={{ overflowY: "scroll", maxHeight: "1200px"}} onScroll={this.handleScroll}>
                <Header
                    sortMoviesBy={sortMoviesBy}
                    // handleSortChange={this.handleSortChange}
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
                    >
                        {loading === "initial_load"
                            ? <SkeletonLoader />
                            : loading === "load_more_items"
                                ? <CircularProgress color="primary" />
                                : <MoviesList
                                    moviesList={moviesList}
                                    genresEntities={genresEntities}
                                />
                        }
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default MoviesView;