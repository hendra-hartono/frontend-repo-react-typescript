import { Button, Stack } from "@mui/material";
import { Block, CalendarMonth, Medication, Topic } from "@mui/icons-material";

interface Props {
  onChoose: (type: string) => void;
}

const PatientAction = ({ onChoose }: Props) => {
  return (
    <>
      <Stack spacing={2}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Topic />}
          onClick={() => onChoose("diagnoses")}
        >
          View Diagnoses
        </Button>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<Medication />}
          onClick={() => onChoose("medications")}
        >
          View Medications
        </Button>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<Block />}
          onClick={() => onChoose("allergies")}
        >
          View Allergies
        </Button>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<CalendarMonth />}
          onClick={() => onChoose("appointments")}
        >
          View Appointments
        </Button>
      </Stack>
    </>
  );
};

export default PatientAction;
