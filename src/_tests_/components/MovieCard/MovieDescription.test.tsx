import MovieDescription from "../../../components/MovieCard/MovieDescription";
import { render, RenderResult } from '@testing-library/react'
import { moviesList } from '../../mocks/moviesList';

let documentBody: RenderResult;

describe("<MovieDescription />", () => {
    beforeEach(() => {
        documentBody = render(<MovieDescription  movie={moviesList[0]} />);
    });

    test("Renders title of movie in <MovieDescription /> component correctly", () => {
        expect(documentBody.getByText(/Lord of War/i)).toBeInTheDocument();
    });

    test("Renders score correctly", () => {
        expect(documentBody.getByText(/7.2/i)).toBeInTheDocument();
    });

    test("Renders release date correctly", () => {
        expect(documentBody.getByText(/2005-09-16/i)).toBeInTheDocument();
    });

    test("Renders overview correctly", () => {
        expect(documentBody.getByText(/Test1 overview/i)).toBeInTheDocument();
    });

    test("Renders genres correctly", () => {
        expect(documentBody.getByText(/Action, Drama/i)).toBeInTheDocument();
    });
});