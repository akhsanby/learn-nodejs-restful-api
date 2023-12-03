import Link from "next/link";
import { axiosClient } from "@/utils/axios-client.js";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/api/users", {
        name,
        username,
        password,
      });

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <form method="POST" onSubmit={(e) => handleRegister(e)}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full name
              </label>
              <input type="text" className="form-control" id="fullName" placeholder="Input your full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input type="text" className="form-control" id="username" placeholder="Input your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" placeholder="Input your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/login">Click here to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
