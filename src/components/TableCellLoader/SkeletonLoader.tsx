import React from 'react';
import { TableCell } from "./TableCell";
import Box from '@material-ui/core/Box';

interface LoaderProps{
    size?: number;
}
const SkeletonLoader: React.FC<LoaderProps> = ({ size }: LoaderProps) => (
        <Box display="flex" width="100%">
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />

        </Box>
    )

    export default SkeletonLoader;
