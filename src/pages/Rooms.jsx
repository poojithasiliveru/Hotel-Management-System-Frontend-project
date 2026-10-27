
import { useState } from "react";
import { useLocation } from "react-router-dom";
import rooms from "../data/rooms";
import RoomCard from "../components/RoomCard";

function Rooms() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialLocation = params.get("location") || "";

  const [search, setSearch] = useState(initialLocation);
  const [type, setType] = useState("All");

  const filteredRooms = rooms.filter((room) => {
    const matchesLocation =
      room.name.toLowerCase().includes(search.toLowerCase()) ||
      room.location.toLowerCase().includes(search.toLowerCase());

    const matchesType = type === "All" || room.type === type;

    return matchesLocation && matchesType;
  });

  return (
    <div className="container my-5">
      <h2>Explore Our Rooms</h2>
      <p className="text-secondary">
        Find the perfect place for your stay.
      </p>

      <div className="row g-3 my-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search room or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="All">All Properties</option>
            <option value="Hotel">Hotel</option>
            <option value="Villa">Villa</option>
            <option value="Cottage">Cottage</option>
            <option value="Apartment">Apartment</option>
            <option value="Resort">Resort</option>
          </select>
        </div>
      </div>

      <p>{filteredRooms.length} properties found</p>

      <div className="row g-4">
        {filteredRooms.map((room) => (
          <div className="col-md-6 col-lg-4" key={room.id}>
            <RoomCard room={room} />
          </div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="alert alert-info mt-3">
          No rooms found. Try another location.
        </div>
      )}
    </div>
  );
}

export default Rooms;
