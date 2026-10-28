
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
      <div className="container">
        <Link to="/" className="navbar-brand text-primary fw-bold">
          StayEase
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/rooms">Rooms</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>

            {loggedInUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage-rooms">
                    Manage Rooms
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    My Dashboard
                  </Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>

                <li className="nav-item ms-lg-2">
                  <Link className="btn btn-primary" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
