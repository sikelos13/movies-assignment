import axios from 'axios';
import { fetchMoviesApi, FetchMoviesApiParams, FetchMoviesApiResponse} from '../../api/fetchMovies';
import { fetchNowPlayingApi, FetchNowPlayingApiResponse, FetchNowPlayingApiParams} from '../../api/fetchNowPlaying';
import { fetchGenresList, FetchGenresApiResponse} from '../../api/fetchGenres';
import { moviesList } from '../mocks/moviesList';
import { genresList } from '../mocks/genresList';
import MockAdapter from 'axios-mock-adapter';

describe('Fetch now playing movies list api', () => {
    it('returns data when fetchNowPlayingApi is called', done => {
        const mock = new MockAdapter(axios);
        const data = { response: moviesList };

        const params = { 
            page: 1
        } as FetchNowPlayingApiParams

        mock.onGet(`${process.env.REACT_APP_API_ENDPOINT}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${params.page}`).reply(200, data);

        fetchNowPlayingApi(params).then((response: FetchNowPlayingApiResponse) => {
            expect(response.data).toEqual(data);
            done();
        });
    });
});

describe('Fetch genres list api', () => {
    it('returns data when fetchGenresList is called', done => {
        const mock = new MockAdapter(axios);
        const data = { response: genresList };

        mock.onGet(`${process.env.REACT_APP_API_ENDPOINT}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`).reply(200, data);

        fetchGenresList().then((response: FetchGenresApiResponse) => {
            expect(response.data).toEqual(data);
            done();
        });
    });
});

describe('Fetch searched movie api', () => {
    it('returns data when fetchMoviesApi is called with search param', done => {
        const mock = new MockAdapter(axios);
        const data = { response: moviesList };

        const params = { 
            page: 1,
            query: "lord"
        } as FetchMoviesApiParams

        mock.onGet(`${process.env.REACT_APP_API_ENDPOINT}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${params.query}&page=${params.page}`).reply(200, data);

        fetchMoviesApi(params).then((response: FetchMoviesApiResponse) => {
            expect(response.data).toEqual(data);
            done();
        });
    });
});