import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/PatientPage";
import AppointmentPage from "./pages/AppointmentPage";
import PatientDetailPage from "./pages/PatientDetailPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <PatientPage /> },
      { path: "/:id", element: <PatientDetailPage /> },
      { path: "appointments", element: <AppointmentPage /> },
    ],
  },
]);

export default router;
