import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import axios from "axios";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path?: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  overview: string;
  [key: string]: any;
}

interface Hall {
  _id: string;
  name: string;
  location: string;
  [key: string]: any;
}

interface EntertainmentContextType {
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
  halls: Hall[];
}

export const EntertainmentContext = createContext<EntertainmentContextType | null>(null);

const EntertainmentProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get cinema halls
        const hallsResponse = await axiosSecure.get('/cinemahalls');
        setHalls(hallsResponse.data);
        
        // Get local movies
        const localMoviesResponse = await axiosSecure.get('/allmovies');
        const localMovies = localMoviesResponse.data;
        
        // Get external movies
        const externalMoviesResponse = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=7c6a26f876561b33041c71bf76c78528");
        const externalMovies = externalMoviesResponse.data.results;
        
        // Combine both movie sources
        setMovies([...localMovies, ...externalMovies]);
      } catch (error) {
        console.error("Error fetching entertainment data:", error);
      }
    };
    
    fetchData();
  }, [axiosSecure]);

  const entertainmentInfo: EntertainmentContextType = {
    movies,
    setMovies,
    halls,
  };

  return (
    <EntertainmentContext.Provider value={entertainmentInfo}>
      {children}
    </EntertainmentContext.Provider>
  );
};

export default EntertainmentProvider;
