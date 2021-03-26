import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { MovieExtended } from '../../api/types/Movie';

interface MovieDescriptionProps {
    movie: MovieExtended;
}

const MovieDescription: React.FC<MovieDescriptionProps> = memo(({ movie }: MovieDescriptionProps) => (
    <CardContent>
        <Typography color="textPrimary">{movie.title}</Typography>
        <Box component={"p"} display="flex" justifyContent="center" p="5px">
            {movie.poster_path
                ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="preview-poster" width="200" height="250" className="Image_Poster" />
                : <Box component={"span"} width="200px" height="250px" textAlign="center" fontSize="20px" fontWeight="bold">Without poster</Box>
            }
        </Box>
        <Box component={'p'} textAlign="justify" p="5px" color="textSecondary">
            <Box component={'span'} fontWeight="bold">Score:</Box> {movie.vote_average}
        </Box>
        <Box component={'p'} textAlign="justify" p="5px" color="textSecondary">
            <Box component={'span'} fontWeight="bold">Release date:</Box> {movie.release_date}
        </Box>
        <Box component={'p'} textAlign="justify" p="5px" color="textSecondary" style={{ wordBreak: "break-word" }}>
            <Box component={'span'} fontWeight="bold">Overview:</Box> {movie.overview}
        </Box>
        <Box component={'p'} textAlign="justify" p="5px" color="textSecondary" style={{ wordBreak: "break-word" }}>
            <Box component={'span'} fontWeight="bold">Genres:</Box> {movie.genres}
        </Box>
    </CardContent>
));

export default MovieDescription;