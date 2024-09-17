import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { adminDataApi } from "../services/nc_allApi";
import useAuthGuard from '../pages/useAuthGuard';
import "./Admin.css";

function Admin() {
  // Check if user is authenticated
  useAuthGuard(); 

  // useDispatch() is a hook provided by React-Redux. It returns a reference to the dispatch function from the Redux store.
  // By calling useDispatch(), we can dispatch actions from within our React component.

  // Initializes the state variable allUsers with an empty array. This state will hold the booking details of all users fetched from the API.
  const [allUsers, setAllUsers] = useState([]);

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
      console.log("result.data.usersWithLastNoteDate: ", result.data.usersWithLastNoteDate);

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

  /* const handleDeleteUser = async (id) => {
    await deleteBookingDetailsOfAUserApi(id);
    getAdminDashboardData();
  }; */

  // The function call inside the useEffect hook triggers the getAdminDashboardData function as soon as the component (the specific React component in which the useEffect is defined, i.e., <Admin/>) is mounted (rendered for the first time).
  // The empty array [] as the second argument means that this effect will only run once when the component first mounts.
  useEffect(() => {
    getAdminDashboardData();
  }, []);

  return (
    <>
      <div className="admin-container row w-100 m-0 my-2 d-flex flex-column justify-content-start align-items-center">
        <div className="dash-home d-flex justify-content-center align-items-center p-md-5">
          <h1 className="text-dark dash fw-bold">DASHBOARD</h1>
        </div>
        <div className="row w-100">
          <div className="col-sm-0 col-md-1"></div>
          <div className="col-sm-12 col-md-10 d-flex flex-column justify-content-center table-container mx-2 my-2">
            <table className="table table-dark table-striped table-hover align-middle table-responsive m-0 p-4">
              <thead className="text-center align-middle">
                <tr>
                  <th>Sl. No.</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Number 0f Notes</th>
                  <th>Last Active Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {allUsers.length > 0 && (
                <tbody className="table-group-divider">
                  {allUsers?.map((item, index) => (
                    <tr key={item._id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{item?.username}</td>
                      <td>{item?.email}</td>
                      <td className="text-center">{item?.notes_number}</td>
                      <td className="text-center">
                        {dateFormatter(item?.last_active_date)}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(item.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {allUsers.length == 0 && (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p className="text-danger text-center fs-3 fw-bolder w-100">
                  No Booking Details
                </p>
                {/* <Button
                  onClick={loadDefaultBookingDetails}
                  variant="light"
                  className="px-4"
                  style={{ backgroundColor: "white", width: "150px" }}
                >
                  Load Default Data
                </Button> */}
              </div>
            )}
          </div>
          <div className="col-sm-0 col-md-1"></div>
        </div>
      </div>
    </>
  );
}

export default Admin;
