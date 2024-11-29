import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Medication from "../models/Medication";

const useMedications = (
  patientId: string,
  page: number,
  rowsPerPage: number
) => {
  const apiClient = new APIClient<Medication>(
    `/patients/${patientId}/medications`
  );

  return useQuery({
    queryKey: ["medications", { patientId, page, rowsPerPage }],
    queryFn: () =>
      apiClient.getAll({
        params: {
          limit: rowsPerPage,
          page: page,
        },
      }),
  });
};

export default useMedications;
