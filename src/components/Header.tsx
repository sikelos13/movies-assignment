import React from 'react';
import { Input } from '@material-ui/core';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Box, FormLabel } from '@material-ui/core';
import { SortType } from "../containers/MoviesView";
import { Pagination } from "../api/types/Pagination";

interface ViewHeaderProps {
  handleSearch: (event: any) => void;
  handleSortChange: (event: any) => void;
  sortMoviesBy: SortType;
  searchTerm: string;
  isSearching: boolean;
  pagination: Pagination;
}

const Header: React.FC<ViewHeaderProps> = (({ handleSearch, sortMoviesBy, isSearching, pagination, handleSortChange }: ViewHeaderProps) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <Box component="h2" fontWeight="500" fontSize="2rem" color="#3569b8">Welcome to MoviesRama</Box>
    <Box component="h3" fontWeight="500" fontSize="1.5rem" color="#3569b8">Click on the movie card to unveil more details</Box>
    <Box display="flex" width="100%" flexDirection="column" alignItems="center" p={1} className="Header_Actions">
      <Input placeholder="Search movies by name..." className="Search_Input" onChange={handleSearch} />
      {pagination.total_pages > 0 &&
        <Box className="SortHeader_Action" mt="10px">
        <Box component={FormLabel} mr="10px">Sort by</Box>
          <NativeSelect
              value={sortMoviesBy}
              onChange={handleSortChange}
              disabled={isSearching}
          >
              <option value="">Default</option>
              <option value="highest_vote_average">By Highest vote</option>
              <option value="lowest_vote_average">By Lowest vote</option>
          </NativeSelect>
        </Box>
      }
    </Box>
  </Box>
));

export default Header;