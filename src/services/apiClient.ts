import axios, { AxiosRequestConfig, AxiosError } from "axios";

interface Meta {
  totalItems: number;
  itemCount: number;
  limit: number;
  currentPage: number;
  totalPages: number;
}

export interface FetchResponse<T> {
  meta: Meta;
  message: string | null;
  data: T[];
}

export interface FetchSingleResponse<T> {
  message: string | null;
  data: T;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  login = (payload: { email: string; password: string }) => {
    return axiosInstance.post(this.endpoint, payload).then((res) => res.data);
  };

  getCurrentUser = () => {
    return axiosInstance
      .get<FetchSingleResponse<T>>(this.endpoint)
      .then((res) => res.data);
  };

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<FetchSingleResponse<T>>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
}

export default APIClient;
export { AxiosError };
