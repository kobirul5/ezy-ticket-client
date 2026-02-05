import { baseApi } from '../../baseApi';

export const entertainmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCinemaHalls: builder.query({
      query: () => '/cinemahalls',
      providesTags: ['Cineplex'],
    }),
    getLocalMovies: builder.query({
      query: () => '/allmovies',
      providesTags: ['Movie'],
    }),
    getExternalMovies: builder.query({
      query: () => 'https://api.themoviedb.org/3/movie/popular?api_key=7c6a26f876561b33041c71bf76c78528',
      // Since this is an external URL, fetchBaseQuery might need full URL handling or a separate baseQuery.
      // But for now, if fetchBaseQuery handles full URLs, it's fine.
    }),
  }),
});

export const { useGetCinemaHallsQuery, useGetLocalMoviesQuery, useGetExternalMoviesQuery } = entertainmentApi;
