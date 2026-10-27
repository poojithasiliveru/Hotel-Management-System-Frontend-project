
import { Link } from "react-router-dom";

function PopularDestinations() {
  const destinations = [
    {
      name: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600"
    },
    {
      name: "Hyderabad",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600"
    },
    {
      name: "Ooty",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600"
    },
    {
      name: "Bengaluru",
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600"
    }
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Popular Destinations</h2>

      <div className="row g-4">
        {destinations.map((place) => (
          <div className="col-6 col-md-3" key={place.name}>
            <Link
              to={`/rooms?location=${encodeURIComponent(place.name)}`}
              className="text-decoration-none text-dark"
            >
              <div className="card destination-card h-100">
                <img
                  src={place.image}
                  className="card-img-top destination-image"
                  alt={place.name}
                />

                <div className="card-body text-center">
                  <h5>{place.name}</h5>
                  <p className="text-primary mb-0">Explore stays</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularDestinations;
