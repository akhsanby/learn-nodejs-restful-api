import Link from "next/link";

export default function Login() {
  return (
    <div style={{ padding: "2rem" }}>
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <form>
            <div class="mb-3">
              <label for="fullName" class="form-label">
                Full name
              </label>
              <input type="text" class="form-control" id="fullName" placeholder="Input your full name" />
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">
                Username
              </label>
              <input type="text" class="form-control" id="username" placeholder="Input your username" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input type="password" class="form-control" id="password" placeholder="Input your password" />
            </div>
            <button type="submit" class="btn btn-primary">
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
