import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function Booking() {
  const { id } = useParams();
  const room = rooms.find((item) => item.id === Number(id));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");

  if (!room) {
    return (
      <div className="container my-5">
        <h2>Room not found</h2>
        <Link to="/rooms" className="btn btn-primary">
          Browse Rooms
        </Link>
      </div>
    );
  }

  function handleBooking(e) {
    e.preventDefault();

    if (checkOut <= checkIn) {
      setMessage("Check-out date must be after check-in date.");
      return;
    }

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      setMessage("Please login before booking.");
      return;
    }

    const booking = {
      ...room,
      bookingId: Date.now(),
      name,
      email,
      checkIn,
      checkOut,
      guests,
    };

    const key = `myBookings_${loggedInUser}`;

    const bookings = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    bookings.push(booking);

    localStorage.setItem(key, JSON.stringify(bookings));

    setMessage(
      `Thank you ${name}! Your booking is successful.`
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2>Book Your Stay</h2>

              <h5 className="text-primary mt-3">{room.name}</h5>

              <p>
                {room.location} · ₹{room.price} per night
              </p>

              <form onSubmit={handleBooking}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Check-in Date</label>
                  <input
                    type="date"
                    className="form-control"
                    min={new Date().toISOString().split("T")[0]}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Check-out Date</label>
                  <input
                    type="date"
                    className="form-control"
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Number of Guests</label>
                  <select
                    className="form-select"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Submit Booking
                </button>
              </form>

              {message && (
                <div className="alert alert-info mt-3 mb-0">
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

export default Booking;
