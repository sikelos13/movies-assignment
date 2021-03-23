import Box from '@material-ui/core/Box';
import { SkeletonCard } from './components/SkeletonCard';

export const TableCell = () => {
    return (
        <Box width="25%" mr={5}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </Box>
    )
}