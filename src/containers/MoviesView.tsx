
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

interface MoviesManagementState {
    loading: boolean;
    moviesList: Movie[];
    searchTerm: string;
    isSearching: boolean;
    pagination: Pagination;
    sortMoviesBy: string;
    genresEntities: Record<number, Genre> | null;
}

export type SortType = "highest_vote_average" | "lowest_vote_average" | "" | string;

class MoviesView extends Component<{}, MoviesManagementState> {
    constructor(props: any) {
        super(props);

        this.state = {
            moviesList: [],
            loading: false,
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
                    loading: false,
                });
            }
        });
    }

    fetchNowPlaying = () => {
        const { pagination } = this.state;
        const { page } = pagination;

        this.setState({ loading: true });

        const params = {
            page: page,
        }

        fetchNowPlayingApi(params).then((response: FetchNowPlayingApiResponse) => {
            if (response.success) {
                // const updatedMoviesList = getFetchedUpdatedItems(selectedMovies, response.data.results);

                this.setState({
                    moviesList: response.data.results,
                    loading: false,
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
                    loading: false,
                });
            }
        });
    }

    fetchMovies = (query: string, isNewSearch?: boolean) => {
        const { pagination } = this.state;
        const { page } = pagination;

        this.setState({ loading: true });

        const params = {
            query,
            page: isNewSearch ? 1 : page,
        };

        fetchMoviesApi(params).then((response: FetchMoviesApiResponse) => {
            if (response.success) {
                // const updatedMoviesList = getFetchedUpdatedItems(selectedMovies, response.data.results);

                this.setState({
                    moviesList: response.data.results,
                    loading: false,
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
                    loading: false,
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

    handlePaginate = (pageNumber: number) => {
        const { pagination, searchTerm } = this.state;

        this.setState(
            {
                pagination: {
                    ...pagination,
                    page: pageNumber,
                },
            },
            () => this.fetchMovies(searchTerm)
        );
    };

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
            <Box p={2} mt={2}>
                <Header
                    sortMoviesBy={sortMoviesBy}
                    // handleSortChange={this.handleSortChange}
                    handleSearch={this.handleSearch}
                    pagination={pagination}
                    isSearching={isSearching}
                    handlePaginate={this.handlePaginate}
                    searchTerm={searchTerm}

                />
                <Box display="flex" flexDirection="row" className="MainContainer_Body">
                    <Box
                        mt={2}
                        pb={2}
                        display="flex"
                        flexDirection="row"
                        flexWrap="wrap"
                        justifyContent="space-evenly"
                    >
                        {!loading
                            ? <MoviesList
                                moviesList={moviesList}
                                genresEntities={genresEntities}
                            />
                            : <SkeletonLoader />
                        }
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default MoviesView;