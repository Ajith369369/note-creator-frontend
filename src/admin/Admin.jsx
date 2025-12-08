import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthGuard from "../pages/useAuthGuard";
import { adminDataApi, deleteUserAndNotesApi } from "../services/nc_allApi";

function Admin() {
  // Check if user is authenticated
  useAuthGuard();

  // useDispatch() is a hook provided by React-Redux. It returns a reference to the dispatch function from the Redux store.
  // By calling useDispatch(), we can dispatch actions from within our React component.

  // Initializes the state variable allUsers with an empty array. This state will hold the booking details of all users fetched from the API.
  const [allUsers, setAllUsers] = useState([]);

  const [deleteStatus, setDeleteStatus] = useState("");

  // Initializes the state variable defaultUsers with an empty array. This state will hold the default booking details fetched from the API.
  // const [defaultUsers, setDefaultUsers] = useState([]);

  // Get the admin dashboard data
  const getAdminDashboardData = async () => {
    // Retrieves a token from the browser's sessionStorage.
    // The token is used for authentication, verifying that the user is allowed to perform the action (adding a project).
    const token = sessionStorage.getItem("token");

    if (token) {
      // This defines the headers for the HTTP request
      const reqHeader = {
        // "Content-Type": "multipart/form-data" is used to send requests with uploaded content.
        // Select form-data in body section in Postman.
        // Bearer - No other certificate is required to verify this token.
        // iat : Time atwhich token is generated.
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Calls the API function adminDataApi to fetch data and waits for the response. The await keyword pauses execution until the promise resolves.
      const result = await adminDataApi(reqHeader);
      console.log("result: ", result);
      console.log(
        "result.data.usersWithLastNoteDate: ",
        result.data.usersWithLastNoteDate
      );

      if (result.status >= 200 && result.status < 300) {
        // Updates the allUsers state with the data fetched from the API.
        setAllUsers(result.data.usersWithLastNoteDate);
      }
    }
  };

  // Add default data to the database (db.json)
  /* const addDefaultDataToDatabase = async () => {
    // Starts a try block to catch any errors that might occur during the execution of the code inside it.
    try {
      // Use map to create an array of promises.
      // Maps over the defaultUsers array to create an array of promises. Each promise represents an API call to add a booking detail.
      const promises = defaultUsers.map(async (item) => {
        // Await the result of the API call
        // Calls addBookingDetailsOfAUserApi for each item (default booking detail) and waits for it to complete.
        // The await keyword pauses execution until the promise resolves.
        await addBookingDetailsOfAUserApi(item);
      });

      // Wait for all promises to resolve
      // Waits for all the promises to resolve. This ensures that all default booking details are added before proceeding.
      await Promise.all(promises);

      // Logs a message to indicate that all default data has been successfully added.
      console.log("All default data has been added to the database.");

      // Get the updated booking details
      // Calls getAdminDashboardData to fetch the updated list of booking details from the API, reflecting the newly added data.
      getAdminDashboardData();

      // Catches any errors that occur during the try block execution.
    } catch (error) {
      // Logs an error message to the console if an error occurs.
      console.error("Error adding default data to the database:", error);
    }
  }; */

  // Load default booking details from db.json
  /* const loadDefaultBookingDetails = async () => {
    // Starts a try block to catch any errors that might occur during the execution of the code inside it.
    try {
      // Calls getDefaultBookingDetailsApi to fetch default booking details and waits for the response.
      // The await keyword pauses execution until the promise resolves.
      const defaultData = await getDefaultBookingDetailsApi();
      if (defaultData.status >= 200 && defaultData.status < 300) {
        // Updates the defaultUsers state with the fetched default booking details.
        setDefaultUsers(defaultData.data);

        // Calls addDefaultDataToDatabase to add the default booking details to the database.
        await addDefaultDataToDatabase();
      }

      // Catches any errors that occur during the try block execution.
    } catch (error) {
      // Logs an error message to the console if an error occurs.
      console.error("Error loading default booking details:", error);
    }
  }; */

  const dateFormatter = (isoString) => {
    const date = new Date(isoString);

    // en-GB format gives dd/mm/yyyy
    const formattedDate = date.toLocaleDateString("en-GB");

    // Input: "2024-08-10T07:39:55.209Z"
    // Output: 10/08/2024
    console.log(formattedDate);
    return formattedDate;
  };

  const handleDeleteUser = async (user_id) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      // This defines the headers for the HTTP request
      const reqHeader = {
        // "Content-Type": "multipart/form-data" is used to send requests with uploaded content.
        // Select form-data in body section in Postman.
        // Bearer - No other certificate is required to verify this token.
        // iat : Time atwhich token is generated.
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await deleteUserAndNotesApi(user_id, reqHeader);
      if (result.status == 200) {
        console.log("Result of Delete operation: ", result);
        toast.success("User and his notes were deleted successfully.");
        setDeleteStatus(true);
      }
    }
  };

  // The function call inside the useEffect hook triggers the getAdminDashboardData function as soon as the component (the specific React component in which the useEffect is defined, i.e., <Admin/>) is mounted (rendered for the first time).
  // The empty array [] as the second argument means that this effect will only run once when the component first mounts.
  useEffect(() => {
    getAdminDashboardData();
  }, [deleteStatus]);

  return (
    <>
      <div className="w-full my-2 px-3 md:px-6 flex flex-col items-center">
        <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl flex justify-center items-center py-8 mb-6 shadow">
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            DASHBOARD
          </h1>
        </div>

        <div className="w-full">
          <div className="overflow-x-auto bg-white/70 rounded-xl shadow">
            <table className="min-w-full text-sm text-gray-800">
              <thead className="bg-gray-900 text-white text-center text-[16px] leading-6">
                <tr>
                  <th className="px-4 py-3">Sl. No.</th>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3">Number of Notes</th>
                  <th className="px-4 py-3">Last Active Date</th>
                  <th className="px-4 py-3">Last Active</th>
                  <th className="px-4 py-3">Delete</th>
                </tr>
              </thead>
              {allUsers.length > 0 && (
                <tbody className="divide-y divide-gray-200">
                  {allUsers?.map((item, index) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-center font-medium">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3">{item?.username}</td>
                      <td className="px-4 py-3">{item?.email}</td>
                      <td className="px-4 py-3 text-center">
                        {item?.notes_number}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {dateFormatter(item?.last_active_date)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item?.last_active_date &&
                          formatDistanceToNow(parseISO(item?.last_active_date))}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item?.username !== "admin" && (
                          <button
                            className="inline-flex items-center justify-center rounded-md bg-red-600 text-white px-3 py-2 text-sm font-semibold hover:bg-red-700 transition"
                            onClick={() => handleDeleteUser(item._id)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {allUsers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 px-4">
                <p className="text-red-600 text-center text-xl font-bold w-full">
                  No Notes Were Found!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoclose={1000} />
    </>
  );
}

export default Admin;
