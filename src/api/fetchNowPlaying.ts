import axios from 'axios';
import { handleErrorMessage } from './utils/handleErrorMessage';
import { Movie } from './types/Movie';

export interface FetchNowPlayingApiResponse {
    success: boolean;
    errorMessage: string;
    status: number
    data: {
        results: Movie[]
        page: number
        total_results: number;
        total_pages: number;
    };
}
export interface FetchMoviesApiParams {
    page: number;
}

/**
 *  Get movies list
 *
 * Endpoints:
 * - GET /search/movie/?query={query}
 *  @param {string} query
 *
 * @returns Promise<FetchMoviesApiResponse>
 */

export const fetchNowPlayingApi = (params: FetchMoviesApiParams): Promise<FetchNowPlayingApiResponse> => (
    axios.get([
        `${process.env.REACT_APP_API_ENDPOINT}/movie/now_playing`,
        `?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
        params
            && params.page
            ? `&page=${params.page}`
            : "",
    ].join(""))
        .then((response: any) => {
            return {
                ...response,
                success: true
            }

        }).catch((error: any) => {
            return {
                ...error,
                success: false,
                errorMessage: handleErrorMessage(error)
            }
        })
);