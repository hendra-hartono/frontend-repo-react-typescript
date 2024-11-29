import { ChangeEvent, MouseEvent, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import useDoctorAppointments from "../hooks/useDoctorAppointments";
import useCurrentUser from "../hooks/useCurrentUser";
import { useSocket } from "../hooks/useSocket";
import Appointment from "../models/Appointment";

const AppointmentPage = () => {
  const { data: currentUser } = useCurrentUser();
  const doctorId = currentUser!.data.id;

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newAppointment, setNewAppointment] = useState<Appointment | null>(
    null
  );
  const { data } = useDoctorAppointments(
    doctorId,
    page,
    rowsPerPage,
    newAppointment
  );

  const { socket: socketTest, isConnected } = useSocket({
    endpoint: import.meta.env.VITE_API_URL,
    token: localStorage.getItem("ACCESS_TOKEN") || "",
  });

  socketTest.on("newAppointment", (data) => {
    setNewAppointment(data);
  });

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(1);
  };

  return (
    <>
      <Typography variant="h5" marginBottom={2}>
        Appointments
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Patient Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.data &&
              data.data.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{format(app.date, "EEE dd-MM-yyyy")}</TableCell>
                  <TableCell>{app.time}</TableCell>
                  <TableCell>{app.roomNumber}</TableCell>
                  <TableCell>{app.patient.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={data?.meta.totalItems! | 0}
                page={!data?.meta.totalItems ? 0 : page - 1}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default AppointmentPage;
