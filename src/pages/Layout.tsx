import { Outlet, Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import NavBar from "../components/NavBar";
import useCurrentUser from "../hooks/useCurrentUser";

const Layout = () => {
  const { data, isLoading } = useCurrentUser();
  if (isLoading) return <CircularProgress />;
  if (!isLoading && !data) return <Navigate to="/login" />;

  return (
    <>
      <NavBar user={data!.data} />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
