import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Diagnosis from "../models/Diagnosis";

const useDiagnoses = (patientId: string, page: number, rowsPerPage: number) => {
  const apiClient = new APIClient<Diagnosis>(
    `/patients/${patientId}/diagnoses`
  );

  return useQuery({
    queryKey: ["diagnoses", { patientId, page, rowsPerPage }],
    queryFn: () =>
      apiClient.getAll({
        params: {
          limit: rowsPerPage,
          page: page,
        },
      }),
    // staleTime: 10 * 1000,
  });
};

export default useDiagnoses;
