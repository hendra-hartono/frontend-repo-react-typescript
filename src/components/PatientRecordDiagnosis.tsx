import { useState, ChangeEvent, MouseEvent } from "react";
import useDiagnoses from "../hooks/useDiagnoses";
import Diagnosis from "../models/Diagnosis";
import { decryptData } from "../services/encryption";
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

const PatientRecordDiagnosis = ({ patientId }: Props) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data } = useDiagnoses(patientId, page, rowsPerPage);

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
        Diagnostic Record
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.data &&
              decryptData(data.data).map((diagnosis: Diagnosis) => (
                <TableRow key={diagnosis.id}>
                  <TableCell>{diagnosis.name}</TableCell>
                  <TableCell>{diagnosis.description}</TableCell>
                  <TableCell>
                    {format(diagnosis.createdAt, "dd-MM-yyyy")}
                  </TableCell>
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

export default PatientRecordDiagnosis;
