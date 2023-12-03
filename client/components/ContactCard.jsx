import { getContact, getListAddress, removeContact, saveContact, updateContact } from "@/utils/axios-client.js";
import nookies from "nookies";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

// components
import AddressCard from "@/components/AddressCard.jsx";

// redux
import { resetForm, setSelectedContactId, setNewFirstName, setNewLastName, setNewEmail, setNewPhone, setListAddress, setDetailContact } from "@/utils/redux/features/contactSlice.js";

export default function ContactCard({ listContact }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedContactId = useSelector((state) => state.contact.selectedContactId);
  const newFirstName = useSelector((state) => state.contact.newFirstName);
  const newLastName = useSelector((state) => state.contact.newLastName);
  const newEmail = useSelector((state) => state.contact.newEmail);
  const newPhone = useSelector((state) => state.contact.newPhone);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddressList, setShowAddressList] = useState(false);

  const toggleCreateBtn = () => {
    dispatch(resetForm());
    setShowCreateForm(true);
    setShowEditForm(false);
  };

  const toggleCancelBtn = () => {
    setShowCreateForm(false);
    setShowEditForm(false);
  };

  const toogleShowListAddressBtn = async (contactId) => {
    try {
      if (showAddressList) {
        dispatch(resetForm());
        setShowAddressList(false);
        return;
      }

      const cookies = nookies.get();

      const resultContact = await getContact(cookies.token, contactId);
      const resultAddress = await getListAddress(cookies.token, contactId);

      const { id, first_name, last_name } = resultContact.data.data;
      const { data: listAddress } = resultAddress.data;

      dispatch(
        setDetailContact({
          id: id.toString(),
          firstName: first_name,
          lastName: last_name,
        })
      );

      setShowAddressList(true);
      dispatch(setListAddress(listAddress));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEditBtn = async (contactId) => {
    try {
      setShowCreateForm(false);
      setShowEditForm(true);

      const cookies = nookies.get();
      const result = await getContact(cookies.token, contactId);
      const { id, first_name, last_name, email, phone } = result.data.data;

      dispatch(setSelectedContactId(id));
      dispatch(setNewFirstName(first_name));
      dispatch(setNewLastName(last_name));
      dispatch(setNewEmail(email));
      dispatch(setNewPhone(phone));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveBtn = async () => {
    try {
      const cookies = nookies.get();
      await saveContact(cookies.token, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
      });
      router.replace(router.asPath);
      dispatch(resetForm());

      setShowCreateForm(false);
    } catch (error) {
      dispatch(resetForm());
      console.error(error);
    }
  };

  const handleUpdateBtn = async (contactId) => {
    try {
      const cookies = nookies.get();
      await updateContact(
        cookies.token,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
        },
        contactId
      );

      router.replace(router.asPath);
      dispatch(resetForm());

      setShowEditForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveBtn = async (contactId) => {
    try {
      const cookies = nookies.get();
      await removeContact(cookies.token, contactId);
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <div className="card" style={{ width: "25rem", height: "100%", marginTop: "10px" }}>
        <div className="card-body">
          <button className="btn btn-primary btn-sm mb-2" onClick={toggleCreateBtn}>
            Create New Contact
          </button>
          {listContact.length === 0 && <p>Contact is empty, create new one?</p>}
          <div className="list-group">
            {listContact.map((contact, index) => (
              <div key={index} className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <h5 className="mb-1">
                    {contact.first_name} {contact.last_name}
                  </h5>
                  <div>
                    <span onClick={() => toogleShowListAddressBtn(contact.id)} className="badge rounded-pill text-bg-info" style={{ cursor: "pointer", userSelect: "none" }}>
                      List
                    </span>
                    <span onClick={() => toggleEditBtn(contact.id)} className="badge rounded-pill text-bg-success" style={{ cursor: "pointer", userSelect: "none" }}>
                      Edit
                    </span>
                    <span onClick={() => handleRemoveBtn(contact.id)} className="badge rounded-pill text-bg-danger" style={{ cursor: "pointer", userSelect: "none" }}>
                      Remove
                    </span>
                  </div>
                </div>
                <p className="mb-1">{contact.email}</p>
                <small>{contact.phone}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showCreateForm && (
        <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
          <div className="card-body">
            <input className="form-control form-control-sm mt-1" type="text" placeholder="first name" value={newFirstName} onChange={(e) => dispatch(setNewFirstName(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="last name" value={newLastName} onChange={(e) => dispatch(setNewLastName(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="email" value={newEmail} onChange={(e) => dispatch(setNewEmail(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="phone" value={newPhone} onChange={(e) => dispatch(setNewPhone(e.target.value))} />
            <div style={{ display: "flex", gap: "3px" }}>
              <button className="btn btn-primary btn-sm mt-2" onClick={handleSaveBtn}>
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
            <input className="form-control form-control-sm mt-1" type="text" placeholder="first name" value={newFirstName} onChange={(e) => dispatch(setNewFirstName(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="last name" value={newLastName} onChange={(e) => dispatch(setNewLastName(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="email" value={newEmail} onChange={(e) => dispatch(setNewEmail(e.target.value))} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="phone" value={newPhone} onChange={(e) => dispatch(setNewPhone(e.target.value))} />
            <div style={{ display: "flex", gap: "3px" }}>
              <button className="btn btn-success btn-sm mt-2" onClick={() => handleUpdateBtn(selectedContactId)}>
                Update
              </button>
              <button className="btn btn-danger btn-sm mt-2" onClick={toggleCancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddressList && <AddressCard toogleShowListAddressBtn={toogleShowListAddressBtn} />}
    </div>
  );
}
