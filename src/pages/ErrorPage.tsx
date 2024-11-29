import {
  isRouteErrorResponse,
  Navigate,
  useRouteError,
} from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import useCurrentUser from "../hooks/useCurrentUser";

const ErrorPage = () => {
  const error = useRouteError();
  const { data, isLoading } = useCurrentUser();
  if (isLoading) return <CircularProgress />;
  if (!isLoading && !data) return <Navigate to="/login" />;

  return (
    <>
      <NavBar user={data!.data} />
      <Box padding={5}>
        <Typography variant="h1">Oops</Typography>
        <Typography>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error occurred."}
        </Typography>
      </Box>
    </>
  );
};

export default ErrorPage;
