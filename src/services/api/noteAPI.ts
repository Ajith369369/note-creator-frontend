import type { AxiosResponse } from "axios";
import { axiosHTTPClientWrapper } from "../axiosHTTPClientWrapper";
import { serverUrl } from "../nc_serverUrl";

// add note of a user
// uploaded content requests need header.
export const addNoteOfAUserApi = async (
  reqBody: unknown,
  reqHeader: Record<string, string>
): Promise<AxiosResponse> => {
  console.log("Inside addNoteOfAUserApi()");
  return await axiosHTTPClientWrapper(
    "POST",
    `${serverUrl}/notes/user/add`,
    reqBody,
    reqHeader
  );
};

// get all notes of all users
export const getAllNotesOfAllUsersApi = async (): Promise<AxiosResponse> => {
  return await axiosHTTPClientWrapper(
    "GET",
    `${serverUrl}/notes/all`,
    undefined,
    undefined
  );
};

// get all notes of a user
/* export const getAllNotesOfAUserApi = async (reqHeader) => {
  return await axiosHTTPClientWrapper("GET", `${serverUrl}/notes/user/all`, "", reqHeader);
}; */
/* export const getAllNotesOfAUserApi = async (searchKey, reqHeader) => {
  return await axiosHTTPClientWrapper("GET", `${serverUrl}/notes/user/all?search=${searchKey}`, "", reqHeader);
}; */
export const getAllNotesOfAUserApi = async (
  searchKey: string,
  reqHeader: Record<string, string>
): Promise<AxiosResponse> => {
  // console.log("Inside getAllNotesOfAUserApi()");
  return await axiosHTTPClientWrapper(
    "GET",
    `${serverUrl}/notes/user/all?search=${searchKey}`,
    "",
    reqHeader
  );
};

export const getANoteOfAUserApi = async (
  noteId: string
): Promise<AxiosResponse> => {
  return await axiosHTTPClientWrapper(
    "GET",
    `${serverUrl}/notes/user/${noteId}`,
    undefined,
    undefined
  );
};

// edit note of a user
export const editNoteOfAUserApi = async (
  noteId: string,
  reqBody: unknown,
  reqHeader: Record<string, string>
): Promise<AxiosResponse> => {
  //id is passed as path parameter
  return await axiosHTTPClientWrapper(
    "PUT",
    `${serverUrl}/notes/user/edit/${noteId}`,
    reqBody,
    reqHeader
  );
};

// #region Multi-line Comment
/**
 * delete note of a user
 *
 * {} (Empty Object) for reqBody: In most cases, for DELETE requests, it's common to send an empty object as the body if the library or framework expects a body parameter, even if it's not typically used in DELETE requests. Some libraries or implementations might require an object, even if it's empty.
 *
 * "" (Empty String) for reqBody: Using an empty string as the body for a DELETE request is not standard practice and may not be handled correctly by the API client or server. Most HTTP libraries expect either null or an empty object ({}) when there is no body content.
 *
 * Standard Practice: It is more conventional to use {} for DELETE requests when the body is expected to be an object. This is especially true if you are using a library or API client that expects an object for consistency.
 */
// #endregion
export const deleteNoteOfAUserApi = async (
  noteId: string,
  reqHeader: Record<string, string>
): Promise<AxiosResponse> => {
  return await axiosHTTPClientWrapper(
    "DELETE",
    `${serverUrl}/notes/user/delete/${noteId}`,
    {},
    reqHeader
  );
};
