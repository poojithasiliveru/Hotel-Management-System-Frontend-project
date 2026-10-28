
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import RoomCard from "../components/RoomCard";

const API = "http://localhost:3001/rooms";

const emptyRoom = {
  name: "",
  location: "",
  price: "",
  rating: "",
  type: "Hotel",
  description: "",
  image: ""
};

const fields = [
  ["name", "Room Name", "text"],
  ["location", "Location", "text"],
  ["price", "Price", "number"],
  ["rating", "Rating", "number"],
  ["image", "Image URL", "url"]
];

const types = ["Hotel", "Villa", "Cottage", "Apartment", "Resort"];

function Rooms() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem("loggedInUser"));

  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState(
    new URLSearchParams(location.search).get("location") || ""
  );
  const [type, setType] = useState("All");
  const [form, setForm] = useState({ ...emptyRoom });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function getRooms() {
    try {
      const { data } = await axios.get(API);
      setRooms(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load rooms. Check JSON Server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  function requireLogin() {
    if (!isLoggedIn) {
      navigate("/login");
      return false;
    }
    return true;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setForm({ ...emptyRoom });
    setEditId(null);
    setShowForm(false);
  }

  function handleAdd() {
    if (!requireLogin()) return;

    setForm({ ...emptyRoom });
    setEditId(null);
    setShowForm(true);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!requireLogin()) return;

    setError("");
    setMessage("");

    const data = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating)
    };

    try {
      if (editId !== null) {
        await axios.patch(`${API}/${editId}`, data);
        setMessage("Room updated successfully!");
      } else {
        await axios.post(API, data);
        setMessage("Room added successfully!");
      }

      resetForm();
      await getRooms();
    } catch (err) {
      console.error(err);
      setError("Unable to save room. Check JSON Server.");
    }
  }

  function handleEdit(room) {
    if (!requireLogin()) return;

    setEditId(room.id);
    setForm({
      ...emptyRoom,
      ...room,
      price: String(room.price ?? ""),
      rating: String(room.rating ?? "")
    });
    setShowForm(true);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!requireLogin()) return;

    if (!window.confirm("Are you sure you want to delete this room?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);
      setRooms((prev) => prev.filter((room) => room.id !== id));

      if (editId === id) {
        resetForm();
      }

      setMessage("Room deleted successfully!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to delete room. Check JSON Server.");
    }
  }

  const filteredRooms = rooms.filter((room) => {
    const text = search.toLowerCase();

    return (
      ((room.name || "").toLowerCase().includes(text) ||
        (room.location || "").toLowerCase().includes(text)) &&
      (type === "All" || room.type === type)
    );
  });

  if (loading) {
    return <p className="text-center mt-5">Loading rooms...</p>;
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
        <div>
          <h2>Explore Rooms</h2>
          <p className="text-secondary">
            Find your perfect stay with StayEase.
          </p>
        </div>

        {isLoggedIn && (
          <button className="btn btn-success" onClick={handleAdd}>
            + Add Room
          </button>
        )}
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && isLoggedIn && (
        <form
          className="card card-body shadow-sm mb-5"
          onSubmit={handleSubmit}
        >
          <h4>{editId !== null ? "Edit Room" : "Add New Room"}</h4>

          <div className="row g-3">
            {fields.map(([name, label, inputType]) => (
              <div className="col-md-6" key={name}>
                <label className="form-label">{label}</label>
                <input
                  className="form-control"
                  name={name}
                  type={inputType}
                  value={form[name]}
                  onChange={handleChange}
                  min={inputType === "number" ? "0" : undefined}
                  max={name === "rating" ? "5" : undefined}
                  step={name === "rating" ? "0.1" : "any"}
                  required
                />
              </div>
            ))}

            <div className="col-md-6">
              <label className="form-label">Room Type</label>
              <select
                className="form-select"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 d-flex gap-2">
              <button className="btn btn-primary" type="submit">
                {editId !== null ? "Update Room" : "Add Room"}
              </button>

              <button
                className="btn btn-secondary"
                type="button"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
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

      <div className="row g-4">
        {filteredRooms.map((room) => (
          <div className="col-12 col-md-6 col-lg-4" key={room.id}>
            <div className="h-100 d-flex flex-column">
              <div className="flex-grow-1">
                <RoomCard room={room} />
              </div>

              {isLoggedIn && (
                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(room)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(room.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="alert alert-info mt-4">
          No rooms found. Try another search.
        </div>
      )}
    </div>
  );
}

export default Rooms;
