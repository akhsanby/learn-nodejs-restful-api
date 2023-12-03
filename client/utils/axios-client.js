import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
});

export const getLoggedInUser = async (token) => {
  if (!token) {
    return false;
  }

  const result = await axiosClient.get("/api/users/current", {
    headers: { Authorization: token },
  });

  if (result.data.errors) {
    return false;
  } else {
    return true;
  }
};

export const updateUser = async (token, data) =>
  await axiosClient.patch("/api/users/current", data, {
    headers: { Authorization: token },
  });

export const removeUser = async (token) =>
  await axiosClient.delete("/api/users/logout", {
    headers: { Authorization: token },
  });

export const getContact = async (token, id) =>
  await axiosClient.get(`/api/contacts/${id}`, {
    headers: { Authorization: token },
  });

export const saveContact = async (token, data) =>
  await axiosClient.post("/api/contacts", data, {
    headers: { Authorization: token },
  });

export const updateContact = async (token, data, contactId) =>
  await axiosClient.put(`/api/contacts/${contactId}`, data, {
    headers: { Authorization: token },
  });

export const removeContact = async (token, contactId) =>
  await axiosClient.delete(`/api/contacts/${contactId}`, {
    headers: { Authorization: token },
  });

export const createAddress = async (token, data, contactId) => {
  return await axiosClient.post(`/api/contacts/${contactId}/addresses`, data, {
    headers: { Authorization: token },
  });
};

export const updateAddress = async (token, data, contactId, addressId) =>
  await axiosClient.put(`/api/contacts/${contactId}/addresses/${addressId}`, data, {
    headers: { Authorization: token },
  });

export const getAddress = async (token, contactId, addressId) =>
  await axiosClient.get(`/api/contacts/${contactId}/addresses/${addressId}`, {
    headers: { Authorization: token },
  });

export const getListAddress = async (token, id) =>
  await axiosClient.get(`/api/contacts/${id}/addresses`, {
    headers: { Authorization: token },
  });

export const removeAddress = async (token, contactId, addressId) =>
  await axiosClient.delete(`/api/contacts/${contactId}/addresses/${addressId}`, {
    headers: { Authorization: token },
  });
