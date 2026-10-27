
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero text-white text-center">
      <div className="container">
        <h1>Find Your Perfect Stay</h1>

        <p className="lead">
          Discover comfortable hotels and beautiful holiday homes.
        </p>

        <Link to="/rooms" className="btn btn-warning btn-lg">
          Explore Rooms
        </Link>
      </div>
    </div>
  );
}

export default Hero;
