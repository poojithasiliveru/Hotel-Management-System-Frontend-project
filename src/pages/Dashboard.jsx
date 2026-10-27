import { Link } from "react-router-dom";

function Dashboard() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  const bookings = JSON.parse(
    localStorage.getItem(`myBookings_${loggedInUser}`) || "[]"
  );

  return (
    <div className="container my-5">
      <h2>My Dashboard</h2>

      <p className="text-secondary">
        Welcome to your StayEase account.
      </p>

      <div className="row g-4 mt-2">

        {/* My Bookings */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>My Bookings</h5>

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
              <p>Manage your account information.</p>

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
