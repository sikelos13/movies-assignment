import React, { memo, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface MovieDetailsProps {
    selectedMovieTrailer: string;
    selectedMovieReviews: any;
}

const MovieDetails: React.FC<MovieDetailsProps> = memo(({ selectedMovieTrailer, selectedMovieReviews }: MovieDetailsProps) => {

    return (
        <CardContent style={{ display: "flex", flexDirection: "column" }}>
            {selectedMovieTrailer
                ? <iframe width="280" height="315" title="movie-trailer" allowFullScreen src={selectedMovieTrailer} />
                : <Box width="300px" height="315px" textAlign="center" fontSize="20px" fontWeight="bold">No trailer found</Box>
            }
            <Box component={'span'} textAlign="justify" p="5px" color="textSecondary">
                Reviews:
                        {selectedMovieReviews.map((review: any) => {
                return (
                    <Box component={'span'} key={review.id}>
                        <Box component={Typography} textAlign="justify" p="5px" color="textSecondary">Author: {review.author}</Box>
                        <Box component={Typography} textAlign="justify" p="5px" color="textSecondary">Review: {review.review}</Box>
                    </Box>
                )
            })}
            </Box>
            {/* <Box component={Typography} textAlign="justify" p="5px" color="textPrimary">
                        Overview: {movie.overview}
                    </Box> */}
        </CardContent>
    )
});

export default MovieDetails;