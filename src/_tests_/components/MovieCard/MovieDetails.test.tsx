import MovieDetails from "../../../components/MovieCard/MovieDetails";
import { render, RenderResult } from '@testing-library/react'
import { reviewsList } from '../../mocks/reviewsList';

let documentBody: RenderResult;

describe("<MovieDescription />", () => {
    beforeEach(() => {
        documentBody = render(<MovieDetails  selectedMovieTrailer="" selectedMovieReviews={reviewsList} selectedMovieSimilar="Test similar, test2" />);
    });

    test("Renders no trailer found box correctly", () => {
        expect(documentBody.getByText(/No trailer found/i)).toBeInTheDocument();
    });

    test("Renders reviews correctly", () => {
        expect(documentBody.queryAllByText(/Author/i)).toHaveLength(2);
        expect(documentBody.queryAllByText(/Review/i)).toHaveLength(2);
    });

    test("Renders similar movies correctly", () => {
        expect(documentBody.getByText(/Test similar, test2/i)).toBeInTheDocument();
    });
});