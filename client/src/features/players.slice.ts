import { Player } from "@prisma/client";
import { logout } from "./auth.slice";
import { createSlice } from "@reduxjs/toolkit/react";
import { playersApi } from "../share/player";
import { RootState } from "../redux/store";

interface InitialState {
  players: Player[] | null;
}

const initialState: InitialState = {
  players: null,
};

const slice = createSlice({
  name: "players",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(playersApi.endpoints.getAllPlayers.matchFulfilled, (state, action) => {
        state.players = action.payload;
      })
  },
});

export default slice.reducer;
export const selectPlayers = (state: RootState) => state.players;