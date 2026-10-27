
import { useState } from "react";

function ContactUs() {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("Thank you! Your message has been submitted.");
    e.target.reset();
  }

  return (
    <div className="container my-5">
      <h2 className="text-center">Contact Us</h2>
      <p className="text-center text-secondary">
        Have questions? Send us a message.
      </p>

      <div className="row justify-content-center mt-4">
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Write your message"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>

              {message && (
                <div className="alert alert-success mt-3 mb-0">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
