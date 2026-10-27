
function AboutUs() {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1>About StayEase</h1>

        <p className="lead text-secondary">
          Your comfortable stay starts here.
        </p>
      </div>

      <div className="row align-items-center g-4">
        <div className="col-md-6">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
            alt="Hotel"
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-md-6">
          <h2>Who We Are</h2>

          <p>
            StayEase is a hotel and house booking website project
            designed to help users explore different accommodation options.
          </p>

          <p>
            Users can browse rooms, view property details, check prices
            and submit a booking request through a simple interface.
          </p>

          <h5>Our Features</h5>

          <ul>
            <li>Easy room search</li>
            <li>Different accommodation options</li>
            <li>Simple booking form</li>
            <li>Responsive website design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
