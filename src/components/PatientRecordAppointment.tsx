import { useState, ChangeEvent, MouseEvent } from "react";
import useAppointments from "../hooks/useAppointments";
import { format } from "date-fns";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
} from "@mui/material";

interface Props {
  patientId: string;
}

const PatientRecordAppointment = ({ patientId }: Props) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data } = useAppointments(patientId, page, rowsPerPage);

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
      <Typography
        variant="h6"
        sx={{ textTransform: "capitalize", marginBottom: 2 }}
      >
        Appointments
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Room Number</TableCell>
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
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
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

export default PatientRecordAppointment;
