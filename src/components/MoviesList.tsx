import React, { memo, useState } from 'react';
import { Movie, Trailer, Review, MovieExtended } from './../api/types/Movie';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import MovieDetails from "./MovieCard/MovieDetails";
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import MovieDescription from "./MovieCard/MovieDescription";

interface MoviesListProps { 
    moviesList: MovieExtended[];  
}

interface MovieTrailerApiResponse { results: Trailer[]; }
interface MovieReviewApiResponse { results: Review[]; }
interface SimilarMoviesApiResponse { results: Movie[]; }

const MoviesList: React.FC<MoviesListProps> = memo(({ moviesList }: MoviesListProps) => {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedMovieTrailer, setSelectedMovieTrailer] = useState("");
    const [selectedMovieReviews, setSelectedMovieReviews] = useState<any>([]);
    const [selectedMovieSimilar, setSelectedMovieSimilar] = useState("No similar movies");

    const getSelectedMovieDetails = (id: string) => {
        Promise.all([
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`),
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`),
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        ]).then(([res1, res2, res3]) => {
            res1.json().then((response: MovieTrailerApiResponse) => {
                if (response.results.length > 0) {
                    const trailerUrl = `https://www.youtube.com/embed/${response.results[0].key}`
                    setSelectedMovieTrailer(trailerUrl);
                }
            })
            res2.json().then((response2: MovieReviewApiResponse) => {
                if (response2.results.length > 0) {
                    let reviews = []
                    for (let i = 0; i < response2.results.length; i++) {
                        const item = response2.results[i] as Review;
                        if (i < 2) {
                            reviews.push({ id: item.id, author: item.author, review: item.content });
                        } else {
                            break;
                        }
                    }
                    setSelectedMovieReviews(reviews);
                }
            })
            res3.json().then((response3: SimilarMoviesApiResponse) => {
                if (response3.results.length > 0) {
                    const totalSimilarMovies = response3.results.map((similarMovie: Movie) => {
                        return similarMovie.title;
                    });
                    const joinSimilarMoviesValue = totalSimilarMovies.join(", ");
                    setSelectedMovieSimilar(joinSimilarMoviesValue);
                }
            })
        }).catch(err => console.log('Catch', err));
    }


    const handleDetails = (id: string) => {
        if (selectedMovie !== id) {
            setShowDetails(true);
            setSelectedMovie(id);
            getSelectedMovieDetails(id);
            return;
        }

        setShowDetails(!showDetails);
        setSelectedMovie(id);
    }

    return (
        <>
            {moviesList.length > 0 
                ? moviesList.map((movie: MovieExtended) => {
                    const showSelectedMovieDetails = showDetails && selectedMovie === movie.id;

                    return (
                        <Box key={movie.id} width="330px" display="block" height="420px" p={1} onClick={() => handleDetails(movie.id)} className="MovieContainer_Element">
                            <Card style={{ height: "400px", width: "330px", overflowY: "auto" }}>
                                {!showSelectedMovieDetails ? (
                                    <Slide direction="up" in={!showSelectedMovieDetails} mountOnEnter unmountOnExit timeout={500}>
                                        <Paper elevation={0}>
                                            <MovieDescription movie={movie} />
                                        </Paper>
                                     </Slide>
                                ) : null}

                                {showSelectedMovieDetails ? (
                                    <Slide direction="up" in={showSelectedMovieDetails} mountOnEnter unmountOnExit timeout={500}>
                                        <Paper elevation={0}>
                                            <MovieDetails 
                                                selectedMovieSimilar={selectedMovieSimilar} 
                                                selectedMovieTrailer={selectedMovieTrailer} 
                                                selectedMovieReviews={selectedMovieReviews} 
                                            />
                                        </Paper>
                                    </Slide>
                                ) : null}
                            </Card>
                        </Box>
                    )
                })
                : <Box alignSelf="center" fontSize="20px" fontWeight="bold">No movies to show</Box>
            }
        </>
    )
});

export default MoviesList;