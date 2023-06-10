import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { MOVIE_API, THE_MOVIE_DB_URL } from "../utilities/ApiUrl";
const initialState = {
  movies: [],
  loadGenres: false,
  genres: [],
};
/* `fetchGenre` is a function that uses `createAsyncThunk` from the Redux Toolkit library
to create an asynchronous action that can be dispatched to the Redux store. */
export const fetchGenre = createAsyncThunk("netflix/genre", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${THE_MOVIE_DB_URL}/genre/movie/list?api_key=${MOVIE_API}`
  );
  return genres;
});
const creatingArrayFromGetRawData = (results, moviesArray, genres) => {
  results.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genreId) => {
      const name = genres.find(({ id }) => id === genreId);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    creatingArrayFromGetRawData(results, moviesArray, genres);
  }
  return moviesArray;
};
/* `export const fetchMovies` is creating an asynchronous action called `fetchMovies` using
`createAsyncThunk` from the Redux Toolkit library. This action takes an object with a `type`
property and a `thunkApi` parameter. It then retrieves the `genres` state from the Redux store using
`thunkApi.getState()`, and uses it to construct a URL to fetch data from an external API. Finally,
it returns the result of calling the `getRawData` function with the constructed URL, `genres`, and
`true` as arguments. */
export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkAPI) => {
    const {
      netflix: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${THE_MOVIE_DB_URL}/trending/${type}/week?api_key=${MOVIE_API}`,
      genres,
      true
    );
  }
);
/* `const NetflixSlice = createSlice({` is creating a Redux slice using the `createSlice` function from
the Redux Toolkit library. */
const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenre.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.loadGenres = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});
export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
