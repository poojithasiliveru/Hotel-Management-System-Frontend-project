import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const loggedInUser = (
    localStorage.getItem("loggedInUser") || ""
  ).trim().toLowerCase();

  if (!loggedInUser) {
    return (
      <div className="container my-5 text-center">
        <h3>Please Login</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  // Get current user's details
  const users = JSON.parse(
    localStorage.getItem("registeredUsers") || "[]"
  );

  const currentUser = users.find(
    (user) => user.email?.toLowerCase() === loggedInUser
  );

  // Get current user's bookings only
  const bookings = JSON.parse(
    localStorage.getItem(`myBookings_${loggedInUser}`) || "[]"
  );

  return (
    <div className="container my-5">

      <h2>My Dashboard</h2>

      <p className="text-secondary">
        Welcome {currentUser?.name || "User"} to your StayEase account.
      </p>

      <p>
        <b>Email:</b> {loggedInUser}
      </p>

      <div className="row g-4 mt-2">

        {/* My Bookings */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">

              <h5>My Bookings</h5>

              <h3 className="text-primary">
                {bookings.length}
              </h3>

              <p>
                {bookings.length > 0
                  ? `You have ${bookings.length} booking(s).`
                  : "You have no bookings yet."}
              </p>

              <Link
                to={bookings.length > 0 ? "/my-bookings" : "/rooms"}
                className="btn btn-primary"
              >
                {bookings.length > 0
                  ? "View My Bookings"
                  : "Explore Rooms"}
              </Link>

            </div>
          </div>
        </div>

        {/* My Profile */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">

              <h5>My Profile</h5>

              <p>
                {currentUser?.name || "User"}
              </p>

              <p className="text-secondary">
                Manage your account information.
              </p>

              <Link
                to="/profile"
                className="btn btn-outline-primary"
              >
                View Profile
              </Link>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
