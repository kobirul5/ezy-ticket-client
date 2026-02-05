import AllMovies from "./AllMovie/AllMovies";
import MovieMarquee from "./Components/MovieMarquee";
import DiscountOffer from "./Discount/DiscountOffer";
import MovieHero from "./MovieHero";
import MovieNews from "./MovieNews";

const Entertainment = () => {
  return ( 
    <div className={`  `}>
      <MovieHero></MovieHero>
      <AllMovies></AllMovies>
      {/* <TrendingMovies></TrendingMovies> */}
      {/* <FeaturedTrailers></FeaturedTrailers> */}
      <MovieNews></MovieNews>
      <DiscountOffer></DiscountOffer>
      <MovieMarquee></MovieMarquee>
    </div>
  );
};

export default Entertainment;
