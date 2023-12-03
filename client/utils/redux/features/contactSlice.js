import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailContact: {},
  selectedContactId: "",
  newFirstName: "",
  newLastName: "",
  newEmail: "",
  newPhone: "",
  listAddress: [],
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.newFirstName = "";
      state.newLastName = "";
      state.newEmail = "";
      state.newPhone = "";
      state.listAddress = [];
    },
    setSelectedContactId: (state, actions) => {
      state.selectedContactId = actions.payload;
    },
    setNewFirstName: (state, actions) => {
      state.newFirstName = actions.payload;
    },
    setNewLastName: (state, actions) => {
      state.newLastName = actions.payload;
    },
    setNewEmail: (state, actions) => {
      state.newEmail = actions.payload;
    },
    setNewPhone: (state, actions) => {
      state.newPhone = actions.payload;
    },
    setListAddress: (state, actions) => {
      state.listAddress = actions.payload;
    },
    setDetailContact: (state, actions) => {
      state.detailContact = actions.payload;
    },
  },
});

export const { resetForm, setSelectedContactId, setNewFirstName, setNewLastName, setNewEmail, setNewPhone, setListAddress, setDetailContact } = contactSlice.actions;

export default contactSlice.reducer;
