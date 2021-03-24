import axios from 'axios';
import { handleErrorMessage } from './utils/handleErrorMessage';
import { Genre } from './types/Genre';

export interface FetchGenresApiResponse {
    success: boolean;
    errorMessage: string;
    status: number
    data: {
        genres: Genre[]
    };
}

/**
 *  Get genres list
 *
 * Endpoints:
 * - GET /genre/movie/list
 *
 * @returns Promise<FetchMoviesApiResponse>
 */

export const fetchGenresList = (): Promise<FetchGenresApiResponse> => (
    axios.get([
        `${process.env.REACT_APP_API_ENDPOINT}/genre/movie/list`,
        `?api_key=${process.env.REACT_APP_API_KEY}`
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