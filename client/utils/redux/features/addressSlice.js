import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAddressId: "",
  newStreet: "",
  newCity: "",
  newProvince: "",
  newCountry: "",
  newPostalCode: "",
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.newStreet = "";
      state.newCity = "";
      state.newProvince = "";
      state.newCountry = "";
      state.newPostalCode = "";
    },
    setSelectedAddressId: (state, actions) => {
      state.selectedAddressId = actions.payload;
    },
    setNewStreet: (state, actions) => {
      state.newStreet = actions.payload;
    },
    setNewCity: (state, actions) => {
      state.newCity = actions.payload;
    },
    setNewProvince: (state, actions) => {
      state.newProvince = actions.payload;
    },
    setNewCountry: (state, actions) => {
      state.newCountry = actions.payload;
    },
    setNewPostalCode: (state, actions) => {
      state.newPostalCode = actions.payload;
    },
  },
});

export const { resetForm, setSelectedAddressId, setNewStreet, setNewCity, setNewProvince, setNewCountry, setNewPostalCode } = addressSlice.actions;

export default addressSlice.reducer;
