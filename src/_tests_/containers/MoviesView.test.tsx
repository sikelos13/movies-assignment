import MoviesView from "../../containers/MoviesView";
import { render, RenderResult } from '@testing-library/react'
import MoviesList from "../../components/MoviesList";
import { moviesList } from '../mocks/moviesList';

let documentBody: RenderResult;

describe("<MoviesView />", () => {
    beforeEach(() => {
        documentBody = render(<MoviesView />);
    });

    test("Renders <Header /> component correctly", () => {
        expect(documentBody.getByText(/Welcome to MoviesRama/i)).toBeInTheDocument();
    });
});

describe("<MoviesList />", () => {
    beforeEach(() => {
        documentBody = render(<MoviesList moviesList={moviesList} />);
    });

    test("Renders playing now correctly", () => {
        expect(documentBody.getByText(/Lord of War/i)).toBeInTheDocument();
    });

    test("User can see at least 3 movies", () => {
        expect(moviesList).toHaveLength(3);
    });

});