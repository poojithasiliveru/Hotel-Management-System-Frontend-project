
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row g-4">

          <div className="col-md-4">
            <h4 className="text-info">StayEase</h4>
            <p>
              Find comfortable hotels and beautiful homes
              for your next trip.
            </p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>

            <p><Link to="/" className="text-white">Home</Link></p>
            <p><Link to="/rooms" className="text-white">Rooms</Link></p>
            <p><Link to="/about" className="text-white">About Us</Link></p>
            <p><Link to="/contact" className="text-white">Contact</Link></p>
          </div>

          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: support@stayease.example</p>
            <p>Phone: +91 98765 43210</p>
          </div>

        </div>

        <hr />

        <p className="text-center mb-0">
          © {new Date().getFullYear()} StayEase. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
