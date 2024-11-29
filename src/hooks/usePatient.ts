import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import Patient from "../models/Patient";

const apiClient = new APIClient<Patient>("/patients");

const usePatient = (id: string) =>
  useQuery({
    queryKey: ["patient", id],
    queryFn: () => apiClient.get(id),
  });

export default usePatient;
