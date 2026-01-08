import useScrollToTop from "@/hooks/useScrollToTop";
import { adminDataApi, deleteUserAndNotesApi } from "@/services/api";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface User {
  _id: string;
  username: string;
  email: string;
  notes_number: number;
  last_active_date: string;
}

function Admin() {
  useScrollToTop();
  // useDispatch() is a hook provided by React-Redux. It returns a reference to the dispatch function from the Redux store.
  // By calling useDispatch(), we can dispatch actions from within our React component.

  // Initializes the state variable allUsers with an empty array. This state will hold the booking details of all users fetched from the API.
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Initializes the state variable defaultUsers with an empty array. This state will hold the default booking details fetched from the API.
  // const [defaultUsers, setDefaultUsers] = useState([]);

  // Get the admin dashboard data
  // Memoized with useCallback to prevent unnecessary re-renders and satisfy React's exhaustive-deps rule
  const getAdminDashboardData = useCallback(async () => {
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
  }, []);

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

  const dateFormatter = (isoString: string): string => {
    const date = new Date(isoString);

    // en-GB format gives dd/mm/yyyy
    const formattedDate = date.toLocaleDateString("en-GB");

    // Input: "2024-08-10T07:39:55.209Z"
    // Output: 10/08/2024
    console.log(formattedDate);
    return formattedDate;
  };

  const handleDeleteUser = async (user_id: string) => {
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
      if (result.status === 200) {
        console.log("Result of Delete operation: ", result);
        toast.success("User and his notes were deleted successfully.");
        // Refresh dashboard data after successful delete
        await getAdminDashboardData();
      }
    }
  };

  // Fetch dashboard data on component mount
  // Note: getAdminDashboardData calls setState asynchronously (after API response),
  // so this is safe and follows React best practices for data fetching
  useEffect(() => {
    getAdminDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalNotes = allUsers.reduce(
    (sum, user) => sum + (user?.notes_number || 0),
    0
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-emerald-500/10 backdrop-blur-2xl">
          <div className="pointer-events-none absolute -left-16 -top-14 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 top-10 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-10 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="relative space-y-8 px-4 py-8 sm:px-8 lg:px-10">
            <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/80">
                  Admin dashboard
                </p>
                <h1 className="mt-2 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                  Control, clarity, and calm
                </h1>
                <p className="mt-3 max-w-3xl text-sm text-slate-200/80">
                  Review users, monitor activity, and keep your workspace
                  pristine with an elegant glassy overview.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:w-[360px]">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner backdrop-blur-lg">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-100/70">
                    Users
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {allUsers.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner backdrop-blur-lg">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-100/70">
                    Notes
                  </p>
                  <p className="mt-2 text-2xl font-semibold">{totalNotes}</p>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-inner backdrop-blur-lg">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-100/70">
                    Status
                  </p>
                  <p className="mt-2 text-sm font-semibold text-emerald-200">
                    Live
                  </p>
                </div>
              </div>
            </header>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-slate-100">
                  <thead className="bg-white/10 text-[13px] uppercase tracking-[0.1em] text-emerald-100">
                    <tr>
                      <th className="px-4 py-4 text-left">Sl. No.</th>
                      <th className="px-4 py-4 text-left">Username</th>
                      <th className="px-4 py-4 text-left">Email</th>
                      <th className="px-4 py-4 text-center">Notes</th>
                      <th className="px-4 py-4 text-center">
                        Last Active Date
                      </th>
                      <th className="px-4 py-4 text-center">Last Active</th>
                      <th className="px-4 py-4 text-center">Delete</th>
                    </tr>
                  </thead>
                  {allUsers.length > 0 && (
                    <tbody className="divide-y divide-white/5">
                      {allUsers?.map((item, index) => (
                        <tr
                          key={item._id}
                          className="transition hover:bg-white/5 hover:backdrop-blur"
                        >
                          <td className="px-4 py-4 font-medium text-slate-50/90 text-center">
                            {index + 1}
                          </td>
                          <td className="px-4 py-4 text-slate-50">
                            {item?.username}
                          </td>
                          <td className="px-4 py-4 text-slate-100/80">
                            {item?.email}
                          </td>
                          <td className="px-4 py-4 text-center text-emerald-200">
                            {item?.notes_number}
                          </td>
                          <td className="px-4 py-4 text-center text-slate-100/80">
                            {dateFormatter(item?.last_active_date)}
                          </td>
                          <td className="px-4 py-4 text-center text-slate-100/80">
                            {item?.last_active_date &&
                              formatDistanceToNow(
                                parseISO(item?.last_active_date)
                              )}
                          </td>
                          <td className="px-4 py-4 text-center">
                            {item?.username !== "admin" && (
                              <button
                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-red-600 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-rose-500/30 transition hover:shadow-rose-400/40 active:translate-y-[1px]"
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
              </div>
              {allUsers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                  <p className="text-lg font-semibold text-emerald-100">
                    No notes were found
                  </p>
                  <p className="mt-2 text-sm text-slate-200/80">
                    Users and their note activity will appear here once
                    available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Admin;
