import React, { memo, useState } from 'react';
import { Movie } from './../api/types/Movie';
import { Box, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface MoviesListProps {
    moviesList: Movie[];
}

const MoviesList: React.FC<MoviesListProps> = memo(({ moviesList }: MoviesListProps) => {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState("")


    const handleDetails = (id: string) => {
        if (selectedMovie !== id) {
            setShowDetails(true);
            setSelectedMovie(id);
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
                        <Box key={movie.id} width="250px" display="block" height="420px" p={1}>
                            {showSelectedMovieDetails
                                ? <Card style={{ height: "400px", overflowY: "auto"}}>
                                    <CardContent>
                                        <Typography color="textSecondary">{movie.title}</Typography>
                                        <Typography color="textSecondary">
                                            Release date: {movie.release_date}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Score: {movie.vote_average}
                                        </Typography>
                                        <Box component={Typography} textAlign="justify" p="5px" color="textPrimary">
                                            Overview: {movie.overview}
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => handleDetails("")}>Close details</Button>
                                    </CardActions>
                                </Card>
                                : <Card style={{ height: "400px", overflowY: "auto"}}>
                                    <CardContent>
                                        <Typography color="textPrimary">{movie.title}</Typography>
                                        <Box display="flex" justifyContent="center" p="5px">
                                            {movie.poster_path 
                                                ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="preview-poster" width="200" height="250" className="Image_Poster" />
                                                : <Box width="200px" height="250px" textAlign="center" fontSize="20px" fontWeight="bold">Without poster</Box>
                                            }
                                            </Box>
                                        <Typography color="textSecondary">
                                            Score: {movie.vote_average}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            }
                        </Box>
                    )
                })
                : <Box alignSelf="center" fontSize="20px" fontWeight="bold">No movies to show</Box>
            }
        </>
    )
});

export default MoviesList;