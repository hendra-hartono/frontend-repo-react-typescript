import {
  EmailOutlined,
  Person,
  PhoneIphoneOutlined,
  Wc,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import Patient from "../models/Patient";

const PatientDetail = ({ patient }: { patient: Patient }) => {
  return (
    <>
      <Typography variant="h5">{patient.name}</Typography>
      <Box sx={{ my: 2 }}>
        <Stack direction="row" gap={2} sx={{ mb: 2 }}>
          <EmailOutlined />
          <Typography component="p">{patient.email}</Typography>
        </Stack>
        <Stack direction="row" gap={2} sx={{ mb: 2 }}>
          <PhoneIphoneOutlined />
          <Typography component="p">{patient.phone}</Typography>
        </Stack>
        <Stack direction="row" gap={2} sx={{ mb: 2 }}>
          <Person />
          <Typography component="p">{patient.age}</Typography>
        </Stack>
        <Stack direction="row" gap={2}>
          <Wc />
          <Typography component="p">{patient.gender}</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default PatientDetail;
