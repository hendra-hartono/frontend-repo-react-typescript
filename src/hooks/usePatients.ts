import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Patient from "../models/Patient";

const apiClient = new APIClient<Patient>("/patients");

const usePatients = (
  page: number,
  rowsPerPage: number,
  patientSearch: string
) =>
  useQuery({
    queryKey: ["patients", { page, rowsPerPage, patientSearch }],
    queryFn: () =>
      apiClient.getAll({
        params: {
          limit: rowsPerPage,
          page: page,
          search: patientSearch,
        },
      }),
    // staleTime: 10 * 1000,
  });

export default usePatients;
