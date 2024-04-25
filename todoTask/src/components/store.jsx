// store.js
import { createStore } from "redux";
import rootReducer from "./reducers"; // Assuming you have your rootReducer defined in reducers.js

const store = createStore(rootReducer);

export default store;
