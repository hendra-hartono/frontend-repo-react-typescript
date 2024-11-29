import { useState, ChangeEvent, MouseEvent } from "react";
import useAllergies from "../hooks/useAllergies";
import Allergy from "../models/Allergy";
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

const PatientRecordAllergy = ({ patientId }: Props) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data } = useAllergies(patientId, page, rowsPerPage);

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
        Allergies
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.data &&
              decryptData(data.data).map((allergy: Allergy) => (
                <TableRow key={allergy.id}>
                  <TableCell>{allergy.name}</TableCell>
                  <TableCell>
                    {format(allergy.createdAt, "dd-MM-yyyy")}
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

export default PatientRecordAllergy;
