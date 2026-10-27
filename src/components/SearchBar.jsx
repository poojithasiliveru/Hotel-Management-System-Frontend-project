
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("2");

  const navigate = useNavigate();

  function searchRooms(e) {
    e.preventDefault();

    navigate(
      `/rooms?location=${encodeURIComponent(location)}&guests=${guests}`
    );
  }

  return (
    <div className="container search-box">
      <form className="row g-3" onSubmit={searchRooms}>

        <div className="col-md-5">
          <label className="form-label">Destination</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter city name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Guests</label>

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

        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary w-100" type="submit">
            Search Rooms
          </button>
        </div>

      </form>
    </div>
  );
}

export default SearchBar;
