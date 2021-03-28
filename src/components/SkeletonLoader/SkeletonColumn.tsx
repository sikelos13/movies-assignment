import Box from '@material-ui/core/Box';
import { SkeletonCard } from './components/SkeletonCard';

export const SkeletonColumn = () => {
    return (
        <Box width="33%" mr={5} p={3}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </Box>
    )
}