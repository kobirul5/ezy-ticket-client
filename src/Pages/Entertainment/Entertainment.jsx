
import AllMovies from "./AllMovie/AllMovies";
import MovieMarquee from "./Components/MovieMarquee";
import FeaturedTrailers from "./FeaturedTrailers";
import MovieHero from "./MovieHero";
import MovieNews from "./MovieNews";
import TrendingMovies from "./TrendingMovies";

const Entertainment = () => {



  return ( 
    <div className={`pt-20 bg-gradient-to-br  `}>
      <MovieHero></MovieHero>
      <AllMovies></AllMovies>
      {/* <TrendingMovies></TrendingMovies> */}
      {/* <FeaturedTrailers></FeaturedTrailers> */}
      <MovieNews></MovieNews>
      <MovieMarquee></MovieMarquee>
    </div>
  );
};

export default Entertainment;
