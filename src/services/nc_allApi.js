import { serverUrl } from './nc_serverUrl';
import { commonApi } from './nc_commonApi';


// register
export const registerApi = async(reqBody) => {
  return await commonApi('POST', `${serverUrl}/register`, reqBody, "")
};

// login
export const loginApi = async(reqBody) => {
  return await commonApi('POST', `${serverUrl}/login`, reqBody, "")
};

// add project
// uploaded content requests need header.
export const addProjectApi = async(reqBody, reqHeader) => {
  return await commonApi('POST', `${serverUrl}/add-project`, reqBody, reqHeader)
};

// home project
export const homeProjectApi = async() => {
  return await commonApi('GET', `${serverUrl}/home-project`, "", "")
};

// all project
export const allProjectApi = async() => {
  return await commonApi('GET', `${serverUrl}/all-project`, "", "")
};
