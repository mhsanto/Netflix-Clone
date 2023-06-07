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
/* `export const fetchGenre` is a function that uses `createAsyncThunk` from the Redux Toolkit library
to create an asynchronous action that can be dispatched to the Redux store. */
export const fetchGenre = createAsyncThunk("netflix/genre", async () => {
  const { data } = await axios.get(
    `${THE_MOVIE_DB_URL}/genre/movie/list?api_key=${MOVIE_API}`
  );
  console.log(data);
});

const NetflixSlice = createSlice({
  name: "netflix",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder.addCase(fetchGenre.fulfilled, (state, payload) => {
      (state.genres = payload.genre), (state.loadGenres = payload.loadGenres);
    });
  },
});
export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
