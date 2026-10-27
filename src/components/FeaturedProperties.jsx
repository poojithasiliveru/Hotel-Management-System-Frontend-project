
import RoomCard from "./RoomCard";

function FeaturedProperties() {
  const rooms = [
    {
      id: 1,
      name: "Luxury Beach House",
      location: "Goa",
      price: 4500,
      description: "Beautiful house with a beach view.",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600"
    },
    {
      id: 2,
      name: "Premium Hotel",
      location: "Hyderabad",
      price: 2800,
      description: "Comfortable rooms for your stay.",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"
    },
    {
      id: 3,
      name: "Mountain Cottage",
      location: "Ooty",
      price: 3500,
      description: "Relax in a peaceful green location.",
      image:
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600"
    }
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Featured Properties</h2>

      <div className="row g-4">
        {rooms.map((room) => (
          <div className="col-md-4" key={room.id}>
            <RoomCard room={room} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProperties;
