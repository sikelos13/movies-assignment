import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface MovieDetailsProps {
    selectedMovieTrailer: string;
    selectedMovieReviews: any;
    selectedMovieSimilar: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = memo(({ selectedMovieTrailer, selectedMovieReviews, selectedMovieSimilar }: MovieDetailsProps) => (
    <CardContent style={{ display: "flex", flexDirection: "column" }}>
        {selectedMovieTrailer
            ? <iframe width="280" height="315" title="movie-trailer" allowFullScreen src={selectedMovieTrailer} />
            : <Box component={'p'} width="300px" height="315px" textAlign="center" fontSize="20px" fontWeight="bold">No trailer found</Box>
        }
        <Box component={'span'} textAlign="justify" p="5px" color="textSecondary">
            {selectedMovieReviews && selectedMovieReviews.length > 0 &&
                selectedMovieReviews.map((review: any) => {
                    return (
                        <Box component={'span'} key={review.id}>
                            <Box component={Typography} textAlign="justify" p="5px" color="textSecondary"><Box fontWeight="bold">Author:</Box> {review.author}</Box>
                            <Box component={Typography} textAlign="justify" p="5px" color="textSecondary"><Box fontWeight="bold">Review:</Box> {review.review}</Box>
                        </Box>
                    )
                })}
        </Box>
        <Box>
            <Box component={Typography} textAlign="justify" p="5px" color="textSecondary">
                <Box component={'span'} fontWeight="bold">Similar Movies: </Box>
                {selectedMovieSimilar}
            </Box>
        </Box>
    </CardContent>
));

export default MovieDetails;