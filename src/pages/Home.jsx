
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import PopularDestinations from "../components/PopularDestinations";
import FeaturedProperties from "../components/FeaturedProperties";
import Reviews from "../components/Reviews";

function Home() {
  return (
    <>
      <Hero />
      <SearchBar />
      <PopularDestinations />
      <FeaturedProperties />
      <Reviews />
    </>
  );
}

export default Home;
