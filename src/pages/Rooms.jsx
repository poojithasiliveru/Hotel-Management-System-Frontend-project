
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import roomsData from "../data/rooms";

const STORAGE_KEY = "hotelRooms";

const types = ["Hotel", "Villa", "Cottage", "Apartment", "Resort"];

function Rooms() {
  const location = useLocation();

  // Get rooms from LocalStorage and update with roomsData
  const [rooms, setRooms] = useState(() => {
    const savedRooms = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    const updatedRooms = [
      ...roomsData.map((newRoom) => {
        const oldRoom = savedRooms.find(
          (room) => String(room.id) === String(newRoom.id)
        );

        return oldRoom
          ? { ...oldRoom, ...newRoom }
          : newRoom;
      }),

      // Keep extra rooms already saved in LocalStorage
      ...savedRooms.filter(
        (oldRoom) =>
          !roomsData.some(
            (newRoom) =>
              String(newRoom.id) === String(oldRoom.id)
          )
      )
    ];

    return updatedRooms;
  });

  // Save rooms to LocalStorage
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(rooms)
    );
  }, [rooms]);

  // Search
  const [search, setSearch] = useState(
    new URLSearchParams(location.search).get("location") || ""
  );

  // Filter
  const [type, setType] = useState("All");

  // Search and filter rooms
  const filteredRooms = rooms.filter((room) => {
    const text = search.toLowerCase();

    return (
      (
        (room.name || "").toLowerCase().includes(text) ||
        (room.location || "").toLowerCase().includes(text)
      ) &&
      (type === "All" || room.type === type)
    );
  });

  return (
    <div className="container my-5">

      <div className="mb-3">
        <h2>Explore Rooms</h2>

        <p className="text-secondary">
          Find your perfect stay with StayEase.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="row g-3 mb-4">

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

            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

      </div>

      <p>{filteredRooms.length} properties found</p>

      {/* Room Cards */}
      <div className="row g-4">

        {filteredRooms.map((room) => (
          <div
            className="col-12 col-md-6 col-lg-4"
            key={room.id}
          >
            <RoomCard room={room} />
          </div>
        ))}

      </div>

      {/* No Rooms Found */}
      {filteredRooms.length === 0 && (
        <div className="alert alert-info mt-4">
          No rooms found. Try another search.
        </div>
      )}

    </div>
  );
}

export default Rooms;
