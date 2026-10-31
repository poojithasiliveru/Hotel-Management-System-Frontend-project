import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();

  const user = (
    localStorage.getItem("loggedInUser") || ""
  ).trim().toLowerCase();

  const key = `myBookings_${user}`;

  const [bookings, setBookings] = useState(() => {
    if (!user) return [];

    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      return [];
    }
  });

  const [editId, setEditId] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");

  if (!user) {
    return (
      <div className="container my-5 text-center">
        <h3>Please login to view your bookings.</h3>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    );
  }

  function save(data) {
    localStorage.setItem(key, JSON.stringify(data));
    setBookings(data);
  }

  function edit(booking) {
    setEditId(booking.bookingId);
    setCheckIn(booking.checkIn);
    setCheckOut(booking.checkOut);
    setGuests(String(booking.guests));
  }

  function update(id) {
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      alert("Select valid dates!");
      return;
    }

    const today = new Date().toLocaleDateString("en-CA");

    if (checkIn < today) {
      alert("Check-in date cannot be in the past!");
      return;
    }

    const updatedBookings = bookings.map((b) =>
      b.bookingId === id
        ? { ...b, checkIn, checkOut, guests }
        : b
    );

    save(updatedBookings);
    setEditId(null);
    alert("Booking updated successfully!");
  }

  function remove(id) {
    if (window.confirm("Delete this booking?")) {
      save(bookings.filter((b) => b.bookingId !== id));
    }
  }

  return (
    <div className="container my-5">
      <h2>My Bookings</h2>

      <p className="text-secondary">
        Manage your reservations.
      </p>

      {!bookings.length ? (
        <div className="text-center mt-5">
          <h5>No bookings found!</h5>

          <Link to="/rooms" className="btn btn-primary">
            Explore Rooms
          </Link>
        </div>
      ) : (
        <div className="row g-4 mt-2">
          {bookings.map((b) => (
            <div
              className="col-md-6 col-lg-4"
              key={b.bookingId}
            >
              <div className="card shadow-sm h-100">
                <img
                  src={b.image}
                  alt={b.roomName || b.name}
                  className="card-img-top"
                  style={{
                    height: 200,
                    objectFit: "cover"
                  }}
                />

                <div className="card-body">
                  <h5>{b.roomName || b.name}</h5>

                  <p>{b.location}</p>

                  <p>Customer: {b.name}</p>

                  <p>Price: ₹{b.price} / night</p>

                  <p>Email: {b.email}</p>

                  {editId === b.bookingId ? (
                    <>
                      <label>Check-in</label>

                      <input
                        type="date"
                        className="form-control mb-2"
                        min={new Date().toLocaleDateString("en-CA")}
                        value={checkIn}
                        onChange={(e) =>
                          setCheckIn(e.target.value)
                        }
                      />

                      <label>Check-out</label>

                      <input
                        type="date"
                        className="form-control mb-2"
                        min={checkIn || new Date().toLocaleDateString("en-CA")}
                        value={checkOut}
                        onChange={(e) =>
                          setCheckOut(e.target.value)
                        }
                      />

                      <label>Guests</label>

                      <select
                        className="form-select mb-3"
                        value={guests}
                        onChange={(e) =>
                          setGuests(e.target.value)
                        }
                      >
                        {[1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} Guest{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>

                      <button
                        className="btn btn-success me-2"
                        onClick={() => update(b.bookingId)}
                      >
                        Save
                      </button>

                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <p>Check-in: {b.checkIn}</p>
                      <p>Check-out: {b.checkOut}</p>
                      <p>Guests: {b.guests}</p>

                      <span className="badge bg-success">
                        Booking Submitted
                      </span>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => edit(b)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger"
                          onClick={() => remove(b.bookingId)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        to="/dashboard"
        className="btn btn-outline-primary mt-4"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default MyBookings;
