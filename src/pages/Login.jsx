
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  function handleLogin(e) {
    e.preventDefault();

    const registeredUser = JSON.parse(
      localStorage.getItem("registeredUser") || "null"
    );

    if (
      registeredUser &&
      registeredUser.email === email &&
      registeredUser.password === password
    ) {
      localStorage.setItem("loggedInUser", email);

      const nextPage = location.state?.from?.pathname || "/";

      navigate(nextPage, { replace: true });
    } else {
      setMessage("Invalid email or password. Please signup first.");
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">Login</h2>

              <form onSubmit={handleLogin}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              {message && (
                <div className="alert alert-danger mt-3">
                  {message}
                </div>
              )}

              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
