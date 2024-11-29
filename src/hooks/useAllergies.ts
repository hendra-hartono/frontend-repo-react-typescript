import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Allergy from "../models/Allergy";

const useAllergies = (patientId: string, page: number, rowsPerPage: number) => {
  const apiClient = new APIClient<Allergy>(`/patients/${patientId}/allergies`);

  return useQuery({
    queryKey: ["allergies", { patientId, page, rowsPerPage }],
    queryFn: () =>
      apiClient.getAll({
        params: {
          limit: rowsPerPage,
          page: page,
        },
      }),
  });
};

export default useAllergies;
