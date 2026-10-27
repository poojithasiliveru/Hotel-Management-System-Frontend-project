
function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Priya",
      rating: 5,
      message: "Very comfortable rooms and excellent service."
    },
    {
      id: 2,
      name: "Rahul",
      rating: 4,
      message: "Easy booking process and a beautiful location."
    },
    {
      id: 3,
      name: "Ananya",
      rating: 5,
      message: "I enjoyed my stay. The rooms were very clean."
    }
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Customer Reviews</h2>

      <div className="row g-4">
        {reviews.map((review) => (
          <div className="col-md-4" key={review.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5>{review.name}</h5>

                <p className="text-warning">
                  {"★".repeat(review.rating)}
                </p>

                <p>{review.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
