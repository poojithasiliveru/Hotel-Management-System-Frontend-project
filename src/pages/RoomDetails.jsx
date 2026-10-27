
import { Link, useParams } from "react-router-dom";
import rooms from "../data/rooms";

function RoomDetails() {
  const { id } = useParams();

  const room = rooms.find((item) => item.id === Number(id));

  if (!room) {
    return (
      <div className="container my-5">
        <h2>Room not found</h2>
        <Link to="/rooms" className="btn btn-primary">
          Back to Rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-7">
          <img
            src={room.image}
            alt={room.name}
            className="img-fluid rounded shadow-sm w-100"
          />
        </div>

        <div className="col-md-5">
          <h2>{room.name}</h2>

          <p className="text-secondary">
            Location: {room.location}
          </p>

          <p>
            <strong>Rating:</strong> ⭐ {room.rating}
          </p>

          <p>
            <strong>Property Type:</strong> {room.type}
          </p>

          <p>{room.description}</p>

          <h4 className="text-primary">
            ₹{room.price} <small className="text-secondary">/ night</small>
          </h4>

          <Link
            to={`/booking/${room.id}`}
            className="btn btn-primary mt-3"
          >
            Book This Room
          </Link>

          <Link
            to="/rooms"
            className="btn btn-outline-secondary mt-3 ms-2"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
