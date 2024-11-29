import { ChangeEvent, MouseEvent, FormEvent, useState, useRef } from "react";
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
  Box,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import usePatients from "../hooks/usePatients";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";

const PatientPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [patientSearch, setPatientSearch] = useState("");
  const patientRef = useRef<HTMLInputElement>(null);
  const { data } = usePatients(page, rowsPerPage, patientSearch);

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

  const handleSearchName = (event: FormEvent) => {
    event.preventDefault();
    if (patientRef.current) setPatientSearch(patientRef.current.value);
  };

  return (
    <>
      <Typography variant="h5" marginBottom={2}>
        Patients
      </Typography>

      <Box component="form" onSubmit={handleSearchName} sx={{ mb: 2 }}>
        <TextField
          inputRef={patientRef}
          placeholder="Search patient"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.data.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <Link
                      to={`/${patient.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {patient.name}
                    </Link>
                  </TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
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

export default PatientPage;
