import React, { memo } from 'react';
import { Box } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

interface MovieDetailsProps {
    selectedMovieTrailer: string;
    selectedMovieReviews: any;
    selectedMovieSimilar: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = memo(({ selectedMovieTrailer, selectedMovieReviews, selectedMovieSimilar }: MovieDetailsProps) => (
    <CardContent style={{ display: "flex", flexDirection: "column" }}>
        {selectedMovieTrailer
            ? <iframe width="280" height="315" title="movie-trailer" allowFullScreen src={selectedMovieTrailer} />
            : <Box component={'span'} width="300px" height="315px" textAlign="center" fontSize="20px" fontWeight="bold">No trailer found</Box>
        }
            {selectedMovieReviews && selectedMovieReviews.length > 0 &&
                selectedMovieReviews.map((review: any) => {
                    return (
                        <Box component={'span'} key={review.id}>
                            <Box component={'p'} textAlign="justify" p="5px" color="textSecondary" style={{ wordBreak: "break-word" }}><Box component={'span'} fontWeight="bold">Author:</Box> {review.author}</Box>
                            <Box component={'p'} textAlign="justify" p="5px" color="textSecondary" style={{ wordBreak: "break-word" }}><Box component={'span'} fontWeight="bold">Review:</Box> {review.review}</Box>
                        </Box>
                    )
                })}
            <Box component={'p'} textAlign="justify" p="5px" color="textSecondary" style={{ wordBreak: "break-word" }}>
                <Box component={'span'} fontWeight="bold">Similar Movies: </Box>
                {selectedMovieSimilar}
            </Box>
    </CardContent>
));

export default MovieDetails;