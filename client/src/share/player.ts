import { Player } from "@prisma/client";
import { api } from "./api";

export const playersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlayers: builder.query<Player[], void>({
      query: () => ({
        url: "/players",
        method: "GET",
      }),
    }),
    getPlayer: builder.query<Player, string>({
      query: (id) => ({
        url: `/players/${id}`,
        method: "GET",
      }),
    }),
    editPlayer: builder.mutation<string, Player>({
      query: (player) => ({
        url: `/players/edit/${player.id}`,
        method: "PUT",
        body: player,
      }),
    }),
    removePlayer: builder.mutation<string, string>({
      query: (id) => ({
        url: `/players/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addPlayer: builder.mutation<Player, Player>({
      query: (player) => ({
        url: "/players/add",
        method: "POST",
        body: player,
      }),
    }),
  }),
});

export const {
  useGetAllPlayersQuery,
  useGetPlayerQuery,
  useEditPlayerMutation,
  useRemovePlayerMutation,
  useAddPlayerMutation,
} = playersApi;

export const {
  endpoints: { getAllPlayers, getPlayer, editPlayer, removePlayer, addPlayer },
} = playersApi;
