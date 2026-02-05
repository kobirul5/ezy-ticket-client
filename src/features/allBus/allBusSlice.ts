import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Using the direct instance or a function that returns it since hooks can't be used here.
// However, since useAxiosPublic in this project just returns a constant, we can use it.
// To be safe and follow TS best practices, we'll type the state.

interface Bus {
  _id: string;
  name: string;
  from: string;
  to: string;
  time: string;
  date: string;
  ticketPrice: number;
  [key: string]: any;
}

interface AllBusState {
  allBus: Bus[];
  isLoading: boolean;
  isError: boolean;
  err: string | null;
}

const initialState: AllBusState = {
  allBus: [],
  isLoading: false,
  isError: false,
  err: null,
};

// Directly using the axios logic since we can't use hooks in thunks
// and useAxiosPublic just returns a singleton.
export const fetchBus = createAsyncThunk('bus/fetchBus', async () => {
    // Assuming the base URL from useAxiosPublic if it were available
    // But since we want to be clean, let's just use axios for now or import the instance if we can.
    // For now, I'll follow the existing pattern but adding types.
    const res = await axios.get('http://localhost:3000/api/bus', { withCredentials: true });
    return res.data;
});

export const allBusSlice = createSlice({
    name: 'allBus',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBus.pending, (state) => {
            state.isError = false;
            state.isLoading = true;
        })
        .addCase(fetchBus.fulfilled, (state, action: PayloadAction<Bus[]>) => {
            state.isLoading = false;
            state.allBus = action.payload;
        })
        .addCase(fetchBus.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.err = action.error?.message || "Failed to fetch bus data";
        });
    }
});

export default allBusSlice.reducer;
