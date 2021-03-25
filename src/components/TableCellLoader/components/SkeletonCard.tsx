import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export const SkeletonCard = () => {
    return (
        <Box mb={5}>
            <Skeleton width="60%">
                <Typography>.</Typography>
            </Skeleton>
            <Skeleton variant="rect" width="100%" style={{ borderRadius: "5px", width: "300px", height: "350px"}}>
                <div style={{ paddingTop: '55%'}} />
            </Skeleton>
            <Skeleton width="60%">
                <Typography>.</Typography>
            </Skeleton>
            <Skeleton width="80%">
                <Typography>.</Typography>
            </Skeleton>
        </Box>
    )
}