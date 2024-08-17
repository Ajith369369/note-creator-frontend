// In a Redux store, the entire application's state is represented by a single JavaScript object, often called the "global state" or "store." This global state is usually divided into smaller sections, or slices, each managed by a different reducer. Each slice represents a distinct part of the application’s state. In our application, noteDetails is one of those slices of the global state.
// The store is the centralized place where the entire state of your application is kept.
// The store is the central hub for state in a Redux application. It holds the application's state, and provides methods to access the state, dispatch actions, and subscribe to state changes.
// The Redux store is created using configureStore from @reduxjs/toolkit.
// The store holds the state and allows the state to be accessed and updated by dispatching actions.

import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./slices/noteSlice";

const store = configureStore({

  // The root reducer combines various slices into a single state tree.
  // The reducer property in the configureStore function is where we specify the root reducer for our Redux store. The root reducer is essentially an object that combines all of our individual slice reducers into one. Each slice reducer is responsible for managing a specific part of the state.
  // reducer: This key contains all the reducers responsible for managing different parts of the application state.
  // The reducer key in configureStore specifies the root reducer, which combines multiple slice reducers.
  // This setup organizes your state into logical sections, each managed by its own reducer.
  reducer: {

    // The line noteDetails: noteReducer tells Redux to manage the noteDetails slice of the state using the noteReducer.
    // Here, noteReducer is handling the state slice named noteDetails.
    // Key (noteDetails): This is the name of the slice of state that will be managed by the noteReducer. This means that all state managed by noteReducer will be stored under state.noteDetails in the Redux store.
    // Value (noteReducer): This is the reducer function that will handle actions related to the noteDetails slice of state. The noteReducer was imported from noteSlice.js, where it was created using createSlice().
    // By defining noteDetails: noteReducer, we're telling Redux that, a part of our global state should be managed by the noteReducer, and this part of the state should be accessible under the "noteDetails" key.
    // If you dispatch an action handled by noteReducer, Redux will update the noteDetails slice of the state accordingly.
    noteDetails: noteReducer,
  },

  // Redux Toolkit comes with a middleware that warns you if you attempt to include non-serializable data in your actions or state. You can customize this middleware to ignore specific paths or actions if necessary.
  // middleware: Middleware is a way to customize the dispatch process. Here, it's configured to ignore serialization checks for specific actions and state paths.
  // This is useful because certain parts of our state (like pickup_date, which is a Day.js object) may not be serializable by default, and Redux Toolkit expects state to be serializable.
  // The serializableCheck middleware is customized to ignore certain actions or fields that may contain non-serializable values, allowing you to bypass the warnings if you know what you're doing.
  /* middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['noteDetails/updateBookingFormState'], // Add any actions you want to ignore
        ignoredPaths: ['noteDetails.bookingFormState.pickup_date'], // Add any state paths you want to ignore
      },
    }), */
});

// The Redux state should consist of serializable data structures (plain objects, arrays, primitives) and actions should contain serializable data as their payloads.
// Serializable values are values that can be converted into a format that can be easily stored, transmitted, and reconstructed later. In Redux, it's generally recommended that all state and actions be serializable, meaning that they can be easily converted to and from JSON. This is because many of Redux's features, such as time travel debugging, state persistence, and logging, rely on the ability to serialize and deserialize the state and actions.
  // Time Travel Debugging: It allows you to move back and forth in the history of your application's state changes, helping in identifying and fixing bugs. Time travel debugging relies on the ability to record and replay actions. This requires that actions and state can be serialized into JSON format, which is why they must consist of serializable data (like objects, arrays, strings, numbers, and booleans).
  // State Persistence: In some applications, you might want to save the Redux state to local storage or a server and reload it later. For this to work, the state must be serializable, as only serializable data can be reliably saved and restored.
  // Logging: For logging purposes, serializable actions and states can be easily printed or stored in logs. Non-serializable values might cause issues when trying to log them. Logging keeps track of all actions and state changes, providing insights into what your application is doing.

// Serializable Values: Plain JavaScript objects, arrays, and primitives (like strings, numbers, and booleans).
// Non-Serializable Values: Date objects, functions, class instances, and DOM elements.

// While Date objects can technically be serialized (as strings), they are often not handled correctly by Redux due to their complex nature. If you need to store something like a Date object, convert it to a serializable format (e.g., a timestamp or ISO string) before storing it in the state.

// If you want to configure Redux Toolkit to allow non-serializable values in specific cases, you can disable the middleware warning for non-serializable values. However, it's generally best practice to avoid storing non-serializable values in Redux state to maintain consistency and avoid potential issues.
// To configure Redux Toolkit to ignore serialization checks for specific actions or paths, we'll need to provide the actual action types and state paths we want to ignore.
// Ensuring that our Redux state and actions are serializable is crucial for maintaining a robust and maintainable application. It allows us to take full advantage of Redux's tooling and ensures that our application's state can be safely persisted, logged, and debugged.

export default store;