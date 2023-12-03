import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/utils/redux/features/profileSlice.js";
import contactReducer from "@/utils/redux/features/contactSlice.js";
import addressReducer from "@/utils/redux/features/addressSlice.js";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    contact: contactReducer,
    address: addressReducer,
  },
});
