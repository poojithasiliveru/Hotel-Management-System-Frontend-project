
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center my-5 py-5">
      <h1 className="display-1 fw-bold text-primary">404</h1>

      <h2>Page Not Found</h2>

      <p className="text-secondary">
        Sorry! The page you are looking for doesn't exist
        or may have been moved.
      </p>

      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
