import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Appointment from "../models/Appointment";

const useAppointments = (
  patientId: string,
  page: number,
  rowsPerPage: number
) => {
  const apiClient = new APIClient<Appointment>(
    `/patients/${patientId}/appointments`
  );

  return useQuery({
    queryKey: ["appointments", { patientId, page, rowsPerPage }],
    queryFn: () =>
      apiClient.getAll({
        params: {
          limit: rowsPerPage,
          page: page,
        },
      }),
  });
};

export default useAppointments;
