
import RoomCard from "./RoomCard";

function FeaturedProperties() {
  const rooms = [
    {
    id: "1",
    name: "Deluxe Room",
    location: "Hyderabad",
    price: 2500,
    rating: 4.5,
    type: "Hotel",
    description: "Comfortable room with modern facilities.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
  },
  {
    id: "2",
    name: "Luxury Villa",
    location: "Ooty",
    price: 4500,
    rating: 4.8,
    type: "Villa",
    description: "Luxury villa with beautiful interiors.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811"
  },
  {
    id: "3",
    name: "Beach Cottage",
    location: "Vizag",
    price: 3000,
    rating: 4.2,
    type: "Cottage",
    description: "Peaceful cottage near the beach.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
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
