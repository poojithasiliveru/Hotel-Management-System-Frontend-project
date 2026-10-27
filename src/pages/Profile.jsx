import { Link } from "react-router-dom";

function Profile() {
  const email = localStorage.getItem("loggedInUser");

  if (!email) return <h3>Please Login</h3>;

  return (
    <div className="container my-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "500px" }}>
        <h3>My Profile</h3>
        <hr />
        <p><b>Email:</b> {email}</p>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Profile;