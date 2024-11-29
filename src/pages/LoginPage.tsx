import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { MedicalServicesOutlined } from "@mui/icons-material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../components/ErrorMessage";
import APIClient, { AxiosError } from "../services/apiClient";

const schema = z.object({
  email: z.string().email("Invalid email."),
  password: z.string().min(1, "Password is required."),
});
type FormData = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const apiClient = new APIClient("/login");
      const result = await apiClient.login(data);
      localStorage.setItem("ACCESS_TOKEN", result.data.token);
      window.location.href = "/";
    } catch (err) {
      setSubmitting(false);
      if (err instanceof AxiosError) setError(err.response?.data.message);
      else setError("An unexpected error occured.");
    }
  });

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar sx={{ mx: "auto", textAlign: "center" }}>
          <MedicalServicesOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            placeholder="Enter email"
            fullWidth
            required
            autoFocus
            {...register("email")}
          />
          {<ErrorMessage>{errors.email?.message}</ErrorMessage>}

          <TextField
            placeholder="Enter password"
            fullWidth
            required
            type="password"
            sx={{ mt: 2 }}
            {...register("password")}
          />
          {<ErrorMessage>{errors.password?.message}</ErrorMessage>}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            Log in {isSubmitting && <CircularProgress />}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
