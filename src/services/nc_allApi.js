import { commonApi } from "./nc_commonApi";
import { serverUrl } from "./nc_serverUrl";

// register
export const registerApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/register`, reqBody, "");
};

// login
export const loginApi = async (reqBody) => {
  return await commonApi("POST", `${serverUrl}/login`, reqBody, "");
};

// add note of a user
// uploaded content requests need header.
export const addNoteOfAUserApi = async (reqBody, reqHeader) => {
  return await commonApi(
    "POST",
    `${serverUrl}/notes/user/add`,
    reqBody,
    reqHeader
  );
};

// get all notes of all users
export const getAllNotesOfAllUsersApi = async () => {
  return await commonApi("GET", `${serverUrl}/notes/all`, "", "");
};

// get all notes of a user
/* export const getAllNotesOfAUserApi = async (reqHeader) => {
  return await commonApi("GET", `${serverUrl}/notes/user/all`, "", reqHeader);
}; */
export const getAllNotesOfAUserApi = async (searchKey, reqHeader) => {
  return await commonApi("GET", `${serverUrl}/notes/user/all?search=${searchKey}`, "", reqHeader);
};

// edit note of a user
export const editNoteOfAUserApi = async (noteId, reqBody, reqHeader) => {
  //id is passed as path parameter
  return await commonApi(
    "PUT",
    `${serverUrl}/notes/user/edit/${noteId}`,
    reqBody,
    reqHeader
  );
};

// delete note of a user
// {} (Empty Object) for reqBody: In most cases, for DELETE requests, it's common to send an empty object as the body if the library or framework expects a body parameter, even if it's not typically used in DELETE requests. Some libraries or implementations might require an object, even if it's empty.
// "" (Empty String) for reqBody: Using an empty string as the body for a DELETE request is not standard practice and may not be handled correctly by the API client or server. Most HTTP libraries expect either null or an empty object ({}) when there is no body content.
// Standard Practice: It is more conventional to use {} for DELETE requests when the body is expected to be an object. This is especially true if you are using a library or API client that expects an object for consistency.
export const deleteNoteOfAUserApi = async (noteId, reqHeader) => {
  return await commonApi(
    "DELETE",
    `${serverUrl}/notes/user/delete/${noteId}`,
    {},
    reqHeader
  );
};
