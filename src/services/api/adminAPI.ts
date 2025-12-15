import type { AxiosResponse } from "axios";
import { axiosHTTPClientWrapper } from "../axiosHTTPClientWrapper";
import { serverUrl } from "../nc_serverUrl";

// get data for admin dashboard
export const adminDataApi = async (
  reqHeader: Record<string, string>
): Promise<AxiosResponse> => {
  console.log("Inside adminDataApi.");
  return await axiosHTTPClientWrapper(
    "GET",
    `${serverUrl}/profile-home/admin`,
    "",
    reqHeader
  );
};

// #region Multi-line Comment
/**
 * delete user and all his notes.
 */
// #endregion
export const deleteUserAndNotesApi = async (
  userId: string,
  reqHeader: Record<string, string>
): Promise<AxiosResponse> => {
  console.log("Inside deleteUserAndNotesApi().");
  return await axiosHTTPClientWrapper(
    "DELETE",
    `${serverUrl}/profile-home/admin/user/delete/${userId}`,
    {},
    reqHeader
  );
};
