import { SkeletonColumn } from "./SkeletonColumn";
import Box from '@material-ui/core/Box';

export const SkeletonLoader = () => (
    <Box display="flex" width="100%" justifyContent="space-between">
        <SkeletonColumn />
        <SkeletonColumn />
        <SkeletonColumn />
    </Box>
)