import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const LoadingSpinner: React.FC = () => {
  return (
    <Box sx={{ m: 4 }} textAlign={"center"}>
      <CircularProgress variant="indeterminate" size="8rem" />
    </Box>
  );
};
