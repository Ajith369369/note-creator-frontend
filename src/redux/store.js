// #region Multi-line Comment
/**
 * In a Redux store, the entire application's state is represented by a single JavaScript object, often called the "global state" or "store."
 * This global state is usually divided into smaller sections, or slices, each managed by a different reducer.
 * Each slice represents a distinct part of the application’s state.
 * In our application, noteDetails is one of those slices of the global state.
 *
 * The store is the centralized place where the entire state of your application is kept.
 * The store is the central hub for state in a Redux application. It holds the application's state, and provides methods to access the state, dispatch actions, and subscribe to state changes.
 * The Redux store is created using configureStore from @reduxjs/toolkit.
 * The store holds the state and allows the state to be accessed and updated by dispatching actions.
 */
// #endregion

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import noteReducer from "./slices/noteSlice";

// #region Multi-line Comment
/**
 * const loadState = () => {: This defines a function called loadState that returns the previously saved Redux state from sessionStorage.
 * If the state isn't found or there is an error, it returns undefined.
 *
 * The function loadState attempts to retrieve and parse the Redux state from sessionStorage.
 * If the state is found and successfully parsed, it's returned as a JavaScript object.
 * If no state is found or an error occurs (e.g., corrupted data), the function returns undefined, signaling Redux to use its default initial state.
 */
// #endregion
const loadState = () => {
  try {
    // #region Multi-line Comment
    /**
     * const serializedState = sessionStorage.getItem("reduxState");: This retrieves the serialized (stringified) Redux state from sessionStorage using sessionStorage.getItem("reduxState").
     * sessionStorage is a browser-provided storage object, and getItem allows you to retrieve a value by its key—in this case, "reduxState".
     * The result is stored in the variable serializedState. If no state is found, serializedState will be null.
     */
    // #endregion
    const serializedState = sessionStorage.getItem("reduxState");

    // #region Multi-line Comment
    /**
     * if (serializedState === null) {: This checks if the serializedState is null.
     * This would happen if there is no reduxState saved in sessionStorage yet.
     * If null, it means no previous state has been stored, and the function should return undefined.
     * Returning undefined tells Redux that there is no persisted state, so Redux will use its initial state.
     */
    // #endregion
    if (serializedState === null) {
      return undefined;
    }

    // #region Multi-line Comment
    /**
     * return JSON.parse(serializedState);: If serializedState is not null, this line parses the string into a JavaScript object using JSON.parse().
     * This converts the previously serialized (stringified) Redux state back into its original state structure.
     * The parsed state is then returned.
     */
    // #endregion
    return JSON.parse(serializedState);
  } catch (err) {
    // #region Multi-line Comment
    /**
     * console.error("Could not load state", err);: If an error is caught, this line logs the error to the console for debugging purposes.
     * It provides both a custom message ("Could not load state") and the actual error (err) that occurred.
     */
    // #endregion
    console.error("Could not load state", err);

    // #region Multi-line Comment
    /**
     * return undefined;: If an error occurs (e.g., parsing failure or storage access error), the function returns undefined to signal that no valid state could be loaded.
     * This ensures that Redux will use the default initial state instead of an invalid state.
     */
    // #endregion
    return undefined;
  }
};

// #region Multi-line Comment
/**
 * const saveState = (state) => {: This defines an arrow function named saveState, which takes a state parameter.
 * The purpose of this function is to save the current Redux state to the browser's sessionStorage.
 */
// #endregion
const saveState = (state) => {
  try {
    // #region Multi-line Comment
    /**
     * const serializedState = JSON.stringify(state);: This line converts the Redux state (which is a JavaScript object) into a JSON string using JSON.stringify.
     * This process is known as serialization, and it allows complex JavaScript objects to be stored as strings in sessionStorage.
     * The result, which is a string, is stored in the variable serializedState.
     */
    // #endregion
    const serializedState = JSON.stringify(state);

    // #region Multi-line Comment
    /**
     * sessionStorage.setItem("reduxState", serializedState);: This line saves the serialized state string into the browser's sessionStorage under the key "reduxState".
     *
     * sessionStorage.setItem is a method that stores a key-value pair in sessionStorage:
     * The key is "reduxState", and the value is the serialized state (serializedState).
     *
     * Now, the state will persist in sessionStorage even if the page is reloaded, but it will be cleared when the browser or tab is closed.
     */
    // #endregion
    sessionStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // #region Multi-line Comment
    /**
     * console.error("Could not save state", err);: If an error is caught, this line logs the error to the console.
     * The custom message "Could not save state" helps identify the problem, and err provides additional details about the error.
     */
    // #endregion
    console.error("Could not save state", err);
  }
};

// #region Multi-line Comment
/**
 * Configure the store.
 * This code creates a Redux store using configureStore.
 * Two reducers, noteReducer and authReducer, manage the state slices noteDetails and auth respectively.
 * The preloadedState option initializes the store with the state loaded from sessionStorage (or a default state if no data is found).
 *
 * const store = configureStore({: This line initializes a Redux store by calling configureStore(), a function provided by Redux Toolkit.
 * store is the constant where the configured Redux store instance is assigned.
 * configureStore is a more simplified and convenient way to set up a Redux store compared to using createStore directly.
 * It includes sensible defaults and setups for better development experiences.
 */
// #endregion
const store = configureStore({
  // #region Multi-line Comment
  /**
   * The reducer field specifies the root reducer for the Redux store.
   * The reducer object can hold multiple slices (or pieces) of state, each handled by a separate reducer function. Each key-value pair in this object represents a slice of state and its associated reducer.
   *
   * The root reducer combines various slices into a single state tree.
   * The reducer property in the configureStore function is where we specify the root reducer for our Redux store.
   * The root reducer is essentially an object that combines all of our individual slice reducers into one. Each slice reducer is responsible for managing a specific part of the state.
   *
   * reducer: This key contains all the reducers responsible for managing different parts of the application state.
   * The reducer key in configureStore specifies the root reducer, which combines multiple slice reducers.
   * This setup organizes our state into logical sections, each managed by its own reducer.
   */
  // #endregion
  reducer: {
    // #region Multi-line Comment
    /**
     * This line specifies that the slice of state, named noteDetails will be managed by noteReducer.
     * noteReducer is the reducer function that handles actions related to the noteDetails slice of the state (for example, fetching note details, updating a note, etc.).
     *
     * The line noteDetails: noteReducer tells Redux to manage the noteDetails slice of the state using the noteReducer.
     * "noteDetails" is the name of the slice.
     *
     * Here, noteReducer is handling the state slice named noteDetails.
     * Key (noteDetails): This is the name of the slice of state that will be managed by the noteReducer. This means that all state managed by noteReducer will be stored under state.noteDetails in the Redux store.
     * Value (noteReducer): This is the reducer function that will handle actions related to the noteDetails slice of state. The noteReducer was imported from noteSlice.js, where it was created using createSlice().
     *
     * By defining noteDetails: noteReducer, we're telling Redux that, a part of our global state should be managed by the noteReducer, and this part of the state should be accessible under the "noteDetails" key.
     * If you dispatch an action handled by noteReducer, Redux will update the noteDetails slice of the state accordingly.
     */
    // #endregion
    noteDetails: noteReducer,
    auth: authReducer,
  },

  // #region Multi-line Comment
  /**
   * Redux Toolkit comes with a middleware that warns you if you attempt to include non-serializable data in your actions or state. You can customize this middleware to ignore specific paths or actions if necessary.
   * middleware: Middleware is a way to customize the dispatch process. Here, it's configured to ignore serialization checks for specific actions and state paths.
   * This is useful because certain parts of our state (like pickup_date, which is a Day.js object) may not be serializable by default, and Redux Toolkit expects state to be serializable.
   * The serializableCheck middleware is customized to ignore certain actions or fields that may contain non-serializable values, allowing you to bypass the warnings if you know what you're doing.
   */
  // #endregion

  // #region Multi-line Comment
  /* middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['noteDetails/updateBookingFormState'], // Add any actions you want to ignore
          ignoredPaths: ['noteDetails.bookingFormState.pickup_date'], // Add any state paths you want to ignore
        },
      }), */
  // #endregion

  // #region Multi-line Comment
  /**
   * Load the state from sessionStorage when the store is created.
   * preloadedState: loadState(),: preloadedState allows the store to be initialized with a specific initial state.
   * Here, it is calling the loadState() function, which fetches the previously saved state from sessionStorage.
   * If the loadState() function returns null or undefined (i.e., if no state is saved in sessionStorage), Redux will fall back to using the initialState defined in the reducers.
   * This is useful for persisting the state across page reloads, so that the user doesn't lose their state, such as authentication info, selected notes, etc.
   */
  // #endregion
  preloadedState: loadState(),
});

// #region Multi-line Comment
/**
 * The Redux state should consist of serializable data structures (plain objects, arrays, primitives) and actions should contain serializable data as their payloads.
 *
 * Serializable values are values that can be converted into a format that can be easily stored, transmitted, and reconstructed later.
 *
 * In Redux, it's generally recommended that all state and actions be serializable, meaning that they can be easily converted to and from JSON.
 *
 * This is because many of Redux's features, such as time travel debugging, state persistence, and logging, rely on the ability to serialize and deserialize the state and actions.
 *
 * Time Travel Debugging: It allows you to move back and forth in the history of your application's state changes, helping in identifying and fixing bugs. Time travel debugging relies on the ability to record and replay actions. This requires that actions and state can be serialized into JSON format, which is why they must consist of serializable data (like objects, arrays, strings, numbers, and booleans).
 *
 * State Persistence: In some applications, you might want to save the Redux state to local storage or a server and reload it later. For this to work, the state must be serializable, as only serializable data can be reliably saved and restored.
 *
 * Logging: For logging purposes, serializable actions and states can be easily printed or stored in logs. Non-serializable values might cause issues when trying to log them. Logging keeps track of all actions and state changes, providing insights into what your application is doing.
 */
// #endregion

// #region Multi-line Comment
/**
 * Serializable Values: Plain JavaScript objects, arrays, and primitives (like strings, numbers, and booleans).
 * Non-Serializable Values: Date objects, functions, class instances, and DOM elements.
 *
 * While Date objects can technically be serialized (as strings), they are often not handled correctly by Redux due to their complex nature.
 * If you need to store something like a Date object, convert it to a serializable format (e.g., a timestamp or ISO string) before storing it in the state.
 *
 * If you want to configure Redux Toolkit to allow non-serializable values in specific cases, you can disable the middleware warning for non-serializable values. However, it's generally best practice to avoid storing non-serializable values in Redux state to maintain consistency and avoid potential issues.
 *
 * To configure Redux Toolkit to ignore serialization checks for specific actions or paths, we'll need to provide the actual action types and state paths we want to ignore.
 *
 * Ensuring that our Redux state and actions are serializable is crucial for maintaining a robust and maintainable application.
 * It allows us to take full advantage of Redux's tooling and ensures that our application's state can be safely persisted, logged, and debugged.
 */
// #endregion

// #region Multi-line Comment
/**
 * Subscribe to the Redux store changes and save to sessionStorage.
 */
// #endregion
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
