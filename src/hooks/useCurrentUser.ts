import { useQuery } from "@tanstack/react-query";
import User from "../models/User";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<User>("/users/current");

const useCurrentUser = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: apiClient.getCurrentUser,
    retry: false,
  });

export default useCurrentUser;
