import { updateUser, removeUser } from "@/utils/axios-client.js";
import nookies from "nookies";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setNewName, setNewPassword, toggleEditBtn } from "@/utils/redux/features/profileSlice.js";

export default function ProfileCard({ username, name }) {
  const router = useRouter();

  const newName = useSelector((state) => state.profile.name);
  const newPassword = useSelector((state) => state.profile.password);
  const editBtn = useSelector((state) => state.profile.editBtn);
  const dispatch = useDispatch();

  const handleSaveBtn = async () => {
    try {
      const cookies = nookies.get();
      await updateUser(cookies.token, {
        name: newName,
        password: newPassword,
      });
      router.replace(router.asPath);
      dispatch(toggleEditBtn());
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutBtn = async () => {
    try {
      const cookies = nookies.get();
      await removeUser(cookies.token);
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
        {editBtn === false && <p className="card-text">{name}</p>}
        {editBtn ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <input className="form-control form-control-sm" type="text" placeholder="Your new name" onChange={(e) => dispatch(setNewName(e.target.value))} />
            <input className="form-control form-control-sm" type="password" placeholder="Your new password" onChange={(e) => dispatch(setNewPassword(e.target.value))} />
            <div style={{ display: "flex", gap: "5px" }}>
              <button className="btn btn-primary btn-sm" onClick={handleSaveBtn}>
                Save
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => dispatch(toggleEditBtn())}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={() => dispatch(toggleEditBtn())}>
            Edit
          </button>
        )}
        {editBtn === false && (
          <button className="btn btn-danger btn-sm ms-1" onClick={handleLogoutBtn}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
