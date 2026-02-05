import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { useGetCinemaHallsQuery, useGetExternalMoviesQuery, useGetLocalMoviesQuery } from "../app/features/entertainment/entertainmentApi";

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
  const { data: halls = [], isLoading: hallsLoading } = useGetCinemaHallsQuery(undefined);
  const { data: localMovies = [], isLoading: localMoviesLoading } = useGetLocalMoviesQuery(undefined);
  const { data: externalMoviesData, isLoading: externalMoviesLoading } = useGetExternalMoviesQuery(undefined);

  useEffect(() => {
    if (externalMoviesData?.results || localMovies.length > 0) {
      const combined = [...localMovies, ...(externalMoviesData?.results || [])];
      setMovies(combined);
    }
  }, [localMovies, externalMoviesData]);

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
