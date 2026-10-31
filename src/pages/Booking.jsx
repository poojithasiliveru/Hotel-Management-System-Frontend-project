import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import roomsData from "../data/rooms";

function Booking() {
  const { id } = useParams();

  const loggedInUser = (
    localStorage.getItem("loggedInUser") || ""
  ).trim().toLowerCase();

  // Get logged-in user's details
  const users = JSON.parse(
    localStorage.getItem("registeredUsers") || "[]"
  );

  const currentUser = users.find(
    (user) => user.email?.toLowerCase() === loggedInUser
  );

  const [room] = useState(() => {
    const savedRooms = localStorage.getItem("hotelRooms");

    const rooms = savedRooms
      ? JSON.parse(savedRooms)
      : roomsData;

    return rooms.find(
      (item) => String(item.id) === String(id)
    );
  });

  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: loggedInUser,
    checkIn: "",
    checkOut: "",
    guests: "1"
  });

  const [message, setMessage] = useState("");
  const [booked, setBooked] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    setMessage("");
  }

  function handleBooking(e) {
    e.preventDefault();
    setMessage("");

    if (!loggedInUser) {
      setMessage("Please login before booking.");
      return;
    }

    if (form.checkIn < today) {
      setMessage("Check-in date cannot be in the past.");
      return;
    }

    if (form.checkOut <= form.checkIn) {
      setMessage("Check-out date must be after check-in date.");
      return;
    }

    try {
      // Separate storage for each user
      const key = `myBookings_${loggedInUser}`;

      const bookings = JSON.parse(
        localStorage.getItem(key) || "[]"
      );

      const booking = {
        ...form,
        bookingId: Date.now(),
        userEmail: loggedInUser,
        roomId: room.id,
        roomName: room.name,
        location: room.location,
        price: room.price,
        image: room.image,
        type: room.type,
        rating: room.rating,
        description: room.description,
        bookedAt: new Date().toISOString()
      };

      localStorage.setItem(
        key,
        JSON.stringify([...bookings, booking])
      );

      setBooked(true);
      setMessage(
        `Thank you ${form.name}! Your booking is successful.`
      );

    } catch (error) {
      console.error("Booking save error:", error);
      setMessage("Unable to save booking. Please try again.");
    }
  }

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

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">

              <h2>Book Your Stay</h2>

              <h5 className="text-primary mt-3">
                {room.name}
              </h5>

              <p>
                {room.location} · ₹{room.price} per night
              </p>

              {booked ? (
                <>
                  <div className="alert alert-success">
                    {message}
                  </div>

                  <Link
                    to="/my-bookings"
                    className="btn btn-primary"
                  >
                    View My Bookings
                  </Link>
                </>
              ) : (
                <form onSubmit={handleBooking}>

                  <div className="mb-3">
                    <label className="form-label">
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      readOnly
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      value={form.email}
                      readOnly
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Check-in Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      name="checkIn"
                      min={today}
                      value={form.checkIn}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Check-out Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      name="checkOut"
                      min={form.checkIn || today}
                      value={form.checkOut}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Number of Guests
                    </label>

                    <select
                      className="form-select"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                    >
                      {[1, 2, 3, 4].map((count) => (
                        <option key={count} value={count}>
                          {count} {count === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={!form.name}
                  >
                    Confirm Booking
                  </button>

                  {message && (
                    <div className="alert alert-danger mt-3 mb-0">
                      {message}
                    </div>
                  )}

                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
