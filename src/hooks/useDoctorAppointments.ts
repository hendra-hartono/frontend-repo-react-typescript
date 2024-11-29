import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Appointment from "../models/Appointment";

const useDoctorAppointments = (
  doctorId: string,
  page: number,
  rowsPerPage: number,
  newAppointment: Appointment | null
) => {
  const apiClient = new APIClient<Appointment>(
    `/doctors/${doctorId}/appointments`
  );

  return useQuery({
    queryKey: [
      "doctorAppointments",
      { doctorId, page, rowsPerPage, newAppointment },
    ],
    queryFn: () =>
      apiClient.getAll({
        params: {
          limit: rowsPerPage,
          page: page,
        },
      }),
  });
};

export default useDoctorAppointments;
