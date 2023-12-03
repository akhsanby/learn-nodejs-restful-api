import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  password: "",
  editBtn: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setNewName: (state, action) => {
      state.name = action.payload;
    },
    setNewPassword: (state, action) => {
      state.password = action.payload;
    },
    toggleEditBtn: (state) => {
      state.editBtn = !state.editBtn;
    },
  },
});

export const { setNewName, setNewPassword, toggleEditBtn } = profileSlice.actions;

export default profileSlice.reducer;
