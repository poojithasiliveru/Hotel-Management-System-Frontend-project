
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:3001/rooms";

function ManageRooms() {
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    name: "",
    location: "",
    price: "",
    rating: "",
    type: "Hotel",
    description: "",
    image: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setRoom({ ...room, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await axios.post(API, {
        ...room,
        price: Number(room.price),
        rating: Number(room.rating)
      });

      setMessage("Room added successfully!");

      setRoom({
        name: "",
        location: "",
        price: "",
        rating: "",
        type: "Hotel",
        description: "",
        image: ""
      });
    } catch (err) {
      console.error(err);
      setError("Unable to add room. Check the API server.");
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2>Manage Rooms</h2>
              <p className="text-secondary">
                Add a new room to StayEase.
              </p>

              {message && (
                <div className="alert alert-success">{message}</div>
              )}
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Room Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={room.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    className="form-control"
                    name="location"
                    value={room.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price per Night (₹)</label>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      name="price"
                      value={room.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Rating (0–5)</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      className="form-control"
                      name="rating"
                      value={room.rating}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Room Type</label>
                  <select
                    className="form-select"
                    name="type"
                    value={room.type}
                    onChange={handleChange}
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Villa">Villa</option>
                    <option value="Cottage">Cottage</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Resort">Resort</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="url"
                    className="form-control"
                    name="image"
                    value={room.image}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={room.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success me-2">
                  Add Room
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/rooms")}
                >
                  Back to Rooms
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageRooms;
