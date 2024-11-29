import { useState } from "react";
import { useParams } from "react-router-dom";
import usePatient from "../hooks/usePatient";
import {
  CircularProgress,
  Box,
  Grid2,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import PatientDetail from "../components/PatientDetail";
import PatientAction from "../components/PatientAction";
import PatientRecordDiagnosis from "../components/PatientRecordDiagnosis";
import PatientRecordMedication from "../components/PatientRecordMedication";
import PatientRecordAllergy from "../components/PatientRecordAllergy";
import PatientRecordAppointment from "../components/PatientRecordAppointment";

const PatientDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = usePatient(id!);
  const [actionType, setActionType] = useState("");

  if (isLoading) return <CircularProgress />;
  if (error || !data) throw error;

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 8, md: 8 }}>
          <Card variant="outlined">
            <CardContent>
              <PatientDetail patient={data.data} />
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 4, md: 4 }}>
          <Box>
            <PatientAction onChoose={(type) => setActionType(type)} />
          </Box>
        </Grid2>
      </Grid2>
      <Divider sx={{ my: 2 }} />
      <Box>
        {actionType === "diagnoses" && (
          <PatientRecordDiagnosis patientId={data.data.id} />
        )}
        {actionType === "medications" && (
          <PatientRecordMedication patientId={data.data.id} />
        )}
        {actionType === "allergies" && (
          <PatientRecordAllergy patientId={data.data.id} />
        )}
        {actionType === "appointments" && (
          <PatientRecordAppointment patientId={data.data.id} />
        )}
      </Box>
    </>
  );
};

export default PatientDetailPage;
