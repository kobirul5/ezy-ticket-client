import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useEntertainmentData from "../../../Hooks/EntertainmentHook/useEntertainmentData";
import MovieCard from "../Components/MovieCard";
import "./allmovie.css";

const AllMovies = () => {
  const { darkMode } = useAuth();
  const { movies } = useEntertainmentData();

  return (
    <section
      className={`px-4 flex flex-col justify-center md:px-10 bg-gradient-to-br ${
        darkMode ? "text-white" : ""
      }`}
    >
      <div className="mt-10">
        <h1 className="text-xl md:text-4xl text-center font-semibold">
          <span className="text-main uppercase border-b-2 border-t-2">Top Films</span>
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10 container mx-auto mt-10">
        {movies.map((movie, idx) => (
          <MovieCard key={idx} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default AllMovies;
