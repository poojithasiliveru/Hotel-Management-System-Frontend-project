
import { Link } from "react-router-dom";

function RoomCard({ room }) {
  return (
    <div className="card h-100 shadow-sm">

      <img
        src={room.image}
        className="card-img-top room-image"
        alt={room.name}
      />

      <div className="card-body">

        <h5 className="card-title">{room.name}</h5>

        <p className="text-secondary">{room.location}</p>

        <p>{room.description}</p>

        <h5 className="text-primary">
          ₹{room.price} <small className="text-secondary">/ night</small>
        </h5>

        <Link
          to={`/rooms/${room.id}`}
          className="btn btn-outline-primary mt-2"
        >
          View Details
        </Link>

      </div>
    </div>
  );
}

export default RoomCard;
