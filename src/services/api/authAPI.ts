import type { AxiosResponse } from "axios";
import { axiosHTTPClientWrapper } from "../axiosHTTPClientWrapper";
import { serverUrl } from "../nc_serverUrl";

// register
export const registerApi = async (reqBody: unknown): Promise<AxiosResponse> => {
  return await axiosHTTPClientWrapper(
    "POST",
    `${serverUrl}/register`,
    reqBody,
    undefined
  );
};

// login
export const loginApi = async (reqBody: unknown): Promise<AxiosResponse> => {
  return await axiosHTTPClientWrapper(
    "POST",
    `${serverUrl}/login`,
    reqBody,
    undefined
  );
};
