
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
// import { getHasNextPage } from "../utils/getHasNextPage";


interface MoviesManagementState {
    loading: boolean;
    loadingCheckout: boolean;
    moviesList: Movie[];
    searchTerm: string;
    isSearching: boolean;
    pagination: Pagination;
    selectedMovies: Movie[];
    sortMoviesBy: SortType;
}

export type SortType = "highest_vote_average" | "lowest_vote_average" | "" | string;

class MoviesView extends Component<{}, MoviesManagementState> {
    constructor(props: any) {
        super(props);

        this.state = {
            moviesList: [],
            loading: false,
            loadingCheckout: false,
            searchTerm: "",
            isSearching: false,
            selectedMovies: [],
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

    fetchMovies = (query: string, isNewSearch?: boolean) => {
        const { pagination, selectedMovies } = this.state;
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
            selectedMovies,
            loadingCheckout,
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
                        width="80%"
                    >
                        {!loading
                            ? <MoviesList
                                moviesList={moviesList}
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