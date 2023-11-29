import Link from "next/link";
import { axiosClient } from "@/utils/axios-client.js";
import { useState } from "react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/api/users/login", {
        username,
        password,
      });
      const { token } = result.data.data;
      setCookie(null, "token", token, {
        path: "/",
      });

      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <form method="POST" onSubmit={(e) => handleLogin(e)}>
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
              Login
            </button>
          </form>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/register">Click here to register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
