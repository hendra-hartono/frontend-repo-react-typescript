import { MedicalServices } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import User from "../models/User";
import { Link } from "react-router-dom";

const NavBar = ({ user }: { user: User }) => {
  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/login";
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MedicalServices
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NOSCAI
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            <Button>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Patients
              </Link>
            </Button>

            <Button>
              <Link
                to="/appointments"
                style={{ textDecoration: "none", color: "white" }}
              >
                Appointments
              </Link>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user && (
              <Button
                variant="text"
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={logout}
              >
                Log out ({user.name})
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
