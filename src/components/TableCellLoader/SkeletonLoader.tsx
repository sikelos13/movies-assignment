import { TableCell } from "./TableCell";
import Box from '@material-ui/core/Box';

export const SkeletonLoader = () => (
    <Box display="flex" width="100%" justifyContent="space-between">
        <TableCell />
        <TableCell />
        <TableCell />
    </Box>
)