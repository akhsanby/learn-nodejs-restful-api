import { createAddress, getAddress, updateAddress, getListAddress, removeAddress } from "@/utils/axios-client";
import { useState } from "react";
import nookies from "nookies";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

// redux
import { setListAddress } from "@/utils/redux/features/contactSlice.js";
import { resetForm, setSelectedAddressId, setNewStreet, setNewCity, setNewProvince, setNewCountry, setNewPostalCode } from "@/utils/redux/features/addressSlice.js";

export default function AddressCard({ toogleShowListAddressBtn }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const detailContact = useSelector((state) => state.contact.detailContact);
  const listAddress = useSelector((state) => state.contact.listAddress);

  const selectedAddressId = useSelector((state) => state.address.selectedAddressId);
  const newStreet = useSelector((state) => state.address.newStreet);
  const newCity = useSelector((state) => state.address.newCity);
  const newProvince = useSelector((state) => state.address.newProvince);
  const newCountry = useSelector((state) => state.address.newCountry);
  const newPostalCode = useSelector((state) => state.address.newPostalCode);
  const { id: selectedContactId, firstName, lastName } = detailContact;

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const toggleCreateBtn = () => {
    dispatch(resetForm());
    setShowCreateForm(!showCreateForm);
    setShowEditForm(!showEditForm);
  };

  const toggleEditBtn = async (contactId, addressId) => {
    try {
      if (showEditForm) {
        dispatch(resetForm());
        setShowEditForm(false);
        if (addressId === selectedAddressId) return;
      }

      const cookies = nookies.get();
      const resultAddress = await getAddress(cookies.token, contactId, addressId);

      const { id, street, city, province, country, postal_code } = resultAddress.data.data;

      dispatch(setSelectedAddressId(id));
      dispatch(setNewStreet(street));
      dispatch(setNewCity(city));
      dispatch(setNewProvince(province));
      dispatch(setNewCountry(country));
      dispatch(setNewPostalCode(postal_code));

      setShowEditForm(true);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleCancelBtn = () => {
    setShowCreateForm(false);
    setShowEditForm(false);
  };

  const handleSaveBtn = async (contactId) => {
    try {
      const cookies = nookies.get();
      await createAddress(
        cookies.token,
        {
          street: newStreet,
          city: newCity,
          province: newProvince,
          country: newCountry,
          postal_code: newPostalCode,
        },
        contactId
      );

      const resultAddress = await getListAddress(cookies.token, contactId);
      const { data: newListAddress } = resultAddress.data;

      dispatch(setListAddress(newListAddress));
      dispatch(resetForm());
      setShowCreateForm(false);
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateBtn = async (contactId, addressId) => {
    try {
      const cookies = nookies.get();
      const res = await updateAddress(
        cookies.token,
        {
          street: newStreet,
          city: newCity,
          province: newProvince,
          country: newCountry,
          postal_code: newPostalCode,
        },
        contactId,
        addressId
      );

      const resultAddress = await getListAddress(cookies.token, contactId);
      const { data: newListAddress } = resultAddress.data;

      dispatch(setListAddress(newListAddress));
      dispatch(resetForm());
      setShowEditForm(false);
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveBtn = async (contactId, addressId) => {
    try {
      const cookies = nookies.get();
      await removeAddress(cookies.token, contactId, addressId);
      const result = await getListAddress(cookies.token, contactId);
      const { data: newListAddress } = result.data;

      dispatch(setListAddress(newListAddress));
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="card" style={{ width: "20rem", height: "100%", marginTop: "10px" }}>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title m-0">Contact Address</h5>
            <div>
              <span onClick={toggleCreateBtn} className="badge rounded-pill text-bg-primary" style={{ cursor: "pointer", userSelect: "none" }}>
                Create
              </span>
              <span onClick={toogleShowListAddressBtn} className="badge rounded-pill text-bg-danger" style={{ cursor: "pointer", userSelect: "none" }}>
                Close
              </span>
            </div>
          </div>
          <p className="card-text mt-1">
            {firstName} {lastName}
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item p-2">
            {listAddress.length == 0 ? (
              <span className="p-2">Empty</span>
            ) : (
              <>
                {listAddress.map((address, index) => (
                  <div key={index} className="card" style={{ width: "100%" }}>
                    <div className="card-header">
                      <span onClick={() => toggleEditBtn(selectedContactId, address.id)} className="badge rounded-pill text-bg-success" style={{ cursor: "pointer", userSelect: "none" }}>
                        Edit
                      </span>
                      <span onClick={() => handleRemoveBtn(selectedContactId, address.id)} className="badge rounded-pill text-bg-danger" style={{ cursor: "pointer", userSelect: "none" }}>
                        Remove
                      </span>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Street : {address.street}</li>
                      <li className="list-group-item">City : {address.city}</li>
                      <li className="list-group-item">Province : {address.province}</li>
                      <li className="list-group-item">Country : {address.country}</li>
                      <li className="list-group-item">Postal Code : {address.postal_code}</li>
                    </ul>
                  </div>
                ))}
              </>
            )}
          </li>
        </ul>
      </div>
      {showCreateForm && (
        <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
          <div className="card-body">
            <input className="form-control form-control-sm mt-1" type="text" placeholder="street" value={newStreet} onChange={(e) => dispatch(setNewStreet(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="city" value={newCity} onChange={(e) => dispatch(setNewCity(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="province" value={newProvince} onChange={(e) => dispatch(setNewProvince(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="country" value={newCountry} onChange={(e) => dispatch(setNewCountry(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="postal code" value={newPostalCode} onChange={(e) => dispatch(setNewPostalCode(e.target.value))} />
            <div style={{ display: "flex", gap: "3px" }}>
              <button className="btn btn-primary btn-sm mt-2" onClick={() => handleSaveBtn(selectedContactId)}>
                Save
              </button>
              <button className="btn btn-danger btn-sm mt-2" onClick={toggleCancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditForm && (
        <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
          <div className="card-body">
            <input className="form-control form-control-sm mt-1" type="text" placeholder="street" value={newStreet} onChange={(e) => dispatch(setNewStreet(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="city" value={newCity} onChange={(e) => dispatch(setNewCity(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="province" value={newProvince} onChange={(e) => dispatch(setNewProvince(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="country" value={newCountry} onChange={(e) => dispatch(setNewCountry(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="postal code" value={newPostalCode} onChange={(e) => dispatch(setNewPostalCode(e.target.value))} />
            <div style={{ display: "flex", gap: "3px" }}>
              <button className="btn btn-primary btn-sm mt-2" onClick={() => handleUpdateBtn(selectedContactId, selectedAddressId)}>
                Update
              </button>
              <button className="btn btn-danger btn-sm mt-2" onClick={toggleCancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
