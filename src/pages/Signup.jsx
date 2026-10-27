
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    const existingUser = JSON.parse(
      localStorage.getItem("registeredUser") || "null"
    );

    if (existingUser && existingUser.email === email) {
      setMessage("Email already registered. Please login.");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password
    };

    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Signup successful! Please login.");
    navigate("/login");
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">Create Account</h2>

              <form onSubmit={handleSignup}>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control mb-3"
                  minLength="8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button className="btn btn-primary w-100">
                  Sign Up
                </button>
              </form>

              {message && (
                <p className="text-danger mt-3">{message}</p>
              )}

              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
