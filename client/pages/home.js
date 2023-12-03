import { axiosClient } from "@/utils/axios-client.js";
import nookies from "nookies";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home({ username, name, listContact }) {
  const [profileBtn, setProfileBtn] = useState(true);
  const [contactBtn, setContactBtn] = useState(false);

  const handleBtn = (nameBtn) => {
    if (nameBtn === "profile") {
      setProfileBtn(true);
      setContactBtn(false);
    } else if (nameBtn === "contact") {
      setProfileBtn(false);
      setContactBtn(true);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div className="btn-group">
        <button className={`btn btn-primary ${profileBtn ? "active" : ""}`} onClick={() => handleBtn("profile")}>
          My Profile
        </button>
        <button className={`btn btn-primary ${contactBtn ? "active" : ""}`} onClick={() => handleBtn("contact")}>
          My Contact
        </button>
      </div>
      {profileBtn && <ProfileCard username={username} name={name} />}
      {contactBtn && <ContactCard listContact={listContact} />}
    </div>
  );
}

function ProfileCard({ username, name }) {
  const router = useRouter();

  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEditBtn = () => {
    setEdit(true);
  };

  const handleSaveBtn = async () => {
    try {
      const cookies = nookies.get();
      await axiosClient.patch(
        "/api/users/current",
        {
          name: newName,
          password: newPassword,
        },
        {
          headers: { Authorization: cookies.token },
        }
      );
      router.replace(router.asPath);
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelBtn = () => {
    setEdit(false);
  };

  const handleLogoutBtn = async () => {
    try {
      const cookies = nookies.get();
      await axiosClient.delete("/api/users/logout", {
        headers: { Authorization: cookies.token },
      });
      nookies.destroy(null, "token");
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
      <div className="card-body">
        <h5 className="card-title">{username}</h5>
        {edit === false && <p className="card-text">{name}</p>}
        {edit ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <input className="form-control form-control-sm" type="text" placeholder="Your new name" onChange={(e) => setNewName(e.target.value)} />
            <input className="form-control form-control-sm" type="password" placeholder="Your new password" onChange={(e) => setNewPassword(e.target.value)} />
            <div style={{ display: "flex", gap: "5px" }}>
              <button className="btn btn-primary btn-sm" onClick={handleSaveBtn}>
                Save
              </button>
              <button className="btn btn-danger btn-sm" onClick={handleCancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={handleEditBtn}>
            Edit
          </button>
        )}
        <button className="btn btn-danger btn-sm ms-1" onClick={handleLogoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}

function ContactCard({ listContact }) {
  const router = useRouter();

  const [createBtn, setCreateBtn] = useState(false);
  const [editBtn, setEditBtn] = useState(false);

  // contact

  const [selectedContactId, setSelectedContactId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
  };

  const handleCreateBtn = () => {
    setCreateBtn(!createBtn);
  };

  const handleSaveBtn = async () => {
    try {
      const cookies = nookies.get();

      await axiosClient.post(
        "/api/contacts",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
        },
        {
          headers: { Authorization: cookies.token },
        }
      );
      router.replace(router.asPath);
      resetForm();
      setCreateBtn(false);
    } catch (error) {
      resetForm();
      console.error(error);
    }
  };

  const handleCancelBtn = () => {
    setCreateBtn(false);
  };

  const handleEditBtn = async (contactId) => {
    try {
      const cookies = nookies.get();
      const result = await axiosClient.get(`/api/contacts/${contactId}`, {
        headers: { Authorization: cookies.token },
      });
      const { id, first_name, last_name, email, phone } = result.data.data;
      setSelectedContactId(id);
      setFirstName(first_name);
      setLastName(last_name);
      setEmail(email);
      setPhone(phone);

      setEditBtn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateBtn = async () => {
    try {
      const cookies = nookies.get();
      await axiosClient.put(
        `/api/contacts/${selectedContactId}`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
        },
        {
          headers: { Authorization: cookies.token },
        }
      );
      router.replace(router.asPath);
      resetForm();
      setEditBtn(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveBtn = async (contactId) => {
    try {
      const cookies = nookies.get();
      await axiosClient.delete(`/api/contacts/${contactId}`, {
        headers: { Authorization: cookies.token },
      });
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <div className="card" style={{ width: "18rem", height: "100%", marginTop: "10px" }}>
        <div className="card-body">
          <button className="btn btn-primary btn-sm mb-2" onClick={handleCreateBtn}>
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
                    <span onClick={() => handleEditBtn(contact.id)} className="badge rounded-pill text-bg-success" style={{ cursor: "pointer", userSelect: "none" }}>
                      <i className="bi bi-pencil-fill"></i>
                    </span>
                    <span onClick={() => handleRemoveBtn(contact.id)} className="badge rounded-pill text-bg-danger" style={{ cursor: "pointer", userSelect: "none" }}>
                      <i className="bi bi-trash-fill"></i>
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
      {createBtn && (
        <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
          <div className="card-body">
            <input className="form-control form-control-sm mt-1" type="text" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <div style={{ display: "flex", gap: "3px" }}>
              <button className="btn btn-primary btn-sm mt-2" onClick={handleSaveBtn}>
                Save
              </button>
              <button className="btn btn-danger btn-sm mt-2" onClick={handleCancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {editBtn && (
        <div className="card" style={{ width: "18rem", marginTop: "10px" }}>
          <div className="card-body">
            <input className="form-control form-control-sm mt-1" type="text" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="form-control form-control-sm mt-1" type="text" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <div style={{ display: "flex", gap: "3px" }}>
              <button className="btn btn-success btn-sm mt-2" onClick={handleUpdateBtn}>
                Update
              </button>
              <button className="btn btn-danger btn-sm mt-2" onClick={handleCancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  if (!cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  const resultUser = await axiosClient.get("/api/users/current", {
    headers: { Authorization: cookies.token },
  });

  const resultContact = await axiosClient.get("/api/contacts/", {
    headers: { Authorization: cookies.token },
  });

  const { username, name } = resultUser.data.data;
  const { data: listContact } = resultContact.data;
  return { props: { username, name, listContact } };
}
