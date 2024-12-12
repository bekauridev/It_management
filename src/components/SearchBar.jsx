import { Input, Box } from "@mui/joy";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <Box>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
