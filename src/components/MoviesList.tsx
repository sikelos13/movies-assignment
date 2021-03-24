import React, { memo, useState } from 'react';
import { Movie, Trailer, Review } from './../api/types/Movie';
import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Genre } from "./../api/types/Genre";
import { getGenresNames } from "../utils/getGenresNames";
import MovieDetails from "./MovieDetails";
import Paper from '@material-ui/core/Paper';

import Slide from '@material-ui/core/Slide';

interface MoviesListProps {
    moviesList: Movie[];
    genresEntities: Record<number, Genre> | null;
}

interface MovieTrailerApiResponse {
    results: Trailer[];
}

interface MovieReviewApiResponse {
    results: Review[];
}

const MoviesList: React.FC<MoviesListProps> = memo(({ moviesList, genresEntities }: MoviesListProps) => {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedMovieTrailer, setSelectedMovieTrailer] = useState("");
    const [selectedMovieReviews, setSelectedMovieReviews] = useState<any>([]);
    const [selectedMovieSimilar, setSelectedMovieSimilar] = useState("");

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
            res3.json().then((response3: any) => {
                console.log(response3)
            })
        })
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
                ? moviesList.map((movie: Movie) => {
                    const showSelectedMovieDetails = showDetails && selectedMovie === movie.id;

                    return (
                        <Box key={movie.id} width="330px" display="block" height="420px" p={1} onClick={() => handleDetails(movie.id)} className="MovieContainer_Element">
                            <Card style={{ height: "400px", width: "330px", overflowY: "auto" }}>
                                {!showSelectedMovieDetails ? (
                                    <Slide direction="up" in={!showSelectedMovieDetails} mountOnEnter unmountOnExit timeout={500}>
                                        <Paper elevation={0}>
                                        <CardContent>
                                            <Typography color="textPrimary">{movie.title}</Typography>
                                            <Box display="flex" justifyContent="center" p="5px">
                                                {movie.poster_path
                                                    ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="preview-poster" width="200" height="250" className="Image_Poster" />
                                                    : <Box width="200px" height="250px" textAlign="center" fontSize="20px" fontWeight="bold">Without poster</Box>
                                                }
                                            </Box>
                                            <Box component={Typography} textAlign="justify" p="5px" color="textSecondary">
                                                Score: {movie.vote_average}
                                            </Box>
                                            <Box component={Typography} textAlign="justify" p="5px" color="textSecondary">
                                                Release date: {movie.release_date}
                                            </Box>
                                            <Box component={Typography} textAlign="justify" p="5px" color="textSecondary">
                                                Overview: {movie.overview}
                                            </Box>
                                            <Box component={Typography} textAlign="justify" p="5px" color="textSecondary">
                                                Genres: {getGenresNames(genresEntities, movie.genre_ids)}
                                            </Box>
                                        </CardContent>
                                        </Paper>
                                    </Slide>
                                ) : null}

                                {showSelectedMovieDetails ? (
                                    <Slide direction="up" in={showSelectedMovieDetails} mountOnEnter unmountOnExit timeout={500}>
                                    <Paper elevation={0}>
                                            <MovieDetails selectedMovieTrailer={selectedMovieTrailer} selectedMovieReviews={selectedMovieReviews} />
                                        </Paper>
                                    </Slide>
                                ) : null}

                            </Card>
                            {/* <Collapse in={showSelectedMovieDetails}>
                                    <Paper elevation={4}>
                                        <MovieDetails selectedMovieTrailer={selectedMovieTrailer} selectedMovieReviews={selectedMovieReviews} />
                                    </Paper>
                                </Collapse> */}
                        </Box>
                    )
                })
                : <Box alignSelf="center" fontSize="20px" fontWeight="bold">No movies to show</Box>
            }
        </>
    )
});

export default MoviesList;