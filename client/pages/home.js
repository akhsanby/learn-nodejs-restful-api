import { axiosClient, getLoggedInUser } from "@/utils/axios-client.js";
import nookies from "nookies";
import { useState } from "react";

// components
import ProfileCard from "@/components/ProfileCard";
import ContactCard from "@/components/ContactCard";

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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const isAuthenticated = await getLoggedInUser(cookies.token);

  if (!isAuthenticated) {
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

  const resultContact = await axiosClient.get("/api/contacts", {
    headers: { Authorization: cookies.token },
  });

  const { username, name } = resultUser.data.data;
  const { data: listContact } = resultContact.data;
  return { props: { username, name, listContact } };
}
