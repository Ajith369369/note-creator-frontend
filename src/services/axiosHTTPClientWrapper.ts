import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

export const axiosHTTPClientWrapper = async (
  reqmethod: string,
  url: string,
  reqBody: unknown,
  reqHeader?: Record<string, string>
): Promise<AxiosResponse> => {
  const reqConfig: AxiosRequestConfig = {
    method: reqmethod,
    url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
  };

  // Axios send to backend
  return await axios(reqConfig)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
};
